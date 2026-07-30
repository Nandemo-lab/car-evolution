// Pure data. No imports, no logic, no DOM -- this file describes one
// vehicle and nothing else. All rendering/interaction lives in
// src/car-page.js; the bootstrap that wires this data into it lives
// in src/entries/voxy.js. To add a new vehicle: copy this file's
// shape, not its behavior.
//
// annotation x/y are % positions of the feature dot on the 1408x668
// comparison photo (all four generations share this exact canvas --
// see car-page.css). labelX/dir place the caption in the open sky
// (dir:'top') or floor (dir:'bottom') margin instead of on the car
// body; a thin leader line connects dot to label.
// gen4's photo was horizontally flipped (see public/images/cars/voxy/gen4-2022.png)
// to match the front-left camera angle of the other 3 generations, so
// its coordinates are mirrored from the raw feature position.
const generations = [
  {
    numeral: 'I',
    era: '初代',
    title: '60系',
    code: 'AZR60G',
    startYear: '2001',
    yearRange: '2001–2007',
    period: '2001年〜2007年',
    image: '/images/cars/voxy/gen1-2001.webp',
    annotations: [
      { x: 21, y: 54, label: '3本クロームグリル', dir: 'bottom', labelX: 21 },
      { x: 60, y: 14, label: '箱型シルエット', dir: 'top', labelX: 62 },
    ],
    facelift: {
      fromYear: '2001', toYear: '2004',
      points: ['フロントフェイスを刷新', 'ヘッドランプ・テールランプのデザインを変更', 'Super CVT-iを全車に標準搭載'],
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
    image: '/images/cars/voxy/gen2-2007.webp',
    annotations: [
      { x: 30, y: 53, label: '大型クロームエンブレム', dir: 'bottom', labelX: 20 },
      { x: 36, y: 58, label: 'ハニカムメッシュグリル', dir: 'bottom', labelX: 52 },
      { x: 45, y: 42, label: '丸みを帯びたフェイス', dir: 'top', labelX: 64 },
    ],
    facelift: {
      fromYear: '2007', toYear: '2010',
      points: ['グリルを大型化しフロントフェイスを刷新', '全グレードにバルブマチックを採用', 'スポーツグレード「G SPORTS」を追加'],
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
    image: '/images/cars/voxy/gen3-2014.webp',
    annotations: [
      { x: 31, y: 47, label: '鋭角的なV字グリル', dir: 'bottom', labelX: 31 },
      { x: 47, y: 55, label: 'スイープヘッドライト', dir: 'bottom', labelX: 55 },
    ],
    facelift: {
      fromYear: '2014', toYear: '2017',
      points: ['Toyota Safety Senseを追加', 'フロントフェイスを刷新', 'ヘッドライトデザインを変更'],
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
    image: '/images/cars/voxy/gen4-2022.webp',
    annotations: [
      { x: 35, y: 36, label: 'フルワイド発光ライン', dir: 'top', labelX: 38 },
      { x: 18, y: 43, label: '3眼LEDヘッドライト', dir: 'bottom', labelX: 60 },
      { x: 28, y: 68, label: 'ダイヤモンドメッシュグリル', dir: 'bottom', labelX: 20 },
    ],
    facelift: {
      fromYear: '2022', toYear: '2025',
      note: '今回の改良では、装備・機能面を中心にアップデート。',
      points: ['新色を追加', 'ディスプレイオーディオを刷新', 'Apple CarPlay・Android Autoに対応'],
    },
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'VOXY',
  brand: 'トヨタ', // used only for JSON-LD ("トヨタ VOXY 90系" etc.) -- not every future vehicle is a Toyota
  maker: 'Toyota', // English, for grouping cards on the Home page (see src/home.js) -- CSS uppercases it for display
  order: 1, // Home page display order within All Cars -- lower shows first
  // CarVista Design Identity -- see docs/brand/design-identity.md. The
  // standing reference for Hero copy, annotation vocabulary, and SEO
  // tone for this vehicle; check new copy against these words before
  // writing it, don't invent tone per-page.
  designRole: 'The expressive choice.', // one-line "what is this vehicle" -- read first, before Identity/Avoid
  designIdentity: ['Sharp', 'Dynamic', 'Aggressive'],
  // Words this vehicle's copy must not reach for -- confirmed against
  // official comparison copy contrasting VOXY's "先鋭・独創" theme with
  // NOAH's "王道・落ち着いた" one (see noah.js) -- Elegant/Luxury/Formal
  // are NOAH/Alphard's register, not VOXY's.
  designAvoid: ['Elegant', 'Luxury', 'Formal'],
  // Fixed across every generation's image so Hero/Compare/Timeline
  // never accidentally mix grades or colors -- see
  // docs/brand/design-identity.md. "Attitude Black Mica" is a real
  // catalog color name for this nameplate; the word "Attitude" itself
  // in Toyota's own naming reinforces this vehicle's Sharp/Aggressive
  // register, not just a color pick.
  representativeGrade: 'Standard model',
  representativeColor: 'Attitude Black Mica',
  // Hero vignette tint (see .hero-vignette in car-page.css) -- a few RGB
  // units cooler/steelier than the neutral base (11,12,14), matching
  // Sharp/Aggressive. Whisper-subtle by design, not a color filter.
  heroScrim: '9, 12, 19',
  // Current (90系) generation's approx. overall length -- see
  // docs/brand/design-identity.md's "What Reference Length is". Anchors
  // this vehicle's apparent body scale relative to every other vehicle
  // on the site once images are (re)generated with scale in mind; not
  // retroactive to already-published photos. Internal production
  // metadata only -- never render this as a spec on the page.
  referenceLengthMm: 4695,
  tagline: 'かたちは、時代を語る。',
  heroImage: '/images/cars/voxy/hero-gen4-3q.webp',
  // Drives <title>/description/canonical/OGP/Twitter -- see the
  // seo-inject plugin in vite.config.js. Nothing else in this page's
  // <head> is hand-written.
  seo: {
    title: 'VOXY 歴代モデル一覧 — CarVista',
    description: 'トヨタ ヴォクシー全4世代を画像で比較。型式・販売期間・デザインの進化が一目でわかる。',
  },
  defaultIndex: 3,
  generations,
}
