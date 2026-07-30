// Pure data. No imports, no logic, no DOM -- this file describes one
// vehicle and nothing else. All rendering/interaction lives in
// src/car-page.js; the bootstrap that wires this data into it lives
// in src/entries/alphard.js.
//
// All facts below (periods, model codes, dimensions, design/facelift
// content) are drawn from official Toyota catalogs, press releases,
// and other reliable public sources -- no invented specs. See the
// project memory for the source list.
//
// Annotation x/y dot positions were re-checked directly against this
// vehicle's actual photos (2026-07-29, all 27 generations site-wide --
// see git history). labelX/dir placement was further tuned (2026-07-30)
// to keep every leader line's caption inside the visible margin at
// mobile widths.
const generations = [
  {
    numeral: 'I',
    era: '初代',
    title: '10系',
    code: 'ANH10W',
    startYear: '2002',
    yearRange: '2002–2008',
    period: '2002年〜2008年',
    image: '/images/cars/alphard/gen1-2002.webp',
    annotations: [
      { x: 30, y: 46, label: 'メッキ基調の堂々としたグリル', dir: 'bottom', labelX: 30 },
      { x: 60, y: 10, label: '直線的で四角いフォルム', dir: 'top', labelX: 62 },
    ],
    facelift: {
      fromYear: '2002', toYear: '2005',
      points: ['グリルのデザインを刷新', 'ヘッドライトの造形を丸みのある印象に変更', 'アダプティブフロントライティングシステムを追加'],
    },
  },
  {
    numeral: 'II',
    era: '2代目',
    title: '20系',
    code: 'ANH20W',
    startYear: '2008',
    yearRange: '2008–2015',
    period: '2008年〜2015年',
    image: '/images/cars/alphard/gen2-2008.webp',
    annotations: [
      { x: 42, y: 52, label: '切れ長の大型ヘッドランプ', dir: 'bottom', labelX: 55 },
      { x: 20, y: 48, label: '横バー基調のグリル', dir: 'bottom', labelX: 23 },
      { x: 48, y: 36, label: 'V字型に抜けるフロントライン', dir: 'top', labelX: 64 },
    ],
    facelift: {
      fromYear: '2008', toYear: '2011',
      points: ['グリルの形状をスクエアに近づけて刷新', 'グリル内のスポークを太めの3本に変更', 'より力強く高級感のある表情に'],
    },
  },
  {
    numeral: 'III',
    era: '3代目',
    title: '30系',
    code: 'AGH30W',
    startYear: '2015',
    yearRange: '2015–2023',
    period: '2015年〜2023年',
    image: '/images/cars/alphard/gen3-2015.webp',
    annotations: [
      { x: 31, y: 47, label: '大型化したフロントグリル', dir: 'bottom', labelX: 20 },
      { x: 50, y: 68, label: '重厚な押し出し感のあるバンパー', dir: 'bottom', labelX: 62 },
    ],
    facelift: {
      fromYear: '2015', toYear: '2018',
      note: '今回の改良では、走行性能と安全装備を中心にアップデート。',
      points: ['パワートレインと制御プログラムを刷新', 'Toyota Safety Senseを全車標準化', '最上級グレード「Executive Lounge S」を追加'],
    },
  },
  {
    numeral: 'IV',
    era: '現行モデル',
    title: '40系',
    code: '3BA-AGH40W',
    startYear: '2023',
    yearRange: '2023–現在',
    period: '2023年〜現在',
    image: '/images/cars/alphard/gen4-2023.webp',
    annotations: [
      { x: 40, y: 38, label: '縦方向に直線的な「逆スラント」フェイス', dir: 'top', labelX: 38 },
      { x: 52, y: 52, label: 'トヨタエンブレムを据えたグリル', dir: 'bottom', labelX: 62 },
      { x: 74, y: 46, label: '凹凸のある立体的なボディサイド', dir: 'top', labelX: 78 },
    ],
    facelift: {
      fromYear: '2023', toYear: '2025',
      note: '今回の改良では、グレード構成と装備を中心にアップデート。',
      points: ['新グレード「Spacious Lounge」「PHEV Executive Lounge」を追加', 'デジタルインナーミラーを全車標準装備'],
    },
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'Alphard',
  brand: 'トヨタ',
  maker: 'Toyota', // English, for grouping cards on the Home page (see src/home.js) -- CSS uppercases it for display
  order: 2, // Home page display order within All Cars -- lower shows first
  // CarVista Design Identity -- see docs/brand/design-identity.md. The
  // standing reference for Hero copy, annotation vocabulary, and SEO
  // tone for this vehicle; check new copy against these words before
  // writing it, don't invent tone per-page.
  designRole: 'The flagship luxury.', // one-line "what is this vehicle" -- read first, before Identity/Avoid
  designIdentity: ['Presence', 'Luxury', 'Dignified'],
  // Words this vehicle's copy must not reach for -- Sporty/Playful/
  // Casual would undercut the formal-luxury register that separates
  // Alphard from its own Toyota siblings (VOXY, NOAH).
  designAvoid: ['Sporty', 'Playful', 'Casual'],
  // Fixed across every generation's image so Hero/Compare/Timeline
  // never accidentally mix grades or colors -- see
  // docs/brand/design-identity.md. Black (paint code 202) is Alphard's
  // single most popular color in Japan (roughly half of buyers), and
  // sourced coverage describes it as reinforcing exactly this vehicle's
  // Presence/Dignified register ("高級感...重厚感"). "Z" is the grade
  // most associated with Alphard's signature face across the line,
  // distinct from the Executive Lounge halo trim's cabin-focused
  // luxury -- consistent with this project's own policy of showing the
  // most representative spec, not necessarily the top grade.
  representativeGrade: 'Z',
  representativeColor: 'Black (202)',
  // Hero vignette tint (see .hero-vignette in car-page.css) -- a few RGB
  // units warmer/deeper than the neutral base (11,12,14), matching
  // Presence/Dignified. Whisper-subtle by design, not a color filter.
  heroScrim: '15, 11, 8',
  // Current (40系) generation's approx. overall length -- see
  // docs/brand/design-identity.md's "What Reference Length is". Alphard
  // is CarVista's largest vehicle and should read ~5-10% bigger in
  // frame than the Mainstream cluster (VOXY/NOAH/SERENA/STEPWGN) once
  // images are (re)generated with scale in mind -- not retroactive to
  // already-published photos. Internal production metadata only --
  // never render this as a spec on the page.
  referenceLengthMm: 4945,
  tagline: 'かたちは、時代を語る。',
  // 2026-07-30: heroImage was swapped to a gold-painted photo by direct
  // user request, as a deliberate one-off exception to
  // representativeColor above -- Timeline/Detail/Compare for all 4
  // generations still show Black (202), matching representativeColor.
  // Do not "fix" this mismatch by regenerating the other images or by
  // changing representativeColor without asking first; both were an
  // explicit choice, not an oversight.
  heroImage: '/images/cars/alphard/hero-gen4-3q.webp',
  // Drives <title>/description/canonical/OGP/Twitter -- see the
  // seo-inject plugin in vite.config.js. Nothing else in this page's
  // <head> is hand-written.
  seo: {
    title: 'Alphard 歴代モデル一覧 — CarVista',
    description: 'トヨタ アルファード全4世代を画像で比較。型式・販売期間・デザインの進化が一目でわかる。',
  },
  defaultIndex: 3,
  generations,
}
