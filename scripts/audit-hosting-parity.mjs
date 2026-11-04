import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { promises as dns } from 'node:dns'

const args = Object.fromEntries(process.argv.slice(2).map((arg, index, all) => arg.startsWith('--') ? [arg.slice(2), all[index + 1] && !all[index + 1].startsWith('--') ? all[index + 1] : true] : null).filter(Boolean))
const origin = String(args.origin || 'https://carvista.jp').replace(/\/$/, '')
const output = resolve(String(args.output || 'outputs/cloudflare-migration/audit.json'))
const sourceSitemap = String(args.sitemap || 'https://carvista.jp/sitemap.xml')
const productionHost = new URL(sourceSitemap).hostname

const pickHeaders = (headers) => Object.fromEntries([
  'content-type', 'cache-control', 'location', 'x-content-type-options', 'referrer-policy',
  'permissions-policy', 'x-frame-options', 'strict-transport-security',
  'content-security-policy-report-only', 'x-robots-tag', 'server', 'cf-cache-status', 'x-vercel-cache',
].map((name) => [name, headers.get(name)]).filter(([, value]) => value !== null))

const textMatch = (html, pattern) => html.match(pattern)?.[1]?.replace(/\s+/g, ' ').trim() || null
const pageInfo = async (pathname) => {
  const response = await fetch(`${origin}${pathname}`, { redirect: 'manual' })
  const html = response.status === 200 ? await response.text() : ''
  return {
    pathname,
    status: response.status,
    headers: pickHeaders(response.headers),
    title: textMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description: textMatch(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) || textMatch(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i),
    canonical: textMatch(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) || textMatch(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i),
    robots: textMatch(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i),
    h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()),
    jsonLd: [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].length,
    internalLinks: new Set([...html.matchAll(/<a\b[^>]+href=["']([^"'#]+)["']/gi)].map((match) => match[1]).filter((href) => href.startsWith('/') || href.startsWith('https://carvista.jp/'))).size,
    ga4: /googletagmanager\.com\/gtag\/js\?id=G-/.test(html),
    adsensePublisher: textMatch(html, /<meta[^>]+name=["']google-adsense-account["'][^>]+content=["']([^"']+)["']/i),
    ninjaAd: /adm\.shinobi\.jp|admax-ads/.test(html),
    ogImage: textMatch(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i),
  }
}

const sitemapResponse = await fetch(sourceSitemap)
if (!sitemapResponse.ok) throw new Error(`Sitemap fetch failed: ${sitemapResponse.status}`)
const sitemapXml = await sitemapResponse.text()
const paths = [...sitemapXml.matchAll(/<loc>https:\/\/carvista\.jp([^<]*)<\/loc>/g)].map((match) => match[1] || '/')
const pages = []
for (const pathname of paths) pages.push(await pageInfo(pathname))

const probes = []
for (const pathname of ['/robots.txt', '/sitemap.xml', '/ads.txt', '/site.webmanifest', '/favicon.ico', '/voxy-70-80-90.html', '/n-box-generations.html', '/alphard-history-identification.html', '/does-not-exist-carvista-migration-check']) {
  const response = await fetch(`${origin}${pathname}`, { redirect: 'manual' })
  probes.push({ pathname, status: response.status, headers: pickHeaders(response.headers), bytes: Number(response.headers.get('content-length') || 0) })
}

const dnsRecords = {}
if (args.dns) {
  for (const [name, fn] of Object.entries({ A: dns.resolve4, AAAA: dns.resolve6, NS: dns.resolveNs, MX: dns.resolveMx, TXT: dns.resolveTxt, CNAME: dns.resolveCname })) {
    try { dnsRecords[name] = await fn(productionHost) } catch (error) { dnsRecords[name] = { error: error.code || error.message } }
  }
  try { dnsRecords.wwwCNAME = await dns.resolveCname(`www.${productionHost}`) } catch (error) { dnsRecords.wwwCNAME = { error: error.code || error.message } }
}

const report = {
  generatedAt: new Date().toISOString(), origin, sourceSitemap, urlCount: paths.length,
  failures: pages.filter((page) => page.status !== 200 || !page.title || !page.canonical || page.h1.length !== 1 || page.jsonLd < 1),
  pages, probes, dns: dnsRecords,
}
await mkdir(dirname(output), { recursive: true })
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify({ origin, output, urlCount: report.urlCount, failures: report.failures.length, probes }, null, 2))
