import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173'
const executablePath = process.env.BROWSER_EXECUTABLE || (process.platform === 'win32'
  ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  : undefined)
const browser = await chromium.launch({ headless: true, executablePath })
const results = []

for (const path of ['/n-box-jf1-zenki-kouki.html', '/voxy-80-zenki-kouki.html']) {
  for (const width of [375, 390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: width === 1440 ? 1000 : 844 } })
    const errors = []
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle', timeout: 20_000 })
    const triggers = page.locator('[data-facelift-part]')
    for (let partIndex = 0; partIndex < await triggers.count(); partIndex += 1) {
      const trigger = triggers.nth(partIndex)
      await trigger.scrollIntoViewIfNeeded()
      const triggerBox = await trigger.boundingBox()
      const part = await trigger.getAttribute('data-part-id')
      await trigger.focus()
      await page.keyboard.press('Enter')
      const dialog = page.locator('.facelift-detail-dialog')
      await dialog.waitFor({ state: 'visible' })
      const dialogState = await dialog.evaluate(element => ({
        open: element.open,
        images: element.querySelectorAll('img, svg image').length,
        viewportHeight: element.querySelector('.facelift-detail-viewport')?.getBoundingClientRect().height,
        point: element.querySelector('.facelift-detail-point p')?.textContent?.trim(),
        closeLabel: element.querySelector('.facelift-dialog-close')?.getAttribute('aria-label'),
        closeText: element.querySelector('.facelift-dialog-close')?.textContent?.trim(),
      }))
      await page.keyboard.press('Escape')
      await dialog.waitFor({ state: 'hidden' })
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        triggerHeight: document.querySelector('[data-facelift-part]')?.getBoundingClientRect().height,
        focusRestored: document.activeElement?.matches?.('[data-facelift-part]') || false,
        changeRows: document.querySelectorAll('.facelift-change-list article').length,
        partButtons: document.querySelectorAll('[data-facelift-part]').length,
      }))
      results.push({ path, width, part, triggerBox, dialogState, state, errors })
    }
    await page.close()
  }
}

await browser.close()
const failures = results.filter(({ path, triggerBox, dialogState, state, errors }) => (
  !triggerBox || triggerBox.height < 44 || !dialogState.open || dialogState.images !== 2
  || !dialogState.closeLabel || dialogState.closeText !== '×' || !dialogState.point
  || dialogState.viewportHeight < 145 || state.overflow > 1 || !state.focusRestored
  || state.changeRows !== 8
  || state.partButtons !== (path.startsWith('/n-box') ? 2 : 3)
  || errors.length
))
console.log(JSON.stringify({ baseUrl, checked: results.length, failures, results }, null, 2))
if (failures.length) process.exitCode = 1
