// Pure data. No imports, no logic, no DOM -- this file describes one
// vehicle and nothing else. All rendering/interaction lives in
// src/car-page.js; the bootstrap that wires this data into it lives in
// src/entries/sienta.js.
//
// All facts below (periods, model codes) are cross-checked against
// multiple independent sources (Toyota's own coverage, goo-net.com,
// Car Watch's launch report) -- no invented specs. Facelift data is
// deliberately left null for every generation this round: no mid-cycle
// change was sourced with enough confidence (date + concrete content) to
// publish this session (gen3 is additionally still too new to have one at
// all) -- a gap to close in a future pass, not filled with invented
// history.
//
// gen1-3 images (2026-08-01, tried and reverted same day): same
// background-unification attempt and same revert as solio.js -- see
// that file's comment for the full account. A real phone screenshot
// showed the same smudgy gray-patch artifact under the car; reverted
// straight back to the pre-edit files (git commit a074b2b). These three
// files are, once again, untouched exactly as originally supplied.
const generations = [
  {
    numeral: 'I',
    era: '初代',
    title: 'NCP81型',
    code: 'NCP81',
    startYear: '2003',
    yearRange: '2003–2015',
    period: '2003年〜2015年',
    image: '/images/cars/sienta/gen1-2003.webp',
    annotations: [
      { x: 39, y: 57, label: '丸型2灯の<wbr>ヘッドランプ', dir: 'top', labelX: 41 },
      { x: 26, y: 61, label: 'シンプルな<wbr>横基調グリル', dir: 'bottom', labelX: 24 },
    ],
    facelift: null,
  },
  {
    numeral: 'II',
    era: '2代目',
    title: 'NHP170型',
    code: 'NHP170',
    startYear: '2015',
    yearRange: '2015–2022',
    period: '2015年〜2022年',
    image: '/images/cars/sienta/gen2-2015.webp',
    annotations: [
      { x: 26, y: 60, label: 'ダイヤモンドメッシュの<wbr>グリル', dir: 'bottom', labelX: 24 },
      { x: 39, y: 55, label: '切れ長の<wbr>ヘッドランプ', dir: 'top', labelX: 41 },
    ],
    facelift: null,
  },
  {
    numeral: 'III',
    era: '現行モデル',
    title: 'MXPL10型',
    code: 'MXPL10',
    startYear: '2022',
    yearRange: '2022–現在',
    period: '2022年〜現在',
    image: '/images/cars/sienta/gen3-2022.webp',
    annotations: [
      { x: 28, y: 62, label: '丸みを帯びた<wbr>「シカクマル」グリル', dir: 'bottom', labelX: 26 },
      { x: 40, y: 56, label: 'オレンジのラインが入る<wbr>丸型ヘッドライト', dir: 'top', labelX: 47 },
    ],
    facelift: null,
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'SIENTA',
  brand: 'トヨタ', // used only for JSON-LD ("トヨタ シエンタ MXPL10型" etc.)
  maker: 'Toyota', // English, for grouping cards on the Home page (see src/home.js)
  order: 9, // Home page display order within All Cars -- joins the existing Toyota group (appended after ESQUIRE/5) without disturbing Toyota-Nissan-Honda's own relative order.
  // CarVista Design Identity -- see docs/brand/design-identity.md. Sourced
  // from Toyota's own current-generation concept: a rounded "シカクマル"
  // (square+circle) motif and "日常に溶け込む道具的な機能美" (an
  // everyday, tool-like functional beauty) -- a FORM/utility register,
  // not an attitude one.
  //
  // Joins FREED in the existing Compact minivan cluster (see
  // docs/brand/design-identity.md's cluster table) -- both genuinely
  // smaller-class (4,260mm here vs. FREED's 4,310mm) and real-world
  // cross-shopped rivals. Checked against FREED's own
  // [Approachable, Compact, Cheerful] / avoid [Luxurious, Aggressive,
  // Formal]: no shared keyword, and the vocabulary families differ on
  // purpose -- FREED's is an ATTITUDE/warmth register (welcoming, upbeat
  // mood), Sienta's below is a FORM/UTILITY register (literal roundness,
  // tool-like modesty), grounded in each vehicle's own official framing
  // rather than picked to merely use different words for the same idea.
  designRole: 'The everyday people-mover.',
  designIdentity: ['Rounded', 'Practical', 'Unassuming'],
  designAvoid: ['Aggressive', 'Luxury', 'Angular'],
  // "G" is the current lineup's best-selling standard grade (vs. entry
  // X / top Z). アーバンカーキ is a real, sourced Toyota color name and
  // matches what the Hero and gen3 photos already show.
  representativeGrade: 'G',
  representativeColor: 'アーバンカーキ',
  // Hero vignette tint -- a soft warm-neutral lift vs. the base
  // (11,12,14), matching Rounded/Unassuming without reaching into
  // FREED's own warmth register (kept cooler/quieter than FREED's tint).
  heroScrim: '13, 12, 11',
  // Current-generation approx. overall length -- see docs/brand/
  // design-identity.md's "What Reference Length is". Internal production
  // metadata only -- never render this as a spec on the page (the
  // `specs` field below is the real, separately-sourced display data).
  referenceLengthMm: 4260,
  tagline: 'かたちは、時代を語る。',
  heroImage: '/images/cars/sienta/hero-mxpl10-3q.webp',
  // Home's mini-card (see the doc comment in src/home.js) -- SIENTA's
  // own Hero photo is a wider full-car product shot (whole vehicle
  // visible, camera further back) unlike VOXY/Alphard's tight close-up
  // sources, so it read noticeably smaller/more distant than every
  // other card on Home even though heroImage itself is unchanged and
  // still correct for this vehicle's own page. This is a pure recrop
  // of that same photo (grille/headlight/front wheel, no pixel values
  // changed) at roughly the same framing VOXY/Alphard's own source
  // photos already have -- not a new image.
  homeCardImage: '/images/cars/sienta/home-card.webp',
  // gen1 (originally yellow) and gen2 (originally gold) were recolored
  // (hue/saturation remapped, original lightness/shading preserved) to
  // アーバンカーキ to match Hero/gen3, per representativeColor above. See
  // "What Representative Grade and Color are" in design-identity.md.
  // gen2's roof remains black (a real two-tone paint option, left
  // untouched -- distinguishing "wrong-color panel" from "correctly
  // black glass/tires/roof-trim" isn't reliable by color alone at
  // near-zero saturation, so this recolor pass only touched pixels with
  // real original saturation). Minor remaining difference from gen3's
  // solid single-tone body; not a full match.
  seo: {
    title: 'SIENTA 歴代モデル一覧 — CarVista',
    description: 'トヨタ シエンタ全3世代を画像で比較。コンパクトミニバンとしてのデザインの進化が一目でわかる。',
  },
  defaultIndex: 2,
  generations,
}
