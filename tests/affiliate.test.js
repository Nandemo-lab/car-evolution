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

test('A8 creatives stay byte-for-byte intact and cannot use synthetic text links', () => {
  const creative = '<a href="https://px.a8.net/svt/ejp?a8mat=fixture">公式の広告文言</a><img border="0" width="1" height="1" src="https://www18.a8.net/0.gif?a8mat=fixture" alt="">'
  const enabled = { partner: 'a8_s00000014380003', status: 'approved', enabled: true, creativeHtml: creative }
  const html = vehicleDecisionHtml({ valuation: enabled }, { pagePath: '/cars/noah.html' })
  assert.ok(html.includes(creative))
  assert.match(html, /data-referral="valuation"/)
  assert.equal(vehicleDecisionHtml({ valuation: { ...enabled, creativeHtml: undefined, url: 'https://px.a8.net/' } }, { pagePath: '/cars/noah.html' }), '')
  assert.equal(vehicleDecisionHtml({ valuation: { ...enabled, enabled: false } }, { pagePath: '/cars/noah.html' }), '')
})

test('only selected replacement pages can show the approved valuation creative', () => {
  const approved = { partner: 'a8_s00000014380003', status: 'approved', enabled: true,
    creativeHtml: '<a href="https://px.a8.net/svt/ejp?a8mat=fixture" rel="nofollow">カーネクスト</a>\n<img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=fixture" alt="">' }
  assert.match(vehicleDecisionHtml({ valuation: approved }, { pagePath: '/noah-80-vs-90.html' }), /カーネクスト/)
  assert.equal(vehicleDecisionHtml({ valuation: approved }, { pagePath: '/prius-30-vs-50.html' }), '')
  assert.equal(vehicleDecisionHtml(), '') // A missing page path must never show the creative.
})
