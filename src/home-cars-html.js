import { newModelPages } from './data/new-model-pages.js'
import { getDiscoveryImage, getDiscoveryStyle } from './discovery.js'

export function homeCatalog(cars) {
  return cars.map(car => ({
    ...car,
    href: `/cars/${car.slug}.html`,
    cardType: 'history',
  }))
}

function groupByMaker(cars, roadmap) {
  const groups = new Map()
  const makerLabels = new Map([
    ['toyota', 'TOYOTA'],
    ['nissan', 'NISSAN'],
    ['honda', 'HONDA'],
    ['mitsubishi', 'MITSUBISHI'],
    ['suzuki', 'SUZUKI'],
    ['daihatsu', 'DAIHATSU'],
    ['mazda', 'MAZDA'],
    ['subaru', 'SUBARU'],
  ])
  const normalizeMaker = (maker = '') => makerLabels.get(String(maker).trim().toLowerCase()) || String(maker).trim().toUpperCase()
  for (const car of cars) {
    const maker = normalizeMaker(car.maker)
    if (!groups.has(maker)) groups.set(maker, { maker, cars: [], comingSoon: [] })
    groups.get(maker).cars.push(car)
  }
  for (const item of roadmap) {
    const maker = normalizeMaker(item.maker)
    if (!groups.has(maker)) groups.set(maker, { maker, cars: [], comingSoon: [] })
    groups.get(maker).comingSoon.push(item)
  }
  return [...groups.values()]
}

export function homeCarsHtml(cars, roadmap = []) {
  const groups = groupByMaker(homeCatalog(cars), roadmap)

  return groups
    .map(
      (group) => `
    <div class="maker-group">
      <h2 class="maker-name">${group.maker}</h2>
      <div class="maker-cars">
        ${group.cars
          .map(
            (car) => `
          <a class="mini-card" href="${car.href}" aria-label="${car.vehicleName}${car.cardType === 'comparison' ? 'の新旧比較' : 'の歴代モデル'}">
            <span class="mini-card-photo">${getDiscoveryImage(car) ? `<img src="${getDiscoveryImage(car)}" style="${getDiscoveryStyle(car)}" alt="${car.vehicleName}" loading="lazy" decoding="async" />` : '<span class="mini-card-text-visual">比較ガイド</span>'}</span>
            <span class="mini-card-name">${car.cardName || car.vehicleName}</span>
          </a>`
          )
          .join('')}
        ${group.comingSoon
          .map(
            (item) => `
          <div class="mini-card mini-card--soon" aria-disabled="true">
            <span class="mini-card-photo"></span>
            <span class="mini-card-name">${item.name}</span>
            <span class="mini-card-soon-label">Coming Soon</span>
          </div>`
          )
          .join('')}
      </div>
    </div>`
    )
    .join('')
}

export function homeComparisonLinksHtml() {
  return Object.values(newModelPages)
    .map((page) => `<a href="${page.models[0].url.split('#')[0]}">${page.name}<span>→</span></a>`)
    .join('')
}

export function modelDirectoryHtml(cars) {
  const entries = homeCatalog(cars).flatMap((car) => car.generations.map((generation) => ({ car, generation })))
  const groups = new Map()
  for (const entry of entries) {
    const initial = String(entry.generation.code || '').match(/[A-Z]+/)?.[0]?.[0] || '他'
    if (!groups.has(initial)) groups.set(initial, [])
    groups.get(initial).push(entry)
  }

  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b, 'ja')).map(([initial, items]) => `
    <details class="model-directory-group">
      <summary>${initial}から始まる型式 <span>${items.length}件</span></summary>
      <ul>${items.map(({ car, generation }) => `<li><a href="${car.href || `/cars/${car.slug}.html`}"><strong>${car.vehicleName} ${generation.title}</strong><span>${generation.period} ／ ${generation.code}</span></a></li>`).join('')}</ul>
    </details>`).join('')
}
