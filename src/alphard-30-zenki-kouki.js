import './comparison-page.css'
import './alphard-30-zenki-kouki.css'
import './click-glow.js'
import { trackEvent } from './analytics.js'

const phases = [
  {
    label: '前期', period: '2015年〜2017年', image: '/images/cars/alphard/30-pre-facelift-v1.png',
    title: 'まずは、グリルの下端を見る',
    lead: '前期は、クロームを主体にした大きなグリルが、ナンバープレートの上でまとまります。顔つき全体は端正で、下側のバンパーは比較的すっきりしています。',
    points: ['グリルの縦方向の伸びは、ナンバー周辺で止まる', 'ヘッドライトからグリルまでのつながりが比較的シンプル', '下側の開口部は横長で、中央の面が読み取りやすい'],
  },
  {
    label: '後期', period: '2018年〜2023年', image: '/images/cars/alphard/30-post-facelift-v1.png',
    title: '後期は、縦に伸びた顔つきが決め手',
    lead: '後期は、グリルとその周囲のメッキ表現がナンバーの下側まで大きく伸び、フロント全体がより縦長で複雑な印象になります。ライトとグリルを一体に見せる構成も判別の手がかりです。',
    points: ['グリル周りがナンバーの下側まで縦に大きく続く', 'ライトの内側からグリルへつながる造形がより複雑', 'バンパー両端の立体感が強く、正面の押し出しが増す'],
  },
]

const card = (phase) => `
  <article class="facelift-card">
    <div class="facelift-card-image"><img src="${phase.image}" alt="アルファード30系 ${phase.label}のフロント左前方" ${phase.label === '前期' ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" /></div>
    <div class="facelift-card-copy"><p class="facelift-card-label">${phase.label} · ${phase.period}</p><h2>${phase.title}</h2><p>${phase.lead}</p><ul>${phase.points.map((point) => `<li>${point}</li>`).join('')}</ul></div>
  </article>`

document.querySelector('#alphard-facelift-page').innerHTML = `
  <header class="comparison-hero facelift-hero">
    <a class="comparison-home" href="/">CARVISTA</a>
    <p class="comparison-eyebrow">IDENTIFICATION GUIDE · 30 SERIES</p>
    <h1>アルファード30系<br />前期・後期の違い</h1>
    <p class="comparison-intro">中古車写真で迷わないために。30系の前期・後期を、同じ画角のCompareと年式Timelineで見分けます。</p>
    <div class="comparison-actions"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div>
  </header>
  <section class="facelift-answer" aria-label="最初に見る判別ポイント"><p>最短の見分け方</p><strong>ナンバープレートの下まで、グリルの縦基調が続くなら後期。</strong><span>年式は目安です。中古車では、まずフロントマスクを確認し、次に初度登録年と型式を販売店へ確認してください。</span></section>
  <section class="facelift-compare" aria-label="前期と後期の比較"><p class="comparison-eyebrow">SAME ANGLE · COMPARE</p><h2>同じ角度で、顔つきの差を読む</h2><p class="facelift-section-intro">画像はCarVistaが比較のために制作した代表イメージです。エンブレム、ナンバープレート、グレード固有の装飾は省略しています。</p><div class="facelift-grid">${phases.map(card).join('')}</div></section>
  <section class="facelift-timeline" aria-label="30系の年式タイムライン"><p class="comparison-eyebrow">TIMELINE</p><h2>年式で絞り、画像で確定する</h2><div class="timeline-track"><article><span>2015.01</span><h3>30系登場</h3><p>前期の目安。型式はAGH30W・GGH30W・AYH30W系が中心です。</p></article><article class="timeline-change"><span>2017.12</span><h3>マイナーチェンジ発表</h3><p>外観を刷新。Toyota Safety Senseを全車標準装備しました。</p></article><article><span>2018</span><h3>後期の目安</h3><p>中古車掲載では、2018年以降かつ縦基調のフロントマスクが後期を判断する軸です。</p></article><article><span>2023.06</span><h3>40系へ</h3><p>30系の販売期間は終了。40系とはボディとフロント構成が大きく異なります。</p></article></div></section>
  <section class="facelift-checklist" aria-label="購入前の確認"><p class="comparison-eyebrow">USED CAR CHECK</p><h2>写真だけで決めない、3つの確認</h2><ol><li><b>顔つき</b><span>グリルがナンバーの下まで続くかを確認する。</span></li><li><b>初度登録年</b><span>2018年以降でも、年式表記だけで決めず写真と照合する。</span></li><li><b>型式・装備</b><span>型式とグレード、Toyota Safety Senseなどの装備は掲載票・販売店で確認する。</span></li></ol></section>
  <section class="comparison-reading facelift-reading" aria-label="どちらを選ぶか"><p class="comparison-eyebrow">BUYING DECISION</p><h2>前期・後期は、見た目と装備の両方で選ぶ</h2><article><h3>前期は、端正なフロントマスクを好む人へ</h3><p>前期は、グリルとバンパーの構成が比較的穏やかです。後期よりも価格帯や個体数を含めて比較したい場合は、外装の好みと車両状態を優先して確認してください。</p></article><article><h3>後期は、顔つきと予防安全装備を重視する人へ</h3><p>後期は、縦方向に存在感を増したフロントマスクが特徴です。2017年のマイナーチェンジではToyota Safety Senseが全車標準装備となったため、装備面も販売店に確認すると判断しやすくなります。</p></article></section>
  <section class="comparison-next" aria-label="関連ページ"><p class="comparison-eyebrow">KEEP EXPLORING</p><h2>次に確認する</h2><div class="comparison-next-grid"><a href="/cars/alphard.html" data-related-link><strong>ALPHARDの歴代モデル</strong><span>10系から40系まで、デザインの流れを見る。</span><b>見る →</b></a><a href="/compare-alphard-vellfire.html" data-related-link><strong>ALPHARD・VELLFIREの違い</strong><span>同じ土台に与えられた、2台の表情を比べる。</span><b>見る →</b></a></div></section>
  <section class="facelift-source" aria-label="情報源"><p>FACT CHECK</p><span>販売時期・マイナーチェンジ・安全装備は<a href="https://global.toyota/jp/newsroom/toyota/21800077.html" target="_blank" rel="noopener noreferrer">トヨタ公式の2015年発売発表</a>と<a href="https://global.toyota/jp/newsroom/toyota/20433735.html" target="_blank" rel="noopener noreferrer">2017年マイナーチェンジ発表</a>を確認。型式・個別装備・仕様は車両ごとに販売店と公式資料でご確認ください。</span></section>
  <a class="comparison-more" href="/cars/alphard.html">ALPHARDの歴代モデル一覧を見る</a>`

async function copyUrl(button, message) { await navigator.clipboard.writeText(location.href); button.textContent = message }
document.querySelector('.share-button').addEventListener('click', async (event) => {
  trackEvent('share_identification_guide', { vehicle: 'ALPHARD', intent: '30-zenki-kouki', method: navigator.share ? 'native' : 'copy' })
  if (navigator.share) return navigator.share({ title: document.title, text: 'アルファード30系 前期・後期の違い', url: location.href })
  await copyUrl(event.currentTarget, 'URLをコピーしました')
})
document.querySelector('.copy-button').addEventListener('click', (event) => { trackEvent('copy_identification_guide_url', { vehicle: 'ALPHARD', intent: '30-zenki-kouki' }); return copyUrl(event.currentTarget, 'コピーしました') })
document.querySelectorAll('[data-related-link]').forEach((link) => link.addEventListener('click', () => trackEvent('open_related_content', { vehicle: 'ALPHARD', intent: '30-zenki-kouki' })))
