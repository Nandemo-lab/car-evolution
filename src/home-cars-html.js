import { getDiscoveryImage, getDiscoveryStyle } from './discovery.js'
function groupByMaker(cars, roadmap) {
  const groups = new Map()
  for (const car of cars) {
    if (!groups.has(car.maker)) groups.set(car.maker, { maker: car.maker, cars: [], comingSoon: [] })
    groups.get(car.maker).cars.push(car)
  }
  for (const item of roadmap) {
    if (!groups.has(item.maker)) groups.set(item.maker, { maker: item.maker, cars: [], comingSoon: [] })
    groups.get(item.maker).comingSoon.push(item)
  }
  return [...groups.values()]
}

export function homeCarsHtml(cars, roadmap = []) {
  const groups = groupByMaker(cars, roadmap)

  return groups
    .map(
      (group) => `
    <div class="maker-group">
      <h2 class="maker-name">${group.maker}</h2>
      <div class="maker-cars">
        ${group.cars
          .map(
            (car) => `
          <a class="mini-card" href="/cars/${car.slug}.html">
            <span class="mini-card-photo"><img src="${getDiscoveryImage(car)}" style="${getDiscoveryStyle(car)}" alt="${car.vehicleName}" loading="lazy" decoding="async" /></span>
            <span class="mini-card-name">${car.vehicleName}</span>
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
