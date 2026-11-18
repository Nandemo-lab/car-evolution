import assert from 'node:assert/strict'
import test from 'node:test'
import { vehicleDecisionHtml } from '../src/affiliate.js'

test('both guides are usable without a partner and expose no advertising link', () => {
  const html = vehicleDecisionHtml()
  assert.match(html, /中古車を探す前に/)
  assert.match(html, /車を売る前に/)
  assert.doesNotMatch(html, /href=|sponsored|PR・広告|<form/)
})

test('only configured HTTPS partners render a labeled sponsored link', () => {
  const html = vehicleDecisionHtml({
    usedCarSearch: { partner: 'approved-partner', url: 'https://example.test/search?q=1&sort=2' },
    valuation: { partner: 'invalid', url: 'javascript:alert(1)' },
  })
  assert.match(html, /PR・広告/)
  assert.match(html, /個人情報/)
  assert.match(html, /https:\/\/example\.test\/search\?q=1&amp;sort=2/)
  assert.match(html, /rel="sponsored noopener noreferrer"/)
  assert.equal((html.match(/href=/g) ?? []).length, 1)
})
