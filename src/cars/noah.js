// Pure data. No imports, no logic, no DOM -- this file describes one
// vehicle and nothing else. All rendering/interaction lives in
// src/car-page.js; the bootstrap that wires this data into it lives
// in src/entries/noah.js.
//
// All facts below (periods, model codes, design/facelift content) are
// cross-checked against Toyota's official vehicle history pages plus
// independent catalog sources -- no invented specs. NOAH and VOXY are
// badge-engineered twins from the same platform launched the same
// month each generation, which is why their model codes and yearRanges
// below are identical to voxy.js's -- that's a verified fact, not a
// copy-paste shortcut. Sharing a body-in-white means their silhouettes
// really are close, generation for generation -- that's not something
// to write around, it's the truth of how these two nameplates relate.
//
// The difference that's actually theirs to tell is the fascia. Across
// every generation, official positioning describes NOAH as the more
// dignified, gentler-featured sibling (a large single grille surface,
// rounder lamps, a "堂々とした存在感" read) against VOXY's sharper,
// more aggressive one (VOXY's own file uses mesh/V-shape/diamond
// pattern language -- 3本クローム, ハニカムメッシュ, 鋭角的なV字,
// ダイヤモンドメッシュ). NOAH's annotations below deliberately use a
// different vocabulary family throughout -- solid chrome slabs and
// bars, roundness, weight/gravitas (厚み, 風格, 貫禄) -- not the same
// words with the size turned up. That contrast is NOAH's actual
// identity here, not a workaround for having no unique geometry.
//
// IMPORTANT: annotation x/y/labelX coordinates are placeholders. VOXY's
// coordinates were tuned against its actual generated photos; NOAH has
// no photos yet (to be generated separately). These values are a
// reasonable starting guess modeled on VOXY's front-3/4 composition
// (grille lower-center, headlight/greenhouse upper area) and MUST be
// re-checked once real images land in public/images/cars/noah/.
const generations = [
  {
    numeral: 'I',
    era: '初代',
    title: '60系',
    code: 'AZR60G',
    startYear: '2001',
    yearRange: '2001–2007',
    period: '2001年〜2007年',
    image: '/images/cars/noah/gen1-2001.png',
    annotations: [
      { x: 31, y: 47, label: '横一文字に伸びる大型クロームバー', dir: 'bottom', labelX: 31 },
      { x: 62, y: 12, label: '丸く包み込むようなヘッドランプ', dir: 'top', labelX: 64 },
    ],
    facelift: {
      fromYear: '2001', toYear: '2004',
      points: ['フロントバンパーに厚みを持たせて刷新', 'ヘッドランプ・テールランプのデザインを変更'],
    },
  },
  {
    numeral: 'II',
    era: '2代目',
    title: '70系',
    code: 'ZRR70G',
    startYear: '2007',
    yearRange: '2007–2014',
    period: '2007年〜2014年',
    image: '/images/cars/noah/gen2-2007.png',
    annotations: [
      { x: 29, y: 32, label: '格子ではなく面で魅せるグリル', dir: 'top', labelX: 25 },
      { x: 58, y: 46, label: '包み込むように丸いフェイス', dir: 'bottom', labelX: 62 },
    ],
    facelift: {
      fromYear: '2007', toYear: '2010',
      points: ['グリルを大型化しフロントフェイスを刷新', '新デザインのグリルを採用'],
    },
  },
  {
    numeral: 'III',
    era: '3代目',
    title: '80系',
    code: 'ZRR80G',
    startYear: '2014',
    yearRange: '2014–2021',
    period: '2014年〜2021年',
    image: '/images/cars/noah/gen3-2014.png',
    annotations: [
      { x: 30, y: 46, label: '台形にせり出す大型グリル', dir: 'bottom', labelX: 30 },
      { x: 50, y: 36, label: '厚みを感じさせるバンパー', dir: 'top', labelX: 54 },
    ],
    facelift: {
      fromYear: '2014', toYear: '2017',
      points: ['大型の角型グリルを採用', 'LEDヘッドランプを標準化'],
    },
  },
  {
    numeral: 'IV',
    era: '現行モデル',
    title: '90系',
    code: '6AA-ZWR90W',
    startYear: '2022',
    yearRange: '2022–現在',
    period: '2022年〜現在',
    image: '/images/cars/noah/gen4-2022.png',
    annotations: [
      { x: 38, y: 30, label: '水平に伸びる一体グリル', dir: 'top', labelX: 36 },
      { x: 58, y: 52, label: '風格を漂わせる大型メッキ', dir: 'bottom', labelX: 70 },
    ],
    facelift: {
      fromYear: '2025', toYear: '2026',
      note: '今回の改良では、グレード構成と装備を中心にアップデート。',
      points: ['エアロデザインの「S-Z」「S-G」にグレードを集約', '上位グレードにディスプレイオーディオPLUSやブラインドスポットモニターを標準装備'],
    },
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'NOAH',
  brand: 'トヨタ', // used only for JSON-LD ("トヨタ NOAH 90系" etc.)
  maker: 'Toyota', // English, for grouping cards on the Home page (see src/home.js) -- CSS uppercases it for display
  order: 3, // Home page display order across Featured Cars + All Cars -- lower shows first
  // Featured Cards is a curated "start here" set, not every vehicle --
  // All Cars is the complete catalog regardless of this flag. Flip to
  // false to drop a vehicle from Featured without removing it from the
  // site; this is an editorial call, not automatic.
  featured: true,
  // CarVista Design Identity -- see docs/brand/design-identity.md. The
  // standing reference for Hero copy, annotation vocabulary, and SEO
  // tone for this vehicle; check new copy against these words before
  // writing it, don't invent tone per-page. Deliberately distinct from
  // Alphard's Presence/Luxury/Dignified (same maker) -- NOAH's register
  // is composed/mainstream, not Alphard's formal luxury.
  designRole: 'The composed standard.', // one-line "what is this vehicle" -- read first, before Identity/Avoid
  //
  // Revised from an earlier ['Warm', 'Horizontal', 'Substantial'] after
  // a more precise official source turned up: Toyota dealer comparison
  // copy frames NOAH's theme as "王道・落ち着いた" (mainstream/composed)
  // directly against VOXY's own "先鋭・独創" (cutting-edge/original) --
  // "Aggressive" is explicitly VOXY's word in that same comparison, and
  // only describes NOAH's aero-package grade, not the standard grade
  // CarVista depicts per its own representative-spec policy (see the
  // policy footer). "Composed" replaces "Warm" as the more precisely
  // sourced term; "Horizontal"/"Substantial" were already well-founded
  // and are unchanged.
  designIdentity: ['Composed', 'Horizontal', 'Substantial'],
  // Words this vehicle's copy must not reach for -- Aggressive/Sporty/
  // Edgy are explicitly VOXY's register (see above), not NOAH's, even
  // though they share a platform.
  designAvoid: ['Aggressive', 'Sporty', 'Edgy'],
  // Fixed across every generation's image so Hero/Compare/Timeline
  // never accidentally mix grades or colors -- see
  // docs/brand/design-identity.md. NOAH's standard grade (not the aero
  // package -- see the designIdentity revision note above) is the one
  // CarVista depicts throughout. White Pearl Crystal Shine is sourced
  // as softening a body's outline and reading calmer than black --
  // the color equivalent of "Composed," not just a popular pick.
  representativeGrade: 'Standard model',
  representativeColor: 'White Pearl Crystal Shine',
  // Current (90系) generation's approx. overall length -- see
  // docs/brand/design-identity.md's "What Reference Length is". Same
  // platform/length as VOXY (see the twin-platform note at the top of
  // this file); anchors this vehicle's apparent body scale relative to
  // every other vehicle once images are (re)generated with scale in
  // mind, not retroactive to already-published photos. Internal
  // production metadata only -- never render this as a spec on the page.
  referenceLengthMm: 4695,
  tagline: 'かたちは、時代を語る。',
  heroImage: '/images/cars/noah/hero-gen4-3q.png',
  // Drives <title>/description/canonical/OGP/Twitter -- see the
  // seo-inject plugin in vite.config.js. Nothing else in this page's
  // <head> is hand-written.
  seo: {
    title: 'NOAH 歴代モデル一覧 — CarVista',
    description: 'トヨタ ノア全4世代を画像で比較。型式・販売期間・デザインの進化が一目でわかる。',
  },
  defaultIndex: 3,
  generations,
}
