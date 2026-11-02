import { bindModelFinder } from './model-finder.js'
import { bindYearFinder } from './vehicle-year-finder.js'
import './home.css'
import './click-glow.js'
import roadmap from './roadmap.js'
import { homeCarsHtml, homeCatalog, homeComparisonLinksHtml } from './home-cars-html.js'
import { trackEvent } from './analytics.js'

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

function initGrowthEvents() {
  document.querySelector('.home-hero-evolution')?.addEventListener('click', () => {
    trackEvent('open_hero_example', { vehicle: 'VOXY' })
  })

  document.getElementById('maker-groups').addEventListener('click', (event) => {
    const card = event.target.closest('.mini-card')
    if (!card || !card.href) return
    trackEvent('open_vehicle', { vehicle: card.querySelector('.mini-card-name')?.textContent?.trim() || '' })
  })

  document.querySelector('.comparison-links')?.addEventListener('click', (event) => {
    const link = event.target.closest('a')
    if (!link) return
    trackEvent('open_comparison_from_home', { destination: new URL(link.href).pathname })
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
  const count = homeCatalog(cars).length
  const modelWord = count === 1 ? 'Model' : 'Models'
  let text = `${count} ${modelWord}`
  if (roadmap.length > 0) {
    text += ` · ${roadmap.length} Coming Soon`
  }
  el.textContent = text
}

function initMakerFilter() {
  const filter = document.getElementById('maker-filter')
  const groups = [...document.querySelectorAll('.maker-group')]
  if (!filter || groups.length < 2) return

  const makers = groups.map((group) => group.querySelector('.maker-name')?.textContent?.trim()).filter(Boolean)
  const total = groups.reduce((sum, group) => sum + group.querySelectorAll('.mini-card[href]').length, 0)
  const buttons = ['すべて', ...makers].map((label, index) =>
    `<button type="button" data-maker="${index === 0 ? '' : label}" aria-pressed="${index === 0}">${label}</button>`
  ).join('')
  filter.innerHTML = `<span>メーカーで絞る</span><div>${buttons}</div><p aria-live="polite">${total}車種を表示中</p>`
  filter.hidden = false

  filter.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-maker]')
    if (!button) return
    const maker = button.dataset.maker
    filter.querySelectorAll('button').forEach((item) => item.setAttribute('aria-pressed', String(item === button)))
    let shown = 0
    groups.forEach((group) => {
      const matches = !maker || group.querySelector('.maker-name')?.textContent?.trim() === maker
      group.hidden = !matches
      if (matches) shown += group.querySelectorAll('.mini-card[href]').length
    })
    filter.querySelector('p').textContent = maker ? `${maker}の${shown}車種を表示中` : `${shown}車種を表示中`
    trackEvent('filter_home_cars', { maker: maker || 'all', visible_models: shown })
  })
}

document.getElementById('maker-groups').innerHTML = homeCarsHtml(cars, roadmap)
document.getElementById('auto-comparison-links').innerHTML = homeComparisonLinksHtml()
renderAllCarsSummary(cars, roadmap)
initMakerFilter()
initScrollFade()
initHeroCta()
initGrowthEvents()

bindModelFinder(homeCatalog(cars))
bindYearFinder(homeCatalog(cars))
