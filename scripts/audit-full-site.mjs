import { readFile, readdir, access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join, normalize } from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const dist = join(root, 'dist')
const origin = 'https://carvista.jp'
const live = process.argv.includes('--live')

const sitemapXml = await readFile(join(dist, 'sitemap.xml'), 'utf8')
const sitemapUrls = [...sitemapXml.matchAll(/<loc>(https:\/\/carvista\.jp(?:\/[^<]*)?)<\/loc>/g)].map(match => match[1])
const sitemapPaths = new Set(sitemapUrls.map(url => new URL(url).pathname))
const trustPaths = new Set(['/about.html', '/contact.html', '/editorial-policy.html', '/privacy.html'])
const failures = []
const warnings = []
const pages = []

const fileForPath = pathname => join(dist, pathname === '/' ? 'index.html' : pathname.replace(/^\//, ''))
const getHtml = async pathname => {
  if (!live) return readFile(fileForPath(pathname), 'utf8')
  const response = await fetch(`${origin}${pathname}`, { redirect: 'manual' })
  if (response.status !== 200) failures.push({ type: 'http', page: pathname, status: response.status, location: response.headers.get('location') })
  return response.text()
}
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)=(?:"([^"]*)"|'([^']*)')/g)].map(match => [match[1], match[2] ?? match[3] ?? '']))
const stripHash = value => value.split('#')[0]
const normalizePath = (from, value) => {
  if (value.startsWith('/')) return stripHash(value)
  const base = dirname(from === '/' ? '/index.html' : from)
  return `/${normalize(join(base, stripHash(value))).replaceAll('\\', '/').replace(/^\/+/, '')}`
}
const exists = async path => {
  try { await access(path); return true } catch { return false }
}

const htmlByPath = new Map()
for (const url of sitemapUrls) {
  const pathname = new URL(url).pathname
  const html = await getHtml(pathname)
  htmlByPath.set(pathname, html)
}

for (const [pathname, html] of htmlByPath) {
  const expectedCanonical = `${origin}${pathname}`
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1] ?? html.match(/<link\s+href="([^"]+)"\s+rel="canonical"/i)?.[1]
  if (canonical !== expectedCanonical) failures.push({ type: 'canonical', page: pathname, expected: expectedCanonical, actual: canonical })
  if ((html.match(/<h1\b/gi) || []).length !== 1) failures.push({ type: 'h1-count', page: pathname, count: (html.match(/<h1\b/gi) || []).length })
  if (/<meta\s+name="robots"[^>]*noindex/i.test(html)) failures.push({ type: 'noindex', page: pathname })
  if (/(?:alt|title)="(?:undefined|null)"|>(?:undefined|null)</i.test(html.replace(/<script[\s\S]*?<\/script>/gi, ''))) failures.push({ type: 'render-token', page: pathname })
  if (!/<meta\s+property="og:title"/i.test(html) || !/<meta\s+property="og:image"/i.test(html)) failures.push({ type: 'ogp', page: pathname })

  const jsonLd = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)]
  if (!jsonLd.length) failures.push({ type: 'jsonld-missing', page: pathname })
  for (const [, json] of jsonLd) {
    try { JSON.parse(json) } catch (error) { failures.push({ type: 'jsonld-invalid', page: pathname, error: error.message }) }
  }

  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map(match => attrs(match[0]))
  for (const image of imageTags) {
    if (!Object.hasOwn(image, 'alt')) failures.push({ type: 'alt-missing', page: pathname, src: image.src })
    if (/^(?:undefined|null)$/i.test(image.alt ?? '')) failures.push({ type: 'alt-invalid', page: pathname, src: image.src, alt: image.alt })
    if (image.src?.startsWith('/')) {
      const imagePath = join(dist, image.src.replace(/^\//, ''))
      if (!await exists(imagePath)) failures.push({ type: 'image-missing', page: pathname, src: image.src })
    }
  }

  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]))
  const links = [...html.matchAll(/<a\b[^>]*>/gi)].map(match => attrs(match[0])).filter(link => link.href)
  for (const link of links) {
    const href = link.href
    if (/^(?:https?:|mailto:|tel:|javascript:)/i.test(href)) continue
    if (href.startsWith('#')) {
      if (!ids.has(href.slice(1))) failures.push({ type: 'anchor-missing', page: pathname, href })
      continue
    }
    const target = normalizePath(pathname, href)
    if (!sitemapPaths.has(target) && !['/favicon.ico', '/favicon.png', '/apple-touch-icon.png', '/site.webmanifest'].includes(target)) {
      failures.push({ type: 'internal-target-outside-sitemap', page: pathname, href, target })
    }
    const fragment = href.includes('#') ? href.split('#')[1] : ''
    if (fragment && htmlByPath.has(target)) {
      const targetIds = new Set([...htmlByPath.get(target).matchAll(/\sid="([^"]+)"/g)].map(match => match[1]))
      if (!targetIds.has(fragment)) warnings.push({ type: 'target-anchor-not-static', page: pathname, href })
    }
  }

  const isContent = pathname !== '/' && !trustPaths.has(pathname)
  const externalLinks = [...html.matchAll(/<a\b[^>]*href="(https?:\/\/[^"]+)"/gi)].map(match => match[1])
  if (isContent && externalLinks.length === 0) failures.push({ type: 'source-missing', page: pathname })
  if (isContent && !/FAST ANSWER|最短結論|最短の見分け方|先に結論|class="(?:facelift|comparison)-answer"/.test(html)) {
    warnings.push({ type: 'answer-label-missing', page: pathname })
  }
  pages.push({ pathname, images: imageTags.length, links: links.length, sources: externalLinks.length })
}

const holdAsset = '/images/cars/serena/c26-2013-post-facelift-20x-v1.png'
for (const [pathname, html] of htmlByPath) {
  if (html.includes(holdAsset)) failures.push({ type: 'hold-asset-published', page: pathname, asset: holdAsset })
}

const report = {
  mode: live ? 'live' : 'dist',
  auditedUrls: sitemapUrls.length,
  contentUrls: pages.filter(page => page.pathname !== '/' && !trustPaths.has(page.pathname)).length,
  totalImages: pages.reduce((sum, page) => sum + page.images, 0),
  totalLinks: pages.reduce((sum, page) => sum + page.links, 0),
  failures,
  warnings,
}
console.log(JSON.stringify(report, null, 2))
if (failures.length) process.exitCode = 1
