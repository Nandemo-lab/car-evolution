// Pure data. No imports, no logic, no DOM -- this file describes one
// vehicle and nothing else. All rendering/interaction lives in
// src/car-page.js; the bootstrap that wires this data into it lives
// in src/entries/vellfire.js.
//
// All facts below (periods, model codes, dimensions, design/facelift
// content) are drawn from official Toyota catalogs, press releases,
// and other reliable public sources -- no invented specs. Chassis
// codes/years verified via goo-net/GAZOO/Toyota FAQ and dealer/press
// coverage; the 2025-01 facelift (8-seat X grade, PHEV Executive
// Lounge) matches the "VELLFIRE PHEV" badge visible on the real hero
// photo used for this vehicle.
//
// Annotation x/y/labelX coordinates were tuned against this vehicle's
// actual generated photos (public/images/cars/vellfire/), following
// the same front-3/4 composition as Alphard/VOXY.
const generations = [
  {
    numeral: 'I',
    era: '初代',
    title: '20系',
    code: 'ANH20W',
    startYear: '2008',
    yearRange: '2008–2015',
    period: '2008年〜2015年',
    image: '/images/cars/vellfire/gen1-2008.webp',
    annotations: [
      { x: 24, y: 46, label: 'メッキ主体の押し出し感のあるグリル', dir: 'bottom', labelX: 24 },
      { x: 58, y: 14, label: '直線的で張りのあるグリーンハウス', dir: 'top', labelX: 60 },
    ],
    facelift: {
      fromYear: '2008', toYear: '2011',
      points: ['フロントグリルとバンパーのデザインを一新', 'メッキガーニッシュとグリル下部にダクトを追加', 'より力強い印象のフロントフェイスに刷新'],
    },
  },
  {
    numeral: 'II',
    era: '2代目',
    title: '30系',
    code: 'AGH30W',
    startYear: '2015',
    yearRange: '2015–2023',
    period: '2015年〜2023年',
    image: '/images/cars/vellfire/gen2-2015.webp',
    annotations: [
      { x: 20, y: 48, label: '大型グリルと一体化したヘッドランプ', dir: 'bottom', labelX: 20 },
      { x: 48, y: 44, label: '鋭く抜けるキャラクターライン', dir: 'bottom', labelX: 60 },
    ],
    facelift: {
      fromYear: '2015', toYear: '2018',
      points: ['フロントグリルを縦基調のメッキ加飾グリルに刷新', 'ヘッドライトを薄型のシャープなデザインに変更', 'より個性の際立つ表情に一新'],
    },
  },
  {
    numeral: 'III',
    era: '現行モデル',
    title: '40系',
    code: '5BA-TAHA40W',
    startYear: '2023',
    yearRange: '2023–現在',
    period: '2023年〜現在',
    image: '/images/cars/vellfire/gen3-2023.webp',
    // Timeline's shared 1.55x crop (see --timeline-object-position in
    // car-page.css) cut the front wheel right at the card's edge on
    // this generation's photo -- shifted left just for this thumbnail
    // (verified: wheel has real margin, headlight/grille still fully
    // shown). Not one of the generations actually reported, but its
    // measured crop was the tightest of any generation site-wide and
    // this is also this vehicle's default/highlighted Timeline card.
    timelineObjectPosition: '24% 55%',
    annotations: [
      { x: 22, y: 45, label: '立体的で鋭さのあるダイヤモンドグリル', dir: 'bottom', labelX: 22 },
      { x: 40, y: 35, label: '逆スラント基調のフロントフェイス', dir: 'top', labelX: 58 },
    ],
    facelift: {
      fromYear: '2023', toYear: '2025',
      note: '今回の改良では、乗車定員とパワートレインを中心にアップデート。',
      points: ['Xグレードに8人乗り仕様を追加', '最上級グレードにPHEV(プラグインハイブリッド)を新設定', 'V2H対応で非常用電源としても活用可能に'],
    },
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'Vellfire',
  brand: 'トヨタ',
  maker: 'Toyota', // English, for grouping cards on the Home page (see src/home.js) -- CSS uppercases it for display
  order: 6, // Home page display order within All Cars -- lower shows first
  // CarVista Design Identity -- see docs/brand/design-identity.md.
  // Sourced directly from Toyota's own contrast between the two
  // Alphard-platform siblings: "ヴェルファイアが掲げるコンセプトは、
  // 上質さとアグレッシブさの追求...アルファードは、真のラグジュアリー
  //追求をコンセプトに掲げています" -- Vellfire's own official grade
  // copy adds "より個性の際立ったエクステリアデザイン" for its
  // black-and-metallic-accent styling. This is the Luxury minivan
  // cluster's one sibling pair (see design-identity.md's cluster
  // table), and the strongest possible source for both vehicles'
  // Avoid lists at once -- same pattern as NOAH/VOXY.
  designRole: 'The bold alternative.',
  designIdentity: ['Bold', 'Aggressive', 'Individual'],
  // Direct mirror of Alphard's own Design Identity (Presence/Luxury/
  // Dignified) -- the strongest possible source per design-identity.md's
  // Avoid-list rule 3 (an official source contrasting the two vehicles
  // directly), not an invented opposite.
  designAvoid: ['Elegant', 'Dignified', 'Formal'],
  // Fixed across every generation's image -- see
  // docs/brand/design-identity.md. The current (40系) generation ships
  // in only two colors, Black (no-cost/standard) and Platinum White
  // Pearl Mica (paid) -- Black is chosen both for being the standard
  // color and because sourced coverage describes it as conveying
  // "力強さと高級感" (boldness), matching this vehicle's
  // Bold/Aggressive register better than the white option would.
  // "Z Premier" is the mainstream signature-face grade, distinct from
  // the cabin-focused Executive Lounge halo trim -- same reasoning
  // Alphard's own representativeGrade choice already applies.
  representativeGrade: 'Z Premier',
  representativeColor: 'Black',
  // Hero vignette tint (see .hero-vignette in car-page.css) -- cool and
  // dark with a faint magenta undertone vs. the base (11,12,14),
  // matching Bold/Individual and distinct from both VOXY's steel-blue
  // and Alphard's warm bronze. Whisper-subtle by design, not a filter.
  heroScrim: '12, 9, 15',
  // Current (40系) generation's approx. overall length -- see
  // docs/brand/design-identity.md's "What Reference Length is".
  // Vellfire shares its platform with Alphard and is Toyota's own
  // official press/spec figure for the current generation (slightly
  // longer than Alphard's 4945mm due to a deeper front bumper/grille).
  // Internal production metadata only -- never render this as a spec
  // on the page.
  referenceLengthMm: 4995,
  tagline: 'かたちは、時代を語る。',
  heroImage: '/images/cars/vellfire/hero-gen3-3q.webp',
  // Drives <title>/description/canonical/OGP/Twitter -- see the
  // seo-inject plugin in vite.config.js. Nothing else in this page's
  // <head> is hand-written.
  seo: {
    title: 'Vellfire 歴代モデル一覧 — CarVista',
    description: 'トヨタ ヴェルファイア全3世代を画像で比較。型式・販売期間・デザインの進化が一目でわかる。',
  },
  defaultIndex: 2,
  generations,
}
