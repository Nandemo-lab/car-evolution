import './comparison-page.css'
import './alphard-30-zenki-kouki.css'
import './click-glow.js'
import { trackEvent } from './analytics.js'

const phases = [
  {
    label: '前期', period: '2015年1月発売〜2018年1月改良前', image: '/images/cars/vellfire/30-z-a-edition-pre-facelift-v1.png',
    title: '上下2段のランプと横桟グリル',
    lead: '前期は、上下に分かれた灯火と太い横桟のグリルが中心。バンパー両端の縦長開口は輪郭が比較的シンプルです。',
    points: ['上段ヘッドランプと下段灯火の間隔が広い', '太い横桟グリルが中央でまとまる', 'フォグ周辺の縦長メッキ枠が独立して見える'],
  },
  {
    label: '後期', period: '2018年1月8日発売〜40系登場まで', image: '/images/cars/vellfire/30-z-a-edition-post-facelift-v1.png',
    title: '鋭い灯火と複雑なメッキ構成',
    lead: '後期はヘッドランプ、グリル、バンパーを一新。横方向と縦方向のメッキが連続し、フロント全体がより鋭く立体的です。',
    points: ['上下の灯火が薄く鋭い造形へ変化', '横桟グリルとメッキがバンパーまで複雑に連続', 'フォグ周辺と下部開口の輪郭がより大きく立体化'],
  },
]

const card = (phase, index) => `<article class="facelift-card"><div class="facelift-card-image"><img src="${phase.image}" alt="ヴェルファイア30系 Z Aエディション ${phase.label} ブラックの左前3/4比較画像" ${index ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async" /></div><div class="facelift-card-copy"><p class="facelift-card-label">${phase.label} · ${phase.period}</p><h2>${phase.title}</h2><p>${phase.lead}</p><ul>${phase.points.map((point) => `<li>${point}</li>`).join('')}</ul></div></article>`

document.querySelector('#vellfire-facelift-page').innerHTML = `
  <header class="comparison-hero facelift-hero"><a class="comparison-home" href="/">CARVISTA</a><p class="comparison-eyebrow">IDENTIFICATION GUIDE · 30 SERIES</p><h1>ヴェルファイア30系<br />前期・後期の違い</h1><p class="comparison-intro">同じZ“Aエディション”・2.5Lガソリン・2WD・ブラックで、2018年1月のマイナーチェンジ前後を見比べます。</p><div class="comparison-actions"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div></header>
  <section class="facelift-compare" aria-label="前期と後期の画像比較"><p class="comparison-eyebrow">SAME ANGLE · COMPARE</p><h2>まず、2台の顔を見る</h2><p class="facelift-section-intro">画像は前後期ともAGH30W・Z“Aエディション”・2.5Lガソリン・2WDを同じ撮影条件で再現。ALPHARDや特別仕様車の造形は混ぜていません。</p><div class="facelift-grid">${phases.map(card).join('')}</div></section>
  <section class="facelift-answer" aria-label="一番簡単な見分け方"><p>一番簡単な見分け方</p><strong>ランプとメッキが細く複雑で、バンパーまで連続するなら後期。</strong><span>前期は太い横桟と独立した縦長フォグ枠が読み取りやすく、後期は灯火・グリル・下部開口を一体に見せる構成です。</span></section>
  <section class="facelift-timeline" aria-label="30系の年式と型式"><p class="comparison-eyebrow">TIMELINE</p><h2>2018年1月8日が改良車の発売日</h2><div class="timeline-track"><article><span>2015.01.26</span><h3>30系前期を発売</h3><p>代表比較車はAGH30W・Z“Aエディション”・2AR-FE 2.5L・Super CVT-i・2WD。</p></article><article class="timeline-change"><span>2018.01.08</span><h3>後期を発売</h3><p>ヘッドランプ、グリル、バンパー等を変更し、第2世代Toyota Safety Senseを全車標準装備。</p></article><article><span>2018〜2023</span><h3>30系後期</h3><p>終了日は推測せず、40系が登場するまでの後期型として案内します。</p></article><article><span>2023.06</span><h3>40系登場</h3><p>世代が変わり、型式とボディ、フロント構成を全面刷新しました。</p></article></div></section>
  <section class="facelift-checklist" aria-label="主要変更点"><p class="comparison-eyebrow">WHAT CHANGED</p><h2>外観だけではない主要変更</h2><ol><li><b>フロントとリヤの意匠</b><span>ヘッドランプ、グリル、バンパー、バックドアガーニッシュ、リヤコンビネーションランプを変更。</span></li><li><b>Toyota Safety Sense</b><span>第2世代版を全車標準装備。夜間歩行者・昼間自転車の検知、LTA、RSAなどへ対応。</span></li><li><b>ボディと走り</b><span>構造用接着剤の適用範囲などを見直し、剛性、操縦安定性、乗り心地を改善。</span></li></ol></section>
  <section class="comparison-reading facelift-reading" aria-label="中古車の見分け方"><p class="comparison-eyebrow">USED CAR CHECK</p><h2>中古車は外観→年式→車両情報</h2><article><h3>1. 正面写真で灯火とグリルを見る</h3><p>まず上下の灯火形状、横桟グリル、フォグ周辺のメッキを比較します。Golden Eyesなど特別仕様車の専用加飾は前後期差と混同しないでください。</p></article><article><h3>2. 2018年1月を境に絞る</h3><p>後期の発売日は2018年1月8日。登録時期だけで断定せず、掲載写真と照合します。</p></article><article><h3>3. 型式・グレードを確認する</h3><p>今回の代表車はAGH30Wですが、30系には3.5LのGGH30W系やハイブリッドのAYH30Wもあります。車検証と販売店資料で最終確認してください。</p></article></section>
  <section class="comparison-reading facelift-reading" aria-label="前期と後期の選び方"><p class="comparison-eyebrow">BUYING DECISION</p><h2>見た目と安全装備の優先度で選ぶ</h2><article><h3>前期が向く人</h3><p>太い横桟と上下2段ランプによる、初期30系らしい顔つきを重視する人。価格だけでなく車両状態と装備を個体ごとに確認します。</p></article><article><h3>後期が向く人</h3><p>より鋭いフロント造形と、第2世代Toyota Safety Senseの標準装備を重視する人。グレード別装備は販売店で確認してください。</p></article></section>
  <section class="comparison-next" aria-label="関連ページ"><p class="comparison-eyebrow">KEEP EXPLORING</p><h2>次に確認する</h2><div class="comparison-next-grid"><a href="/cars/vellfire.html" data-related-link><strong>VELLFIREの歴代モデル</strong><span>20系・30系・40系の流れと型式を見る。</span><b>見る →</b></a><a href="/compare-alphard-vellfire.html" data-related-link><strong>ALPHARD・VELLFIREの違い</strong><span>兄弟車に与えられた表情の違いを比べる。</span><b>見る →</b></a></div></section>
  <section class="facelift-source" aria-label="公式根拠"><p>FACT CHECK</p><span>発売日、比較仕様、外観変更、安全装備は<a href="https://global.toyota/jp/newsroom/toyota/21800077.html" target="_blank" rel="noopener noreferrer">Toyota公式 2015年発売資料</a>、<a href="https://global.toyota/jp/newsroom/toyota/20433735.html" target="_blank" rel="noopener noreferrer">Toyota公式 2017年マイナーチェンジ資料</a>、<a href="https://toyota.jp/pages/contents/vellfire/002_p_004/pdf/spec/15compare.pdf" target="_blank" rel="noopener noreferrer">Toyota公式モデル比較表</a>で照合しています。</span></section>
  <a class="comparison-more" href="/cars/vellfire.html">VELLFIREの歴代モデル一覧を見る</a>`

async function copyUrl(button, message) { await navigator.clipboard.writeText(location.href); button.textContent = message }
document.querySelector('.share-button').addEventListener('click', async (event) => { trackEvent('share_identification_guide', { vehicle: 'VELLFIRE', intent: '30-zenki-kouki', method: navigator.share ? 'native' : 'copy' }); if (navigator.share) return navigator.share({ title: document.title, text: 'ヴェルファイア30系 前期・後期の違い', url: location.href }); await copyUrl(event.currentTarget, 'URLをコピーしました') })
document.querySelector('.copy-button').addEventListener('click', (event) => { trackEvent('copy_identification_guide_url', { vehicle: 'VELLFIRE', intent: '30-zenki-kouki' }); return copyUrl(event.currentTarget, 'コピーしました') })
document.querySelectorAll('[data-related-link]').forEach((link) => link.addEventListener('click', () => trackEvent('open_related_content', { vehicle: 'VELLFIRE', intent: '30-zenki-kouki' })))
