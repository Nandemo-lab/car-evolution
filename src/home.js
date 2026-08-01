import './home.css'
import roadmap from './roadmap.js'

// CarVista -- Home page engine ---------------------------------
// Every published vehicle is discovered from src/cars/*.js via Vite's
// import.meta.glob (eager: true bundles them directly into this page's
// chunk -- no extra network round trip for card data). Adding a new
// vehicle means adding its src/cars/<slug>.js file; nothing here
// changes. `order` controls display order within All Cars (both the
// maker-group ordering and each group's own car order).
//
// Home previously also had a Featured Cars spotlight section (curated
// subset via each car's `featured` field, big photo cards) above All
// Cars -- removed 2026-07-30: CarVista is "pick a car, see its
// evolution," not a recommendation feed, so All Cars is now the page's
// one and only listing, directly after Hero.
//
// mini-card photo: `car.homeCardImage`, optional, falls back to
// `heroImage`. The mini-card box is a tight 4:3 crop of whatever image
// it's given (object-fit:cover, no per-vehicle position control) --
// this reads fine for every vehicle whose own Hero photo is ALREADY an
// extreme close-up (VOXY/Alphard's hero sources fill nearly their
// entire frame with the car), but a vehicle whose Hero is a wider full-
// car product shot (see sienta.js) ends up looking small/distant next
// to those on this page even though its own Hero page looks fine.
// `homeCardImage` is a separate, purpose-cropped file for exactly that
// case -- a tighter recrop of the same photo, framed the same way
// VOXY/Alphard's own source photos already are, used ONLY here so the
// vehicle's own Hero page composition is untouched.
const carModules = import.meta.glob('./cars/*.js', { eager: true })
const cars = Object.entries(carModules)
  .map(([path, mod]) => ({ ...mod.default, slug: path.match(/([^/]+)\.js$/)[1] }))
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

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
            <span class="mini-card-photo"><img src="${car.homeCardImage || car.heroImage}" alt="${car.vehicleName}" loading="lazy" decoding="async" /></span>
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
    document.getElementById('all-cars').scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

// A live count, not a hardcoded one -- reads straight from the same
// `cars` array All Cars is built from, so it never drifts out of sync
// as vehicles are added. Coming Soon count only appears
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

renderAllCars(cars, roadmap)
renderAllCarsSummary(cars, roadmap)
initScrollFade()
initHeroCta()
