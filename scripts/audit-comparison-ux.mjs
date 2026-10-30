import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173'
const outputDir = resolve(process.env.AUDIT_OUTPUT_DIR || 'outputs/comparison-ux-2026-10-30')
const executablePath = process.platform === 'win32' ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' : undefined
const standardPaths = (await readdir(new URL('../src/data/comparisons/', import.meta.url)))
  .filter(name => name.endsWith('.js'))
  .map(name => `/${name.replace(/\.js$/, '.html')}`)
const standardSet = new Set(standardPaths)
const xml = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8')
const paths = [...xml.matchAll(/<loc>https:\/\/carvista\.jp([^<]*)<\/loc>/g)]
  .map(match => match[1] || '/')
  .filter(path => /(?:vs|zenki|compare|before-after|generations|identification|roomy-tank)/.test(path))
  .sort()

await mkdir(outputDir, { recursive: true })
const browser = await chromium.launch({ headless: true, executablePath })
const rows = []
for (const path of paths) {
  const page = await browser.newPage({ viewport: { width:390, height:844 } })
  const errors = []
  page.on('console', message => message.type() === 'error' && errors.push(message.text()))
  await page.goto(`${baseUrl}${path}`, { waitUntil:'networkidle', timeout:30_000 })
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y)
      await new Promise(resolve => setTimeout(resolve, 20))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForFunction(() => [...document.images].every(image => image.complete), null, { timeout:10_000 })
  const metrics = await page.evaluate(() => {
    const comparison = document.querySelector('.lc-cars')
    const fastAnswer = document.querySelector('.lc-answer')
    return {
      title: document.querySelector('h1')?.textContent?.trim(),
      scrollHeight: document.documentElement.scrollHeight,
      bodyCharacters: document.querySelector('main')?.innerText.replace(/\s+/g, '').length || 0,
      comparisonTop: Math.round(comparison?.getBoundingClientRect().top || 0),
      comparisonBottom: Math.round(comparison?.getBoundingClientRect().bottom || 0),
      fastAnswerBottom: Math.round(fastAnswer?.getBoundingClientRect().bottom || 0),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      brokenImages: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).length,
      visualPoints: document.querySelectorAll('.lc-visual-points > *').length,
      visualFirst: Boolean(document.querySelector('.lc-visual-first')),
    }
  })
  rows.push({ path, standard:standardSet.has(path), ...metrics, errors })
  await page.close()
}

for (const path of ['/n-box-jf1-zenki-kouki.html', '/voxy-80-zenki-kouki.html', '/prius-30-vs-50.html']) {
  for (const width of [375, 390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height:width === 1440 ? 1000 : 844 } })
    await page.goto(`${baseUrl}${path}`, { waitUntil:'networkidle', timeout:30_000 })
    await page.screenshot({ path:resolve(outputDir, `${path.slice(1,-5)}-${width}.png`), fullPage:false })
    if (width === 390) await page.screenshot({ path:resolve(outputDir, `${path.slice(1,-5)}-${width}-full.png`), fullPage:true })
    await page.close()
  }
}

await browser.close()
const failures = rows.filter(row => (row.standard && (!row.visualFirst || row.visualPoints < 1 || row.visualPoints > 3)) || row.overflow > 1 || row.brokenImages || row.errors.length)
const summary = {
  baseUrl,
  checked: rows.length,
  failures,
  ranges: {
    pageHeight: [Math.min(...rows.map(row => row.scrollHeight)), Math.max(...rows.map(row => row.scrollHeight))],
    imageArrival: [Math.min(...rows.map(row => row.comparisonTop)), Math.max(...rows.map(row => row.comparisonTop))],
    bodyCharacters: [Math.min(...rows.map(row => row.bodyCharacters)), Math.max(...rows.map(row => row.bodyCharacters))],
  },
  rows,
}
await writeFile(resolve(outputDir, 'comparison-ux.json'), JSON.stringify(summary, null, 2))
console.log(JSON.stringify({ checked:summary.checked, failures:failures.length, ranges:summary.ranges }, null, 2))
if (failures.length) process.exitCode = 1
