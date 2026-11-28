import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
const source = fs.readFileSync(new URL('../src/generation-comparison.js', import.meta.url), 'utf8')
test('generation comparisons use the tested native-share cancellation and copy fallback', () => {
  assert.match(source, /import \{ copySafely, shareSafely \} from '.\/safe-share.js'/)
  assert.match(source, /return shareSafely\(event.currentTarget, \{ title: document.title, text: data.shareText, url: location.href \}\)/)
  assert.doesNotMatch(source, /navigator\.share\(/)
})
test('generation comparison copy is accessible and independently measured', () => {
  assert.match(source, /trackEvent\('copy_generation_comparison_url'/)
  assert.match(source, /return copySafely\(event.currentTarget, location.href, 'コピーしました'\)/)
  assert.doesNotMatch(source, /navigator\.clipboard\.writeText/)
})
