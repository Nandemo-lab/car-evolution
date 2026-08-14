import { existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { defineConfig } from 'vite'

const root = fileURLToPath(new URL('.', import.meta.url))

// Single source of truth for the brand name -- every title/og:site_name/
// JSON-LD name below reads from this constant instead of a repeated
// string literal, so a future rename touches one line, not several.
const SITE_NAME = 'CarVista'

// Production origin. Every canonical/OGP/JSON-LD/sitemap URL below is
// built from this one constant so deployment and search signals agree.
const SITE_ORIGIN = 'https://carvista.jp'

const COMPARISON_PAGES = {
  'compare-noah-serena-stepwgn.html': {
    name: 'NOAH・SERENA・STEP WGNの違い',
    title: 'NOAH・SERENA・STEP WGNの違い | CarVista',
    description: 'NOAH、SERENA、STEP WGNを同じ視点で比較。Mクラスミニバン3台のフロントマスクとキャラクターの違いを見比べます。',
    image: '/images/og/noah-serena-stepwgn.webp',
    models: [
      { name: 'トヨタ NOAH', url: '/cars/noah.html' },
      { name: '日産 SERENA', url: '/cars/serena.html' },
      { name: 'ホンダ STEP WGN', url: '/cars/stepwgn.html' },
    ],
  },
  'compare-voxy-noah.html': {
    name: 'VOXY・NOAHの違い',
    title: 'VOXY・NOAHの違い | CarVista',
    description: 'VOXYとNOAHを同じ視点で比較。兄弟車2台のフロントマスクとデザインの違いを見比べます。',
    image: '/images/og/voxy-noah.webp',
    models: [
      { name: 'トヨタ VOXY', url: '/cars/voxy.html' },
      { name: 'トヨタ NOAH', url: '/cars/noah.html' },
    ],
  },
  'compare-voxy-noah-esquire.html': {
    name: 'VOXY・NOAH・ESQUIREを見比べる',
    title: 'VOXY・NOAH・ESQUIREを見比べる | CarVista',
    description: 'VOXY、NOAH、ESQUIREを同じ視点で比較。フロントマスクと世代の違いを見比べます。',
    image: '/images/og/voxy-noah-esquire.png',
    models: [
      { name: 'トヨタ VOXY', url: '/cars/voxy.html' },
      { name: 'トヨタ NOAH', url: '/cars/noah.html' },
      { name: 'トヨタ ESQUIRE', url: '/cars/esquire.html' },
    ],
  },
  'voxy-70-80-90.html': {
    name: 'VOXY 70・80・90系の見分け方',
    title: 'VOXY 70・80・90系の見分け方 | CarVista',
    description: 'VOXYの70系・80系・90系を画像で比較。年式の目安とフロントマスクの違いが一目でわかります。',
    image: '/images/og/voxy-generations.png',
    models: [{ name: 'トヨタ VOXY', url: '/cars/voxy.html' }],
  },
  'alphard-30-zenki-kouki.html': {
    name: 'アルファード30系 前期・後期の違い',
    title: 'アルファード30系 前期・後期の違い | CarVista',
    description: 'アルファード30系の前期・後期を同一画角の画像で比較。年式の目安、フロントマスクの見分け方、型式確認のポイントをまとめました。',
    image: '/images/cars/alphard/30-post-facelift-v1.png',
    models: [{ name: 'トヨタ アルファード 30系', url: '/cars/alphard.html' }],
  },
  'n-box-generations.html': {
    name: 'N-BOX 初代・2代目・3代目の違い',
    title: 'N-BOX 初代・2代目・3代目の違い | CarVista',
    description: 'N-BOXの初代・2代目・3代目を統一画像で比較。販売年、型式、フロントマスクの違いを中古車選びに役立つ形で整理します。',
    image: '/images/cars/n-box/gen3-2023.webp',
    models: [{ name: 'ホンダ N-BOX', url: '/cars/n-box.html' }],
  },
  'compare-alphard-vellfire.html': {
    name: 'Alphard・Vellfireの違い',
    title: 'Alphard・Vellfireの違い | CarVista',
    description: 'AlphardとVellfireを同じ視点で比較。2台のフロントマスクがつくるデザイン上の違いを見比べます。',
    image: '/images/og/alphard-vellfire.png',
    models: [
      { name: 'トヨタ Alphard', url: '/cars/alphard.html' },
      { name: 'トヨタ Vellfire', url: '/cars/vellfire.html' },
    ],
  },
  'compare-freed-sienta.html': {
    name: 'FREED・SIENTAの違い',
    title: 'FREED・SIENTAの違い | CarVista',
    description: 'FREEDとSIENTAを同じ視点で比較。コンパクトミニバン2台のフロントマスクとキャラクターの違いを見比べます。',
    image: '/images/og/freed-sienta.webp',
    models: [
      { name: 'ホンダ FREED', url: '/cars/freed.html' },
      { name: 'トヨタ SIENTA', url: '/cars/sienta.html' },
    ],
  },
  'compare-n-box-spacia.html': {
    name: 'N-BOX・SPACIAの違い',
    title: 'N-BOX・SPACIAの違い | CarVista',
    description: 'N-BOXとSPACIAを同じ視点で比較。軽スーパーハイトワゴン2台のフロントマスクと個性の違いを見比べます。',
    image: '/images/og/n-box-spacia.webp',
    models: [
      { name: 'ホンダ N-BOX', url: '/cars/n-box.html' },
      { name: 'スズキ SPACIA', url: '/cars/spacia.html' },
    ],
  },
}

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
// keep in sync. yearRange is "2001–2007" style; a generation whose
// yearRange ends in "現在" is ongoing and gets no productionDate,
// matching how an in-production vehicle's schema.org listing should
// read. Checked against the generation's own yearRange text, not its
// array position -- ESQUIRE (see src/cars/esquire.js) is a single
// generation that's also discontinued (yearRange "2014–2021", not
// "現在"), which an earlier "last generation = ongoing" version of
// this check got wrong for exactly that reason.
function buildJsonLd(brand, vehicleName, generations) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${brand} ${vehicleName} 歴代モデル`,
    itemListElement: generations.map((gen) => {
      const [start, end] = gen.yearRange.split('–') // en dash
      const item = { '@type': 'Car', name: `${brand} ${vehicleName} ${gen.title}`, vehicleModelDate: start }
      if (end !== '現在') item.productionDate = `${start}/${end}`
      return item
    }),
  }
}

// BreadcrumbList JSON-LD (2026-07-31 on) -- Home > vehicle, matching the
// site's actual navigable structure (there's no separate maker-listing
// page). Generic and data-driven like buildJsonLd above, so it applies to
// every vehicle page uniformly, including the 8 that predate it -- purely
// additive structured data, no visible/behavioral change, so there's no
// per-vehicle rollout risk the way a new UI section would have.
function buildBreadcrumbJsonLd(car, slug) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: car.vehicleName, item: `${SITE_ORIGIN}/cars/${slug}.html` },
    ],
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
  const title = `${SITE_NAME} — クルマの進化が、見てわかる。`
  const description = '同じ視点・同じ条件で、歴代モデルの進化を比較できるビジュアル図鑑。VOXY・アルファードなど、デザインの変遷を独自制作のビジュアルで辿る。'
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
  const image = `${SITE_ORIGIN}/images/cars/voxy/hero-gen4-3q.webp`
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
  ]
}

function buildComparisonJsonLd(comparison, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: comparison.name,
    description: comparison.description,
    url,
    image: `${SITE_ORIGIN}${comparison.image}`,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_ORIGIN}/` },
    mainEntity: {
      '@type': 'ItemList',
      name: `${comparison.name}の比較対象`,
      itemListElement: comparison.models.map((model, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: { '@type': 'Car', name: model.name, url: `${SITE_ORIGIN}${model.url}` },
      })),
    },
  }
}

function buildComparisonBreadcrumbJsonLd(comparison, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: comparison.name, item: url },
    ],
  }
}

function buildComparisonTags(filename) {
  const comparison = COMPARISON_PAGES[filename]
  const url = `${SITE_ORIGIN}/${filename}`
  const jsonLd = buildComparisonJsonLd(comparison, url)
  const breadcrumbJsonLd = buildComparisonBreadcrumbJsonLd(comparison, url)
  const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' })
  return [
    { tag: 'title', children: comparison.title, injectTo: 'head' },
    meta({ name: 'description', content: comparison.description }),
    { tag: 'link', attrs: { rel: 'canonical', href: url }, injectTo: 'head' },
    meta({ property: 'og:type', content: 'website' }),
    meta({ property: 'og:site_name', content: SITE_NAME }),
    meta({ property: 'og:title', content: comparison.title }),
    meta({ property: 'og:description', content: comparison.description }),
    meta({ property: 'og:url', content: url }),
    meta({ property: 'og:image', content: `${SITE_ORIGIN}${comparison.image}` }),
    meta({ property: 'og:image:width', content: '1200' }),
    meta({ property: 'og:image:height', content: '630' }),
    meta({ name: 'twitter:card', content: 'summary_large_image' }),
    meta({ name: 'twitter:title', content: comparison.title }),
    meta({ name: 'twitter:description', content: comparison.description }),
    meta({ name: 'twitter:image', content: `${SITE_ORIGIN}${comparison.image}` }),
    { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(jsonLd), injectTo: 'head' },
    { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(breadcrumbJsonLd), injectTo: 'head' },
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
      // AdSense uses this single verification script to establish that
      // CarVista controls every published page. It loads no visible ad
      // placements by itself; those remain deliberately absent until a
      // later, user-approved monetization decision.
      const withAdSenseVerification = (tags) => [
        ...tags,
        // The meta tag is an additional ownership signal recommended by
        // AdSense for site verification. Keeping it alongside the script
        // makes verification resilient while still creating no ad slots.
        {
          tag: 'meta',
          attrs: {
            name: 'google-adsense-account',
            content: 'ca-pub-7907331904833321',
          },
          injectTo: 'head',
        },
        {
          tag: 'script',
          attrs: {
            async: true,
            src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7907331904833321',
            crossorigin: 'anonymous',
          },
          injectTo: 'head',
        },
      ]

      if (filename === 'index.html') {
        return { html, tags: withAdSenseVerification(buildHomeTags(await loadAllCars())) }
      }

      if (filename === 'editorial-policy.html') {
        return { html, tags: withAdSenseVerification(buildEditorialPolicyTags()) }
      }

      if (COMPARISON_PAGES[filename]) {
        return { html, tags: withAdSenseVerification(buildComparisonTags(filename)) }
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
      const breadcrumbJsonLd = buildBreadcrumbJsonLd(car, slug)

      const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' })
      const tags = [
        { tag: 'title', children: car.seo.title, injectTo: 'head' },
        meta({ name: 'description', content: car.seo.description }),
        { tag: 'link', attrs: { rel: 'canonical', href: url }, injectTo: 'head' },
        // Hero is this page's LCP element (see car-page.js's renderHero,
        // which also sets fetchPriority='high' on the <img> itself once
        // JS runs) -- this preload hint lets the browser start the
        // request as soon as it parses <head>, before it even reaches
        // the <img> tag in <body>.
        { tag: 'link', attrs: { rel: 'preload', as: 'image', href: car.heroImage, fetchpriority: 'high' }, injectTo: 'head' },
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
        { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(breadcrumbJsonLd), injectTo: 'head' },
      ]
      return { html, tags: withAdSenseVerification(tags) }
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
      const staticUrls = [
        `${SITE_ORIGIN}/`,
        `${SITE_ORIGIN}/editorial-policy.html`,
        ...Object.keys(COMPARISON_PAGES).map((filename) => `${SITE_ORIGIN}/${filename}`),
      ]
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
