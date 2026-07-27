import './home.css'
import roadmap from './roadmap.js'

// CarVista -- Home page engine ---------------------------------
// Every published vehicle is discovered from src/cars/*.js via Vite's
// import.meta.glob (eager: true bundles them directly into this page's
// chunk -- no extra network round trip for card data). Adding a new
// vehicle means adding its src/cars/<slug>.js file; nothing here
// changes. `order` controls display order across both Featured Cars
// and All Cars (see each car's data file). All Cars always shows every
// vehicle; Featured Cards only shows the ones with `featured: true` --
// a curated "start here" set, not an automatic "every vehicle" list.
const carModules = import.meta.glob('./cars/*.js', { eager: true })
const cars = Object.entries(carModules)
  .map(([path, mod]) => ({ ...mod.default, slug: path.match(/([^/]+)\.js$/)[1] }))
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

// A quiet corner plate ("I–IV") instead of "全4世代" spec text -- same
// numeral language as the timeline on each vehicle page, reading more
// like a catalog index than a product-listing variant count.
function formatGenBadge(car) {
  const last = ROMAN[car.generations.length - 1] ?? car.generations.length
  return car.generations.length > 1 ? `I–${last}` : 'I'
}

// A miniature of the .heritage strip from every vehicle page (see
// car-page.js's renderHeritage) -- same idea, card-scale: each
// generation's own start year, quiet, with only the current one at
// full weight. Replaces a flat "2001–現在" range with something that
// actually reads as a timeline, not a spec. Featured Cards are about
// product experience (per the user's Hero-vs-Featured split), so this
// is the one place on Home a reader sees "this car has a history" as
// a shape, not just a fact.
function renderMiniHeritage(car) {
  const gens = car.generations
  const points = gens.map((gen, index) => {
    const isLast = index === gens.length - 1
    const year = isLast ? '現在' : gen.startYear
    const cls = isLast ? 'mini-heritage-point is-current' : 'mini-heritage-point'
    return `<span class="${cls}">${year}</span>`
  })
  return points.join('<span class="mini-heritage-line"></span>')
}

function renderFeatured(cars) {
  const grid = document.getElementById('featured-grid')
  grid.innerHTML = cars
    .map(
      (car) => `
    <a class="car-card fade-in" href="/cars/${car.slug}.html">
      <span class="car-card-photo">
        <img src="${car.heroImage}" alt="${car.vehicleName}" loading="lazy" decoding="async" />
        <span class="car-card-gen-badge">${formatGenBadge(car)}</span>
      </span>
      <span class="car-card-meta">
        <span class="car-card-name">${car.vehicleName}</span>
        <span class="car-card-heritage">${renderMiniHeritage(car)}</span>
      </span>
    </a>`
    )
    .join('')
}

// Groups published cars by maker, then folds in any Coming Soon
// roadmap entries under the same maker heading. A maker with only
// roadmap entries (no published cars yet) still gets its own group --
// that's how a brand-new maker first appears on the site.
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

function renderAllCars(cars, roadmap) {
  const container = document.getElementById('maker-groups')
  const groups = groupByMaker(cars, roadmap)

  container.innerHTML = groups
    .map(
      (group) => `
    <div class="maker-group fade-in">
      <h2 class="maker-name">${group.maker}</h2>
      <div class="maker-cars">
        ${group.cars
          .map(
            (car) => `
          <a class="mini-card" href="/cars/${car.slug}.html">
            <span class="mini-card-photo"><img src="${car.heroImage}" alt="${car.vehicleName}" loading="lazy" decoding="async" /></span>
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

// Discovery before explanation, applied at the page level: sections
// settle in with a quiet fade instead of announcing themselves.
function initScrollFade() {
  const els = document.querySelectorAll('.fade-in')
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'))
    return
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )
  els.forEach((el) => observer.observe(el))
}

function initHeroCta() {
  const cta = document.getElementById('home-cta')
  cta.addEventListener('click', (event) => {
    event.preventDefault()
    document.getElementById('featured').scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

// A live count, not a hardcoded one -- reads straight from the same
// `cars` array Featured/All Cars are built from, so it never drifts
// out of sync as vehicles are added. Coming Soon count only appears
// once roadmap.js actually has an entry (see that file's own "don't
// invent unannounced roadmap items" rule) -- no placeholder text here
// pretends there's a queue when there isn't one yet.
function renderAllCarsSummary(cars, roadmap) {
  const el = document.getElementById('all-cars-count')
  const modelWord = cars.length === 1 ? 'Model' : 'Models'
  let text = `${cars.length} ${modelWord}`
  if (roadmap.length > 0) {
    text += ` · ${roadmap.length} Coming Soon`
  }
  el.textContent = text
}

// Featured Cards is a curated "start here" set (see each car's own
// `featured` field) -- All Cars always shows the complete catalog
// regardless, so trimming Featured never hides a vehicle from the
// site, only from this one spotlight section.
const featuredCars = cars.filter((car) => car.featured)
renderFeatured(featuredCars)
renderAllCars(cars, roadmap)
renderAllCarsSummary(cars, roadmap)
initScrollFade()
initHeroCta()
