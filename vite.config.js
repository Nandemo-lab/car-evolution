import { existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { defineConfig } from 'vite'

const root = fileURLToPath(new URL('.', import.meta.url))

// Single source of truth for the brand name -- every title/og:site_name/
// JSON-LD name below reads from this constant instead of a repeated
// string literal, so a future rename touches one line, not several.
const SITE_NAME = 'CarVista'

// Temporary production origin -- the Vercel-assigned domain until a
// custom domain is purchased, at which point this is the only place
// that needs to change. Every canonical/OGP URL below is built from
// this one constant.
const SITE_ORIGIN = 'https://car-evolution-sigma.vercel.app'

// Every file in cars/*.html, plus every other *.html at the project
// root (editorial-policy.html, and whatever site-wide page comes next),
// becomes a build entry automatically -- adding a new page can never
// again silently vanish from `dist/` the way voxy.html did before this
// file existed (see project memory). index.html keeps the entry key
// "main" (its established chunk-naming); every other root page is
// keyed by its own filename.
function discoverEntries() {
  const entries = { main: resolve(root, 'index.html') }
  for (const file of readdirSync(root)) {
    if (file.endsWith('.html') && file !== 'index.html') {
      entries[file.replace(/\.html$/, '')] = resolve(root, file)
    }
  }
  const carsDir = resolve(root, 'cars')
  if (existsSync(carsDir)) {
    for (const file of readdirSync(carsDir)) {
      if (file.endsWith('.html')) {
        entries[file.replace(/\.html$/, '')] = resolve(carsDir, file)
      }
    }
  }
  return entries
}

// title/vehicleModelDate/productionDate for the JSON-LD ItemList are
// derived entirely from `generations` -- there is no separate list to
// keep in sync. yearRange is "2001–2007" style; the last generation's
// end is "現在" (ongoing), so it gets no productionDate, matching how
// an in-production vehicle's schema.org listing should read.
function buildJsonLd(brand, vehicleName, generations) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${brand} ${vehicleName} 歴代モデル`,
    itemListElement: generations.map((gen, index) => {
      const [start, end] = gen.yearRange.split('–') // en dash
      const item = { '@type': 'Car', name: `${brand} ${vehicleName} ${gen.title}`, vehicleModelDate: start }
      if (index < generations.length - 1) item.productionDate = `${start}/${end}`
      return item
    }),
  }
}

// Loads every src/cars/*.js file (same discovery mechanism as
// discoverCarEntries above) and returns them sorted by their `order`
// field -- used for the Home page's JSON-LD list of published vehicles.
// Cache-busted per call so `vite` (dev) picks up edits on reload.
async function loadAllCars() {
  const carsDir = resolve(root, 'src/cars')
  if (!existsSync(carsDir)) return []
  const files = readdirSync(carsDir).filter((f) => f.endsWith('.js'))
  const cars = await Promise.all(
    files.map(async (file) => {
      const dataPath = resolve(carsDir, file)
      const mod = await import(`${pathToFileURL(dataPath).href}?t=${Date.now()}`)
      return { ...mod.default, slug: file.replace(/\.js$/, '') }
    })
  )
  return cars.sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

// The Home page's JSON-LD isn't about one vehicle's generations (see
// buildJsonLd above) -- it's the catalog itself: every published
// vehicle page, so search engines can discover /cars/* straight from
// the site root.
function buildHomeJsonLd(cars) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${SITE_NAME} 掲載車種一覧`,
    itemListElement: cars.map((car) => ({
      '@type': 'Car',
      name: `${car.brand} ${car.vehicleName}`,
      url: `${SITE_ORIGIN}/cars/${car.slug}.html`,
    })),
  }
}

// Home's SEO copy is fixed (not derived from any single vehicle) --
// only the JSON-LD list of vehicles is data-driven. og:image borrows
// the first published car's hero shot as a placeholder share image
// until a dedicated brand asset exists.
function buildHomeTags(cars) {
  const url = `${SITE_ORIGIN}/`
  const title = `${SITE_NAME} — 見るだけで、進化がわかる。`
  const description = '同じ視点・同じ条件で、歴代モデルの進化を比較できるビジュアルカタログ。VOXY・アルファードなど、デザインの変遷を写真で辿る。'
  const image = cars[0] ? `${SITE_ORIGIN}${cars[0].heroImage}` : ''
  const jsonLd = buildHomeJsonLd(cars)

  const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' })
  return [
    { tag: 'title', children: title, injectTo: 'head' },
    meta({ name: 'description', content: description }),
    { tag: 'link', attrs: { rel: 'canonical', href: url }, injectTo: 'head' },
    meta({ property: 'og:type', content: 'website' }),
    meta({ property: 'og:site_name', content: SITE_NAME }),
    meta({ property: 'og:title', content: title }),
    meta({ property: 'og:description', content: description }),
    meta({ property: 'og:url', content: url }),
    meta({ property: 'og:image', content: image }),
    meta({ name: 'twitter:card', content: 'summary_large_image' }),
    meta({ name: 'twitter:title', content: title }),
    meta({ name: 'twitter:description', content: description }),
    meta({ name: 'twitter:image', content: image }),
    { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(jsonLd), injectTo: 'head' },
  ]
}

// Fixed SEO tags for editorial-policy.html -- a static, site-wide page
// with no per-vehicle data behind it, so unlike buildHomeTags there's
// no JSON-LD list to generate; just title/description/canonical/OGP
// like any other static page.
function buildEditorialPolicyTags() {
  const url = `${SITE_ORIGIN}/editorial-policy.html`
  const title = `制作方針・免責事項 — ${SITE_NAME}`
  const description = `${SITE_NAME}が参考にしている情報源、自動車メーカーとの関係、画像の制作方針についてまとめています。`
  const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' })
  return [
    { tag: 'title', children: title, injectTo: 'head' },
    meta({ name: 'description', content: description }),
    { tag: 'link', attrs: { rel: 'canonical', href: url }, injectTo: 'head' },
    meta({ property: 'og:type', content: 'website' }),
    meta({ property: 'og:site_name', content: SITE_NAME }),
    meta({ property: 'og:title', content: title }),
    meta({ property: 'og:description', content: description }),
    meta({ property: 'og:url', content: url }),
    meta({ name: 'twitter:card', content: 'summary' }),
    meta({ name: 'twitter:title', content: title }),
    meta({ name: 'twitter:description', content: description }),
  ]
}

// Every vehicle page's <head> is just charset/viewport/theme-color in
// the HTML source -- title, description, canonical, OGP, Twitter card,
// and JSON-LD are all injected here from that vehicle's src/cars/<slug>.js
// (its `seo` field, plus heroImage/generations it already has for the
// page itself). index.html gets the same treatment via buildHomeTags,
// aggregating every vehicle instead of describing just one. Runs in
// both `vite` (dev) and `vite build`, so dev and production always
// show the same tags.
function seoInjectPlugin() {
  return {
    name: 'car-evolution-seo-inject',
    async transformIndexHtml(html, ctx) {
      const filename = ctx.filename.split(/[\\/]/).pop()

      if (filename === 'index.html') {
        return { html, tags: buildHomeTags(await loadAllCars()) }
      }

      if (filename === 'editorial-policy.html') {
        return { html, tags: buildEditorialPolicyTags() }
      }

      const slug = filename.replace(/\.html$/, '')
      const dataPath = resolve(root, 'src/cars', `${slug}.js`)
      if (!existsSync(dataPath)) return html

      // cache-bust so `vite` (dev) picks up edits to the data file on reload
      const mod = await import(`${pathToFileURL(dataPath).href}?t=${Date.now()}`)
      const car = mod.default
      const path = `/cars/${slug}.html`
      const url = `${SITE_ORIGIN}${path}`
      const image = `${SITE_ORIGIN}${car.heroImage}`
      const jsonLd = buildJsonLd(car.brand, car.vehicleName, car.generations)

      const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' })
      const tags = [
        { tag: 'title', children: car.seo.title, injectTo: 'head' },
        meta({ name: 'description', content: car.seo.description }),
        { tag: 'link', attrs: { rel: 'canonical', href: url }, injectTo: 'head' },
        meta({ property: 'og:type', content: 'website' }),
        meta({ property: 'og:site_name', content: SITE_NAME }),
        meta({ property: 'og:title', content: car.seo.title }),
        meta({ property: 'og:description', content: car.seo.description }),
        meta({ property: 'og:url', content: url }),
        meta({ property: 'og:image', content: image }),
        meta({ name: 'twitter:card', content: 'summary_large_image' }),
        meta({ name: 'twitter:title', content: car.seo.title }),
        meta({ name: 'twitter:description', content: car.seo.description }),
        meta({ name: 'twitter:image', content: image }),
        { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(jsonLd), injectTo: 'head' },
      ]
      return { html, tags }
    },
  }
}

// Generates dist/sitemap.xml from the same car-discovery mechanism as
// everything else in this file (loadAllCars) -- adding a vehicle never
// requires touching this plugin, same "single source of truth" pattern
// as discoverEntries()/buildHomeJsonLd() above. Build-only (Rollup's
// generateBundle hook): sitemap.xml is a production/crawler concern,
// not something `vite` (dev) needs to serve.
function sitemapPlugin() {
  return {
    name: 'car-evolution-sitemap',
    async generateBundle() {
      const cars = await loadAllCars()
      const staticUrls = [`${SITE_ORIGIN}/`, `${SITE_ORIGIN}/editorial-policy.html`]
      const carUrls = cars.map((car) => `${SITE_ORIGIN}/cars/${car.slug}.html`)
      const urls = [...staticUrls, ...carUrls]
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
        .map((url) => `  <url><loc>${url}</loc></url>`)
        .join('\n')}\n</urlset>\n`
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
    },
  }
}

export default defineConfig({
  plugins: [seoInjectPlugin(), sitemapPlugin()],
  build: {
    rollupOptions: {
      input: discoverEntries(),
    },
  },
})
