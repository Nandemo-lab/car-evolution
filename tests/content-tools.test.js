import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { dimensionDifferences, escapeText, millimetres } from '../src/comparison-tools.js'
import { findModels } from '../src/model-finder.js'
import { generationComparisonHtml } from '../src/generation-comparison-html.js'
import { resolveReferences } from '../src/official-sources.js'

test('寸法差は同じ単位の単一数値だけ計算する', () => {
  assert.equal(millimetres('1,750 mm'),1750)
  assert.equal(millimetres('1,750–1,790 mm'),null)
  assert.equal(millimetres('1.75 m'),null)
  assert.deepEqual(dimensionDifferences([['全長','4,000 mm','3,950 mm'],['全高','1,700 mm','仕様による']]).map(r=>r.difference),[-50,null])
})
test('ユーザー入力をHTMLとして扱わない', () => {
  assert.equal(escapeText('<script>"&'), '&lt;script&gt;&quot;&amp;')
})
const cars = await Promise.all(readdirSync(new URL('../src/cars/',import.meta.url)).filter(p=>p.endsWith('.js')).map(async p=>({...((await import(`../src/cars/${p}`)).default),slug:p.replace('.js','')})))
test('型式・全角・日本語・複数条件・該当なしを区別する', () => {
  assert.equal(findModels(cars,'ＪＦ１')[0].car.slug,'n-box')
  assert.ok(findModels(cars,'タント').every(x=>x.car.slug==='tanto'))
  assert.ok(findModels(cars,'タント').length>0)
  assert.equal(findModels(cars,'タント LA600')[0].generation.code.includes('LA600'),true)
  assert.equal(findModels(cars,'<script>unmatched').length,0)
  assert.equal(findModels(cars,'   ').length,0)
})
test('30比較ページの初期HTMLに本文・出典・画像・メモが揃う', async () => {
  const files=readdirSync(new URL('../src/data/comparisons/',import.meta.url))
  assert.equal(files.length,30)
  for(const file of files){
    const data=(await import(`../src/data/comparisons/${file}`)).default
    const html=generationComparisonHtml(data)
    assert.ok(!/\bundefined\b|\bnull\b/.test(html),file)
    assert.ok(html.includes(data.answer.title),file)
    assert.ok(html.includes('data-download-inspection'),file)
    for(const car of data.cars) assert.ok(existsSync(new URL(`../public${car.image}`,import.meta.url)),car.image)
    for(const source of data.sources) assert.ok(html.includes(source.href),file)
    const built=readFileSync(new URL(`../dist/${file.replace('.js','.html')}`,import.meta.url),'utf8')
    assert.ok(built.includes('data-prerendered="true"'),file)
    assert.ok(built.includes(data.answer.title),file)
  }
})
test('ホームはJavaScript実行前から全16車種にリンクする',()=>{
  const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8')
  for(const car of cars) assert.ok(html.includes(`/cars/${car.slug}.html`),car.slug)
})
test('個別の配列形式出典を優先し、確認日を捏造しない',()=>{
  const refs=resolveReferences(cars.find(car=>car.slug==='tanto'))
  assert.equal(refs.items.length,5)
  assert.equal(refs.checkedAt,undefined)
  assert.ok(refs.items.every(item=>item.url.startsWith('https://www.daihatsu.com/')))
  for(const car of cars) assert.ok(resolveReferences(car)?.items.length>0,car.slug)
})
test('公開69 URLの初期HTMLとサイトマップに欠落・重複見出しがない',()=>{
  const xml=readFileSync(new URL('../dist/sitemap.xml',import.meta.url),'utf8')
  const urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1])
  assert.equal(urls.length,69)
  for(const url of urls){
    const pathname=new URL(url).pathname
    const html=readFileSync(new URL(`../dist${pathname==='/'?'/index.html':pathname}`,import.meta.url),'utf8')
    assert.equal((html.match(/<h1\b/g)||[]).length,1,pathname)
    assert.equal((html.match(/rel="canonical"/g)||[]).length,1,pathname)
    assert.ok(!/(?:alt|href)="(?:undefined|null)"/.test(html),pathname)
    for(const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) assert.doesNotThrow(()=>JSON.parse(m[1]),pathname)
  }
  const redirects=JSON.parse(readFileSync(new URL('../vercel.json',import.meta.url),'utf8')).redirects
  for(const redirect of redirects) assert.ok(!urls.includes(`https://carvista.jp${redirect.source}`))
  for(const draft of ['voxy-60-vs-70','solio-ma15s-zenki-kouki','vellfire-20-zenki-kouki']) assert.ok(!existsSync(new URL(`../dist/${draft}.html`,import.meta.url)))
})
