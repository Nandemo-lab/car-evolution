import { mkdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173'
const outputDir = resolve(process.env.AUDIT_SCREENSHOT_DIR || 'outputs/facelift-ui')
const executablePath = process.env.BROWSER_EXECUTABLE || (process.platform === 'win32'
  ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  : undefined)
const targets = [
  { slug: 'n-box-jf1', path: '/n-box-jf1-zenki-kouki.html' },
  { slug: 'voxy-80', path: '/voxy-80-zenki-kouki.html' },
]

await mkdir(outputDir, { recursive: true })
const browser = await chromium.launch({ headless: true, executablePath })
for (const target of targets) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })
  await page.goto(`${baseUrl}${target.path}`, { waitUntil: 'networkidle', timeout: 20_000 })
  const buttons = page.locator('[data-facelift-part]')
  for (let index = 0; index < await buttons.count(); index += 1) {
    await buttons.nth(index).click()
    const dialog = page.locator('.facelift-detail-dialog')
    await dialog.waitFor({ state: 'visible' })
    const part = await buttons.nth(index).getAttribute('data-part-id') || String(index + 1)
    await page.screenshot({ path: resolve(outputDir, `${target.slug}-${part}.png`), fullPage: false })
    await page.keyboard.press('Escape')
  }
  await page.close()
}
await browser.close()
console.log(`Saved facelift UI screenshots to ${outputDir}`)
