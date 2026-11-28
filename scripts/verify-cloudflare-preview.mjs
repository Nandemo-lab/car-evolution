import { createHash } from 'node:crypto'
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises'
import { extname, join, relative, resolve, dirname } from 'node:path'

const options = Object.fromEntries(process.argv.slice(2).flatMap((arg, i, all) => arg.startsWith('--') ? [[arg.slice(2), all[i + 1]]] : []))
if (!options.origin || !options.dist) {
  console.error('Usage: node scripts/verify-cloudflare-preview.mjs --origin https://<isolated-worker>.workers.dev --dist dist-cloudflare-preview [--output outputs/cloudflare-migration/preview-verification.json]')
  process.exit(2)
}
const origin = new URL(options.origin)
if (origin.protocol !== 'https:' || origin.pathname !== '/' || origin.search || origin.hash) throw Error('Origin must be an HTTPS origin without a path or query')
const dist = resolve(options.dist)
const output = resolve(options.output || 'outputs/cloudflare-migration/preview-verification.json')
const failures = []
const checks = []
const sha256 = data => createHash('sha256').update(data).digest('hex')
const url = pathname => new URL(pathname, origin).href
const request = async pathname => {
  let lastError
  for (let attempt = 0; attempt < 2; attempt++) {
    try { return await fetch(url(pathname), { redirect: 'manual', signal: AbortSignal.timeout(30000), headers: { 'user-agent': 'CarVista-Isolated-Migration-QA/1.0' } }) }
    catch (error) { lastError = error }
  }
  throw lastError
}
const record = (kind, pathname, issue) => {
  checks.push({ kind, pathname, pass: !issue, ...(issue ? { issue } : {}) })
  if (issue) failures.push({ kind, pathname, issue })
}
const checkText = async pathname => {
  const expected = await readFile(join(dist, pathname.slice(1)), 'utf8')
  const response = await request(pathname)
  const actual = await response.text()
  record('static-text', pathname, response.status !== 200 ? `HTTP ${response.status}` : sha256(actual) !== sha256(expected) ? 'body differs from local build' : '')
  return { response, actual }
}
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8')
const paths = [...sitemap.matchAll(/<loc>https:\/\/carvista\.jp(.*?)<\/loc>/g)].map(match => match[1] || '/')
if (paths.length < 109 || new Set(paths).size !== paths.length) throw Error(`Expected at least 109 unique sitemap URLs, found ${paths.length}`)
for (const pathname of paths) {
  const response = await request(pathname)
  const html = response.status === 200 ? await response.text() : ''
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1]
  const jsonLd = [...html.matchAll(/<script[^>]+type="application\/ld\+json"/gi)].length
  const title = /<title>[^<]+<\/title>/i.test(html)
  const h1 = (html.match(/<h1\b/gi) || []).length
  record('page', pathname, response.status !== 200 ? `HTTP ${response.status}` :
    canonical !== `https://carvista.jp${pathname === '/' ? '/' : pathname}` ? `canonical ${canonical || 'missing'}` :
    !title || h1 !== 1 || !jsonLd ? `title=${title} h1=${h1} jsonLd=${jsonLd}` : '')
  record('preview-noindex', pathname, !/noindex/i.test(response.headers.get('x-robots-tag') || '') ? 'Missing X-Robots-Tag noindex in isolated origin' : '')
}

const imageExtensions = new Set(['.png', '.webp', '.jpg', '.jpeg', '.svg', '.ico'])
const files = []
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const pathname = join(dir, entry.name)
    if (entry.isDirectory()) await walk(pathname)
    else if (imageExtensions.has(extname(pathname).toLowerCase())) files.push(pathname)
  }
}
await walk(resolve('public'))
if (files.length !== 357) throw Error(`Expected 357 existing public image assets, found ${files.length}; check baseline before proceeding`)
// Small batches bound memory while comparing bytes, not only dimensions or HTTP status.
for (let index = 0; index < files.length; index += 8) {
  await Promise.all(files.slice(index, index + 8).map(async file => {
    const pathname = `/${relative(resolve('public'), file).replaceAll('\\', '/')}`
    const expected = await readFile(join(dist, pathname.slice(1)))
    const response = await request(pathname)
    const actual = response.status === 200 ? Buffer.from(await response.arrayBuffer()) : Buffer.alloc(0)
    record('image', pathname, response.status !== 200 ? `HTTP ${response.status}` :
      sha256(actual) !== sha256(expected) ? `bytes/hash differ (expected ${expected.length}, actual ${actual.length})` :
      !/image\//i.test(response.headers.get('content-type') || '') ? 'Missing image content type' : '')
  }))
}
for (const pathname of ['/robots.txt', '/sitemap.xml', '/ads.txt', '/site.webmanifest', '/7bbb0c71306f4fa28615c892092b1c95.txt']) await checkText(pathname)
const home = await request('/')
const homeHtml = await home.text()
record('verification', '/', homeHtml.includes('w2OFCsGVZ5Fne6aMgzwJkdali5FF0iLLxaHfF5JasYE') ? '' : 'GSC verification meta missing')
record('adsense-meta', '/', /name="google-adsense-account"/.test(homeHtml) ? '' : 'AdSense publisher meta missing')
const chunks = (await readdir(join(dist, 'assets'))).filter(name => name.endsWith('.js'))
const gaChunks = []
for (const chunk of chunks) if ((await readFile(join(dist, 'assets', chunk), 'utf8')).includes('G-0KJP4GT8H8')) gaChunks.push(chunk)
record('ga4-build', '/assets/', gaChunks.length ? '' : 'Existing GA4 ID not found in built JS')
for (const chunk of gaChunks) {
  const pathname = `/assets/${chunk}`
  const response = await request(pathname)
  const actual = response.status === 200 ? await response.text() : ''
  record('ga4-delivery', pathname, response.status !== 200 || !actual.includes('G-0KJP4GT8H8') ? `GA4 chunk unavailable (HTTP ${response.status})` : '')
}
for (const [pathname, expected] of Object.entries({ '/voxy-70-80-90.html': '/cars/voxy.html', '/n-box-generations.html': '/cars/n-box.html', '/alphard-history-identification.html': '/cars/alphard.html' })) {
  const response = await request(pathname)
  record('redirect', pathname, response.status !== 308 || new URL(response.headers.get('location') || '', origin).pathname !== expected ? `HTTP ${response.status}, Location ${response.headers.get('location')}` : '')
}
const notFound = await request('/does-not-exist-carvista-migration-check')
record('404', '/does-not-exist-carvista-migration-check', notFound.status === 404 ? '' : `HTTP ${notFound.status}`)
const report = { generatedAt: new Date().toISOString(), origin: origin.href, dist, urlCount: paths.length, imageCount: files.length, failed: failures.length, failures, checks }
await mkdir(dirname(output), { recursive: true })
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify({ origin: origin.href, urlCount: paths.length, imageCount: files.length, checks: checks.length, failed: failures.length, output }, null, 2))
if (failures.length) process.exitCode = 1
