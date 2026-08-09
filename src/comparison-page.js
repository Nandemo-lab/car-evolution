import './comparison-page.css'
import voxy from './cars/voxy.js'
import noah from './cars/noah.js'
import esquire from './cars/esquire.js'
import alphard from './cars/alphard.js'
import vellfire from './cars/vellfire.js'
import { trackEvent } from './analytics.js'

const pages = {
  'voxy-noah-esquire': {
    eyebrow: 'SIDE BY SIDE',
    title: 'VOXY・NOAH・ESQUIREを見比べる',
    intro: '同じ時代を走った3台を、CarVistaの統一された視点で並べました。まずは表情の違いから見てみてください。',
    guideNote: '3台は近い時代・近いクラスに位置するため、ここではスペックではなくフロントマスクがつくる印象の違いに注目します。',
    cars: [voxy, noah, esquire],
    images: {
      VOXY: { standard: '/images/cars/voxy/compare-standard-v1.png' },
      NOAH: { standard: '/images/cars/noah/compare-standard-v1.png' },
      ESQUIRE: { standard: '/images/cars/esquire/compare-standard-v1.png' },
    },
    reading: [
      { heading: '3台は「兄弟車」でも、見せたい印象が違う', text: 'VOXY・NOAH・ESQUIREは、同じ時代のミニバンとして近い基本構成を共有していました。そのため、ここでは大きさや装備の優劣ではなく、まず顔つきが生む印象に絞って見比べます。グリルの形、ライトのつながり方、クロームの量を見ると、各モデルがどんな存在感を目指したかを追いやすくなります。' },
      { heading: 'VOXYは、動きのある表情を選びたい人へ', text: 'VOXYは、シャープなライトと前に出るフロントマスクが特徴です。ミニバンらしい実用性を保ちながらも、停車中に少し低く、速く見える表情をつくっています。歴代モデルを見るときは、ライトの輪郭とグリルの主張の変化を追うと、VOXYらしい方向性がわかります。' },
      { heading: 'NOAHとESQUIREは、落ち着きと上質感で分かれる', text: 'NOAHは水平基調のまとまりによって、端正で安心感のある表情をつくります。ESQUIREはクロームの使い方を強め、同じサイズのボディによりフォーマルな印象を与えます。購入前の比較では、ボディカラーやグレードだけでなく、普段どんな場面でこの顔つきを見るかを想像すると選びやすくなります。' },
    ],
    notes: {
      VOXY: 'シャープでダイナミック。フロント全体に強い張りを感じる表情。',
      NOAH: '横方向の落ち着きが中心。端正で安定感のある表情。',
      ESQUIRE: 'クロームの存在感が際立つ、より洗練された表情。',
    },
  },
  'alphard-vellfire': {
    eyebrow: 'SIDE BY SIDE',
    title: 'Alphard・Vellfireの違い',
    intro: '同じ世代の2台を並べると、フロントマスクが目指す個性の差が見えてきます。',
    guideNote: 'ここでは、CarVistaが各モデルの代表的な仕様として掲載している画像をもとに、デザイン上の印象を比較しています。',
    cars: [alphard, vellfire],
    images: {
      Alphard: { standard: '/images/cars/alphard/compare-standard-v3.png', detail: '/images/cars/alphard/compare-front-detail-v4.png' },
      Vellfire: { standard: '/images/cars/vellfire/compare-standard-v3.png', detail: '/images/cars/vellfire/compare-front-detail-v4.png' },
    },
    focus: [
      { name: 'Alphard', label: '整った面と大きなグリルの構成', image: '/images/cars/alphard/compare-front-detail-v4.png' },
      { name: 'Vellfire', label: '鋭いライトと重層的なグリルの構成', image: '/images/cars/vellfire/compare-front-detail-v4.png' },
    ],
    reading: [
      { heading: '共通の土台に、異なるキャラクターを与えた2台', text: 'AlphardとVellfireは、基本となるボディの存在感を共有しながら、フロントマスクで受ける印象を明確に分けています。CarVistaでは、同じ角度・同じ条件のビジュアルにそろえることで、サイズ感ではなく、ライト、グリル、バンパーの構成による違いを見やすくしています。' },
      { heading: 'Alphardは威厳、Vellfireは前に出る個性', text: 'Alphardは大きな面と整った線によって、落ち着きと威厳を感じさせる方向です。一方のVellfireは、より大胆な造形と鋭い要素で、強い個性を前に出します。どちらが上という比較ではなく、乗る人が求める見られ方に合わせて選ぶ2台だと考えると、その違いがつかみやすくなります。' },
    ],
    notes: {
      Alphard: '存在感と威厳を軸にした、落ち着きのあるフロントマスク。',
      Vellfire: 'より大胆でアグレッシブ。個性を前に出したフロントマスク。',
    },
  },
  'voxy-generations': {
    eyebrow: 'EVOLUTION GUIDE',
    title: '歴代VOXYの見分け方',
    intro: '世代ごとのフロントマスクとプロポーションを並べて、VOXYの変化をたどります。',
    cars: [voxy],
  },
  'alphard-generations': {
    eyebrow: 'EVOLUTION GUIDE',
    title: '歴代Alphardを見比べる',
    intro: '4世代のAlphardを同じ視点で比較。世代ごとの存在感の変化を見てください。',
    cars: [alphard],
  },
}

const slug = document.documentElement.dataset.comparison
const page = pages[slug]
if (!page) throw new Error(`Unknown comparison page: ${slug}`)

const cards = page.cars.flatMap((car) => {
  const generations = page.cars.length === 1 ? car.generations : [car.generations.at(-1)]
  return generations.map((generation) => `
    <a class="comparison-card" href="/cars/${car.vehicleName.toLowerCase().replaceAll(' ', '-')}.html">
      <img src="${page.images?.[car.vehicleName]?.standard || generation.image}" alt="${car.vehicleName} ${generation.title}" loading="lazy" decoding="async" />
      <span class="comparison-card-copy">
        <span class="comparison-card-name">${car.vehicleName}</span>
        <span class="comparison-card-meta">${generation.title} · ${generation.period}</span>
        ${page.notes?.[car.vehicleName] ? `<span class="comparison-card-note">${page.notes[car.vehicleName]}</span>` : ''}
      </span>
    </a>`)
}).join('')

document.querySelector('#comparison-page').innerHTML = `
  <header class="comparison-hero">
    <a class="comparison-home" href="/">CARVISTA</a>
    <p class="comparison-eyebrow">${page.eyebrow}</p><h1>${page.title}</h1><p class="comparison-intro">${page.intro}</p>
    <div class="comparison-actions"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div>
  </header>
  <section class="comparison-grid" aria-label="比較一覧">${cards}</section>
  ${page.guideNote ? `<section class="comparison-guide-note" aria-label="比較の基準"><p>${page.guideNote}</p></section>` : ''}
  <a class="comparison-more" href="/#all-cars">ほかの車種の進化を見る</a>`

if (page.reading) {
  document.querySelector('.comparison-more').insertAdjacentHTML('beforebegin', `
    <section class="comparison-reading" aria-label="デザインの読み解き">
      <p class="comparison-eyebrow">DESIGN NOTES</p><h2>見比べるポイント</h2>
      ${page.reading.map((item) => `<article><h3>${item.heading}</h3><p>${item.text}</p></article>`).join('')}
    </section>`)
}

if (page.focus) {
  document.querySelector('.comparison-more').insertAdjacentHTML('beforebegin', `
    <section class="comparison-focus" aria-label="フロントマスクの比較">
      <p class="comparison-eyebrow">FRONT MASK FOCUS</p><h2>顔つきを、同じ角度で読む</h2>
      <p class="comparison-focus-intro">フロントマスクの違いがもっとも読み取りやすい、正面寄りの共通アングルです。ライト、グリル、バンパーのつながりに注目して見比べてください。</p>
      <div class="comparison-focus-grid">${page.focus.map((item) => `<figure><img src="${item.image}" alt="${item.name}のフロントマスク" loading="lazy" decoding="async" /><figcaption><strong>${item.name}</strong><span>${item.label}</span></figcaption></figure>`).join('')}</div>
    </section>`)
}

async function copyUrl(button, message) {
  await navigator.clipboard.writeText(location.href)
  button.textContent = message
}

document.querySelector('.share-button').addEventListener('click', async (event) => {
  trackEvent('share_comparison', { comparison: slug, method: navigator.share ? 'native' : 'copy' })
  if (navigator.share) return navigator.share({ title: document.title, text: page.title, url: location.href })
  await copyUrl(event.currentTarget, 'URLをコピーしました')
})

document.querySelector('.copy-button').addEventListener('click', (event) => {
  trackEvent('copy_comparison_url', { comparison: slug })
  return copyUrl(event.currentTarget, 'コピーしました')
})
