import './comparison-page.css'
import './alphard-30-zenki-kouki.css'
import './click-glow.js'
import alphard from './cars/alphard.js'
import { trackEvent } from './analytics.js'

const points = [
  ['直線的なボディと、独立して見えるメッキグリル。', '10系は2002年〜2008年、ANH10W / MNH10W系。'],
  ['曲面を増やしたボディに、横バー基調のフロント。', '20系は2008年〜2015年、ANH20W / GGH20W系。'],
  ['縦方向へ大きく伸びるグリルが大きな目印。', '30系は2015年〜2023年、AGH30W / GGH30W / AYH30W系。'],
  ['逆スラントの縦基調フロントと、立体的なボディサイド。', '40系は2023年〜現在、AGH40W / AAHH40W系。'],
]
const cards = alphard.generations.map((generation, index) => `<article class="facelift-card"><div class="facelift-card-image"><img src="${generation.image}" alt="アルファード ${generation.title}のフロント左前方" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" /></div><div class="facelift-card-copy"><p class="facelift-card-label">${generation.era} · ${generation.period}</p><h2>${generation.title}</h2><p>${points[index][0]}</p><ul><li>型式：${generation.code}</li><li>${points[index][1]}</li></ul></div></article>`).join('')

document.querySelector('#alphard-history-page').innerHTML = `
  <header class="comparison-hero facelift-hero"><a class="comparison-home" href="/">CARVISTA</a><p class="comparison-eyebrow">IDENTIFICATION GUIDE</p><h1>アルファード<br />歴代の見分け方</h1><p class="comparison-intro">10系・20系・30系・40系を、統一画像とTimelineで比較。中古車写真で世代を見分ける入口をつくります。</p><div class="comparison-actions"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div></header>
  <section class="facelift-answer" aria-label="最初に見るポイント"><p>最短の見分け方</p><strong>直線的なら10系、横バー基調なら20系、縦長グリルなら30系、逆スラントなら40系。</strong><span>これは世代を絞るための外観上の目安です。前期・後期やグレードの差はあるため、最後に型式と初度登録年を照合してください。</span></section>
  <section class="facelift-compare" aria-label="アルファード歴代比較"><p class="comparison-eyebrow">SAME ANGLE · COMPARE</p><h2>同じ角度で、4世代の顔つきを読む</h2><p class="facelift-section-intro">掲載画像は世代比較を目的に統一したCarVistaのビジュアル表現です。グレード固有の装飾や前期・後期の細部は、個別車両の写真で確認してください。</p><div class="facelift-grid alphard-history-grid">${cards}</div></section>
  <section class="facelift-timeline" aria-label="アルファード年式タイムライン"><p class="comparison-eyebrow">TIMELINE</p><h2>販売年で絞り、型式で確定する</h2><div class="timeline-track">${alphard.generations.map((generation) => `<article><span>${generation.startYear}</span><h3>${generation.title}登場</h3><p>${generation.period} · ${generation.code}</p></article>`).join('')}</div></section>
  <section class="facelift-checklist" aria-label="中古車での確認"><p class="comparison-eyebrow">USED CAR CHECK</p><h2>中古車では3つを照合する</h2><ol><li><b>フロント</b><span>グリル・ライト・バンパーの構成で候補を絞る。</span></li><li><b>型式</b><span>掲載票の型式が10・20・30・40系のどれに当たるか確認する。</span></li><li><b>前期後期</b><span>30系は専用ガイドで前期・後期まで確認する。</span></li></ol></section>
  <section class="comparison-next" aria-label="関連ページ"><p class="comparison-eyebrow">KEEP EXPLORING</p><h2>次に確認する</h2><div class="comparison-next-grid"><a href="/alphard-30-zenki-kouki.html" data-related-link><strong>アルファード30系 前期・後期の違い</strong><span>30系をさらに詳しく見分ける。</span><b>見る →</b></a><a href="/compare-alphard-vellfire.html" data-related-link><strong>ALPHARD・VELLFIREの違い</strong><span>現行世代の兄弟車を同じ視点で比べる。</span><b>比較する →</b></a></div></section>
  <section class="facelift-source" aria-label="情報源"><p>FACT CHECK</p><span>販売時期・型式はトヨタの<a href="https://toyota.jp/ucar/catalog/brand-TOYOTA/car-ALPHARD_V/" target="_blank" rel="noopener noreferrer">認定中古車カタログ</a>および<a href="https://global.toyota/jp/newsroom/toyota/21800077.html" target="_blank" rel="noopener noreferrer">30系発売発表</a>、<a href="https://global.toyota/jp/newsroom/toyota/37013954.html" target="_blank" rel="noopener noreferrer">40系発売発表</a>を確認。個別仕様は販売店と公式資料でご確認ください。</span></section>
  <a class="comparison-more" href="/cars/alphard.html">ALPHARDの歴代モデル一覧を見る</a>`

async function copyUrl(button, message) { await navigator.clipboard.writeText(location.href); button.textContent = message }
document.querySelector('.share-button').addEventListener('click', async (event) => { trackEvent('share_identification_guide', { vehicle: 'ALPHARD', intent: 'history', method: navigator.share ? 'native' : 'copy' }); if (navigator.share) return navigator.share({ title: document.title, text: 'アルファード 歴代の見分け方', url: location.href }); await copyUrl(event.currentTarget, 'URLをコピーしました') })
document.querySelector('.copy-button').addEventListener('click', (event) => { trackEvent('copy_identification_guide_url', { vehicle: 'ALPHARD', intent: 'history' }); return copyUrl(event.currentTarget, 'コピーしました') })
document.querySelectorAll('[data-related-link]').forEach((link) => link.addEventListener('click', () => trackEvent('open_related_content', { vehicle: 'ALPHARD', intent: 'history' })))
