import { mkdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4190'
const outputDir = new URL('../outputs/user-value/', import.meta.url)
await mkdir(outputDir, { recursive: true })
const executablePath = process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' : undefined)
const browser = await chromium.launch({ headless: true, executablePath })
const results = []

for (const viewport of [{ width: 375, height: 812 }, { width: 390, height: 844 }, { width: 1440, height: 1000 }]) {
  const context = await browser.newContext({ viewport })
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: baseUrl })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.selectOption('[data-year-car]', 'prius')
  await page.selectOption('[data-year-value]', '2015')
  await page.click('[data-year-finder-form] button[type="submit"]')
  const candidates = await page.locator('.year-candidate').count()
  const boundary = await page.locator('.year-result-alert').textContent()
  const buttonHeight = await page.locator('.year-question-copy').evaluate(element => element.getBoundingClientRect().height)
  await page.click('.year-question-copy')
  const clipboard = await page.evaluate(() => navigator.clipboard.readText())
  const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth))
  await page.locator('#year-finder').screenshot({ path: fileURLToPath(new URL(`year-finder-${viewport.width}.png`, outputDir)) })
  results.push({ viewport: viewport.width, candidates, boundary: /境界年|併売期間/.test(boundary), buttonHeight, clipboardOk: /型式/.test(clipboard) && /製造時期/.test(clipboard), overflow, errors })
  await context.close()
}

await browser.close()
console.log(JSON.stringify({ baseUrl, results }, null, 2))
if (results.some(result => result.candidates < 2 || !result.boundary || result.buttonHeight < 44 || !result.clipboardOk || result.overflow || result.errors.length)) process.exitCode = 1
