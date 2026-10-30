import { mkdir, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173'
const label = process.env.AUDIT_LABEL || 'after'
const outputDir = resolve(process.env.AUDIT_SCREENSHOT_DIR || 'outputs/comparison-redesign-2026-10-30')
const executablePath = process.platform === 'win32' ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' : undefined

await mkdir(outputDir, { recursive: true })
const browser = await chromium.launch({ headless: true, executablePath })
const results = []
for (const viewport of [{ name:'pc', width:1440, height:1000 }, { name:'375', width:375, height:812 }, { name:'390', width:390, height:844 }]) {
  const page = await browser.newPage({ viewport: { width:viewport.width, height:viewport.height }, deviceScaleFactor:1 })
  const errors = []
  page.on('console', message => message.type() === 'error' && errors.push(message.text()))
  await page.goto(`${baseUrl}/n-box-jf1-zenki-kouki.html`, { waitUntil:'networkidle', timeout:30_000 })
  const metrics = await page.evaluate(() => ({
    scrollHeight: document.documentElement.scrollHeight,
    viewportHeight: innerHeight,
    cards: document.querySelectorAll('article').length,
    visibleCards: [...document.querySelectorAll('article')].filter(element => element.getClientRects().length).length,
    bodyCharacters: document.querySelector('main')?.innerText.replace(/\s+/g,'').length || 0,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    firstImageBottom: Math.round(document.querySelector('.lc-cars')?.getBoundingClientRect().bottom || 0),
  }))
  await page.screenshot({ path:resolve(outputDir, `${label}-${viewport.name}-first-view.png`) })
  if (viewport.name === '390') await page.screenshot({ path:resolve(outputDir, `${label}-${viewport.name}-full.png`), fullPage:true })
  results.push({ viewport:viewport.name, ...metrics, errors })
  await page.close()
}
await browser.close()
await writeFile(resolve(outputDir, `${label}-metrics.json`), JSON.stringify(results,null,2))
console.log(JSON.stringify(results,null,2))
