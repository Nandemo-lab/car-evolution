// Pure data. No imports, no logic, no DOM -- this file describes one
// vehicle and nothing else. All rendering/interaction lives in
// src/car-page.js; the bootstrap that wires this data into it lives in
// src/entries/delica-d5.js.
//
// IMPORTANT, read before editing generations below: Delica D:5 has never
// received a full model change. It launched in January 2007 (CV1W/CV2W/
// CV5W) and has been continuously updated since -- a large November 2009
// change, a genuinely major exterior redesign in 2019 (widely called a
// "ビッグマイナーチェンジ" in the press, not a new generation), and a
// further running update in January 2026 (S-AWC four-wheel control, new
// grille/bumper, 8-inch digital meter). CarVista's two supplied photos
// show the pre-2019 face and the post-2019 face, so the two entries below
// are deliberately labeled "前期"/"後期" (early-type/late-type -- real
// terminology this vehicle's own press and owner community already use,
// e.g. "デリカD:5(前期型)を買うなら") rather than "初代"/"2代目", which
// would misrepresent a single continuously-produced model as two full
// generations. See faq[0] below, which states this directly for readers
// who arrive expecting a normal generation history.
//
// Sourced facts cross-checked against Mitsubishi Motors' own newsroom/
// spec pages plus independent catalog sources (nextage.jp, spectank.jp) --
// no invented specs.
const generations = [
  {
    numeral: 'I',
    era: '前期',
    title: 'CV5W型 前期',
    code: 'DBA-CV5W',
    startYear: '2007',
    yearRange: '2007–2019',
    period: '2007年〜2019年',
    image: '/images/cars/delica-d5/gen1-2007.webp',
    annotations: [
      { x: 25, y: 61, label: 'クロームスラット基調のグリル', dir: 'bottom', labelX: 23 },
      { x: 63, y: 17, label: '直立したキャブオーバー風のシルエット', dir: 'top', labelX: 64 },
    ],
    facelift: null,
  },
  {
    numeral: 'II',
    era: '後期',
    title: 'CV1W型 後期',
    code: '3BA-CV1W',
    startYear: '2019',
    yearRange: '2019–現在',
    period: '2019年〜現在',
    image: '/images/cars/delica-d5/gen2-2019.webp',
    annotations: [
      { x: 24, y: 58, label: '台形グリルとスキッドガーニッシュ', dir: 'bottom', labelX: 22 },
      { x: 44, y: 24, label: 'シャープに切れ上がるヘッドライト', dir: 'top', labelX: 44 },
    ],
    // 2026年1月9日、走行性能を中心とした一部改良を実施(フルモデル
    // チェンジではない)。
    // https://www.mitsubishi-motors.com/jp/newsroom/newsrelease/2025/20251218_2.html
    facelift: {
      fromYear: '2019', toYear: '2026',
      note: '2026年の改良では、外観に加えて走行性能・先進装備を中心にアップデート。',
      points: ['四輪制御システム「S-AWC」と4つのドライブモードを追加', '8インチカラー液晶メーターを採用', 'フロントグリル・バンパーを刷新'],
    },
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'DELICA D:5',
  brand: '三菱', // used only for JSON-LD ("三菱 デリカD:5 CV5W型 前期" etc.)
  maker: 'Mitsubishi', // English, for grouping cards on the Home page (see src/home.js) -- CarVista's first Mitsubishi vehicle
  order: 10, // Home page display order within All Cars -- appended after every existing maker (Toyota/Nissan/Honda) so their relative order is untouched; Mitsubishi becomes a new group after Honda.
  // CarVista Design Identity -- see docs/brand/design-identity.md. Sourced
  // from Mitsubishi's own stated development theme for this vehicle:
  // "ミニバンの優しさ"と"SUVの力強さ"の融合 -- a minivan/SUV hybrid built
  // around real off-road capability (185mm ground clearance, 21.0°
  // approach / 23.0° departure angles) and a square, functional body.
  // Sole member of a new cluster (see docs/brand/design-identity.md) --
  // no other CarVista vehicle competes in the SUV-influenced minivan
  // space, so there's no same-segment collision to check against yet.
  designRole: 'The rugged all-rounder.',
  designIdentity: ['Rugged', 'Functional', 'Adventurous'],
  // Direct opposite of the Rugged/Functional register -- an SUV-minivan
  // built around off-road capability shouldn't read as refined or
  // street-sporty.
  designAvoid: ['Elegant', 'Luxury', 'Refined'],
  // "G" is the current lineup's base grade (vs. P / G-Power Package /
  // LUXFZ-LUDFZ) -- standard, not loaded, matching the Functional
  // register. Diamond White Pearl is a real, sourced Mitsubishi color
  // name (cited as the current model's most popular choice) and matches
  // what both supplied generation photos actually show.
  representativeGrade: 'G',
  representativeColor: 'ダイヤモンドホワイトパール',
  // Hero vignette tint -- a cool graphite/steel lift vs. the base
  // (11,12,14), reading as harder/more industrial than any existing
  // vehicle's own scrim, matching Rugged/Functional.
  heroScrim: '10, 11, 13',
  // Current-generation approx. overall length -- see docs/brand/
  // design-identity.md's "What Reference Length is". Internal production
  // metadata only -- never render this as a spec on the page (the
  // `specs` field below is the real, separately-sourced display data).
  referenceLengthMm: 4790,
  tagline: 'かたちは、時代を語る。',
  // Hero reuses the same source photo as gen2 (後期, white) rather than
  // the originally-supplied デリカTOP.png, which depicted a black
  // example -- a real color-consistency violation caught in review (see
  // "What Representative Grade and Color are" in design-identity.md).
  // A black-to-white paint recolor of デリカTOP.png itself was tried
  // and rejected on inspection: a genuinely black photo has no hidden
  // white diffuse-reflectance data to recover, so lifting shadow/
  // midtone luminance posterized into a harsh edge-lit silhouette
  // instead of a clean repaint -- unlike the yellow/beige recolors on
  // Sienta/Solio, which had real color+saturation to remap. Recropped
  // for Hero's own tighter/taller framing; background normalized the
  // same way as every generation photo, plus a vignette/grain pass and
  // a 7% zoom so the car reads larger on Home's card (same file).
  heroImage: '/images/cars/delica-d5/hero-cv1w-3q.webp',
  seo: {
    title: 'DELICA D:5 歴代モデル一覧 — CarVista',
    description: '三菱 デリカD:5の前期・後期モデルを画像で比較。オールラウンドミニバンとしての外観の変化が一目でわかる。',
  },
  defaultIndex: 1,
  generations,
}
