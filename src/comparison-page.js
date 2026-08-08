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
      <img src="${generation.image}" alt="${car.vehicleName} ${generation.title}" loading="lazy" decoding="async" />
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
