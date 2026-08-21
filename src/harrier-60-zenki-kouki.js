import './comparison-page.css'
import './alphard-30-zenki-kouki.css'
import './click-glow.js'
import { trackEvent } from './analytics.js'

const phases = [
  {
    label: '前期', period: '2013年12月2日発売〜2017年6月改良前', image: '/images/cars/harrier/gen3-2013-zsu60w.png',
    title: '横長ロアグリルと丸型フォグの前期',
    lead: '比較基準は発売時のZSU60W PREMIUM Advanced Package・2.0Lガソリン・2WD。前期はバンパー中央の横長開口、独立した丸型フォグ、ヘッドランプ下辺に沿う細い灯火部が目印です。',
    points: ['横長スリットを重ねたロアグリル', 'バンパー左右に独立した丸型フォグ', '下辺へ細く伸びる前期ヘッドランプ意匠'],
  },
  {
    label: '後期', period: '2017年6月8日発売〜2020年6月', image: '/images/cars/harrier/gen3-2017-zsu60w-post-facelift.png',
    title: '縦型ランプとワイド開口へ刷新した後期',
    lead: '比較条件を揃えたZSU60W PREMIUM・2.0Lガソリン・2WD。後期はマルチプロジェクター式LEDヘッドランプとシーケンシャルターンランプ、縦型のコーナー部、輪郭を広げたロア開口へ変わりました。',
    points: ['マルチプロジェクター式LEDと流れるターンランプ', 'バンパー左右に立つ縦型の灯火・加飾', '左右へ広がるロア開口と改められたバンパー'],
  },
]

const card = (phase) => `<article class="facelift-card"><div class="facelift-card-image"><img src="${phase.image}" alt="HARRIER 60系 ${phase.label}の左前3/4比較画像" ${phase.label === '前期' ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" /></div><div class="facelift-card-copy"><p class="facelift-card-label">${phase.label} · ${phase.period}</p><h2>${phase.title}</h2><p>${phase.lead}</p><ul>${phase.points.map((point) => `<li>${point}</li>`).join('')}</ul></div></article>`

document.querySelector('#harrier-facelift-page').innerHTML = `
  <header class="comparison-hero facelift-hero"><a class="comparison-home" href="/">CARVISTA</a><p class="comparison-eyebrow">IDENTIFICATION GUIDE · 60 SERIES HARRIER</p><h1>HARRIER 60系<br />前期・後期の違い</h1><p class="comparison-intro">3代目HARRIER（60系）は2017年6月8日のマイナーチェンジでフロントフェイスを刷新。ターボ追加や特別仕様の差を混ぜず、2.0L自然吸気ガソリン・2WDのPREMIUM系で年式固有の違いを比べます。</p><div class="comparison-actions"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div></header>
  <section class="facelift-answer" aria-label="最短の見分け方"><p>FAST ANSWER</p><strong>丸型フォグ＋横長開口なら前期、縦型ランプ＋ワイド開口なら後期。</strong><span>ライトだけで迷う場合はバンパー左右を見るのが近道です。後期は縦型の灯火・加飾とシーケンシャルターンランプを採用します。</span></section>
  <section class="facelift-compare" aria-label="前期と後期の詳細比較"><p class="comparison-eyebrow">SAME ANGLE · DETAILED COMPARE</p><h2>同じZSU60W・2.0Lガソリン・2WDで比べる</h2><p class="facelift-section-intro">ボディカラーは両年式に公式設定されたホワイトパールクリスタルシャイン〈070〉。後期に追加されたターボ車の専用メッシュグリルや専用ホイール、ハイブリッド、特別仕様車、用品装着車の差は前後期差に含めません。</p><div class="facelift-grid">${phases.map(card).join('')}</div></section>
  <section class="facelift-timeline" aria-label="HARRIER 60系の年式タイムライン"><p class="comparison-eyebrow">TIMELINE BRANCH</p><h2>60系は2017年6月8日で分ける</h2><div class="timeline-track"><article><span>2013.12.02</span><h3>3代目60系を発売</h3><p>ガソリン2WDはZSU60W、ガソリン4WDはZSU65W、ハイブリッドE-FourはAVU65Wです。</p></article><article><span>2013.12〜2017.06改良前</span><h3>前期</h3><p>横長の下部開口と丸型フォグを採用。比較車はPREMIUM Advanced Packageです。</p></article><article class="timeline-change"><span>2017.06.08</span><h3>マイナーチェンジ</h3><p>フロントフェイスと灯火類を変更し、シーケンシャルターンランプを採用。ターボ車も追加されました。</p></article><article><span>2017.06.08発売〜2020.06</span><h3>後期</h3><p>60系はToyota公式カタログ上で2020年6月まで。80系は同月17日に発売されました。</p></article></div></section>
  <section class="facelift-checklist" aria-label="中古車の見分け方"><p class="comparison-eyebrow">USED CAR CHECK</p><h2>中古車写真で確認する3点</h2><ol><li><b>バンパー左右</b><span>丸型フォグが独立していれば前期、細い縦型の灯火・加飾なら後期です。</span></li><li><b>ライトとロア開口</b><span>後期はマルチプロジェクター式LEDとシーケンシャルターンランプ、左右へ広い下部開口を一組で確認します。</span></li><li><b>初度登録と型式</b><span>ZSU60Wだけでは前後期を確定できません。2017年6月8日の改良時期、車検証、純正バンパーかどうかも照合してください。</span></li></ol></section>
  <section class="comparison-reading facelift-reading" aria-label="2017年マイナーチェンジの要点"><p class="comparison-eyebrow">2017 FACELIFT</p><h2>灯火類とバンパー全体をまとめて判別</h2><article><h3>流れるターンランプを60系で採用</h3><p>Toyota公式は、右左折時に16灯のLEDが内側から外側へ流れるシーケンシャルターンランプと、LEDコーナリングランプの設定を説明しています。静止画ではランプ内部と縦型コーナー部を確認します。</p></article><article><h3>ターボ専用意匠と混同しない</h3><p>2017年には2.0L直噴ターボも追加され、専用アッパー／ロアグリルと専用18インチホイールが設定されました。このページは自然吸気ガソリン車に固定し、それらを前後期共通の変更として扱っていません。</p></article></section>
  <section class="comparison-next" aria-label="関連ページ"><p class="comparison-eyebrow">KEEP EXPLORING</p><h2>HARRIERの歴代モデルへ戻る</h2><div class="comparison-next-grid"><a href="/cars/harrier.html" data-related-link><strong>HARRIERの歴代モデル</strong><span>10系・30系・60系・80系のデザイン進化を統一画像で確認する。</span><b>見る →</b></a><a href="/cars/harrier.html#timeline" data-related-link><strong>HARRIER Timeline</strong><span>60系と80系の世代切替を時系列でたどる。</span><b>たどる →</b></a></div></section>
  <section class="facelift-source" aria-label="公式情報源"><p>FACT CHECK</p><span>年式、型式、グレード、ボディカラーと変更内容は、<a href="https://global.toyota/jp/detail/1019785" target="_blank" rel="noopener noreferrer">Toyota公式 2013年発売資料</a>、<a href="https://global.toyota/jp/newsroom/toyota/21822546.html" target="_blank" rel="noopener noreferrer">Toyota公式 2017年マイナーチェンジ資料</a>、<a href="https://toyota.jp/pages/contents/carlineup/archive/harrier/2017-06/pdf/harrier_main_s_201706.pdf" target="_blank" rel="noopener noreferrer">Toyota公式 2017年カタログ・主要諸元</a>で確認しています。</span></section>
  <a class="comparison-more" href="/cars/harrier.html">HARRIERの歴代モデル一覧を見る</a>`

async function copyUrl(button, message) { await navigator.clipboard.writeText(location.href); button.textContent = message }
document.querySelector('.share-button').addEventListener('click', async (event) => { trackEvent('share_identification_guide', { vehicle: 'HARRIER', intent: '60-zenki-kouki', method: navigator.share ? 'native' : 'copy' }); if (navigator.share) return navigator.share({ title: document.title, text: 'HARRIER 60系 前期・後期の違い', url: location.href }); await copyUrl(event.currentTarget, 'URLをコピーしました') })
document.querySelector('.copy-button').addEventListener('click', (event) => { trackEvent('copy_identification_guide_url', { vehicle: 'HARRIER', intent: '60-zenki-kouki' }); return copyUrl(event.currentTarget, 'コピーしました') })
document.querySelectorAll('[data-related-link]').forEach((link) => link.addEventListener('click', () => trackEvent('open_related_content', { vehicle: 'HARRIER', intent: '60-zenki-kouki' })))
