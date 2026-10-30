import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { dimensionDifferences, escapeText, millimetres } from '../src/comparison-tools.js'
import { findModels, findModelDestinations, normalizeModelQuery } from '../src/model-finder.js'
import { generationComparisonHtml } from '../src/generation-comparison-html.js'
import { resolveReferences } from '../src/official-sources.js'
import { homeCatalog } from '../src/home-cars-html.js'
import { topCardVisualAudit, getDiscoveryImage } from '../src/discovery.js'
import { buildDealerQuestions, findGenerationsByYear, generationYearBounds } from '../src/vehicle-year-finder.js'

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

test('TOP車種カードで別車種が同一画像データを共有しない', () => {
  const seen = new Map()
  for (const car of cars) {
    const image = getDiscoveryImage(car)
    const bytes = readFileSync(new URL(`../public${image}`, import.meta.url))
    const hash = createHash('sha256').update(bytes).digest('hex')
    assert.ok(!seen.has(hash), `${car.slug} duplicates ${seen.get(hash)}`)
    seen.set(hash, car.slug)
  }
})
test('型式・全角・日本語・複数条件・該当なしを区別する', () => {
  assert.equal(findModels(cars,'ＪＦ１')[0].car.slug,'n-box')
  assert.ok(findModels(cars,'タント').every(x=>x.car.slug==='tanto'))
  assert.ok(findModels(cars,'タント').length>0)
  assert.equal(findModels(cars,'タント LA600')[0].generation.code.includes('LA600'),true)
  assert.equal(findModels(cars,'<script>unmatched').length,0)
  assert.equal(findModels(cars,'   ').length,0)
})
test('車名検索はかな・英字・表記揺れ・軽微な誤字から歴代と比較へ進める', () => {
  for (const query of ['NBOX','エヌボックス','えぬぼっくす']) assert.equal(findModels(cars,query)[0].car.slug,'n-box')
  for (const query of ['ベルファイア','ヴェルファイヤ']) assert.equal(findModels(cars,query)[0].car.slug,'vellfire')
  for (const query of ['ベゼル','べぜる','VEZEL']) assert.equal(findModels(cars,query)[0].car.slug,'vezel')
  for (const query of ['ボクシー','ぼくしー','VOXY']) assert.equal(findModels(cars,query)[0].car.slug,'voxy')
  for (const query of ['ハスラー','はすらー','MR92S']) assert.equal(findModels(cars,query)[0].car.slug,'hustler')
  for (const query of ['ルーミー','るーみー','M900A']) assert.equal(findModels(cars,query)[0].car.slug,'roomy')
  for (const query of ['ムーヴ','ムーブ','LA850S']) assert.equal(findModels(cars,query)[0].car.slug,'move')
  assert.equal(findModels(cars,'プリウスス')[0].car.slug,'prius')
  assert.equal(normalizeModelQuery('Ｎ－ＢＯＸ'),'nbox')
  const destinations=findModelDestinations(cars,'ヴェルファイア')
  assert.ok(destinations.some(item=>item.href==='/cars/vellfire.html' && item.kind==='歴代'))
  assert.ok(destinations.some(item=>item.kind==='比較'))
  assert.equal(findModelDestinations(cars,'NBOX').some(item=>item.href.includes('roox')),false)
})
test('車名と初度登録年は境界年を単一世代に断定しない', () => {
  const prius = cars.find(car => car.slug === 'prius')
  const boundary = findGenerationsByYear(prius, 2015)
  assert.ok(boundary.length >= 2, '2015年は30系と50系の候補を残す')
  assert.ok(boundary.some(item => item.code.includes('ZVW30')))
  assert.ok(boundary.some(item => item.code.includes('ZVW50')))
  assert.deepEqual(generationYearBounds(prius.generations.find(item => item.code.includes('ZVW30'))), { start: 2009, end: 2015 })
})
test('YEAR FINDERは全31車種の全販売境界年と前後年を欠落なく判定する', () => {
  assert.equal(cars.length, 31)
  let checkedYears = 0
  for (const car of cars) {
    const bounds = car.generations.map(generation => ({ generation, ...generationYearBounds(generation) }))
    assert.ok(bounds.length > 0, `${car.slug}: 世代定義なし`)
    for (const { generation, start, end } of bounds) {
      assert.ok(Number.isInteger(start) && Number.isInteger(end) && start <= end, `${car.slug}: ${generation.code} の期間が不正`)
      const years = new Set([start - 1, start, start + 1, end - 1, end, end + 1])
      for (const year of years) {
        const actual = findGenerationsByYear(car, year).map(item => item.code).sort()
        const expected = bounds
          .filter(item => year >= item.start && year <= item.end)
          .map(item => item.generation.code)
          .sort()
        assert.deepEqual(actual, expected, `${car.slug} ${year}年`)
        checkedYears += 1
      }
      assert.ok(findGenerationsByYear(car, start).includes(generation), `${car.slug}: 発売年を候補から落としている`)
      assert.ok(findGenerationsByYear(car, end).includes(generation), `${car.slug}: 終了年を候補から落としている`)
    }
  }
  assert.ok(checkedYears >= 400, `境界年前後の検査数が不足: ${checkedYears}`)
})

test('YEAR FINDERは改良年を世代交代と誤認せず、併売・空白年・未対応年を保守的に扱う', () => {
  const bySlug = slug => cars.find(car => car.slug === slug)

  // 2代目EXは3代目発売後も2011年12月まで公式に併売された。
  assert.deepEqual(findGenerationsByYear(bySlug('prius'), 2010).map(item => item.code), ['NHW20', 'ZVW30'])
  assert.deepEqual(findGenerationsByYear(bySlug('prius'), 2012).map(item => item.code), ['ZVW30'])

  // 初度登録年だけでは同一年内の切替月を確定できないため両候補を残す。
  for (const [slug, year] of [['n-box', 2017], ['n-one', 2020], ['delica-mini', 2025], ['roox', 2025]]) {
    assert.ok(findGenerationsByYear(bySlug(slug), year).length >= 2, `${slug} ${year}年は複数候補`)
  }

  // シエラとノマドは世代交代ではなく併売される別仕様。
  assert.deepEqual(findGenerationsByYear(bySlug('jimny'), 2025).map(item => item.code), ['JB74W', 'JC74W'])

  // 6代目終了後、新型発売前の2024年は掲載世代なし。近い世代へ丸めない。
  assert.deepEqual(findGenerationsByYear(bySlug('move'), 2024), [])

  // 改良年は同一世代内の変更であり、別世代を作らない。
  assert.equal(findGenerationsByYear(bySlug('tanto'), 2015).length, 1)
  assert.equal(findGenerationsByYear(bySlug('roomy'), 2020).length, 1)
  assert.equal(findGenerationsByYear(bySlug('spacia'), 2021).length, 1)

  // 掲載範囲外の年は推測で最古・最新世代へ寄せない。
  assert.deepEqual(findGenerationsByYear(bySlug('vezel'), 2012), [])
  assert.deepEqual(findGenerationsByYear(bySlug('corolla-cross'), 2020), [])
})
test('販売店質問は確定に必要な項目だけを作り車台番号入力を要求しない', () => {
  const nbox = cars.find(car => car.slug === 'n-box')
  const candidates = findGenerationsByYear(nbox, 2017)
  const questions = buildDealerQuestions(nbox, 2017, candidates)
  for (const term of ['型式', '車台番号の先頭部分', '製造時期', 'グレード', '2WD／4WD', '交換・社外部品']) assert.ok(questions.includes(term), term)
  assert.equal(questions.includes('車台番号を入力'), false)
})
test('N-BOX JF1とVOXY 80系は考証済み変更表と車種別部位拡大を初期HTMLに持つ', () => {
  for (const page of ['n-box-jf1-zenki-kouki', 'voxy-80-zenki-kouki']) {
    const html = readFileSync(new URL(`../dist/${page}.html`, import.meta.url), 'utf8')
    for (const label of ['何が変わった？', '変更あり', '仕様による', '未確認', '部位を拡大して比べる', 'ヘッドライト', 'フロントグリル', 'バンパー']) {
      assert.ok(html.includes(label), `${page}: ${label}`)
    }
    const expectedParts = page.startsWith('n-box') ? 1 : 3
    assert.equal((html.match(/data-facelift-part=/g) || []).length, expectedParts, page)
    assert.ok(html.includes('aria-label="拡大比較を閉じる"'), page)
  }
})

test('部位拡大はページ固有座標を使い、GA4へ部位ID以外の入力値を送らない', async () => {
  const { withFaceliftEnhancement, voxy80Enhancement } = await import('../src/facelift-enhancements.js')
  const nbox = withFaceliftEnhancement((await import('../src/data/comparisons/n-box-jf1-zenki-kouki.js')).default)
  for (const config of [nbox.detailCompare, voxy80Enhancement.detailCompare]) {
    assert.ok(config.parts.length >= 1 && config.parts.length <= 3)
    for (const part of config.parts) {
      assert.match(part.id, /^(headlamp|grille|bumper)$/)
      assert.equal(part.focus.length, 2)
      assert.notDeepEqual(part.focus[0], part.focus[1])
      assert.ok(part.point.length >= 25, `${part.id}: 判別ポイントが具体的でない`)
      for (const focus of part.focus) {
        assert.ok(focus.x > 0 && focus.x < 100, `${part.id}: 部位中心Xが不正`)
        assert.ok(focus.y > 0 && focus.y < 100, `${part.id}: 部位中心Yが不正`)
        assert.ok(focus.size >= 25 && focus.size <= 55, `${part.id}: 切り取り範囲が不正`)
      }
      const sizeRatio = Math.max(part.focus[0].size, part.focus[1].size) / Math.min(part.focus[0].size, part.focus[1].size)
      assert.ok(sizeRatio <= 1.04, `${part.id}: 表示範囲差が大きい`)
    }
  }
  assert.notDeepEqual(nbox.detailCompare.parts[0].focus, voxy80Enhancement.detailCompare.parts[0].focus)
  const source = readFileSync(new URL('../src/facelift-detail-tools.js', import.meta.url), 'utf8')
  assert.ok(source.includes("part: part.id"))
  assert.ok(source.includes('cropViewBox'))
  assert.ok(source.includes('viewBox='))
})
test('42比較ページの初期HTMLに本文・出典・画像・メモが揃う', async () => {
  const files=readdirSync(new URL('../src/data/comparisons/',import.meta.url))
  assert.equal(files.length,42)
  for(const file of files){
    const data=(await import(`../src/data/comparisons/${file}`)).default
    const html=generationComparisonHtml(data)
    assert.ok(!/\bundefined\b|\bnull\b/.test(html),file)
    assert.ok(html.includes(data.answer.title),file)
    assert.ok(html.includes('lc-visual-first'), `${file}: visual-first layout`)
    assert.ok(html.includes('data-download-inspection'),file)
    for(const car of data.cars) assert.ok(existsSync(new URL(`../public${car.image}`,import.meta.url)),car.image)
    for(const source of data.sources) assert.ok(html.includes(source.href),file)
    const built=readFileSync(new URL(`../dist/${file.replace('.js','.html')}`,import.meta.url),'utf8')
    assert.ok(built.includes('data-prerendered="true"'),file)
    assert.ok(built.includes(data.answer.title),file)
  }
})
test('N-BOXとVOXYの比較画像は横並びと単独表示を安全に切り替えられる', async () => {
  const nbox=(await import('../src/data/comparisons/n-box-jf1-zenki-kouki.js')).default
  const nboxHtml=generationComparisonHtml(nbox)
  assert.ok(nboxHtml.includes('data-comparison-view="pair"'))
  assert.ok(nboxHtml.includes('data-comparison-view="single"'))
  assert.equal((nboxHtml.match(/class="lc-image-marker"/g)||[]).length,0)
  assert.equal((nboxHtml.match(/class="lc-image-labels"/g)||[]).length,2)
  assert.ok(nboxHtml.includes('comparison-hero-compact'))
  assert.ok(nboxHtml.includes('型式・仕様・購入前確認'))
  assert.ok(nboxHtml.includes('比較条件と画像について'))
  const voxy=readFileSync(new URL('../src/voxy-80-zenki-kouki.js',import.meta.url),'utf8')
  assert.ok(voxy.includes('data-comparison-view-target'))
  assert.ok(voxy.includes('bindComparisonViewToggle'))
  assert.ok(voxy.includes('facelift-card-details'))
  assert.ok(!voxy.includes('lc-image-marker'))
  assert.ok(voxy.includes('lc-image-labels'))
  assert.ok(voxy.includes('comparison-hero-compact'))
  assert.ok(voxy.includes('型式・仕様・購入前確認'))
})
test('ホームはJavaScript実行前から31車種すべての歴代ページにリンクする',()=>{
  const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8')
  for(const car of cars) assert.ok(html.includes(`/cars/${car.slug}.html`),car.slug)
  const catalog=homeCatalog(cars)
  assert.equal(catalog.length,31)
  for(const slug of ['rav4','cx-5','roox','delica-mini','jimny']) {
    assert.ok(catalog.some(car=>car.slug===slug && car.href===`/cars/${slug}.html`),slug)
    assert.ok(html.includes(`href="/cars/${slug}.html"`),slug)
  }
  assert.ok(html.includes('31 Models'))
  assert.ok(!html.includes('mini-card-kind'))
  assert.ok(!html.includes('>新旧比較<'))
})
test('1世代のみの車種は同じ画像を比較せず単一モデルとして表示する',()=>{
  const singleGenerationCars=cars.filter(car=>car.generations.length===1)
  assert.deepEqual(singleGenerationCars.map(car=>car.slug).sort(),['corolla-cross','esquire','raize','roomy','wagon-r-smile'])
  for(const car of singleGenerationCars){
    const html=readFileSync(new URL(`../dist/cars/${car.slug}.html`,import.meta.url),'utf8')
    assert.ok(html.includes('static-crawl-fallback--single-generation'),car.slug)
    assert.ok(html.includes('掲載モデル・外観の手がかり'),car.slug)
    assert.ok(!html.includes('id="heritage"'),car.slug)
    assert.ok(!html.includes('id="timeline"'),car.slug)
    assert.ok(!html.includes('id="compare"'),car.slug)
    assert.ok(!html.includes('1つの掲載区分'),car.slug)
  }
})

test('歴代カードは車体全体を表示し、共通ズームで見切れさせない',()=>{
  const css=readFileSync(new URL('../src/car-page.css',import.meta.url),'utf8')
  assert.match(css,/\.timeline-thumb img\s*\{[^}]*object-fit:\s*contain/s)
  assert.match(css,/\.timeline-thumb img\s*\{[^}]*transform:\s*none/s)
})

test('歴代詳細画像は実画像比率に合わせ、4:3車両の屋根や車輪を切らない',()=>{
  const css=readFileSync(new URL('../src/car-page.css',import.meta.url),'utf8')
  const js=readFileSync(new URL('../src/car-page.js',import.meta.url),'utf8')
  assert.match(css,/aspect-ratio:\s*var\(--detail-visual-ratio/)
  assert.match(js,/naturalWidth\s*\/\s*refs\.image\.naturalHeight/)
  assert.match(js,/VISUAL_IMAGE_PCT\s*\/\s*100/)
})

test('歴代比較スライダーも実画像比率とcontainで車体を見切れさせない',()=>{
  const css=readFileSync(new URL('../src/car-page.css',import.meta.url),'utf8')
  const js=readFileSync(new URL('../src/car-page.js',import.meta.url),'utf8')
  assert.match(css,/aspect-ratio:\s*var\(--compare-image-ratio/)
  assert.match(css,/\.compare-base,[^{]+\{[^}]*object-fit:\s*contain/s)
  assert.match(js,/--compare-image-ratio/)
})
test('新規歴代車種もTOP専用のフロント右向き三四半角アセットを使う',()=>{
  const expected={
    rav4:'/images/cars/rav4/top-card-front-right-v1.png',
    'cx-5':'/images/cars/cx-5/top-card-front-right-v2.png',
    roox:'/images/cars/roox/top-card-front-right-v1.png',
    'delica-mini':'/images/cars/delica-mini/top-card-front-right-v2.png',
    jimny:'/images/cars/jimny/top-card-front-right-v2.png',
    hustler:'/images/cars/hustler/top-card-front-right-v2.png',
    roomy:'/images/cars/roomy/top-card-front-right-v3.png',
    'n-one':'/images/cars/n-one/jg3-2020-original-ff-v1.png',
    'wagon-r-smile':'/images/cars/wagon-r-smile/mx91s-2024-hybrid-x-ff-v1.png',
    move:'/images/cars/move/top-card-front-right-v2.png',
    aqua:'/images/cars/aqua/mxpk11-2021-z-ff-v1.png',
    yaris:'/images/cars/yaris/mxph10-2020-hybrid-g-ff-v1.png',
    raize:'/images/cars/raize/a202a-2021-hybrid-z-ff-v1.png',
  }
  for(const [slug,image] of Object.entries(expected)){
    const card=homeCatalog(cars).find(item=>item.slug===slug)
    assert.equal(card?.homeCardImage,image,slug)
    assert.ok(existsSync(new URL(`../public${image}`,import.meta.url)),image)
  }
})
test('TOP車種カードは全車フロント右向き・フロント優勢3/4の目視監査を必須にする',()=>{
  assert.deepEqual(Object.keys(topCardVisualAudit).sort(),cars.map(car=>car.slug).sort())
  for(const car of cars){
    assert.deepEqual(topCardVisualAudit[car.slug],{direction:'front-right',angle:'front-dominant-3q'},car.slug)
    const image=getDiscoveryImage(car)
    assert.ok(image && existsSync(new URL(`../public${image}`,import.meta.url)),`${car.slug}: missing audited TOP asset`)
  }
  const corollaCross=cars.find(car=>car.slug==='corolla-cross')
  assert.equal(getDiscoveryImage(corollaCross),'/images/cars/corolla-cross/top-card-front-right-v2.png')
  assert.notEqual(getDiscoveryImage(corollaCross),corollaCross.heroImage,'TOP image must stay independent from the comparison/hero asset')
})
test('個別の配列形式出典を優先し、確認日を捏造しない',()=>{
  const refs=resolveReferences(cars.find(car=>car.slug==='tanto'))
  assert.equal(refs.items.length,5)
  assert.equal(refs.checkedAt,undefined)
  assert.ok(refs.items.every(item=>item.url.startsWith('https://www.daihatsu.com/')))
  for(const car of cars) assert.ok(resolveReferences(car)?.items.length>0,car.slug)
})
test('公開97 URLの初期HTMLとサイトマップに欠落・重複見出しがない',()=>{
  const xml=readFileSync(new URL('../dist/sitemap.xml',import.meta.url),'utf8')
  const urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1])
  assert.equal(urls.length,97)
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

test('ROOMY兄弟ガイドはTrustページではなく固有の編集ガイドとして配信する',()=>{
  const html=readFileSync(new URL('../dist/roomy-tank-thor-justy.html',import.meta.url),'utf8')
  assert.ok(html.includes('"@type":"Article"'))
  assert.ok(html.includes('"@type":"ItemList"'))
  assert.ok(html.includes('"@type":"BreadcrumbList"'))
  assert.ok(html.includes('https://carvista.jp/images/cars/roomy/top-card-front-right-v2.png'))
  assert.ok(!html.includes('/images/cars/voxy/hero-gen4-3q.webp'))
  assert.equal((html.match(/rel="canonical"/g)||[]).length,1)
})

test('N-ONE歴代はガソリン車に範囲を限定しN-ONE e:を混同しない',()=>{
  const html=readFileSync(new URL('../dist/cars/n-one.html',import.meta.url),'utf8')
  assert.ok(html.includes('N-ONE e:は対象外'))
  assert.ok(html.includes('別車種・別型式（JG5）'))
  assert.ok(html.includes('公式G・Lパッケージ／Originalを参照した標準系の制作画像'))
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

test('公開車両画像は考証台帳に登録され、未確認を検証済みとして扱わない',()=>{
  const registry=readFileSync(new URL('../docs/product/vehicle-image-verification-registry.tsv',import.meta.url),'utf8')
    .trim().split(/\r?\n/).slice(1).map(line=>line.split('\t'))
  const byPath=new Map(registry.map(row=>[row[0],row]))
  const published=new Set()
  for(const file of readdirSync(new URL('../dist',import.meta.url),{recursive:true}).filter(name=>name.endsWith('.html'))){
    const html=readFileSync(new URL(`../dist/${file}`,import.meta.url),'utf8')
    for(const match of html.matchAll(/(?:src|content)="(\/images\/cars\/[^"]+)"/g)) published.add(match[1])
  }
  assert.equal(published.size,179)
  assert.equal(registry.length,179)
  for(const image of published){
    assert.ok(byPath.has(image),`${image}: verification registry missing`)
    assert.ok(['VERIFIED','CORRECTED','HOLD'].includes(byPath.get(image)[3]),`${image}: invalid status`)
  }
  assert.equal(registry.length,179)
  assert.ok(registry.filter(row=>row[3]==='VERIFIED').length>=1)
  assert.ok(registry.filter(row=>row[3]==='HOLD').length>=1)
})

test('比較ページは仕様・寸法の一次資料照合状態を台帳管理する',()=>{
  const registry=readFileSync(new URL('../docs/product/comparison-spec-verification-registry.tsv',import.meta.url),'utf8')
    .trim().split(/\r?\n/).slice(1).map(line=>line.split('\t'))
  const slugs=readdirSync(new URL('../src/data/comparisons/',import.meta.url)).filter(name=>name.endsWith('.js')).map(name=>name.replace('.js','')).sort()
  assert.deepEqual(registry.map(row=>row[0]).sort(),slugs)
  const verified=registry.reduce((sum,row)=>sum+Number(row[2]),0)
  const hold=registry.reduce((sum,row)=>sum+Number(row[3]),0)
  assert.equal(verified+hold,registry.length*8)
  assert.ok(verified>0)
  assert.ok(hold>0)
  for(const row of registry) assert.ok(['VERIFIED','CORRECTED','HOLD'].includes(row[1]),row[0])
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
  assert.ok(html.includes('role="combobox"'))
  assert.ok(html.includes('aria-autocomplete="list"'))
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

test('購入確認メモは端末保存・消去・ダウンロードを選べる',()=>{
  const html=readFileSync(new URL('../dist/prius-30-vs-50.html',import.meta.url),'utf8')
  assert.match(html,/data-save-inspection/)
  assert.match(html,/data-clear-inspection/)
  assert.match(html,/data-download-inspection/)
  assert.match(html,/内容は外部へ送信しません/)
  assert.match(html,/data-scroll-hint="横にスワイプ"/)
})

test('全generation比較ページは画像ごとに固有の判別点を結び付ける',()=>{
  const pages=readdirSync(new URL('../dist',import.meta.url)).filter(name=>name.endsWith('.html'))
  const targets=pages.filter(name=>readFileSync(new URL(`../dist/${name}`,import.meta.url),'utf8').includes('comparison-notebook'))
  for(const name of targets){
    const html=readFileSync(new URL(`../dist/${name}`,import.meta.url),'utf8')
    const imageCards=(html.match(/class="lc-car"/g)||[]).length
    const imageCues=(html.match(/class="lc-image-cue"/g)||[]).length
    const visualPoints=(html.match(/class="lc-visual-points(?: [^"]*)?"/g)||[]).length
    assert.ok(imageCues===imageCards || visualPoints===1,name)
    assert.ok(!html.includes('画像で見る場所</b><strong></strong>'),name)
  }
})
