import './comparison-page.css'
import './land-cruiser-300-vs-250.css'
import './click-glow.js'
import { trackEvent } from './analytics.js'

const card = (car, index) => `<article class="lc-car" id="${car.id}"><img src="${car.image}" alt="${car.alt}" ${index ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async" /><div class="lc-car-copy"><small>${car.label}</small><h3>${car.name}</h3><p>${car.text}</p></div></article>`
const blocks = (items) => items.map((item) => `<article><h3>${item.title}</h3><p>${item.text}</p></article>`).join('')
const relatedCard = (link, index, cars) => {
  const image = link.image || cars[index % cars.length]?.image
  return `<a class="lc-related-card" href="${link.href}">${image ? `<img src="${image}" alt="" loading="lazy" decoding="async" />` : ''}<span><strong>${link.title}</strong><small>${link.text}</small><b>ガイドを開く →</b></span></a>`
}

export function renderGenerationComparison(data) {
  document.querySelector(data.root).innerHTML = `
    <header class="comparison-hero"><a class="comparison-home" href="/">CARVISTA</a><p class="comparison-eyebrow">${data.eyebrow}</p><h1>${data.heading}</h1><p class="comparison-intro">${data.intro}</p><div class="comparison-actions"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div></header>
    <section class="lc-section lc-answer" aria-label="結論"><p class="comparison-eyebrow">FAST ANSWER</p><strong>${data.answer.title}</strong><span>${data.answer.text}</span></section>
    <section class="lc-section" aria-label="外観比較"><p class="comparison-eyebrow">SAME STUDIO · EXTERIOR</p><h2>${data.comparisonTitle || '2台を画像で比較'}</h2><p class="lc-lead">${data.imageNote}</p><div class="lc-cars">${data.cars.map(card).join('')}</div></section>
    <section class="lc-section" aria-label="見分け方"><p class="comparison-eyebrow">IDENTIFICATION</p><h2>まずここを見れば分かる</h2><div class="lc-grid">${blocks(data.identification)}</div></section>
    <section class="lc-section" aria-label="主な違い"><p class="comparison-eyebrow">WHAT CHANGED</p><h2>${data.changesTitle || '世代交代で変わったこと'}</h2><div class="lc-grid">${blocks(data.changes)}</div></section>
    <section class="lc-section" aria-label="サイズ比較"><p class="comparison-eyebrow">DIMENSIONS</p><h2>ボディサイズ比較</h2><div class="lc-table-wrap"><table class="lc-table"><thead><tr><th>公式諸元</th><th>${data.cars[0].short}</th><th>${data.cars[1].short}</th></tr></thead><tbody>${data.dimensions.map((row) => `<tr><th>${row[0]}</th><td>${row[1]}</td><td>${row[2]}</td></tr>`).join('')}</tbody></table></div><p class="lc-note">${data.dimensionNote}</p></section>
    <section class="lc-section" aria-label="選び方"><p class="comparison-eyebrow">WHICH ONE?</p><h2>どちらが向く？</h2><div class="lc-grid">${blocks(data.choices)}</div></section>
    ${data.used ? `<section class="lc-section" aria-label="中古車判別"><p class="comparison-eyebrow">USED CAR CHECK</p><h2>中古車で確定する方法</h2><div class="lc-grid">${blocks(data.used)}</div></section>` : ''}
    <section class="lc-section" aria-label="関連ガイド"><p class="comparison-eyebrow">RELATED GUIDES</p><h2>さらに詳しく見る</h2><div class="lc-related-grid">${data.links.map((link, index) => relatedCard(link, index, data.cars)).join('')}</div></section>
    <section class="lc-section lc-source" aria-label="公式根拠"><p class="comparison-eyebrow">FACT CHECK</p><p class="lc-lead">${data.sources.map((source) => `<a href="${source.href}" target="_blank" rel="noopener noreferrer">${source.label}</a>`).join('、')}で発売時期、代表仕様、外観変更、主要諸元を照合しました。旧型の終了日は次世代発売日前日から推定せず、年・月の粒度で表示しています。</p><p class="lc-note">編集：CarVista編集部 · 確認日：2026年9月3日 · <a href="/editorial-policy.html">制作方針</a></p></section>
    <a class="comparison-more" href="${data.historyHref}">${data.vehicle}の歴代ページへ戻る</a><footer class="comparison-trust"><nav><a href="/#all-cars">車種一覧</a><a href="/#comparison-links-title">比較ガイド</a><a href="/about.html">運営情報</a><a href="/editorial-policy.html">制作方針</a><a href="/privacy.html">プライバシー</a><a href="/contact.html">お問い合わせ</a></nav></footer>`

  const copy = async (button, label) => { await navigator.clipboard.writeText(location.href); button.textContent = label }
  document.querySelector('.share-button').addEventListener('click', async (event) => { trackEvent('share_generation_comparison', { vehicle: data.vehicle, intent: data.intent }); if (navigator.share) return navigator.share({ title: document.title, text: data.shareText, url: location.href }); return copy(event.currentTarget, 'URLをコピーしました') })
  document.querySelector('.copy-button').addEventListener('click', (event) => copy(event.currentTarget, 'コピーしました'))
}
