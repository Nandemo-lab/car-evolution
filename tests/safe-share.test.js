import test from 'node:test'
import assert from 'node:assert/strict'
import { copySafely, shareSafely } from '../src/safe-share.js'

test('retry succeeds after an earlier denied clipboard write', async () => {
  let denied = true
  const nav = { clipboard: { async writeText() { if (denied) throw Error('denied') } } }
  const button = { textContent: 'copy' }
  assert.equal(await copySafely(button, 'url', 'done', nav), false)
  denied = false
  assert.equal(await copySafely(button, 'url', 'done', nav), true)
  assert.equal(button.textContent, 'done')
})

test('copy reports success only after clipboard success', async () => {
  const button = { textContent: 'copy' }; let copied
  assert.equal(await copySafely(button, 'url', 'done', { clipboard: { async writeText(value) { copied = value } } }), true)
  assert.equal(copied, 'url'); assert.equal(button.textContent, 'done')
})
test('missing and denied clipboard settle with useful feedback', async () => {
  for (const nav of [{}, { clipboard: { async writeText() { throw Error('denied') } } }]) {
    const button = { textContent: 'copy' }
    assert.equal(await copySafely(button, 'url', 'done', nav), false)
    assert.match(button.textContent, /コピーできませんでした/)
  }
})
test('native share cancellation never changes clipboard or button', async () => {
  const button = { textContent: 'share' }
  const nav = { async share() { throw Object.assign(Error(), { name: 'AbortError' }) }, clipboard: { writeText() { assert.fail('unexpected copy') } } }
  assert.equal(await shareSafely(button, { url: 'url' }, nav), 'cancelled')
  assert.equal(button.textContent, 'share')
})
test('native share success never copies', async () => {
  assert.equal(await shareSafely({}, { url: 'url' }, { async share() {}, clipboard: { writeText() { assert.fail() } } }), 'shared')
})
test('native share failure can copy and missing APIs fail safely', async () => {
  let copied
  assert.equal(await shareSafely({}, { url: 'url' }, { async share() { throw Error() }, clipboard: { async writeText(text) { copied = text } } }), 'copied')
  assert.equal(copied, 'url')
  assert.equal(await shareSafely({}, { url: 'url' }, {}), 'failed')
})
