import { copySafely, shareSafely } from './safe-share.js'
import './comparison-page.css'
import './alphard-30-zenki-kouki.css'
import './click-glow.js'
import { trackEvent } from './analytics.js'

const phases = [
  {
    label: '前期', grade: 'ガソリンX系', period: '2014年1月20日発売〜2017年7月改良前', image: '/images/cars/noah/gen3-2014.webp',
    title: '太い横桟グリルと、丸いプロジェクター',
    lead: '前期の標準ボディ代表画像は、太いメッキ横桟を重ねたグリルと、丸いプロジェクターを内蔵した大きなヘッドランプが手掛かりです。歴代ページの既存画像を無変更で再利用しています。画像の車両条件は後期のHYBRID Gとは一致しません。',
    points: ['大きな一体型ランプ内に丸いプロジェクター', '太いメッキ横桟を重ねた、明るく堂々としたグリル', 'バンパー下部は横方向の開口と丸型フォグで構成'],
  },
  {
    label: '後期', grade: 'HYBRID G系', period: '2017年7月3日発売〜90系登場まで', image: '/images/cars/noah/gen3-2017-zwr80g-post-facelift.png',
    title: '薄型Bi-Beam LEDと、艶やかな大面積グリル',
    lead: '後期Gは、Bi-Beam LEDヘッドランプと面発光LEDクリアランスランプを採用。グリルとバンパーも再構成され、前期よりモダンで精悍な表情になりました。',
    points: ['薄型Bi-Beam LEDと面発光LEDクリアランスランプ', 'カラード＋メッキモールの横長グリル', 'フロントバンパーとフォグ周辺を一体的に刷新'],
  },
]

const card = (phase) => `<article class="facelift-card"><div class="facelift-card-image"><img src="${phase.image}" alt="NOAH 80系 ${phase.grade} ${phase.label}の左前3/4" ${phase.label === '前期' ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" /></div><div class="facelift-card-copy"><p class="facelift-card-label">${phase.label} · ${phase.grade} · ${phase.period}</p><h2>${phase.title}</h2><p>${phase.lead}</p><ul>${phase.points.map((point) => `<li>${point}</li>`).join('')}</ul></div></article>`

document.querySelector('#noah-facelift-page').innerHTML = `
  <header class="comparison-hero facelift-hero"><a class="comparison-home" href="/">CARVISTA</a><p class="comparison-eyebrow">IDENTIFICATION GUIDE · 80 SERIES</p><h1>NOAH 80系<br />前期・後期の違い</h1><p class="comparison-intro">標準ボディの代表画像で、2017年7月改良前後の顔つきを比較。前期はガソリンX系、後期はHYBRID G系のため、グレード固有装備の優劣はこの画像から判断しません。</p><div class="comparison-actions"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div></header>
  <section class="facelift-answer" aria-label="一番簡単な見分け方"><p>一番簡単な見分け方</p><strong>丸いプロジェクターと太いメッキ横桟は改良前、薄型LEDと大面積グリルは改良後を探す手掛かり。</strong><span>掲載画像は同一グレードではありません。Siの専用エアロや交換部品にも注意し、候補車の型式・グレード・製造時期を販売店で照合してください。</span></section>
  <section class="facelift-compare" aria-label="前期と後期の画像比較"><p class="comparison-eyebrow">SAME ANGLE · DETAILED COMPARE</p><h2>標準ボディ代表画像で顔を見比べる</h2><p class="facelift-section-intro">前期はガソリンX系・2WD（ZRR80G）の歴代画像、後期はHYBRID G・2WD（ZWR80G）の既存画像です。撮影角度をそろえた参考比較で、同一グレードの改良差だけを描いた画像ではありません。エアロ仕様Si、特別仕様車、VOXY、ESQUIREは含みません。</p><div class="facelift-grid">${phases.map(card).join('')}</div></section>
  <section class="facelift-timeline" aria-label="NOAH 80系の年式タイムライン"><p class="comparison-eyebrow">TIMELINE BRANCH</p><h2>80系の中を、2017年7月で分ける</h2><div class="timeline-track"><article><span>2014.01.20</span><h3>80系登場</h3><p>前期掲載画像はガソリンX系・2WDの標準ボディ代表。HYBRID Gの前期実車画像として扱いません。</p></article><article><span>2014.01〜2017.07改良前</span><h3>前期</h3><p>丸いプロジェクター、大きな一体型ランプ、太いメッキ横桟が目印です。</p></article><article class="timeline-change"><span>2017.07.03</span><h3>マイナーチェンジ</h3><p>薄型Bi-Beam LED、面発光LEDクリアランスランプ、グリルとリヤランプの新意匠を採用しました。</p></article><article><span>2017.07.03発売〜90系登場まで</span><h3>後期</h3><p>後期掲載画像はZWR80GのHYBRID G系。Toyota公式の発売境界と車両の仕様を分けて確認します。</p></article></div></section>
  <section class="facelift-checklist" aria-label="中古車の見分け方"><p class="comparison-eyebrow">USED CAR CHECK</p><h2>中古車写真は、この3点で照合</h2><ol><li><b>ヘッドランプ</b><span>丸いプロジェクター主体か、薄型Bi-Beam LEDかを見る。</span></li><li><b>グリルとバンパー</b><span>横桟だけで判断せず、開口部とフォグ周辺を一組で確認する。</span></li><li><b>年式・車両情報</b><span>2017年7月3日の改良境界、ガソリンZRR80系かハイブリッドZWR80系か、グレード名を車検証・販売店情報で照合する。</span></li></ol></section>
  <section class="comparison-reading facelift-reading" aria-label="主な変更点"><p class="comparison-eyebrow">2017 FACELIFT</p><h2>前後期で変わった主なポイント</h2><article><h3>前後の外観</h3><p>フロントは薄型LED、グリル、バンパーを刷新。リヤコンビネーションランプとバックドアガーニッシュもワイド感を表す新意匠になりました。</p></article><article><h3>使い勝手・走り</h3><p>USB端子や助手席シートバックテーブルなどを充実。ボディ剛性、ショックアブソーバー、遮音性も見直されています。HYBRID GではToyota Safety Sense Cを装備します。</p></article></section>
  <section class="comparison-next" aria-label="関連ページ"><p class="comparison-eyebrow">KEEP EXPLORING</p><h2>NOAHの世代と兄弟車へ</h2><div class="comparison-next-grid"><a href="/cars/noah.html" data-related-link><strong>NOAHの歴代モデル</strong><span>60系から90系まで、4世代の進化を見る。</span><b>歴代を見る →</b></a><a href="/voxy-80-zenki-kouki.html" data-related-link><strong>VOXY 80系 前期・後期</strong><span>兄弟車ZSの2017年改良前後を見比べる。</span><b>比べる →</b></a><a href="/compare-voxy-noah-esquire.html" data-related-link><strong>VOXY・NOAH・ESQUIRE</strong><span>兄弟車3台の顔つきの違いを確認する。</span><b>比べる →</b></a></div></section>
  <section class="facelift-source" aria-label="公式情報源"><p>FACT CHECK</p><span>年式・型式・装備は<a href="https://global.toyota/jp/newsroom/toyota/21775271.html" target="_blank" rel="noopener noreferrer">Toyota公式 2014年発売資料</a>、<a href="https://global.toyota/jp/newsroom/toyota/21823080.html" target="_blank" rel="noopener noreferrer">Toyota公式 2017年マイナーチェンジ資料</a>、<a href="https://toyota.jp/pages/contents/carlineup/archive/noah/2017-07/pdf/noah_main_s_201707.pdf" target="_blank" rel="noopener noreferrer">2017年7月版 主要装備・諸元</a>で確認しています。</span></section>
  <a class="comparison-more" href="/cars/noah.html">NOAHの歴代モデル一覧を見る</a>`

async function copyUrl(button, message) { return copySafely(button, location.href, message) }
document.querySelector('.share-button').addEventListener('click', async (event) => { trackEvent('share_identification_guide', { vehicle: 'NOAH', intent: '80-zenki-kouki', method: navigator.share ? 'native' : 'copy' }); return shareSafely(event.currentTarget, { title: document.title, text: 'NOAH 80系 前期・後期の違い', url: location.href }) })
document.querySelector('.copy-button').addEventListener('click', (event) => { trackEvent('copy_identification_guide_url', { vehicle: 'NOAH', intent: '80-zenki-kouki' }); return copyUrl(event.currentTarget, 'コピーしました') })
document.querySelectorAll('[data-related-link]').forEach((link) => link.addEventListener('click', () => trackEvent('open_related_content', { vehicle: 'NOAH', intent: '80-zenki-kouki' })))
