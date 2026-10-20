import { readFile, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const walk = async (dir, prefix = '') => {
  const names = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name
    if (entry.isDirectory()) names.push(...await walk(join(dir, entry.name), relative))
    else if (entry.name.endsWith('.html')) names.push(relative)
  }
  return names
}
const names = await walk(dist)
const trust = new Set(['about.html', 'contact.html', 'editorial-policy.html', 'privacy.html'])
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8')
const published = new Set([...sitemap.matchAll(/<loc>https:\/\/carvista\.jp\/(.*?)<\/loc>/g)].map((match) => match[1] || 'index.html').map((name) => name || 'index.html'))
const strip = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<header[\s\S]*?<\/header>/gi, ' ')
  .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
  .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[^;]+;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
const grams = (text) => new Set([...Array(Math.max(0, text.length - 7))].map((_, i) => text.slice(i, i + 8)))
const similarity = (a, b) => {
  let shared = 0
  for (const value of a) if (b.has(value)) shared += 1
  return shared / Math.max(1, Math.min(a.size, b.size))
}

const pages = []
for (const name of names) {
  if (!published.has(name) || name === 'index.html' || trust.has(name)) continue
  const html = await readFile(join(dist, name), 'utf8')
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] || html
  const text = strip(main)
  pages.push({ url: `/${name}`, chars: text.length, h1: (html.match(/<h1\b/gi) || []).length, images: (main.match(/<img\b/gi) || []).length, sources: (main.match(/href="https?:\/\//gi) || []).length, cues: (main.match(/class="lc-image-cue"/g) || []).length, text, grams: grams(text) })
}

for (const page of pages) {
  let nearest = { url: '', score: 0 }
  for (const other of pages) {
    if (page === other) continue
    const score = similarity(page.grams, other.grams)
    if (score > nearest.score) nearest = { url: other.url, score: Number(score.toFixed(3)) }
  }
  page.nearest = nearest
}

const report = pages.map(({ text, grams: _, ...page }) => page).sort((a, b) => a.chars - b.chars)
const failures = report.filter((page) => page.chars < 900 || page.h1 !== 1 || page.images === 0 || page.sources === 0 || page.nearest.score > .82)
console.log(JSON.stringify({ audited: report.length, failures, weakest: report.slice(0, 10) }, null, 2))
if (failures.length) process.exitCode = 1
