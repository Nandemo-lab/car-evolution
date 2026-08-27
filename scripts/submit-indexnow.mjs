import { readFile } from 'node:fs/promises'

const siteOrigin = 'https://carvista.jp'
const key = '7bbb0c71306f4fa28615c892092b1c95'
const keyLocation = `${siteOrigin}/${key}.txt`
const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8')
const urlList = [...sitemap.matchAll(/<loc>(https:\/\/carvista\.jp\/[^<]*)<\/loc>/g)].map((match) => match[1])

if (!urlList.length) throw new Error('No canonical URLs found in dist/sitemap.xml.')

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: 'carvista.jp', key, keyLocation, urlList }),
})

if (!response.ok) throw new Error(`IndexNow submission failed: ${response.status} ${await response.text()}`)
console.log(`IndexNow accepted ${urlList.length} canonical URLs (HTTP ${response.status}).`)
