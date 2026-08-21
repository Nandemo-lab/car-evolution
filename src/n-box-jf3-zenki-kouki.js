import './comparison-page.css'
import './alphard-30-zenki-kouki.css'
import './click-glow.js'
import { trackEvent } from './analytics.js'

const phases = [
  {
    label: '前期', period: '2017年9月〜2020年12月', image: '/images/cars/n-box/jf3-custom-pre-facelift-v1.png',
    title: '薄くフラットなクロームグリルと左寄りのナンバー位置',
    lead: '比較基準はN-BOX Custom G・L Honda SENSING・FF・自然吸気。前期は、ヘッドライトを結ぶクロームの見え方が比較的フラットで、ナンバーの取付位置が車両右側寄り（画像では向かって左）です。',
    points: ['薄い横基調のアッパーグリルと、控えめな立体感', '前バンパーのナンバー位置は中央ではなく左寄り', 'Custom固有のグリル・バンパーを、標準N-BOXの差と混同しない'],
  },
  {
    label: '後期', period: '2020年12月25日発売〜2023年9月終了モデル', image: '/images/cars/n-box/jf3-custom-post-facelift-v1.png',
    title: '立体的なクロームグリルと中央ナンバーで判別',
    lead: '2020年12月のマイナーモデルチェンジ後。比較基準はN-BOX Custom L・FF・自然吸気です。アッパーグリルのクロームをより強く立体化し、前ナンバーを中央へ移動。後期Customの顔は、グリルからバンパーまでを一体で見ると確実です。',
    points: ['アッパーグリルのクロームがより立体的で存在感を増す', '前ナンバーが中央配置になる', '前まわりとともにリアバンパーのメッキバーも追加（後ろ姿の補助判別点）'],
  },
]

const card = (phase) => `<article class="facelift-card"><div class="facelift-card-image"><img src="${phase.image}" alt="N-BOX Custom JF3 ${phase.label}の左前3/4比較画像" ${phase.label === '前期' ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" /></div><div class="facelift-card-copy"><p class="facelift-card-label">${phase.label} · ${phase.period}</p><h2>${phase.title}</h2><p>${phase.lead}</p><ul>${phase.points.map((point) => `<li>${point}</li>`).join('')}</ul></div></article>`

document.querySelector('#nbox-facelift-page').innerHTML = `
  <header class="comparison-hero facelift-hero"><a class="comparison-home" href="/">CARVISTA</a><p class="comparison-eyebrow">IDENTIFICATION GUIDE · JF3/JF4 N-BOX CUSTOM</p><h1>N-BOX 2代目<br />前期・後期の違い</h1><p class="comparison-intro">2代目N-BOX（JF3/JF4）は、2020年12月25日のマイナーモデルチェンジで内外装を刷新。ここではグレード差を混ぜず、同じN-BOX Custom・FF・自然吸気の系統で、前から見分けるポイントを統一画像で比較します。</p><div class="comparison-actions"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div></header>
  <section class="facelift-answer" aria-label="最短の見分け方"><p>FAST ANSWER</p><strong>Customは、前ナンバーの位置を見る。左寄りなら前期、中央なら後期。</strong><span>ただしこれはN-BOX Customの判別法です。標準N-BOXとCustomではもともとフロントマスクが異なるため、まずグレード系統をそろえてください。JF3はFF、JF4は4WDという型式関係も車検証で照合します。</span></section>
  <section class="facelift-compare" aria-label="前期と後期の詳細比較"><p class="comparison-eyebrow">SAME ANGLE · DETAILED COMPARE</p><h2>同じCustom・FF・NAで、2020年12月の差だけを読む</h2><p class="facelift-section-intro">比較画像は2代目N-BOX CustomのFF・自然吸気を基準に固定しています。ターボ、コーディネートスタイル、特別仕様車、標準N-BOXとの違いは、前後期固有の変更として扱っていません。</p><div class="facelift-grid">${phases.map(card).join('')}</div></section>
  <section class="facelift-timeline" aria-label="JF3/JF4の年式タイムライン"><p class="comparison-eyebrow">TIMELINE BRANCH</p><h2>2代目は2020年12月25日で分ける</h2><div class="timeline-track"><article><span>2017.08.31</span><h3>2代目を発表</h3><p>JF3はFF、JF4は4WD。新型は9月1日に発売されました。</p></article><article><span>2017.09〜2020.12改良前</span><h3>前期</h3><p>Custom G・L Honda SENSINGを含む初期型。前ナンバーは左寄りです。</p></article><article class="timeline-change"><span>2020.12.25</span><h3>マイナーチェンジ</h3><p>内外装を刷新。Customはアッパーグリルのメッキを立体化し、前ナンバーを中央配置へ変更しました。</p></article><article><span>2020.12.25発売〜2023.09</span><h3>後期</h3><p>Honda公式アーカイブでは2023年9月終了モデル。3代目は同年10月6日に発売されました。</p></article></div></section>
  <section class="facelift-checklist" aria-label="中古車の見分け方"><p class="comparison-eyebrow">USED CAR CHECK</p><h2>中古車で確認する3点</h2><ol><li><b>最初にCustomか標準か</b><span>標準N-BOXとCustomでは、前後期以前に顔つきが異なります。販売店写真・グレード名で系統を先に固定します。</span></li><li><b>ナンバーとグリルを一組で</b><span>Customは左寄りナンバー＋フラットなグリルなら前期、中央ナンバー＋立体的なクロームなら後期が目安です。</span></li><li><b>型式と初度登録年も照合</b><span>JF3はFF、JF4は4WD。型式だけでは前後期を断定せず、2020年12月25日を境に初度登録・車両情報を確認します。</span></li></ol></section>
  <section class="comparison-reading facelift-reading" aria-label="2020年マイナーチェンジの要点"><p class="comparison-eyebrow">2020 FACELIFT</p><h2>変わったのは、Customの「グリル」と「ナンバー位置」</h2><article><h3>標準N-BOXとCustomを分けて考える</h3><p>Honda公式資料では、標準N-BOXはヘッドライトとグリル形状を変更しロアグリルにメッキバーを追加。Customはアッパーグリルのメッキを立体化し、前ナンバーを中央配置へ移しました。このページの画像比較は後者、Customの変化に限定しています。</p></article><article><h3>年式より確実な中古車の読み方</h3><p>掲載年や登録年だけでなく、グレード系統、ナンバー位置、グリルの立体感、車検証のJF3/JF4を重ねて確認します。2020年12月の境界付近は、初度登録日と販売時期がずれる場合もあるため車両情報を優先してください。</p></article></section>
  <section class="comparison-next" aria-label="関連ページ"><p class="comparison-eyebrow">KEEP EXPLORING</p><h2>N-BOXの世代とライバル車へ</h2><div class="comparison-next-grid"><a href="/cars/n-box.html" data-related-link><strong>N-BOXの歴代モデル</strong><span>初代・2代目・3代目の型式と進化を確認する。</span><b>見る →</b></a><a href="/compare-n-box-spacia.html" data-related-link><strong>N-BOX・SPACIAの違い</strong><span>軽スーパーハイトワゴン2台を同じ視点で比べる。</span><b>比べる →</b></a><a href="/cars/freed.html" data-related-link><strong>FREEDの歴代モデル</strong><span>Hondaのファミリーカーの世代差を見る。</span><b>見る →</b></a></div></section>
  <section class="facelift-source" aria-label="公式情報源"><p>FACT CHECK</p><span>年式・型式関係・2020年の変更内容は、<a href="https://global.honda/jp/news/2017/4170831-n-box.html" target="_blank" rel="noopener noreferrer">Honda公式 2017年発売資料</a>、<a href="https://global.honda/jp/news/2020/4201224-n-box.html" target="_blank" rel="noopener noreferrer">Honda公式 2020年マイナーモデルチェンジ資料</a>、<a href="https://global.honda/jp/news/2023/4231005-n-box.html" target="_blank" rel="noopener noreferrer">Honda公式 2023年3代目発売資料</a>で確認しています。</span></section>
  <a class="comparison-more" href="/cars/n-box.html">N-BOXの歴代モデル一覧を見る</a>`

async function copyUrl(button, message) { await navigator.clipboard.writeText(location.href); button.textContent = message }
document.querySelector('.share-button').addEventListener('click', async (event) => { trackEvent('share_identification_guide', { vehicle: 'N-BOX', intent: 'jf3-zenki-kouki', method: navigator.share ? 'native' : 'copy' }); if (navigator.share) return navigator.share({ title: document.title, text: 'N-BOX 2代目 JF3/JF4 前期・後期の違い', url: location.href }); await copyUrl(event.currentTarget, 'URLをコピーしました') })
document.querySelector('.copy-button').addEventListener('click', (event) => { trackEvent('copy_identification_guide_url', { vehicle: 'N-BOX', intent: 'jf3-zenki-kouki' }); return copyUrl(event.currentTarget, 'コピーしました') })
document.querySelectorAll('[data-related-link]').forEach((link) => link.addEventListener('click', () => trackEvent('open_related_content', { vehicle: 'N-BOX', intent: 'jf3-zenki-kouki' })))
