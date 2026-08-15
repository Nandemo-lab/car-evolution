import './comparison-page.css'
import './alphard-30-zenki-kouki.css'
import './click-glow.js'
import { trackEvent } from './analytics.js'

const phases = [
  {
    label: '前期', period: '2015年4月24日〜2017年9月28日', image: '/images/cars/stepwgn/rp3-spada-pre-facelift-v1.png',
    title: '幅広い一枚メッキと丸型フォグの前期SPADA',
    lead: '比較基準はRP3 SPADA・FF・1.5L VTEC TURBO。前期はHondaエンブレムを載せた幅広い一枚メッキ、複眼調ヘッドランプ、バンパー下部を横切る細いメッキと丸型フォグが特徴です。',
    points: ['幅広い一枚メッキを中心にしたグリル', '複眼調の前期ヘッドランプ', '横長メッキの両端に丸型フォグを配置'],
  },
  {
    label: '後期', period: '2017年9月29日〜2022年5月26日', image: '/images/cars/stepwgn/rp3-spada-post-facelift-v1.png',
    title: '多段横メッキとインラインLEDの後期SPADA',
    lead: '同じRP3 SPADA・FF・1.5L VTEC TURBOで比較。2017年改良後は薄いインラインLEDヘッドライトと、フロント下部まで広がる多段横メッキグリル、角形のフォグ周辺へ刷新されました。',
    points: ['細く水平なインラインタイプLEDヘッドライト', '縦方向にも大きい多段横メッキグリル', '角形の黒い外側開口とLEDフォグ'],
  },
]

const card = (phase) => `<article class="facelift-card"><div class="facelift-card-image"><img src="${phase.image}" alt="STEPWGN RP3 SPADA ${phase.label}の左前3/4比較画像" ${phase.label === '前期' ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" /></div><div class="facelift-card-copy"><p class="facelift-card-label">${phase.label} · ${phase.period}</p><h2>${phase.title}</h2><p>${phase.lead}</p><ul>${phase.points.map((point) => `<li>${point}</li>`).join('')}</ul></div></article>`

document.querySelector('#stepwgn-facelift-page').innerHTML = `
  <header class="comparison-hero facelift-hero"><a class="comparison-home" href="/">CARVISTA</a><p class="comparison-eyebrow">IDENTIFICATION GUIDE · RP3 SPADA</p><h1>STEPWGN RP系<br />前期・後期の違い</h1><p class="comparison-intro">5代目STEPWGNは2017年9月29日のマイナーモデルチェンジでSPADAの顔を刷新。標準STEPWGNとのグレード差や新設されたハイブリッドとの差を混ぜず、同じRP3 SPADA・FF・1.5Lターボで比較します。</p><div class="comparison-actions"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div></header>
  <section class="facelift-answer" aria-label="最短の見分け方"><p>FAST ANSWER</p><strong>一枚メッキ＋丸型フォグなら前期、多段横メッキ＋細いLEDライトなら後期SPADA。</strong><span>この判別法はSPADA用です。標準STEPWGNは2017年改良でも同じ変更を受けていないため、最初にSPADAか標準車かを確認してください。</span></section>
  <section class="facelift-compare" aria-label="前期と後期の詳細比較"><p class="comparison-eyebrow">SAME ANGLE · DETAILED COMPARE</p><h2>同じRP3 SPADA・FF・1.5Lターボで比べる</h2><p class="facelift-section-intro">ボディカラーは前後期に設定されたプレミアムスパークルブラック・パール。2017年に追加されたi-MMDハイブリッド、Cool Spirit、Modulo X、特別仕様車や用品装着車の差は、前後期固有差として扱っていません。</p><div class="facelift-grid">${phases.map(card).join('')}</div></section>
  <section class="facelift-timeline" aria-label="STEPWGN RP系の年式タイムライン"><p class="comparison-eyebrow">TIMELINE BRANCH</p><h2>RP系SPADAは2017年9月29日で分ける</h2><div class="timeline-track"><article><span>2015.04.24</span><h3>5代目RP系を発売</h3><p>標準STEPWGNはFFのRP1／4WDのRP2、SPADAはFFのRP3／4WDのRP4。1.5L直噴VTEC TURBOを搭載しました。</p></article><article><span>2015.04〜2017.09.28</span><h3>前期SPADA</h3><p>幅広い一枚メッキ、複眼調ランプ、丸型フォグを採用します。</p></article><article class="timeline-change"><span>2017.09.29</span><h3>マイナーチェンジ</h3><p>SPADAの外観を刷新し、インラインLEDライトと専用グリルを採用。RP5のi-MMDハイブリッドも追加されました。</p></article><article><span>2017.09.29〜2022.05</span><h3>後期SPADA</h3><p>ガソリンSPADAはRP3／RP4を継続。2022年5月27日に6代目へ交代しました。</p></article></div></section>
  <section class="facelift-checklist" aria-label="中古車の見分け方"><p class="comparison-eyebrow">USED CAR CHECK</p><h2>中古車写真で確認する3点</h2><ol><li><b>まずSPADAか標準車か</b><span>SPADAは専用グリル・バンパーを持ちます。標準車との違いを前後期差に数えないことが第一です。</span></li><li><b>ライトとグリルを一組で</b><span>複眼調＋一枚メッキは前期、細いインラインLED＋多段横メッキは後期の目安です。</span></li><li><b>型式とパワートレイン</b><span>比較車のRP3はガソリンFF。RP4はガソリン4WD、2017年追加のRP5はハイブリッドFFです。初度登録年月も合わせて確認します。</span></li></ol></section>
  <section class="comparison-reading facelift-reading" aria-label="2017年マイナーチェンジの要点"><p class="comparison-eyebrow">2017 FACELIFT</p><h2>SPADAの変化は、ライトからバンパーまでの全面刷新</h2><article><h3>インラインLEDと専用グリル</h3><p>Honda公式は、新採用のLEDヘッドライトでシャープさを、専用デザインのフロントグリルで存在感を表現したと説明しています。中古車ではグリルのメッキ段数とライト内部を同時に見ると確実です。</p></article><article><h3>ハイブリッド追加は前後期差とは別に確認</h3><p>2017年にはSPORT HYBRID i-MMD搭載車も追加されましたが、これはパワートレインの追加です。このページは前後期ともガソリンFFのRP3に固定し、顔つきの変更だけを比較しています。</p></article></section>
  <section class="comparison-next" aria-label="関連ページ"><p class="comparison-eyebrow">KEEP EXPLORING</p><h2>STEPWGNの歴代モデルとライバルへ</h2><div class="comparison-next-grid"><a href="/cars/stepwgn.html" data-related-link><strong>STEPWGNの歴代モデル</strong><span>初代から現行まで、6世代の型式と進化を確認する。</span><b>見る →</b></a><a href="/compare-noah-serena-stepwgn.html" data-related-link><strong>NOAH・SERENA・STEPWGN</strong><span>Mクラスミニバン3台のデザインを同じ視点で比べる。</span><b>比べる →</b></a><a href="/cars/freed.html" data-related-link><strong>FREEDの歴代モデル</strong><span>Hondaのコンパクトミニバンの世代差を見る。</span><b>見る →</b></a></div></section>
  <section class="facelift-source" aria-label="公式情報源"><p>FACT CHECK</p><span>年式、型式、グレードと変更内容は、<a href="https://global.honda/jp/news/2015/4150423-stepwgn.html" target="_blank" rel="noopener noreferrer">Honda公式 2015年発売資料</a>、<a href="https://global.honda/jp/news/2017/4170928a-stepwgn.html" target="_blank" rel="noopener noreferrer">Honda公式 2017年マイナーモデルチェンジ資料</a>、<a href="https://global.honda/jp/pressroom/products/auto/stepwgn/stepwgn_2015-04-23/" target="_blank" rel="noopener noreferrer">Honda公式 製品アーカイブ</a>で確認しています。</span></section>
  <a class="comparison-more" href="/cars/stepwgn.html">STEPWGNの歴代モデル一覧を見る</a>`

async function copyUrl(button, message) { await navigator.clipboard.writeText(location.href); button.textContent = message }
document.querySelector('.share-button').addEventListener('click', async (event) => { trackEvent('share_identification_guide', { vehicle: 'STEPWGN', intent: 'rp-zenki-kouki', method: navigator.share ? 'native' : 'copy' }); if (navigator.share) return navigator.share({ title: document.title, text: 'STEPWGN RP系 前期・後期の違い', url: location.href }); await copyUrl(event.currentTarget, 'URLをコピーしました') })
document.querySelector('.copy-button').addEventListener('click', (event) => { trackEvent('copy_identification_guide_url', { vehicle: 'STEPWGN', intent: 'rp-zenki-kouki' }); return copyUrl(event.currentTarget, 'コピーしました') })
document.querySelectorAll('[data-related-link]').forEach((link) => link.addEventListener('click', () => trackEvent('open_related_content', { vehicle: 'STEPWGN', intent: 'rp-zenki-kouki' })))
