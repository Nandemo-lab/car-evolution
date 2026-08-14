import './comparison-page.css'
import './alphard-30-zenki-kouki.css'
import './click-glow.js'
import { trackEvent } from './analytics.js'

const generations = [
  { label: '初代', period: '2011年〜2017年', code: 'JF1 / JF2', image: '/images/cars/n-box/gen1-2011.webp', title: '細いグリルと、背の高い箱型シルエット', lead: '初代は、ヘッドライトと小さなグリルをすっきり分けた、親しみやすい表情が目印です。', points: ['2011年12月発売', '型式はJF1 / JF2', 'フロント中央のグリルが控えめ'] },
  { label: '2代目', period: '2017年〜2023年', code: 'JF3 / JF4', image: '/images/cars/n-box/gen2-2017.webp', title: 'ライトが横へ伸び、表情が引き締まる', lead: '2代目は、ライトとグリルの横方向のつながりが初代より明確です。中古車では型式と写真を一緒に見ます。', points: ['2017年9月発売', '型式はJF3 / JF4', 'Honda SENSINGを全タイプに標準装備'] },
  { label: '3代目', period: '2023年〜現在', code: 'JF5 / JF6', image: '/images/cars/n-box/gen3-2023.webp', title: '水平基調の灯火類で、よりすっきり', lead: '3代目は、水平に連続する窓まわりと、整ったフロントの線が特徴です。外観と型式を照合すると判断しやすくなります。', points: ['2023年10月発売', '型式はJF5 / JF6', 'Honda SENSINGを標準装備'] },
]

const card = (generation) => `<article class="facelift-card"><div class="facelift-card-image"><img src="${generation.image}" alt="N-BOX ${generation.label}のフロント左前方" ${generation.label === '初代' ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" /></div><div class="facelift-card-copy"><p class="facelift-card-label">${generation.label} · ${generation.period}</p><h2>${generation.title}</h2><p>${generation.lead}</p><ul><li>型式：${generation.code}</li>${generation.points.map((point) => `<li>${point}</li>`).join('')}</ul></div></article>`

document.querySelector('#nbox-generation-page').innerHTML = `
  <header class="comparison-hero facelift-hero"><a class="comparison-home" href="/">CARVISTA</a><p class="comparison-eyebrow">GENERATION GUIDE</p><h1>N-BOX<br />初代・2代目・3代目の違い</h1><p class="comparison-intro">N-BOXの3世代を、統一画像・型式・販売年で比較。中古車写真を見ながら、どの世代かを絞り込めます。</p><div class="comparison-actions"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div></header>
  <section class="facelift-answer" aria-label="最初に見るポイント"><p>最短の見分け方</p><strong>型式がJF1/2なら初代、JF3/4なら2代目、JF5/6なら3代目。</strong><span>外観で候補を絞り、型式と初度登録年で照合するのが確実です。Customなどグレードによる顔つきの違いは、個別車両の写真も確認してください。</span></section>
  <section class="facelift-compare" aria-label="N-BOXの世代比較"><p class="comparison-eyebrow">SAME ANGLE · COMPARE</p><h2>同じ角度で、3世代の違いを読む</h2><p class="facelift-section-intro">掲載画像は世代比較のために同一条件へそろえたCarVistaのビジュアル表現です。代表仕様であり、グレード固有の装飾は一致しない場合があります。</p><div class="facelift-grid nbox-generation-grid">${generations.map(card).join('')}</div></section>
  <section class="facelift-timeline" aria-label="N-BOXの年式タイムライン"><p class="comparison-eyebrow">TIMELINE</p><h2>発売年で絞り、型式で確定する</h2><div class="timeline-track"><article><span>2011.12</span><h3>初代発売</h3><p>JF1 / JF2。Nシリーズ第一弾として登場しました。</p></article><article><span>2017.09</span><h3>2代目発売</h3><p>JF3 / JF4。Honda SENSINGを全タイプに標準装備。</p></article><article><span>2023.10</span><h3>3代目発売</h3><p>JF5 / JF6。開放感のある視界と新世代コネクテッド技術を採用。</p></article></div></section>
  <section class="facelift-checklist" aria-label="中古車での確認"><p class="comparison-eyebrow">USED CAR CHECK</p><h2>中古車では3つを照合する</h2><ol><li><b>写真</b><span>ライトとグリルの横方向の見え方で世代候補を絞る。</span></li><li><b>型式</b><span>JF1/2、JF3/4、JF5/6のどれに当たるか掲載票で確認する。</span></li><li><b>グレード・装備</b><span>Custom・特別仕様車や装備は、個別の車両情報と販売店で確認する。</span></li></ol></section>
  <section class="comparison-next" aria-label="関連ページ"><p class="comparison-eyebrow">KEEP EXPLORING</p><h2>次に確認する</h2><div class="comparison-next-grid"><a href="/cars/n-box.html" data-related-link><strong>N-BOXの歴代モデル</strong><span>Timelineと画像スライダーで世代の変化を見る。</span><b>見る →</b></a><a href="/compare-n-box-spacia.html" data-related-link><strong>N-BOX・SPACIAの違い</strong><span>現行軽スーパーハイトワゴンを比べる。</span><b>比較する →</b></a></div></section>
  <section class="facelift-source" aria-label="情報源"><p>FACT CHECK</p><span>販売時期・型式・主要な安全装備は、<a href="https://global.honda/jp/news/2011/c111130b.html" target="_blank" rel="noopener noreferrer">Hondaの初代発売情報</a>、<a href="https://global.honda/jp/news/2017/4170831-n-box.html" target="_blank" rel="noopener noreferrer">2017年の2代目発売発表</a>、<a href="https://global.honda/jp/news/2023/4231005-n-box.html" target="_blank" rel="noopener noreferrer">2023年の3代目発売発表</a>を確認。個別仕様は販売店と公式資料でご確認ください。</span></section>
  <a class="comparison-more" href="/cars/n-box.html">N-BOXの歴代モデル一覧を見る</a>`

async function copyUrl(button, message) { await navigator.clipboard.writeText(location.href); button.textContent = message }
document.querySelector('.share-button').addEventListener('click', async (event) => { trackEvent('share_generation_guide', { vehicle: 'N-BOX', method: navigator.share ? 'native' : 'copy' }); if (navigator.share) return navigator.share({ title: document.title, text: 'N-BOX 初代・2代目・3代目の違い', url: location.href }); await copyUrl(event.currentTarget, 'URLをコピーしました') })
document.querySelector('.copy-button').addEventListener('click', (event) => { trackEvent('copy_generation_guide_url', { vehicle: 'N-BOX' }); return copyUrl(event.currentTarget, 'コピーしました') })
document.querySelectorAll('[data-related-link]').forEach((link) => link.addEventListener('click', () => trackEvent('open_related_content', { vehicle: 'N-BOX', intent: 'generations' })))
