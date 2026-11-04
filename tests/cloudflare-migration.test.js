import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('Cloudflare production remains static-only and does not expose a workers.dev origin', async () => {
  const config = JSON.parse((await read('wrangler.jsonc')).replace(/^\s*\/\/.*$/gm, ''))
  assert.equal(config.name, 'carvista-static')
  assert.equal(config.workers_dev, false)
  assert.equal(config.preview_urls, false)
  assert.equal(config.assets.directory, './dist')
  assert.equal(config.assets.html_handling, 'none')
  assert.equal(config.assets.not_found_handling, 'none')
  assert.equal(config.main, undefined)
})

test('Cloudflare preserves the root document, historical 308 redirects, and security headers', async () => {
  const [redirects, headers] = await Promise.all([read('public/_redirects'), read('public/_headers')])
  assert.match(redirects, /^\/ \/index\.html 200/m)
  for (const rule of [
    '/voxy-70-80-90.html /cars/voxy.html 308',
    '/n-box-generations.html /cars/n-box.html 308',
    '/alphard-history-identification.html /cars/alphard.html 308',
  ]) assert.ok(redirects.includes(rule), `missing redirect: ${rule}`)
  for (const name of ['X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy', 'X-Frame-Options', 'Strict-Transport-Security', 'Content-Security-Policy-Report-Only']) {
    assert.match(headers, new RegExp(`^  ${name}:`, 'm'), `missing header: ${name}`)
  }
})

test('Cloudflare build embeds the existing public GA4 measurement ID deterministically', async () => {
  const script = await read('scripts/build-cloudflare.mjs')
  assert.match(script, /VITE_GA_MEASUREMENT_ID: 'G-0KJP4GT8H8'/)
})

test('Cloudflare preview is isolated and prepared with noindex', async () => {
  const [config, prepare] = await Promise.all([read('wrangler.preview.jsonc'), read('scripts/prepare-cloudflare-preview.mjs')])
  assert.match(config, /"name": "carvista-static-preview"/)
  assert.match(config, /"directory": "\.\/dist-cloudflare-preview"/)
  assert.match(prepare, /X-Robots-Tag: noindex, nofollow/)
})
