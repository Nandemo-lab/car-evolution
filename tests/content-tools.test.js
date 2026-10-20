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
test('34比較ページの初期HTMLに本文・出典・画像・メモが揃う', async () => {
  const files=readdirSync(new URL('../src/data/comparisons/',import.meta.url))
  assert.equal(files.length,34)
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
test('公開73 URLの初期HTMLとサイトマップに欠落・重複見出しがない',()=>{
  const xml=readFileSync(new URL('../dist/sitemap.xml',import.meta.url),'utf8')
  const urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1])
  assert.equal(urls.length,73)
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
  for(const page of ['voxy-60-vs-70','solio-ma15s-zenki-kouki','vellfire-20-zenki-kouki','prius-30-zenki-kouki']) assert.ok(existsSync(new URL(`../dist/${page}.html`,import.meta.url)))
})

test('全index対象コンテンツはJavaScriptなしでも主要回答・画像・出典を持つ',()=>{
  const xml=readFileSync(new URL('../dist/sitemap.xml',import.meta.url),'utf8')
  const urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1])
  const trust=new Set(['/','/about.html','/contact.html','/privacy.html','/editorial-policy.html'])
  for(const url of urls){
    const pathname=new URL(url).pathname
    if(trust.has(pathname)) continue
    const html=readFileSync(new URL(`../dist${pathname}`,import.meta.url),'utf8')
    const body=html.match(/<body[\s\S]*?<\/body>/)?.[0] || ''
    const text=body
      .replace(/<script[\s\S]*?<\/script>/g,' ')
      .replace(/<style[\s\S]*?<\/style>/g,' ')
      .replace(/<[^>]+>/g,' ')
      .replace(/&[^;]+;/g,' ')
      .replace(/\s+/g,' ')
      .trim()
    // This is a regression floor, not a claim that length equals quality:
    // it prevents the old 120–200 character crawler shell from returning.
    assert.ok(text.length>=800,`${pathname}: only ${text.length} static characters`)
    assert.ok((body.match(/<img\b/g)||[]).length>=1,`${pathname}: no static comparison image`)
    assert.ok(/<h2\b/.test(body),`${pathname}: no static information hierarchy`)
    assert.ok(/https:\/\//.test(body),`${pathname}: no static source link`)
    assert.ok(!/画像準備中|alt="(?:undefined|null)"/.test(body),`${pathname}: invalid static image fallback`)
  }
})

test('SERENA C26後期HOLD画像は公開HTMLから参照しない',()=>{
  const xml=readFileSync(new URL('../dist/sitemap.xml',import.meta.url),'utf8')
  for(const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)){
    const pathname=new URL(match[1]).pathname
    const html=readFileSync(new URL(`../dist${pathname==='/'?'/index.html':pathname}`,import.meta.url),'utf8')
    assert.ok(!html.includes('c26-2013-post-facelift-20x-v1.png'),pathname)
  }
})

test('歴代ページ共通説明に特定車種名を固定しない',()=>{
  const source=readFileSync(new URL('../src/car-page.js',import.meta.url),'utf8')
  assert.ok(source.includes('${config.vehicleName}の役割と技術の変化'))
  assert.ok(!source.includes('プリウスが担った役割'))
})

test('歴代ページは長い共通免責を繰り返さずTrustページへ集約する',()=>{
  for(const car of cars){
    const html=readFileSync(new URL(`../dist/cars/${car.slug}.html`,import.meta.url),'utf8')
    assert.ok(html.includes('制作・画像利用・訂正方針'),car.slug)
    assert.ok(!html.includes('CarVistaは各自動車メーカーとは一切関係のない独立したプロジェクトです'),car.slug)
    assert.equal((html.match(/<footer class="policy"/g)||[]).length,1,car.slug)
  }
})

test('Phase 2対象7ページは初期HTMLに固有の比較条件と購入確認情報を持つ',()=>{
  const comparisons=['compare-alphard-vellfire','compare-voxy-noah','compare-freed-sienta','compare-noah-serena-stepwgn','compare-n-box-spacia','compare-voxy-noah-esquire']
  for(const page of comparisons){
    const html=readFileSync(new URL(`../dist/${page}.html`,import.meta.url),'utf8')
    assert.ok(html.includes('比較条件と代表仕様'),page)
    assert.ok(html.includes('中古車で確認すること'),page)
    assert.ok(/(?:6AA|5AA|5BA|6BA|3BA|DBA)-[A-Z0-9]+/.test(html),`${page}: representative model code missing`)
    assert.ok(html.includes('全長×全幅×全高'),page)
  }
  const delica=readFileSync(new URL('../dist/cars/delica-d5.html',import.meta.url),'utf8')
  for(const phrase of ['2007年登場｜CV5W','2013年にCV1Wディーゼルを追加','2019年｜同一世代の大幅改良','フルモデルチェンジではありません']) assert.ok(delica.includes(phrase),phrase)
})

test('Phase 3重点3ページは仕様の異なる軸を混同しない',()=>{
  const tanto=readFileSync(new URL('../dist/tanto-l375s-vs-la600s.html',import.meta.url),'utf8')
  assert.ok(tanto.includes('2007年12月17日'))
  assert.ok(tanto.includes('2013年10月3日'))
  assert.ok(tanto.includes('Customは別外装'))

  const harrier=readFileSync(new URL('../dist/harrier-30-vs-60.html',import.meta.url),'utf8')
  assert.ok(harrier.includes('画像から個別グレードを断定せず'))
  assert.ok(harrier.includes('30系240G・2.4Lガソリン・2WD'))
  assert.ok(harrier.includes('掲載画像の仕様を数値の根拠にはしていません'))

  const delica=readFileSync(new URL('../dist/delica-d5-before-after-2019.html',import.meta.url),'utf8')
  assert.ok(delica.includes('外観の改良差とパワートレイン差を分けて確認'))
  assert.ok(delica.includes('同一世代の大幅改良型'))
  assert.ok(delica.includes('型式と燃料を別に確認'))
})

test('抜本リビルド後のホームは5つの目的入口とno-JS型式一覧を持つ',()=>{
  const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8')
  for(const label of ['車種から探す','型式から探す','前期／後期を見分ける','世代を比較する','購入前に確認する']) assert.ok(html.includes(label),label)
  assert.ok(html.includes('class="model-directory-group"'))
  for(const code of ['JF1','AGH30','MA36S']) assert.ok(html.includes(code),code)
})

test('全generation比較ページは初期HTMLに3段階の現車確認フローを持つ',()=>{
  const pages=readdirSync(new URL('../dist',import.meta.url)).filter(name=>name.endsWith('.html'))
  const targets=pages.filter(name=>readFileSync(new URL(`../dist/${name}`,import.meta.url),'utf8').includes('comparison-notebook'))
  assert.ok(targets.length>=30)
  for(const name of targets){
    const html=readFileSync(new URL(`../dist/${name}`,import.meta.url),'utf8')
    assert.ok(html.includes('写真だけで決めず、3段階で確かめる'),name)
    assert.ok(html.includes('車台番号と装備を照会する'),name)
  }
})
