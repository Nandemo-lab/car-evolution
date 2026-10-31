import './comparison-page.css'
import './alphard-30-zenki-kouki.css'
import './facelift-detail-tools.css'
import './facelift-detail-crop.css'
import './comparison-visual-first.css'
import './click-glow.js'
import { trackEvent } from './analytics.js'
import { bindFaceliftDetailTools, faceliftChangeMatrixHtml, faceliftDetailCompareHtml } from './facelift-detail-tools.js'
import { voxy80Enhancement } from './facelift-enhancements.js'
import { bindComparisonViewToggle } from './generation-comparison.js'

const phases = [
  {
    label: '前期', period: '2014年1月20日発売〜2017年7月改良前', image: '/images/cars/voxy/80-zs-pre-facelift-v1.png',
    title: '横基調のグリルと、丸いプロジェクター',
    lead: '前期ZSは、上下2段のランプと横方向に通るグリルが基本です。下段ランプの丸いプロジェクターと、横桟を重ねた縦長のフォグ周辺が見分けやすいポイントです。',
    points: ['上段の細いランプと、丸いプロジェクターを含む下段ランプ', '中央は横基調のグリル。大きな下側開口は比較的素直な長方形', 'フォグ周辺は横桟を重ね、下端に細いメッキ加飾'],
    imageLabels: ['ヘッドライト', 'ZSバンパー'],
  },
  {
    label: '後期', period: '2017年7月3日発売〜2022年1月', image: '/images/cars/voxy/80-zs-post-facelift-v1.png',
    title: '薄い二段灯と、［ハ］字の外側フレーム',
    lead: '後期ZSは、面発光LEDクリアランスランプとBi-Beam LEDヘッドランプで二段の目元を鋭く再構成。バンパー両端の斜めの加飾が［ハ］字を描き、前期より開口部が強く縦へ伸びます。',
    points: ['薄い上段クリアランスランプと、独立した下段Bi-Beam LED', '大きな中央開口と、両端へ広がるZS専用［ハ］字テーマ', 'フォグは外側開口の低い位置。斜めのメッキ／シルバー縁が目印'],
    imageLabels: ['ヘッドライト', 'ZSバンパー'],
  },
]

const card = (phase) => `<article class="facelift-card"><div class="facelift-card-image"><img src="${phase.image}" alt="VOXY 80系 ZS ${phase.label}の左前45度" ${phase.label === '前期' ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" /></div><div class="facelift-card-copy"><p class="facelift-card-label">${phase.label} · ${phase.period}</p><h2>${phase.title}</h2><div class="lc-image-labels" aria-label="画像で確認する部位">${phase.imageLabels.map(label => `<span>${label}</span>`).join('')}</div><details class="facelift-card-details"><summary>仕様と見分け方</summary><p>${phase.lead}</p><ul>${phase.points.map((point) => `<li>${point}</li>`).join('')}</ul></details></div></article>`

document.querySelector('#voxy-facelift-page').innerHTML = `
  <header class="comparison-hero facelift-hero comparison-hero-compact"><a class="comparison-home" href="/">CARVISTA</a><p class="comparison-eyebrow">IDENTIFICATION GUIDE · 80 SERIES ZS</p><h1>VOXY 80系 ZS<br />前期・後期の違い</h1></header>
  <section class="facelift-answer" aria-label="最初に見る判別ポイント"><p>最短の見分け方</p><strong>バンパー両端の斜めの縁が［ハ］字を描き、フォグまで縦に伸びるなら後期ZS。</strong><span>ZSはスポーティーなエアロ外装のグレードです。年式だけで断定せず、フロント写真、初度登録年月、車台番号・型式指定情報を販売店で照合してください。</span></section>
  <section class="facelift-compare" aria-label="前期と後期の詳細比較"><p class="comparison-eyebrow">LOOK FIRST</p><h2>前期・後期を画像で比較</h2><div class="comparison-view-toggle" role="group" aria-label="比較画像の表示方法"><button type="button" data-comparison-view="pair" aria-pressed="true">横並び</button><button type="button" data-comparison-view="single" aria-pressed="false">1台ずつ</button></div><p class="comparison-view-hint" aria-live="polite">2台を同時に見比べます</p><div class="facelift-grid" data-comparison-view-target>${phases.map(card).join('')}</div><div class="lc-visual-points is-compact"><details><summary>ヘッドライト</summary><p>前期の丸いプロジェクターと、後期の薄型Bi-Beam LEDを見る。</p></details><details><summary>ZSバンパー</summary><p>後期は外側フレームが［ハ］字を描き、フォグが低い位置にある。</p></details><details><summary>比較条件</summary><p>標準X／V、煌、GR SPORTとは分けて、ZS同士で比較する。</p></details></div><details class="lc-visual-context"><summary>比較条件と画像について</summary><p>同じカメラ・床・照明・車体スケールで、2017年改良前後を比較しています。</p><p>画像はToyota公式の2014年・2017年資料を基準に制作したZS代表イメージです。煌、G's／GR SPORT、社外エアロは含みません。</p></details><div class="comparison-actions comparison-actions-secondary"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div></section>
  ${faceliftDetailCompareHtml(voxy80Enhancement.detailCompare)}
  <details class="lc-section lc-progressive lc-lower-details"><summary><span>型式・仕様・購入前確認</span><small>必要なときに開く</small></summary><div class="lc-progressive-body"><section class="facelift-checklist" aria-label="中古車の見分け方"><p class="comparison-eyebrow">USED CAR CHECK</p><h2>購入前に照合する3点</h2><ol><li><b>フロント全体</b><span>中央開口・外側フレーム・フォグ位置を一組で見る。</span></li><li><b>グレード</b><span>ZS、煌、GR SPORTなどを掲載票で確認する。</span></li><li><b>年式・型式</b><span>初度登録年月とZRR80W／ZRR85W／ZWR80Wを照合する。</span></li></ol></section><section class="facelift-timeline" aria-label="80系ZSの年式タイムライン"><p class="comparison-eyebrow">TIMELINE</p><h2>2017年7月で分ける</h2><div class="timeline-track"><article><span>2014.01.20</span><h3>80系登場</h3><p>ガソリンZSは2WDがDBA-ZRR80W、4WDがDBA-ZRR85W。</p></article><article class="timeline-change"><span>2017.07.03</span><h3>外観改良</h3><p>Bi-Beam LEDとZS専用［ハ］字テーマを採用。</p></article></div></section></div></details>
  <details class="lc-section lc-progressive"><summary><span>装備差・公式根拠・注意事項</span><small>詳しく見る</small></summary><div class="lc-progressive-body">${faceliftChangeMatrixHtml(voxy80Enhancement.changeMatrix)}<section class="facelift-source" aria-label="公式情報源"><p>FACT CHECK</p><span>年式・グレード・造形は<a href="https://global.toyota/jp/newsroom/toyota/21775271.html" target="_blank" rel="noopener noreferrer">Toyota公式 2014年フルモデルチェンジ発表</a>、<a href="https://global.toyota/jp/newsroom/toyota/21823080.html" target="_blank" rel="noopener noreferrer">Toyota公式 2017年マイナーチェンジ発表</a>、<a href="https://toyota.jp/pages/contents/carlineup/archive/voxy/2017-07/pdf/voxy_main_s_201707.pdf" target="_blank" rel="noopener noreferrer">2017年7月版 主要諸元表</a>で確認しています。</span></section></div></details>
  <section class="comparison-next" aria-label="関連ページ"><p class="comparison-eyebrow">KEEP EXPLORING</p><h2>兄弟車と世代へつなぐ</h2><div class="comparison-next-grid"><a href="/voxy-60-vs-70.html" data-related-link><strong>VOXY 60系・70系</strong><span>初代AZR系と2代目ZRR系の世代差を見る。</span><b>比べる →</b></a><a href="/cars/voxy.html" data-related-link><strong>VOXYの歴代モデル</strong><span>60系から90系までの進化を見る。</span><b>見る →</b></a><a href="/compare-voxy-noah-esquire.html" data-related-link><strong>VOXY・NOAH・ESQUIRE</strong><span>80系兄弟車のフロント表現を見比べる。</span><b>比べる →</b></a><a href="/cars/noah.html" data-related-link><strong>NOAHの歴代モデル</strong><span>兄弟車NOAHの世代変化を確認する。</span><b>見る →</b></a><a href="/cars/esquire.html" data-related-link><strong>ESQUIREのモデル</strong><span>80系プラットフォームの上質志向を見る。</span><b>見る →</b></a></div></section>
  <a class="comparison-more" href="/cars/voxy.html">VOXYの歴代モデル一覧を見る</a>`

async function copyUrl(button, message) { await navigator.clipboard.writeText(location.href); button.textContent = message }
document.querySelector('.share-button').addEventListener('click', async (event) => { trackEvent('share_identification_guide', { vehicle: 'VOXY', intent: '80-zenki-kouki', method: navigator.share ? 'native' : 'copy' }); if (navigator.share) return navigator.share({ title: document.title, text: 'VOXY 80系 ZS 前期・後期の違い', url: location.href }); await copyUrl(event.currentTarget, 'URLをコピーしました') })
document.querySelector('.copy-button').addEventListener('click', (event) => { trackEvent('copy_identification_guide_url', { vehicle: 'VOXY', intent: '80-zenki-kouki' }); return copyUrl(event.currentTarget, 'コピーしました') })
document.querySelectorAll('[data-related-link]').forEach((link) => link.addEventListener('click', () => trackEvent('open_related_content', { vehicle: 'VOXY', intent: '80-zenki-kouki' })))
bindFaceliftDetailTools(document.querySelector('#voxy-facelift-page'), voxy80Enhancement.detailCompare, { vehicle: 'VOXY', comparison: '80-zenki-kouki' })
bindComparisonViewToggle(document.querySelector('#voxy-facelift-page'), { vehicle: 'VOXY', intent: '80-zenki-kouki' })
