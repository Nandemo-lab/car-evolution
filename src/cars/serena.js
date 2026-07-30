// Pure data. No imports, no logic, no DOM -- this file describes one
// vehicle and nothing else. All rendering/interaction lives in
// src/car-page.js; the bootstrap that wires this data into it lives
// in src/entries/serena.js.
//
// All facts below (periods, model codes, design/facelift content) are
// cross-checked against Nissan's official vehicle history plus
// independent catalog sources -- no invented specs. Serena is
// CarVista's first non-Toyota vehicle: six generations run from 1991
// to today, versus VOXY/Alphard's four, which is why comparePairs
// below has five pairs instead of three (see car-page.js's initCompare
// -- it already supports any generation count, no engine change
// needed).
//
// Annotation x/y dot positions were re-checked directly against this
// vehicle's actual photos (2026-07-29, all 27 generations site-wide --
// see git history, includes a gen1-2 re-crop for framing consistency).
const generations = [
  {
    numeral: 'I',
    era: '初代',
    title: 'C23型',
    code: 'C23',
    startYear: '1991',
    yearRange: '1991–1999',
    period: '1991年〜1999年',
    image: '/images/cars/serena/gen1-1991.webp',
    annotations: [
      { x: 25, y: 80, label: '商用車由来の無骨なグリル', dir: 'bottom', labelX: 25 },
      { x: 60, y: 37, label: '直立した箱型フォルム', dir: 'top', labelX: 62 },
    ],
    facelift: {
      fromYear: '1994', toYear: '1997',
      note: '1994年に「バネットセレナ」から「セレナ」へ名称を統一。1997年にはフロントまわりを刷新。',
      points: ['ヘッドランプ・グリルのデザインを変更', 'フロントバンパーの形状を一新'],
    },
  },
  {
    numeral: 'II',
    era: '2代目',
    title: 'C24型',
    code: 'C24',
    startYear: '1999',
    yearRange: '1999–2005',
    period: '1999年〜2005年',
    image: '/images/cars/serena/gen2-1999.webp',
    annotations: [
      { x: 32, y: 53, label: '横方向に広がりを見せるグリル', dir: 'bottom', labelX: 32 },
      { x: 58, y: 20, label: '低められた前傾フォルム', dir: 'top', labelX: 62 },
    ],
    facelift: {
      fromYear: '2001', toYear: '2001',
      points: ['フロントフェイスをより幅広い印象に刷新', 'ヘッドランプの造形を変更'],
    },
  },
  {
    numeral: 'III',
    era: '3代目',
    title: 'C25型',
    code: 'C25',
    startYear: '2005',
    yearRange: '2005–2010',
    period: '2005年〜2010年',
    image: '/images/cars/serena/gen3-2005.webp',
    annotations: [
      { x: 30, y: 44, label: '大型シルバー加飾のグリル', dir: 'bottom', labelX: 30 },
      { x: 56, y: 18, label: '丸みを帯びたコンパクトな一体感', dir: 'top', labelX: 60 },
    ],
    facelift: {
      fromYear: '2007', toYear: '2007',
      points: ['フロントフェイスのデザインを刷新', 'ヘッドランプの意匠を変更'],
    },
  },
  {
    numeral: 'IV',
    era: '4代目',
    title: 'C26型',
    code: 'C26',
    startYear: '2010',
    yearRange: '2010–2016',
    period: '2010年〜2016年',
    image: '/images/cars/serena/gen4-2010.webp',
    annotations: [
      { x: 31, y: 46, label: '台形を基調としたグリル', dir: 'bottom', labelX: 31 },
      { x: 58, y: 50, label: 'スクエアなヘッドランプ', dir: 'bottom', labelX: 68 },
    ],
    facelift: {
      fromYear: '2012', toYear: '2013',
      note: '2012年のS-HYBRID追加に続き、2013年は装備面を中心に改良。',
      points: ['S-HYBRIDシステムを追加', '安全装備を拡充'],
    },
  },
  {
    numeral: 'V',
    era: '5代目',
    title: 'C27型',
    code: 'C27',
    startYear: '2016',
    yearRange: '2016–2022',
    period: '2016年〜2022年',
    image: '/images/cars/serena/gen5-2016.webp',
    annotations: [
      { x: 32, y: 48, label: 'V字を描くクロームグリル', dir: 'bottom', labelX: 32 },
      { x: 52, y: 50, label: 'シャープなヘッドランプ', dir: 'bottom', labelX: 66 },
    ],
    facelift: {
      fromYear: '2019', toYear: '2019',
      points: ['アダプティブLEDヘッドライトを採用', 'プロパイロットの機能を拡充'],
    },
  },
  {
    numeral: 'VI',
    era: '現行モデル',
    title: 'C28型',
    code: 'C28',
    startYear: '2022',
    yearRange: '2022–現在',
    period: '2022年〜現在',
    image: '/images/cars/serena/gen6-2022.webp',
    // Timeline's shared 1.55x crop (see --timeline-object-position in
    // car-page.css) cut the front wheel right at the card's edge and
    // clipped the "SERENA" badge to "ERENA" on this generation's photo
    // -- shifted left just for this thumbnail (verified: full badge
    // text visible, wheel has real margin).
    timelineObjectPosition: '23% 55%',
    annotations: [
      { x: 40, y: 30, label: '水平基調の一体型フロント', dir: 'top', labelX: 38 },
      { x: 37, y: 50, label: '発光する大型エンブレム', dir: 'bottom', labelX: 66 },
    ],
    // 2024年9月9日の一部改良: 4WD(e-4ORCE)モデルを追加、ガソリン
    // モデルは価格改定。
    facelift: {
      fromYear: '2024', toYear: '2024',
      points: ['4WD(e-4ORCE)モデルを追加', 'ガソリンモデルの価格を改定'],
    },
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'SERENA',
  brand: '日産', // used only for JSON-LD ("日産 SERENA C28型" etc.)
  maker: 'Nissan', // English, for grouping cards on the Home page (see src/home.js) -- CSS uppercases it for display
  order: 4, // Home page display order within All Cars -- lower shows first
  // CarVista Design Identity -- see docs/brand/design-identity.md. The
  // standing reference for Hero copy, annotation vocabulary, and SEO
  // tone for this vehicle; check new copy against these words before
  // writing it, don't invent tone per-page.
  designRole: 'The open family choice.', // one-line "what is this vehicle" -- read first, before Identity/Avoid
  designIdentity: ['Family', 'Friendly', 'Open'],
  // Words this vehicle's copy must not reach for -- Aggressive/Luxury/
  // Intimidating would contradict the approachable-family register.
  designAvoid: ['Aggressive', 'Luxury', 'Intimidating'],
  // Fixed across every generation's image so Hero/Compare/Timeline
  // never accidentally mix grades or colors -- see
  // docs/brand/design-identity.md. SERENA's base "X" grade (not the
  // sportier Highway STAR trim) is the standard CarVista depicts.
  // White Pearl reads open/approachable rather than the heavier,
  // more formal impression black carries on this vehicle.
  representativeGrade: 'Standard model',
  representativeColor: 'White Pearl',
  // Hero vignette tint (see .hero-vignette in car-page.css) -- a light,
  // open warm-neutral vs. the base (11,12,14), matching Family/Open.
  // Whisper-subtle by design, not a color filter.
  heroScrim: '13, 13, 11',
  // Current (C28) generation's approx. overall length -- see
  // docs/brand/design-identity.md's "What Reference Length is". Anchors
  // this vehicle's apparent body scale relative to every other vehicle
  // on the site once images are (re)generated with scale in mind; not
  // retroactive to already-published photos. Internal production
  // metadata only -- never render this as a spec on the page.
  referenceLengthMm: 4765,
  tagline: 'かたちは、時代を語る。',
  heroImage: '/images/cars/serena/hero-gen6-3q.webp',
  // Drives <title>/description/canonical/OGP/Twitter -- see the
  // seo-inject plugin in vite.config.js. Nothing else in this page's
  // <head> is hand-written.
  seo: {
    title: 'SERENA 歴代モデル一覧 — CarVista',
    description: '日産 セレナ全6世代を画像で比較。型式・販売期間・デザインの進化が一目でわかる。',
  },
  defaultIndex: 5,
  generations,
}
