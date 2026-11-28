import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const base = process.env.MOBILE_QA_ORIGIN || 'http://127.0.0.1:4173'
const pages = process.env.MOBILE_QA_PATHS?.split(',') || [
  '/', '/cars/noah.html', '/cars/voxy.html', '/cars/tanto.html',
  '/n-box-jf1-zenki-kouki.html', '/cars/sienta.html',
  '/cars/spacia.html', '/cars/freed.html', '/noah-80-vs-90.html',
  '/spacia-model-code-years.html',
  '/noah-60-vs-70.html',
  '/cars/esquire.html', '/cars/solio.html',
  '/prius-30-vs-50.html', '/prius-50-vs-60.html',
]
const widths = [375, 390, 430]
const results = []
const outputDir = process.env.MOBILE_QA_OUTPUT_DIR || 'mobile-evidence'
const production = base === 'https://carvista.jp'
// Match the six approved placement paths; the production smoke covers a subset.
const liveAffiliatePaths = new Set([
  '/cars/noah.html', '/cars/voxy.html', '/cars/tanto.html',
  '/noah-80-vs-90.html', '/voxy-80-zenki-kouki.html',
  '/tanto-la600s-vs-la650s.html',
])
await mkdir(outputDir, { recursive: true })
const browser = await chromium.launch({ headless: true, ...(process.env.MOBILE_QA_CHROMIUM_EXECUTABLE
  ? { executablePath: process.env.MOBILE_QA_CHROMIUM_EXECUTABLE } : {}) })
try {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true })
    if (production) await context.route('**/googletagmanager.com/**', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }))
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
      if (production) await page.evaluate(() => { const disclosure = document.querySelector('details[data-vehicle-intent="valuation"]'); if (disclosure) disclosure.open = true })
      // Reveal lazy-loaded comparison and related cards before judging image delivery.
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
          scrollTo(0, y)
          await new Promise(resolve => setTimeout(resolve, 30))
        }
        scrollTo(0, 0)
      })
      await page.waitForLoadState('networkidle')
      const layout = await page.evaluate(async isProduction => ({
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
        affiliate: isProduction ? {
          visible: !!document.querySelector('details[data-vehicle-intent="valuation"] [data-partner="a8_s00000014380003"] a[href^="https://px.a8.net/"]'),
          prLabel: !!document.querySelector('details[data-vehicle-intent="valuation"] .comparison-referral')?.textContent.includes('PR・広告'),
        } : null,
      }), production)
      // Exercise the existing delegated handler with a disposable local link.
      // Never click the A8 creative or send a test conversion to GA4.
      const analyticsProbe = production && path === '/cars/noah.html' ? await page.evaluate(() => {
        const wrapper = document.querySelector('details[data-vehicle-intent="valuation"] [data-referral="valuation"]')
        if (!wrapper) return { passed: false, reason: 'approved placement missing' }
        const mock = document.createElement('a')
        mock.href = '#qa-only'
        mock.textContent = 'QA mock link'
        mock.addEventListener('click', event => event.preventDefault())
        const events = []
        const handler = event => events.push(event.detail)
        window.addEventListener('carvista:analytics', handler)
        const originalGtag = window.gtag
        const calls = []
        window.gtag = (...args) => calls.push(args)
        wrapper.append(mock)
        try { mock.click() } finally {
          mock.remove()
          window.gtag = originalGtag
          window.removeEventListener('carvista:analytics', handler)
        }
        return {
          passed: events.length === 1 && events[0].name === 'click_vehicle_valuation' &&
            events[0].parameters.partner === 'a8_s00000014380003' &&
            calls.length === 1 && calls[0][0] === 'event' && calls[0][1] === 'click_vehicle_valuation',
          eventCount: events.length,
          gtagCallCount: calls.length,
        }
      }) : null
      const searchProbe = path === '/' ? await (async () => {
        const query = page.locator('#model-query')
        await query.fill('JF1')
        await page.locator('#model-finder button[type="submit"]').click()
        const modelMatches = await page.locator('#model-results a').count()
        await page.locator('[data-year-car]').selectOption({ label: 'N-BOX' })
        await page.locator('[data-year-value]').selectOption('2012')
        await page.locator('[data-year-finder-form] button[type="submit"]').click()
        const yearResult = await page.locator('[data-year-result]').innerText()
        await query.focus()
        const inputVisibility = await query.evaluate(input => {
          const rect = input.getBoundingClientRect()
          return rect.left >= 0 && rect.right <= innerWidth && rect.top >= 0 && rect.top < innerHeight
        })
        return { passed: modelMatches > 0 && /N-BOX|JF1/.test(yearResult) && inputVisibility,
          modelMatches, yearResult: yearResult.slice(0, 160), inputVisibility }
      })() : null
      const slug = path.replace(/\W+/g, '-').replace(/^-|-$/g, '')
      await page.screenshot({ path: `${outputDir}/${slug || 'home'}-${width}.png`, fullPage: true })
      results.push({ path, width, status: response?.status(), ...layout, analyticsProbe, searchProbe, errors })
      await page.close()
    }
    await context.close()
  }
} finally { await browser.close() }
await writeFile(`${outputDir}/results.json`, JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))
if (results.some(result => result.status !== 200 || result.documentWidth > result.viewport + 1 || result.brokenImages.length || result.errors.length || result.searchProbe?.passed === false ||
  (production && (result.analyticsProbe?.passed === false || (liveAffiliatePaths.has(result.path)
    ? !result.affiliate.visible || !result.affiliate.prLabel
    : result.affiliate.visible))))) process.exitCode = 1
