import './comparison-page.css'
import './alphard-30-zenki-kouki.css'
import './click-glow.js'
import { trackEvent } from './analytics.js'

const phases = [
  {
    label: '前期', period: '2016年9月16日〜2019年10月17日', image: '/images/cars/freed/gen2-gb5-pre-facelift-v1.png',
    title: '太いクロームグリルが目印の前期',
    lead: '比較基準はGB5 FREED G・Honda SENSING、1.5Lガソリン、CVT、FF、6人乗り。前期はHondaエンブレムを中心に太いクロームバーを重ねたグリルと、細いボディ同色ラインを挟むロア開口が目印です。',
    points: ['太い横桟を重ねたクロームグリル', 'グリルへ連続する前期ヘッドランプ意匠', '細いボディ同色ラインを挟んだロア開口'],
  },
  {
    label: '後期', period: '2019年10月18日〜2024年6月27日', image: '/images/cars/freed/gen2-gb5-post-facelift-v1.png',
    title: '面を整理したシンプルな後期フェイス',
    lead: '同じGB5 FREED G・Honda SENSING、1.5Lガソリン、CVT、FF、6人乗りで比較。後期はフード、グリル、バンパー、ロアグリルを刷新し、上部のメッキ量を抑えた落ち着きある標準車フェイスへ変わりました。',
    points: ['形状を改めたフードと薄い上部グリル', '太いクローム横桟をなくしたシンプルな顔', '幅と面構成を改めたバンパー／ロアグリル'],
  },
]

const card = (phase) => `<article class="facelift-card"><div class="facelift-card-image"><img src="${phase.image}" alt="FREED 2代目 GB5 ${phase.label}の左前3/4比較画像" ${phase.label === '前期' ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" /></div><div class="facelift-card-copy"><p class="facelift-card-label">${phase.label} · ${phase.period}</p><h2>${phase.title}</h2><p>${phase.lead}</p><ul>${phase.points.map((point) => `<li>${point}</li>`).join('')}</ul></div></article>`

document.querySelector('#freed-facelift-page').innerHTML = `
  <header class="comparison-hero facelift-hero"><a class="comparison-home" href="/">CARVISTA</a><p class="comparison-eyebrow">IDENTIFICATION GUIDE · SECOND GENERATION FREED</p><h1>FREED 2代目<br />前期・後期の違い</h1><p class="comparison-intro">2代目FREEDは2019年10月18日のマイナーモデルチェンジで内外装を刷新。FREED+、CROSSTAR、ハイブリッド、用品装着車の差を混ぜず、標準FREEDのGB5 G・Honda SENSING、ガソリンFFで年式固有の違いを比べます。</p><div class="comparison-actions"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div></header>
  <section class="facelift-answer" aria-label="最短の見分け方"><p>FAST ANSWER</p><strong>太いクローム横桟グリルなら前期、上部を薄く整理したシンプルな顔なら後期。</strong><span>ヘッドライトの基本形だけでなく、Hondaマーク周辺とロアグリルを一組で見ると判別しやすくなります。</span></section>
  <section class="facelift-compare" aria-label="前期と後期の詳細比較"><p class="comparison-eyebrow">SAME ANGLE · DETAILED COMPARE</p><h2>同じGB5 G・Honda SENSINGで比べる</h2><p class="facelift-section-intro">前後期とも1.5L直噴DOHC i-VTEC、CVT、FF、6人乗りの標準FREED。ボディカラーは両期間に公式設定のあるクリスタルブラック・パールです。CROSSTAR専用グリル、バンパー、LEDフォグ、ルーフレール、専用ホイールは前後期差に含めません。</p><div class="facelift-grid">${phases.map(card).join('')}</div></section>
  <section class="facelift-timeline" aria-label="FREED 2代目の年式タイムライン"><p class="comparison-eyebrow">TIMELINE BRANCH</p><h2>2代目は2019年10月18日で分ける</h2><div class="timeline-track"><article><span>2016.09.16</span><h3>2代目を発売</h3><p>3列シートのFREEDと2列シートのFREED+を設定。ガソリンはFFのGB5、4WDのGB6です。</p></article><article><span>2016.09.16〜2019.10.17</span><h3>前期</h3><p>太いクローム横桟を備えたフロントグリルが標準FREEDの目印です。</p></article><article class="timeline-change"><span>2019.10.18</span><h3>マイナーモデルチェンジ</h3><p>フード、グリル、バンパー、ロアグリルを変更。Honda SENSINGを全タイプに標準装備し、別系統のCROSSTARも追加されました。</p></article><article><span>2019.10.18〜2024.06.27</span><h3>後期</h3><p>GB5/GB6を継続。2024年5月に生産を終え、6月28日発売の3代目GT系へ交代しました。</p></article></div></section>
  <section class="facelift-checklist" aria-label="中古車の見分け方"><p class="comparison-eyebrow">USED CAR CHECK</p><h2>中古車写真で確認する3点</h2><ol><li><b>Hondaマーク周辺</b><span>太いクローム横桟が何段も見えれば前期。後期は上部を薄く、面でつないだ簡潔な造形です。</span></li><li><b>フードとロアグリル</b><span>後期はフード先端、バンパー、下部開口まで同時に刷新されています。ライト単体ではなく前面全体を照合します。</span></li><li><b>初度登録・型式・仕様</b><span>GB5/GB6だけでは前後期を確定できません。2019年10月18日の境界と、FREED+／CROSSTARではないことも確認してください。</span></li></ol></section>
  <section class="comparison-reading facelift-reading" aria-label="2019年マイナーチェンジの要点"><p class="comparison-eyebrow">2019 FACELIFT</p><h2>標準車の顔を構成する4部品を刷新</h2><article><h3>フード、グリル、バンパー、ロアグリル</h3><p>Honda公式はノーマルグレードの変更点として、この4部品の形状変更を明記しています。後期は太いメッキ横桟を抑え、精悍で落ち着いたシンプルなスタイルへ移行しました。</p></article><article><h3>CROSSTARの専用外装は別系統</h3><p>同時追加のCROSSTARには専用グリル、前後バンパー、LEDフォグ、ルーフレール、アルミホイールなどが設定されました。このページでは標準G同士に固定し、それらを後期共通の特徴として扱いません。</p></article></section>
  <section class="comparison-next" aria-label="関連ページ"><p class="comparison-eyebrow">KEEP EXPLORING</p><h2>FREEDの歴代モデルと比較へ</h2><div class="comparison-next-grid"><a href="/cars/freed.html" data-related-link><strong>FREEDの歴代モデル</strong><span>初代、2代目、3代目の型式とデザイン進化を確認する。</span><b>見る →</b></a><a href="/compare-freed-sienta.html" data-related-link><strong>FREEDとSIENTA</strong><span>コンパクトミニバン2車のデザインを同じ視点で比べる。</span><b>比べる →</b></a></div></section>
  <section class="facelift-source" aria-label="公式情報源"><p>FACT CHECK</p><span>発売日、型式、仕様と変更内容は、<a href="https://global.honda/jp/news/2016/4160916-freed.html" target="_blank" rel="noopener noreferrer">Honda公式 2016年発売資料</a>、<a href="https://global.honda/jp/news/2019/4191018-freed.html" target="_blank" rel="noopener noreferrer">Honda公式 2019年マイナーモデルチェンジ資料</a>、<a href="https://www.honda.co.jp/customer/auto-archive/freed/2016/" target="_blank" rel="noopener noreferrer">Honda公式 生産終了モデル情報</a>、<a href="https://global.honda/jp/news/2024/4240627-freed.html" target="_blank" rel="noopener noreferrer">Honda公式 3代目発売資料</a>で確認しています。</span></section>
  <a class="comparison-more" href="/cars/freed.html">FREEDの歴代モデル一覧を見る</a>`

async function copyUrl(button, message) { await navigator.clipboard.writeText(location.href); button.textContent = message }
document.querySelector('.share-button').addEventListener('click', async (event) => { trackEvent('share_identification_guide', { vehicle: 'FREED', intent: 'gb5-zenki-kouki', method: navigator.share ? 'native' : 'copy' }); if (navigator.share) return navigator.share({ title: document.title, text: 'FREED 2代目 前期・後期の違い', url: location.href }); await copyUrl(event.currentTarget, 'URLをコピーしました') })
document.querySelector('.copy-button').addEventListener('click', (event) => { trackEvent('copy_identification_guide_url', { vehicle: 'FREED', intent: 'gb5-zenki-kouki' }); return copyUrl(event.currentTarget, 'コピーしました') })
document.querySelectorAll('[data-related-link]').forEach((link) => link.addEventListener('click', () => trackEvent('open_related_content', { vehicle: 'FREED', intent: 'gb5-zenki-kouki' })))
