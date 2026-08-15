import './comparison-page.css'
import './alphard-30-zenki-kouki.css'
import './click-glow.js'
import { trackEvent } from './analytics.js'

const phases = [
  {
    label: '前期', period: '2016年8月〜2019年8月', image: '/images/cars/serena/c27-highwaystar-pre-facelift-v1.png',
    title: '一重のVモーショングリルと横基調の開口部',
    lead: '前期Highway STARは、クロームのV字を中心に横桟を重ねたグリルと、上下に分かれたヘッドランプが特徴です。バンパー外側の縦長開口と低い位置のフォグがスポーティな表情をつくります。',
    points: ['細い上段ランプと大きな下段ランプの二段構成', '一重のV字と横桟で構成したフロントグリル', '縦長の外側開口、低い角形フォグ、Highway STAR専用エアロバンパー'],
  },
  {
    label: '後期', period: '2019年8月〜2022年12月', image: '/images/cars/serena/c27-highwaystar-post-facelift-v1.png',
    title: '大型ダブルVモーショングリルと宝石調クローム',
    lead: '後期Highway STARは、グリルをバンパー下方まで拡大。ダブルVモーションの輪郭と、宝石を思わせる細かなクロームパターンによって、前期より面積感のある顔になりました。',
    points: ['シャープな上段灯と独立した下段灯を組み合わせた二段構成', '大型ダブルVモーションと細かなクロームグリル', '中央下部の横長開口と角張った外側造形、低い角形フォグ'],
  },
]

const card = (phase) => `<article class="facelift-card"><div class="facelift-card-image"><img src="${phase.image}" alt="SERENA C27 Highway STAR ${phase.label}の左前45度" ${phase.label === '前期' ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" /></div><div class="facelift-card-copy"><p class="facelift-card-label">${phase.label} · ${phase.period}</p><h2>${phase.title}</h2><p>${phase.lead}</p><ul>${phase.points.map((point) => `<li>${point}</li>`).join('')}</ul></div></article>`

document.querySelector('#serena-facelift-page').innerHTML = `
  <header class="comparison-hero facelift-hero"><a class="comparison-home" href="/">CARVISTA</a><p class="comparison-eyebrow">IDENTIFICATION GUIDE · C27 HIGHWAY STAR</p><h1>SERENA C27<br />前期・後期の違い</h1><p class="comparison-intro">同じカメラ・床・照明・車体スケールで、2019年マイナーチェンジ前後のフロント造形だけを比較します。</p><div class="comparison-actions"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div></header>
  <section class="facelift-answer" aria-label="最初に見る判別ポイント"><p>最短の見分け方</p><strong>バンパー下方まで広がる大型ダブルVモーショングリルと、細かな宝石調クロームなら後期Highway STAR。</strong><span>年式だけで断定せず、フロント写真、初度登録年月、車台番号・型式指定情報を販売店で照合してください。</span></section>
  <section class="facelift-compare" aria-label="前期と後期の詳細比較"><p class="comparison-eyebrow">SAME ANGLE · DETAILED COMPARE</p><h2>同一条件で、実車の前後期差だけを読む</h2><p class="facelift-section-intro">比較対象はHighway STAR S-HYBRID 2WD（GFC27系）の代表仕様です。e-POWER、AUTECH、NISMO、特別仕様車やメーカーオプションの差は、前期・後期の違いとして扱っていません。</p><div class="facelift-grid">${phases.map(card).join('')}</div></section>
  <section class="facelift-timeline" aria-label="C27の年式タイムライン"><p class="comparison-eyebrow">TIMELINE BRANCH</p><h2>C27を2019年8月で分ける</h2><div class="timeline-track"><article><span>2016.08.24</span><h3>C27登場</h3><p>ガソリン／S-HYBRIDを設定。Highway STAR 2WDはDAA-GFC27です。</p></article><article><span>2018.03</span><h3>e-POWER追加</h3><p>e-POWER Highway STARはHFC27。追加時期とパワートレイン差は、前後期の境界ではありません。</p></article><article class="timeline-change"><span>2019.08.01</span><h3>マイナーチェンジ</h3><p>Highway STARの大型ダブルVモーショングリルなど、フロントフェイスを刷新しました。</p></article><article><span>2019.08〜2022.12</span><h3>後期</h3><p>Highway STAR S-HYBRID 2WDはGFC27系。登録時期によりDAA／5AAの排出ガス識別記号が異なります。</p></article></div></section>
  <section class="facelift-checklist" aria-label="中古車の見分け方"><p class="comparison-eyebrow">USED CAR CHECK</p><h2>購入前に照合する3点</h2><ol><li><b>フロント全体</b><span>グリルのV字、クロームパターン、中央開口、外側バンパーを一組で確認する。</span></li><li><b>グレードと動力</b><span>Highway STARか標準車か、S-HYBRIDかe-POWERかを車両情報で分ける。</span></li><li><b>型式と登録年月</b><span>GFC27（2WD）、GFNC27（4WD）、e-POWERのHFC27などを車検証で照合する。</span></li></ol></section>
  <section class="comparison-reading facelift-reading" aria-label="2019年の変更点"><p class="comparison-eyebrow">2019 FACELIFT</p><h2>変わったのはランプ単体ではなく、顔全体の構成</h2><article><h3>グリルとメッキ加飾</h3><p>後期Highway STARはダブルVモーションを大型化し、細かなクロームパターンを内部に配置。前期の横桟中心の見え方から、縦方向にも広がる面構成へ変わりました。</p></article><article><h3>バンパー・開口部・フォグ周辺</h3><p>後期はグリル下の横長開口と外側の角張った造形を連続させています。フォグだけを見るのではなく、グリルからバンパー下端までを一体で比べるのが確実です。</p></article></section>
  <section class="comparison-next" aria-label="関連ページ"><p class="comparison-eyebrow">KEEP EXPLORING</p><h2>SERENAの歴代モデルと競合車へ</h2><div class="comparison-next-grid"><a href="/cars/serena.html" data-related-link><strong>SERENAの歴代モデル</strong><span>C23からC28までの進化を見る。</span><b>見る →</b></a><a href="/compare-noah-serena-stepwgn.html" data-related-link><strong>NOAH・SERENA・STEP WGN</strong><span>Mクラスミニバン3台を同じ視点で比べる。</span><b>比べる →</b></a><a href="/cars/noah.html" data-related-link><strong>NOAHの歴代モデル</strong><span>トヨタの競合ミニバンの世代差を確認する。</span><b>見る →</b></a><a href="/cars/stepwgn.html" data-related-link><strong>STEP WGNの歴代モデル</strong><span>ホンダの競合ミニバンの変遷を見る。</span><b>見る →</b></a></div></section>
  <section class="facelift-source" aria-label="公式情報源"><p>FACT CHECK</p><span>年式・グレード・造形は<a href="https://global.nissannews.com/ja-JP/releases/160824-01-j" target="_blank" rel="noopener noreferrer">日産公式 2016年発売資料</a>、<a href="https://history.nissan.co.jp/SERENA/C27/1608/exterior_interior.html" target="_blank" rel="noopener noreferrer">日産公式 前期型アーカイブ</a>、<a href="https://history.nissan.co.jp/SERENA/C27/1908/exterior.html" target="_blank" rel="noopener noreferrer">日産公式 後期型アーカイブ</a>、<a href="https://history.nissan.co.jp/ARCHIVES/PDF/SERENA/C27/20190801/serena_specsheet.pdf" target="_blank" rel="noopener noreferrer">2019年8月 主要諸元</a>で確認しています。</span></section>
  <a class="comparison-more" href="/cars/serena.html">SERENAの歴代モデル一覧を見る</a>`

async function copyUrl(button, message) { await navigator.clipboard.writeText(location.href); button.textContent = message }
document.querySelector('.share-button').addEventListener('click', async (event) => { trackEvent('share_identification_guide', { vehicle: 'SERENA', intent: 'c27-zenki-kouki', method: navigator.share ? 'native' : 'copy' }); if (navigator.share) return navigator.share({ title: document.title, text: 'SERENA C27 前期・後期の違い', url: location.href }); await copyUrl(event.currentTarget, 'URLをコピーしました') })
document.querySelector('.copy-button').addEventListener('click', (event) => { trackEvent('copy_identification_guide_url', { vehicle: 'SERENA', intent: 'c27-zenki-kouki' }); return copyUrl(event.currentTarget, 'コピーしました') })
document.querySelectorAll('[data-related-link]').forEach((link) => link.addEventListener('click', () => trackEvent('open_related_content', { vehicle: 'SERENA', intent: 'c27-zenki-kouki' })))
