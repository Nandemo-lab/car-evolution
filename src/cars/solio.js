// Pure data. No imports, no logic, no DOM -- this file describes one
// vehicle and nothing else. All rendering/interaction lives in
// src/car-page.js; the bootstrap that wires this data into it lives in
// src/entries/solio.js.
//
// All facts below (periods, model codes) are cross-checked against
// multiple independent catalog sources (nextage.jp, goo-net.com,
// weblio's model-year summaries) -- no invented specs. Facelift data is
// deliberately left null for every generation this round: no mid-cycle
// change for any of the four generations was sourced with enough
// confidence (date + concrete content) to publish -- a gap to close in a
// future pass, not filled with invented history.
const generations = [
  {
    numeral: 'I',
    era: '初代',
    title: 'MA34S型',
    code: 'MA34S',
    startYear: '2005',
    yearRange: '2005–2010',
    period: '2005年〜2010年',
    image: '/images/cars/solio/gen1-2005.webp',
    annotations: [
      { x: 25, y: 61, label: 'クロームバーのシンプルなグリル', dir: 'bottom', labelX: 23 },
      { x: 57, y: 18, label: '直立したコンパクトなシルエット', dir: 'top', labelX: 59 },
    ],
    facelift: null,
  },
  {
    numeral: 'II',
    era: '2代目',
    title: 'MA15S型',
    code: 'MA15S',
    startYear: '2010',
    yearRange: '2010–2015',
    period: '2010年〜2015年',
    image: '/images/cars/solio/gen2-2010.webp',
    annotations: [
      { x: 25, y: 53, label: '水平基調のクロームグリル', dir: 'bottom', labelX: 23 },
      { x: 78, y: 13, label: 'リアに備わるルーフスポイラー', dir: 'top', labelX: 76 },
    ],
    facelift: null,
  },
  {
    numeral: 'III',
    era: '3代目',
    title: 'MA36S型',
    code: 'MA36S',
    startYear: '2015',
    yearRange: '2015–2020',
    period: '2015年〜2020年',
    image: '/images/cars/solio/gen3-2015.webp',
    annotations: [
      { x: 26, y: 58, label: 'メッシュ地のフロントグリル', dir: 'bottom', labelX: 24 },
      { x: 40, y: 53, label: 'シャープな印象のヘッドランプ', dir: 'top', labelX: 42 },
    ],
    facelift: null,
  },
  {
    numeral: 'IV',
    era: '現行モデル',
    title: 'MA37S型',
    code: 'MA37S',
    startYear: '2020',
    yearRange: '2020–現在',
    period: '2020年〜現在',
    image: '/images/cars/solio/gen4-2020.webp',
    annotations: [
      { x: 26, y: 58, label: 'ブラック基調の一体型グリル', dir: 'bottom', labelX: 24 },
      { x: 40, y: 51, label: '水平に伸びるLEDデイライト', dir: 'top', labelX: 42 },
    ],
    facelift: null,
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'ソリオ',
  brand: 'スズキ', // used only for JSON-LD ("スズキ ソリオ MA37S型" etc.)
  maker: 'Suzuki', // English, for grouping cards on the Home page (see src/home.js) -- CarVista's first Suzuki vehicle
  order: 11, // Home page display order within All Cars -- appended after every existing maker AND after Delica D:5's new Mitsubishi group, so existing brand order is untouched and Suzuki becomes the newest group.
  // CarVista Design Identity -- see docs/brand/design-identity.md. Sourced
  // from Suzuki's own stated development direction for the current
  // generation: extending overall length for more cargo room while
  // holding the compact turning radius (4.8m) and a body width
  // deliberately kept narrow for easy parking/handling -- "ちょうどいい"
  // practicality over any performance or luxury register.
  // Sole member of a new "Compact tall wagon" cluster -- genuinely
  // smaller-class than even FREED (3,810mm vs. 4,310mm), CarVista's new
  // smallest vehicle. Not a minivan in the way every other CarVista
  // vehicle is, so no segment-mate collision to check yet.
  designRole: 'The practical everyday choice.',
  designIdentity: ['Practical', 'Efficient', 'Right-sized'],
  // Direct opposite of the Practical/Efficient register -- a car whose
  // whole reason for being is "just the right size, nothing wasted"
  // shouldn't read as showy or oversized.
  designAvoid: ['Aggressive', 'Luxury', 'Bold'],
  // "HYBRID MX" is the mid/standard grade in the current 3-grade lineup
  // (MG/MX/MZ, ascending) -- not the base MG, not the loaded MZ. Pure
  // White Pearl is sourced as this vehicle's most popular color and
  // matches what 4 of the 5 supplied photos already show.
  representativeGrade: 'HYBRID MX',
  representativeColor: 'ピュアホワイトパール',
  // Hero vignette tint -- a bright, neutral lift vs. the base (11,12,14),
  // reading as clean/unfussy rather than moody, matching Practical/
  // Efficient.
  heroScrim: '13, 13, 12',
  // Current-generation approx. overall length -- see docs/brand/
  // design-identity.md's "What Reference Length is". Internal production
  // metadata only -- never render this as a spec on the page (the
  // `specs` field below is the real, separately-sourced display data).
  referenceLengthMm: 3810,
  tagline: 'かたちは、時代を語る。',
  heroImage: '/images/cars/solio/hero-ma37s-3q.webp',
  // gen1's supplied photo originally depicted a beige/champagne example
  // -- recolored (hue/saturation remapped, original lightness/shading
  // preserved) to ピュアホワイトパール to match Hero/gen2-4, per
  // representativeColor above. See "What Representative Grade and Color
  // are" in design-identity.md.
  seo: {
    title: 'ソリオ 歴代モデル一覧 — CarVista',
    description: 'スズキ ソリオ全4世代を画像で比較。コンパクトなトールワゴンとしてのデザインの進化が一目でわかる。',
  },
  defaultIndex: 3,
  generations,
}
