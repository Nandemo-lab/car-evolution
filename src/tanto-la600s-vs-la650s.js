import './comparison-page.css'
import './land-cruiser-300-vs-250.css'
import './click-glow.js'
import { trackEvent } from './analytics.js'

const cars = [
  {
    id: 'la600s', name: 'LA600S', label: '3代目 / 2013年登場', image: '/images/cars/tanto/gen3-2013-la600s.png',
    alt: '3代目ダイハツ タント LA600S X SA パールホワイトIIIの左前3/4画像',
    text: '標準タント X SA・660cc自然吸気・2WDの代表仕様。角を強めたヘッドランプと、大きな下部開口が目印です。',
  },
  {
    id: 'la650s', name: 'LA650S', label: '4代目 / 2019年登場', image: '/images/cars/tanto/gen4-2019-la650s.png',
    alt: '4代目ダイハツ タント LA650S X シャイニングホワイトパールの左前3/4画像',
    text: '標準タント X・660cc自然吸気・2WDの代表仕様。水平ガーニッシュと、すっきりした面構成が目印です。',
  },
]

const carCard = (car, index) => `<article class="lc-car" id="${car.id}"><img src="${car.image}" alt="${car.alt}" ${index ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async" /><div class="lc-car-copy"><small>${car.label}</small><h3>${car.name}</h3><p>${car.text}</p></div></article>`

document.querySelector('#tanto-comparison-page').innerHTML = `
  <header class="comparison-hero"><a class="comparison-home" href="/">CARVISTA</a><p class="comparison-eyebrow">DAIHATSU OFFICIAL FACT CHECK · 3RD VS 4TH</p><h1>タント LA600SとLA650Sの違い<br />3代目・4代目の見分け方</h1><p class="comparison-intro">LA600Sは3代目、LA650Sは4代目の2WD代表型式です。2019年7月のフルモデルチェンジを境にした別世代で、前期・後期の違いではありません。</p><div class="comparison-actions"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div></header>
  <section class="lc-section" aria-label="画像比較"><p class="comparison-eyebrow">LOOK FIRST</p><h2>まず2台の顔を見る</h2><div class="lc-cars">${cars.map(carCard).join('')}</div></section>
  <section class="lc-section lc-answer" aria-label="一番簡単な見分け方"><p class="comparison-eyebrow">FAST ANSWER</p><strong>ランプとフロント中央の横ラインが最短の見分け方。</strong><span>LA600Sは角張ったランプと大きな下部開口、LA650Sは細長いランプと黒い水平ガーニッシュが特徴です。どちらも標準タントで、カスタム専用顔は比較に混ぜていません。</span></section>
  <section class="lc-section" aria-label="主要な違い"><p class="comparison-eyebrow">KEY DIFFERENCES</p><h2>世代交代で変わったこと</h2><div class="lc-quick-facts"><article><small>GENERATION</small><strong>3代目<br />→ 4代目</strong><span>2019年7月9日のフルモデルチェンジ。</span></article><article><small>FOUNDATION</small><strong>DNGA<br />第1弾</strong><span>4代目はプラットフォーム、CVT、エンジンを一新。</span></article></div><div class="lc-grid"><article><h3>フロントデザイン</h3><p>3代目は角を強めたランプと力強い下部開口。4代目は水平基調のガーニッシュと端正な面構成へ変化しました。</p></article><article><h3>乗り降りと視界</h3><p>4代目は床面を従来比16mm低くし、Aピラーも細くして乗降性と視界を改善。ミラクルオープンドアは継続採用です。</p></article><article><h3>使い勝手</h3><p>4代目は運転席ロングスライドなどを組み合わせた「ミラクルウォークスルーパッケージ」を導入しました。装備内容はグレードにより異なります。</p></article><article><h3>安全・基本性能</h3><p>4代目は次世代スマートアシストとDNGAの新設計を採用し、走る・曲がる・止まる基本性能も刷新しました。</p></article></div></section>
  <section class="lc-section" aria-label="サイズと型式比較"><p class="comparison-eyebrow">SIZE & MODEL CODE</p><h2>外寸は近く、基本設計が違う</h2><div class="lc-table-wrap"><table class="lc-table"><thead><tr><th>比較項目</th><th>LA600S</th><th>LA650S</th></tr></thead><tbody><tr><th>世代／発売</th><td>3代目／2013年10月</td><td>4代目／2019年7月</td></tr><tr><th>代表仕様</th><td>X SA・NA・2WD</td><td>X・NA・2WD</td></tr><tr><th>全長×全幅</th><td>3,395×1,475 mm</td><td>3,395×1,475 mm</td></tr><tr><th>全高</th><td>1,750 mm</td><td>1,755 mm</td></tr><tr><th>ホイールベース</th><td>2,455 mm</td><td>2,460 mm</td></tr><tr><th>駆動別の主な型式</th><td>LA600S（2WD）<br />LA610S（4WD）</td><td>LA650S（2WD）<br />LA660S（4WD）</td></tr></tbody></table></div><p class="lc-note">標準タントの代表2WD仕様で比較。装備・仕様により数値が異なる場合があります。型式名は世代名そのものではなく、駆動方式などを含む車両型式です。</p></section>
  <section class="lc-section" aria-label="中古車での見分け方"><p class="comparison-eyebrow">USED CAR CHECK</p><h2>中古車は外観→年式→型式で確認</h2><div class="lc-grid"><article><h3>1. 写真でフロントを見る</h3><p>まずランプ、中央の水平ガーニッシュ、バンパー開口を比較します。カスタムは専用外装なので、標準車同士で判断してください。</p></article><article><h3>2. 2019年7月を確認</h3><p>2013年10月登場の3代目と、2019年7月9日登場の4代目が境目です。登録時期だけで迷う場合は車検証の型式へ進みます。</p></article><article><h3>3. 車検証の型式で確定</h3><p>2WDならLA600S／LA650S、4WDならLA610S／LA660Sが基本。販売店の表記だけでなく車検証での確認が確実です。</p></article></div></section>
  <section class="lc-section" aria-label="選び方"><p class="comparison-eyebrow">WHICH ONE?</p><h2>どちらが向いている？</h2><div class="lc-grid"><article><h3>LA600S世代が向く人</h3><p>購入費用を抑えながら、両側スライドドアを採用した3代目の使い勝手と必要装備のバランスを重視する人。</p></article><article><h3>LA650S世代が向く人</h3><p>DNGAの新しい基本設計、乗降性、視界、次世代スマートアシストなど、世代更新による進化を重視する人。</p></article></div></section>
  <section class="lc-section lc-source" aria-label="公式根拠"><p class="comparison-eyebrow">FACT CHECK</p><p class="lc-lead">発売時期、世代、代表仕様、型式、主要変更は、<a href="https://www.daihatsu.com/jp/news/2013/20131003-1.html" target="_blank" rel="noopener noreferrer">ダイハツ公式 2013年発売資料</a>、<a href="https://www.daihatsu.com/jp/news/2019/20190709-1.html" target="_blank" rel="noopener noreferrer">ダイハツ公式 2019年発売資料</a>、<a href="https://www.daihatsu.com/jp/design/vehicle/tanto.html" target="_blank" rel="noopener noreferrer">ダイハツ公式デザイン資料</a>で照合しています。</p></section>
  <a class="comparison-more" href="/cars/tanto.html">タント歴代モデルを見る</a>`

async function copyUrl(button, message) { await navigator.clipboard.writeText(location.href); button.textContent = message }
document.querySelector('.share-button').addEventListener('click', async (event) => { trackEvent('share_comparison', { vehicle: 'TANTO', intent: 'la600s-vs-la650s', method: navigator.share ? 'native' : 'copy' }); if (navigator.share) return navigator.share({ title: document.title, text: 'タント LA600SとLA650Sの違い', url: location.href }); await copyUrl(event.currentTarget, 'URLをコピーしました') })
document.querySelector('.copy-button').addEventListener('click', (event) => { trackEvent('copy_comparison_url', { vehicle: 'TANTO', intent: 'la600s-vs-la650s' }); return copyUrl(event.currentTarget, 'コピーしました') })
