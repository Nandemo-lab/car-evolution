import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'

test('storage deletion denial preserves visible checklist and notes', () => {
  const code = readFileSync(new URL('../src/comparison-tools.js', import.meta.url), 'utf8')
  const body = code.match(/\[data-clear-inspection\]'\)\?\.addEventListener\('click', \(\) => \{([\s\S]*?)\n  \}\)/)?.[1]
  assert.ok(body)
  const input = { checked: true }, notes = { value: 'keep' }
  let notice = '', tracked = false
  const handler = new Function('root', 'storageKey', 'notes', 'announce', 'trackEvent', 'localStorage', body)
  handler({ querySelectorAll: () => [input] }, 'test', notes, text => { notice = text }, () => { tracked = true }, { removeItem() { throw Error('denied') } })
  assert.equal(input.checked, true); assert.equal(notes.value, 'keep'); assert.equal(tracked, false)
  assert.match(notice, /消去できませんでした/)
})

test('404 recovery page is Japanese, responsive, noindex and links home', () => {
  const html = readFileSync(new URL('../public/404.html', import.meta.url), 'utf8')
  for (const value of ['lang="ja"', 'name="viewport"', 'content="noindex"', 'href="/"']) assert.ok(html.includes(value))
})
test('all modified simple comparison share handlers use cancellation-safe helper', () => {
  const dir = new URL('../src/', import.meta.url)
  let count = 0
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.js') || file === 'comparison-page.js') continue
    const code = readFileSync(new URL(file, dir), 'utf8')
    if (!code.includes('function copyUrl(button, message)')) continue
    assert.ok(code.includes('return copySafely(button, location.href, message)'), file)
    assert.ok(code.includes('return shareSafely(event.currentTarget,'), file)
    assert.ok(!code.includes('return navigator.share('), file)
    count++
  }
  assert.equal(count, 15)
})
