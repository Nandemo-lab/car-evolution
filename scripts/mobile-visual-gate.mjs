import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const base = 'http://127.0.0.1:4173'
const pages = [
  '/cars/noah.html', '/cars/voxy.html', '/cars/tanto.html',
  '/n-box-jf1-zenki-kouki.html', '/cars/sienta.html',
  '/cars/spacia.html', '/noah-80-vs-90.html',
]
const widths = [375, 390, 430]
const results = []
await mkdir('mobile-evidence', { recursive: true })
const browser = await chromium.launch({ headless: true })
try {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true })
    for (const path of pages) {
      const page = await context.newPage()
      await page.addInitScript(() => {
        window.__mobileVitals = { lcpMs: null, cls: 0 }
        new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__mobileVitals.lcpMs = Math.round(entry.startTime) }).observe({ type: 'largest-contentful-paint', buffered: true })
        new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__mobileVitals.cls += entry.value }).observe({ type: 'layout-shift', buffered: true })
      })
      const errors = []
      page.on('pageerror', error => errors.push(error.message))
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
      const response = await page.goto(base + path, { waitUntil: 'networkidle' })
      // Reveal lazy-loaded comparison and related cards before judging image delivery.
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
          scrollTo(0, y)
          await new Promise(resolve => setTimeout(resolve, 30))
        }
        scrollTo(0, 0)
      })
      await page.waitForLoadState('networkidle')
      const layout = await page.evaluate(async () => ({
        viewport: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        labVitals: window.__mobileVitals,
        brokenImages: (await Promise.all([...new Set([...document.images].map(image => image.currentSrc).filter(Boolean))].map(src => new Promise(resolve => {
          const image = new Image()
          image.onload = () => resolve(null)
          image.onerror = () => resolve(src)
          image.src = src
        })))).filter(Boolean),
        tables: [...document.querySelectorAll('table')].map(table => ({ width: Math.round(table.getBoundingClientRect().width), parentWidth: Math.round(table.parentElement.getBoundingClientRect().width), scrollable: table.parentElement.scrollWidth > table.parentElement.clientWidth })),
        buttons: [...document.querySelectorAll('a, button')].filter(element => element.getBoundingClientRect().width > 0).length,
      }))
      const slug = path.replace(/\W+/g, '-').replace(/^-|-$/g, '')
      await page.screenshot({ path: `mobile-evidence/${slug}-${width}.png`, fullPage: true })
      results.push({ path, width, status: response?.status(), ...layout, errors })
      await page.close()
    }
    await context.close()
  }
} finally { await browser.close() }
await writeFile('mobile-evidence/results.json', JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))
if (results.some(result => result.status !== 200 || result.documentWidth > result.viewport + 1 || result.brokenImages.length || result.errors.length)) process.exitCode = 1
