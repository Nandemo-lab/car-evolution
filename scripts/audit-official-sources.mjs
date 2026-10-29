import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8')
const paths = [...sitemap.matchAll(/<loc>https:\/\/carvista\.jp(\/[^<]*)<\/loc>/g)].map(match => match[1] || '/')
const trust = new Set(['/about.html', '/contact.html', '/editorial-policy.html', '/privacy.html'])
const references = new Map()

for (const pathname of paths) {
  if (pathname === '/' || trust.has(pathname)) continue
  const html = await readFile(join(dist, pathname.replace(/^\//, '')), 'utf8')
  const urls = [...html.matchAll(/<a\b[^>]*href="(https?:\/\/[^"]+)"/gi)].map(match => match[1])
  for (const url of urls) {
    const parsed = new URL(url)
    if (parsed.hostname === 'carvista.jp' || /(?:^|\.)x\.com$/.test(parsed.hostname)) continue
    if (!references.has(url)) references.set(url, [])
    references.get(url).push(pathname)
  }
}

const entries = [...references].map(([url, pages]) => ({ url, pages }))
const results = []
const queue = [...entries]
const worker = async () => {
  while (queue.length) {
    const entry = queue.shift()
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 20000)
    try {
      const response = await fetch(entry.url, {
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'user-agent': 'Mozilla/5.0 CarVista source verifier' },
      })
      results.push({ ...entry, status: response.status, finalUrl: response.url, outcome: response.ok ? 'reachable' : [401, 403, 429].includes(response.status) ? 'blocked' : 'failed' })
    } catch (error) {
      results.push({ ...entry, status: 0, outcome: 'failed', error: error.name })
    } finally {
      clearTimeout(timer)
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker))
results.sort((a, b) => a.outcome.localeCompare(b.outcome) || a.url.localeCompare(b.url))
const counts = Object.fromEntries(['reachable', 'blocked', 'failed'].map(outcome => [outcome, results.filter(item => item.outcome === outcome).length]))
console.log(JSON.stringify({ pages: paths.length - trust.size - 1, uniqueSources: results.length, counts, failures: results.filter(item => item.outcome === 'failed'), blocked: results.filter(item => item.outcome === 'blocked') }, null, 2))
if (counts.failed) process.exitCode = 1
