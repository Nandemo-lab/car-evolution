import assert from 'node:assert/strict'
import test from 'node:test'
import { vehicleDecisionHtml } from '../src/affiliate.js'

test('no advertising block appears without an approved and enabled partner', () => {
  assert.equal(vehicleDecisionHtml(), '')
  assert.equal(vehicleDecisionHtml({ valuation: { partner: 'pending', status: 'pending', enabled: true, url: 'https://example.test/' } }), '')
  assert.equal(vehicleDecisionHtml({ valuation: { partner: 'disabled', status: 'approved', enabled: false, url: 'https://example.test/' } }), '')
})

test('only configured HTTPS partners render a labeled sponsored link', () => {
  const html = vehicleDecisionHtml({
    usedCarSearch: { partner: 'approved-partner', status: 'approved', enabled: true, url: 'https://example.test/search?q=1&sort=2' },
    valuation: { partner: 'invalid', status: 'approved', enabled: true, url: 'javascript:alert(1)' },
  })
  assert.match(html, /PR・広告/)
  assert.match(html, /個人情報/)
  assert.match(html, /https:\/\/example\.test\/search\?q=1&amp;sort=2/)
  assert.match(html, /rel="sponsored noopener noreferrer"/)
  assert.equal((html.match(/href=/g) ?? []).length, 1)
})
