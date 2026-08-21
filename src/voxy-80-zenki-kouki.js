import './comparison-page.css'
import './alphard-30-zenki-kouki.css'
import './click-glow.js'
import { trackEvent } from './analytics.js'

const phases = [
  {
    label: '前期', period: '2014年1月20日発売〜2017年7月改良前', image: '/images/cars/voxy/80-zs-pre-facelift-v1.png',
    title: '横基調のグリルと、丸いプロジェクター',
    lead: '前期ZSは、上下2段のランプと横方向に通るグリルが基本です。下段ランプの丸いプロジェクターと、横桟を重ねた縦長のフォグ周辺が見分けやすいポイントです。',
    points: ['上段の細いランプと、丸いプロジェクターを含む下段ランプ', '中央は横基調のグリル。大きな下側開口は比較的素直な長方形', 'フォグ周辺は横桟を重ね、下端に細いメッキ加飾'],
  },
  {
    label: '後期', period: '2017年7月3日発売〜2022年1月', image: '/images/cars/voxy/80-zs-post-facelift-v1.png',
    title: '薄い二段灯と、［ハ］字の外側フレーム',
    lead: '後期ZSは、面発光LEDクリアランスランプとBi-Beam LEDヘッドランプで二段の目元を鋭く再構成。バンパー両端の斜めの加飾が［ハ］字を描き、前期より開口部が強く縦へ伸びます。',
    points: ['薄い上段クリアランスランプと、独立した下段Bi-Beam LED', '大きな中央開口と、両端へ広がるZS専用［ハ］字テーマ', 'フォグは外側開口の低い位置。斜めのメッキ／シルバー縁が目印'],
  },
]

const card = (phase) => `<article class="facelift-card"><div class="facelift-card-image"><img src="${phase.image}" alt="VOXY 80系 ZS ${phase.label}の左前45度" ${phase.label === '前期' ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" /></div><div class="facelift-card-copy"><p class="facelift-card-label">${phase.label} · ${phase.period}</p><h2>${phase.title}</h2><p>${phase.lead}</p><ul>${phase.points.map((point) => `<li>${point}</li>`).join('')}</ul></div></article>`

document.querySelector('#voxy-facelift-page').innerHTML = `
  <header class="comparison-hero facelift-hero"><a class="comparison-home" href="/">CARVISTA</a><p class="comparison-eyebrow">IDENTIFICATION GUIDE · 80 SERIES ZS</p><h1>VOXY 80系 ZS<br />前期・後期の違い</h1><p class="comparison-intro">同じカメラ・床・照明・車体スケールで、2017年マイナーチェンジ前後のフロント造形だけを比べます。</p><div class="comparison-actions"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div></header>
  <section class="facelift-answer" aria-label="最初に見る判別ポイント"><p>最短の見分け方</p><strong>バンパー両端の斜めの縁が［ハ］字を描き、フォグまで縦に伸びるなら後期ZS。</strong><span>年式だけで断定せず、フロント写真、初度登録年月、車台番号・型式指定情報を販売店で照合してください。</span></section>
  <section class="facelift-compare" aria-label="前期と後期の詳細比較"><p class="comparison-eyebrow">SAME ANGLE · DETAILED COMPARE</p><h2>生成条件を固定し、実車の差だけを読む</h2><p class="facelift-section-intro">比較画像はToyota公式の2014年発売資料と2017年マイナーチェンジ資料を基準にCarVistaが制作した代表イメージです。対象はエアロ仕様ZS。特別仕様車「煌」、G's／GR SPORT、社外エアロは含みません。</p><div class="facelift-grid">${phases.map(card).join('')}</div></section>
  <section class="facelift-timeline" aria-label="80系ZSの年式タイムライン"><p class="comparison-eyebrow">TIMELINE BRANCH</p><h2>80系の中を、2017年7月で分ける</h2><div class="timeline-track"><article><span>2014.01.20</span><h3>80系登場</h3><p>ガソリンZSは2WDがDBA-ZRR80W、4WDがDBA-ZRR85W。エアロ専用ワイドボディです。</p></article><article><span>2014.01〜2017.07改良前</span><h3>前期ZS</h3><p>上下2段灯、横基調グリル、丸いプロジェクターと横桟のフォグ周辺が目印です。</p></article><article class="timeline-change"><span>2017.07.03</span><h3>マイナーチェンジ</h3><p>Bi-Beam LEDと面発光LEDクリアランスランプ、ZS専用［ハ］字テーマへ刷新しました。</p></article><article><span>2017.07.03発売〜2022.01</span><h3>後期ZS</h3><p>80系はToyota公式カタログ上で2022年1月まで。ガソリン2WDはDBA-ZRR80W（のち3BA-ZRR80W）です。</p></article></div></section>
  <section class="facelift-checklist" aria-label="中古車の見分け方"><p class="comparison-eyebrow">USED CAR CHECK</p><h2>購入前に照合する3点</h2><ol><li><b>フロント全体</b><span>ランプだけでなく、中央開口・外側フレーム・フォグ位置を一組で見る。</span></li><li><b>グレード</b><span>ZS、ZS“煌”、GR SPORTなどで加飾が異なるため、掲載票のグレード名を確認する。</span></li><li><b>年式・型式</b><span>初度登録年月とZRR80W／ZRR85W／ZWR80Wを車検証・販売店情報で照合する。</span></li></ol></section>
  <section class="comparison-reading facelift-reading" aria-label="前面の変更点"><p class="comparison-eyebrow">FACE DESIGN</p><h2>後期は、ランプ単体ではなく顔全体が変わる</h2><article><h3>ヘッドランプとグリル</h3><p>後期は薄い面発光クリアランスランプとBi-Beam LEDを二段に配置し、上側グリルとの連続感を強化。前期の丸いプロジェクター中心の表情とは明確に異なります。</p></article><article><h3>バンパー・開口部・フォグ周辺</h3><p>後期ZSは中央開口を拡大し、外側の斜めフレームが［ハ］字を描く専用エアロへ変更。フォグはその縦長開口の低位置に置かれ、前期の横桟主体の囲みと区別できます。</p></article></section>
  <section class="comparison-next" aria-label="関連ページ"><p class="comparison-eyebrow">KEEP EXPLORING</p><h2>兄弟車と世代へつなぐ</h2><div class="comparison-next-grid"><a href="/cars/voxy.html" data-related-link><strong>VOXYの歴代モデル</strong><span>60系から90系までの進化を見る。</span><b>見る →</b></a><a href="/compare-voxy-noah-esquire.html" data-related-link><strong>VOXY・NOAH・ESQUIRE</strong><span>80系兄弟車のフロント表現を見比べる。</span><b>比べる →</b></a><a href="/cars/noah.html" data-related-link><strong>NOAHの歴代モデル</strong><span>兄弟車NOAHの世代変化を確認する。</span><b>見る →</b></a><a href="/cars/esquire.html" data-related-link><strong>ESQUIREのモデル</strong><span>80系プラットフォームの上質志向を見る。</span><b>見る →</b></a></div></section>
  <section class="facelift-source" aria-label="公式情報源"><p>FACT CHECK</p><span>年式・グレード・造形は<a href="https://global.toyota/jp/newsroom/toyota/21775271.html" target="_blank" rel="noopener noreferrer">Toyota公式 2014年フルモデルチェンジ発表</a>、<a href="https://global.toyota/jp/newsroom/toyota/21823080.html" target="_blank" rel="noopener noreferrer">Toyota公式 2017年マイナーチェンジ発表</a>、<a href="https://toyota.jp/pages/contents/carlineup/archive/voxy/2017-07/pdf/voxy_main_s_201707.pdf" target="_blank" rel="noopener noreferrer">2017年7月版 主要諸元表</a>で確認しています。</span></section>
  <a class="comparison-more" href="/cars/voxy.html">VOXYの歴代モデル一覧を見る</a>`

async function copyUrl(button, message) { await navigator.clipboard.writeText(location.href); button.textContent = message }
document.querySelector('.share-button').addEventListener('click', async (event) => { trackEvent('share_identification_guide', { vehicle: 'VOXY', intent: '80-zenki-kouki', method: navigator.share ? 'native' : 'copy' }); if (navigator.share) return navigator.share({ title: document.title, text: 'VOXY 80系 ZS 前期・後期の違い', url: location.href }); await copyUrl(event.currentTarget, 'URLをコピーしました') })
document.querySelector('.copy-button').addEventListener('click', (event) => { trackEvent('copy_identification_guide_url', { vehicle: 'VOXY', intent: '80-zenki-kouki' }); return copyUrl(event.currentTarget, 'コピーしました') })
document.querySelectorAll('[data-related-link]').forEach((link) => link.addEventListener('click', () => trackEvent('open_related_content', { vehicle: 'VOXY', intent: '80-zenki-kouki' })))
