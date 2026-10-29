import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4182'
const xml = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8')
const paths = [...xml.matchAll(/<loc>https:\/\/carvista\.jp([^<]*)<\/loc>/g)].map(match => match[1] || '/')
const executablePath = process.env.BROWSER_EXECUTABLE || (process.platform === 'win32'
  ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  : undefined)
const browser = await chromium.launch({ headless: true, executablePath })
const issues = []

const settleLazyImages = async page => {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y)
      await new Promise(resolve => setTimeout(resolve, 20))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForFunction(() => [...document.images].every(image => image.complete), null, { timeout: 10_000 })
}

for (const path of paths) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  const errors = []
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  page.on('pageerror', error => errors.push(error.message))
  const response = await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle', timeout: 20_000 })
  await settleLazyImages(page)
  const metrics = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    h1: document.querySelectorAll('h1').length,
    brokenImages: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).length,
    invalidText: document.body.innerText.split(/\r?\n/).some(line => /^(?:undefined|null)$/i.test(line.trim())),
  }))
  if (!response || response.status() !== 200 || metrics.overflow > 1 || metrics.h1 !== 1 || metrics.brokenImages || metrics.invalidText || errors.length) {
    issues.push({ path, status: response?.status(), metrics, errors: errors.slice(0, 3) })
  }
  await page.close()
}

const representatives = ['/', '/cars/voxy.html', '/voxy-80-zenki-kouki.html', '/compare-freed-sienta.html', '/cars/corolla-cross.html', '/privacy.html']
const viewportIssues = []
for (const width of [375, 390, 1440]) {
  for (const path of representatives) {
    const page = await browser.newPage({ viewport: { width, height: width === 1440 ? 1000 : 844 } })
    const errors = []
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle', timeout: 20_000 })
    await settleLazyImages(page)
    const metrics = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      brokenImages: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).length,
    }))
    if (metrics.overflow > 1 || metrics.brokenImages || errors.length) viewportIssues.push({ width, path, metrics, errors })
    await page.close()
  }
}

await browser.close()
console.log(JSON.stringify({ baseUrl, checked: paths.length, issues, viewportIssues }, null, 2))
if (issues.length || viewportIssues.length) process.exitCode = 1
