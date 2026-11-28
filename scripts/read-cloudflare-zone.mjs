import { createCipheriv, publicEncrypt, randomBytes, createPublicKey } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'

const token = process.env.CARVISTA_CF_READ_TOKEN
if (!token) throw new Error('Scoped read-only token is not configured')
const target = 'carvista.jp'
const base = 'https://api.cloudflare.com/client/v4'
async function get(path) {
  const response = await fetch(`${base}${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    signal: AbortSignal.timeout(15000),
  })
  // Never print API responses: they can contain DNS/TXT or account data.
  if (!response.ok) throw new Error(`Cloudflare read failed (${response.status})`)
  const json = await response.json()
  if (!json.success) throw new Error('Cloudflare read returned an API error')
  return json.result
}

const zones = await get(`/zones?name=${target}&per_page=50`)
const matches = zones.filter((z) => z.name === target)
if (matches.length !== 1) throw new Error('Expected exactly one target zone')
const zone = matches[0]
const id = encodeURIComponent(zone.id)
const records = []
for (let page = 1; page <= 20; page++) {
  const chunk = await get(`/zones/${id}/dns_records?per_page=100&page=${page}`)
  records.push(...chunk)
  if (chunk.length < 100) break
  if (page === 20) throw new Error('DNS record pagination limit reached')
}
const paths = {
  dnssec: `/zones/${id}/dnssec`,
  ssl: `/zones/${id}/settings/ssl`,
  ssl_recommender: `/zones/${id}/settings/ssl_recommender`,
  always_use_https: `/zones/${id}/settings/always_use_https`,
  min_tls_version: `/zones/${id}/settings/min_tls_version`,
  certificate_packs: `/zones/${id}/ssl/certificate_packs`,
  rulesets: `/zones/${id}/rulesets`,
  single_redirects: `/zones/${id}/rulesets/phases/http_request_dynamic_redirect/entrypoint`,
}
const optional = {}
for (const [name, path] of Object.entries(paths)) {
  try { optional[name] = { result: await get(path) } }
  catch (error) { optional[name] = { unavailable: error.message } }
}
const report = JSON.stringify({ captured_at: new Date().toISOString(), zone, records, optional })
const key = randomBytes(32)
const iv = randomBytes(12)
const cipher = createCipheriv('aes-256-gcm', key, iv)
const ciphertext = Buffer.concat([cipher.update(report, 'utf8'), cipher.final()])
const publicKey = createPublicKey(await readFile('docs/carvista-zone-audit-public.pem'))
const wrappedKey = publicEncrypt({ key: publicKey, oaepHash: 'sha256' }, key)
const envelope = {
  algorithm: 'RSA-OAEP-SHA256+A256GCM',
  encrypted_key: wrappedKey.toString('base64'),
  iv: iv.toString('base64'),
  tag: cipher.getAuthTag().toString('base64'),
  ciphertext: ciphertext.toString('base64'),
}
await writeFile('carvista-zone-report.enc.json', JSON.stringify(envelope), { mode: 0o600 })
console.log('Encrypted CarVista zone report written. No DNS values printed.')
