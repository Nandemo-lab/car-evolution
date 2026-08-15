import './comparison-page.css'
import './alphard-30-zenki-kouki.css'
import './click-glow.js'
import { trackEvent } from './analytics.js'

const phases = [
  {
    label: '前期', period: '2015年12月9日〜2018年12月16日', image: '/images/cars/prius/gen4-2015-zvw51-pre-facelift.png',
    title: '縦へ深く伸びる稲妻形ヘッドランプ',
    lead: '比較基準は発売時のZVW51 A Touring Selection・2WD。前期はヘッドランプ外側がバンパーへ深く伸び、細い上部開口と大きな台形ロアグリルを組み合わせた鋭い顔つきです。',
    points: ['ヘッドランプ外側が縦へ折れ曲がる稲妻形', '中央エンブレムから左右へ伸びる細い上部開口', '縦長の外側灯火と大きな台形ロアグリル'],
  },
  {
    label: '後期', period: '2018年12月17日〜2023年1月9日', image: '/images/cars/prius/gen4-2018-zvw51-post-facelift.png',
    title: '短く水平基調になったランプと刷新バンパー',
    lead: '2018年12月のマイナーチェンジ後。比較条件は同じZVW51 A Touring Selection・2WDです。ランプを短い水平基調へ改め、グリルとバンパー、外側の縦型加飾を一体で刷新しました。',
    points: ['下へ伸びない、短く水平基調のヘッドランプ', 'エンブレムを中心に整えた薄い上部グリル', 'ワイドなロア開口と縦型の外側ガーニッシュ'],
  },
]

const card = (phase) => `<article class="facelift-card"><div class="facelift-card-image"><img src="${phase.image}" alt="PRIUS 50系 ${phase.label}の左前3/4比較画像" ${phase.label === '前期' ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" /></div><div class="facelift-card-copy"><p class="facelift-card-label">${phase.label} · ${phase.period}</p><h2>${phase.title}</h2><p>${phase.lead}</p><ul>${phase.points.map((point) => `<li>${point}</li>`).join('')}</ul></div></article>`

document.querySelector('#prius-facelift-page').innerHTML = `
  <header class="comparison-hero facelift-hero"><a class="comparison-home" href="/">CARVISTA</a><p class="comparison-eyebrow">IDENTIFICATION GUIDE · 50 SERIES PRIUS</p><h1>PRIUS 50系<br />前期・後期の違い</h1><p class="comparison-intro">4代目PRIUS（50系）は、2018年12月17日のマイナーチェンジでフロントマスクを刷新。同じA Touring Selection・2WD、同じスタジオ条件の画像で、年式固有の違いだけを比較します。</p><div class="comparison-actions"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div></header>
  <section class="facelift-answer" aria-label="最短の見分け方"><p>FAST ANSWER</p><strong>ヘッドランプが縦へ長く折れ曲がれば前期、短く水平基調なら後期。</strong><span>ランプだけで迷う場合は、バンパー外側の縦型部分と下部開口も一組で確認します。登録年だけで断定せず、初度登録年月と車検証の型式も照合してください。</span></section>
  <section class="facelift-compare" aria-label="前期と後期の詳細比較"><p class="comparison-eyebrow">SAME ANGLE · DETAILED COMPARE</p><h2>同じA Touring Selection・2WDで、2018年改良だけを読む</h2><p class="facelift-section-intro">比較対象はZVW51 A Touring Selection・2WD、ホワイトパールクリスタルシャイン。E-Four、特別仕様車、メーカーオプションやカスタマイズパーツの差は、前後期固有の変更として扱っていません。</p><div class="facelift-grid">${phases.map(card).join('')}</div></section>
  <section class="facelift-timeline" aria-label="PRIUS 50系の年式タイムライン"><p class="comparison-eyebrow">TIMELINE BRANCH</p><h2>50系は2018年12月17日で分ける</h2><div class="timeline-track"><article><span>2015.12.09</span><h3>4代目を発売</h3><p>TNGAを初採用。2WDはZVW50/ZVW51、E-FourはZVW55です。</p></article><article><span>2015.12〜2018.12.16</span><h3>前期</h3><p>縦へ伸びる稲妻形ヘッドランプが外観上の代表的な識別点です。</p></article><article class="timeline-change"><span>2018.12.17</span><h3>マイナーチェンジ</h3><p>グリル、バンパー、ランプ類を変更。A Touring Selection・2WDも継続設定されました。</p></article><article><span>2018.12.17〜2023.01.09</span><h3>後期</h3><p>短い水平基調のランプを採用。2023年1月10日に5代目へ交代しました。</p></article></div></section>
  <section class="facelift-checklist" aria-label="中古車の見分け方"><p class="comparison-eyebrow">USED CAR CHECK</p><h2>中古車写真で確認する3点</h2><ol><li><b>ヘッドランプ外側</b><span>バンパーへ縦に深く伸びれば前期、フェンダー側へ短く収まる水平基調なら後期です。</span></li><li><b>バンパーと開口部</b><span>ロアグリルと外側の縦型部分を同時に見ます。社外エアロ装着車は純正形状と照合してください。</span></li><li><b>初度登録と型式</b><span>ZVW51だけでは前後期を確定できません。2018年12月17日の改良時期と車両情報を重ねて判断します。</span></li></ol></section>
  <section class="comparison-reading facelift-reading" aria-label="2018年マイナーチェンジの要点"><p class="comparison-eyebrow">2018 FACELIFT</p><h2>変化はランプ単体ではなく、フロントフェイス全体</h2><article><h3>ランプ、グリル、バンパーを同時に刷新</h3><p>Toyota公式発表では、親しみやすく先進的なデザインを狙い、グリル、バンパー、ランプ類を変更しています。前期の特徴的な縦長ランプを短く整理し、薄い上部グリル、ワイドな下部開口、外側の縦型加飾を組み合わせたのが後期です。</p></article><article><h3>ホイールは前後期判別の補助情報</h3><p>後期の17インチアルミホイールにはチタン調の樹脂加飾が採用されました。ただしグレードや装着品でも変わるため、ホイールだけで断定せず、前面造形と車両情報を優先します。</p></article></section>
  <section class="comparison-next" aria-label="関連ページ"><p class="comparison-eyebrow">KEEP EXPLORING</p><h2>PRIUSの歴代5世代へ戻る</h2><div class="comparison-next-grid"><a href="/cars/prius.html" data-related-link><strong>PRIUSの歴代モデル</strong><span>10系から60系まで、5世代の型式とデザイン進化を確認する。</span><b>見る →</b></a><a href="/cars/prius.html#timeline" data-related-link><strong>PRIUS Timeline</strong><span>フルモデルチェンジと50系の位置づけを時系列で追う。</span><b>たどる →</b></a></div></section>
  <section class="facelift-source" aria-label="公式情報源"><p>FACT CHECK</p><span>年式、型式、グレードと変更内容は、<a href="https://global.toyota/jp/newsroom/toyota/21810973.html" target="_blank" rel="noopener noreferrer">Toyota公式 2015年発売資料</a>、<a href="https://global.toyota/jp/newsroom/toyota/25674138.html" target="_blank" rel="noopener noreferrer">Toyota公式 2018年マイナーチェンジ資料</a>で確認しています。</span></section>
  <a class="comparison-more" href="/cars/prius.html">PRIUSの歴代モデル一覧を見る</a>`

async function copyUrl(button, message) { await navigator.clipboard.writeText(location.href); button.textContent = message }
document.querySelector('.share-button').addEventListener('click', async (event) => { trackEvent('share_identification_guide', { vehicle: 'PRIUS', intent: '50-zenki-kouki', method: navigator.share ? 'native' : 'copy' }); if (navigator.share) return navigator.share({ title: document.title, text: 'PRIUS 50系 前期・後期の違い', url: location.href }); await copyUrl(event.currentTarget, 'URLをコピーしました') })
document.querySelector('.copy-button').addEventListener('click', (event) => { trackEvent('copy_identification_guide_url', { vehicle: 'PRIUS', intent: '50-zenki-kouki' }); return copyUrl(event.currentTarget, 'コピーしました') })
document.querySelectorAll('[data-related-link]').forEach((link) => link.addEventListener('click', () => trackEvent('open_related_content', { vehicle: 'PRIUS', intent: '50-zenki-kouki' })))
