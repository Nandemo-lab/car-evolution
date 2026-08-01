// Pure data. No imports, no logic, no DOM -- this file describes one
// vehicle and nothing else. All rendering/interaction lives in
// src/car-page.js; the bootstrap that wires this data into it lives
// in src/entries/freed.js.
//
// All facts below (periods, model codes, design/facelift content) are
// cross-checked against Honda's own press releases and catalog/spec
// sheets plus independent catalog sources -- no invented specs, and
// not sourced from Wikipedia alone. FREED is a genuinely smaller class
// than every other vehicle on the site so far (see referenceLengthMm
// below) -- this document's own "What Reference Length is" section
// predicted exactly this before FREED existed ("A future smaller-class
// addition... around 4250-4300mm").
//
// Annotation x/y dot positions were measured directly against this
// vehicle's actual (user-supplied) photos.
const generations = [
  {
    numeral: 'I',
    era: '初代',
    title: 'GB3型',
    code: 'DBA-GB3',
    startYear: '2008',
    yearRange: '2008–2016',
    period: '2008年〜2016年',
    image: '/images/cars/freed/gen1-2008.webp',
    annotations: [
      { x: 22, y: 50, label: 'クロームバーが際立つ<wbr>シンプルなグリル', dir: 'bottom', labelX: 22 },
      { x: 60, y: 15, label: '直立感のあるボクシーな<wbr>シルエット', dir: 'top', labelX: 62 },
    ],
    // 2011年10月、大幅改良。外装デザインを変更し、ハイブリッドモデル
    // （GP3型）を追加。乗車定員は6人・7人乗りに整理（発売当初にあった
    // 5人乗り「FLEX」・8人乗りは廃止）。
    // https://global.honda/jp/news/2011/4111027-freed.html
    facelift: {
      fromYear: '2008', toYear: '2011',
      points: ['エクステリアデザインを変更', 'ハイブリッドモデルを追加', '乗車定員を6人・7人乗りに整理'],
    },
  },
  {
    numeral: 'II',
    era: '2代目',
    title: 'GB5型',
    code: 'DBA-GB5',
    startYear: '2016',
    yearRange: '2016–2024',
    period: '2016年〜2024年',
    image: '/images/cars/freed/gen2-2016.webp',
    annotations: [
      { x: 20, y: 48, label: '水平基調の<wbr>クロームグリル', dir: 'bottom', labelX: 20 },
      { x: 55, y: 15, label: '丸みを帯びた親しみやすい<wbr>フロントフェイス', dir: 'top', labelX: 58 },
    ],
    // 2019年10月改良。グリルレス的な新しいフロントマスクを採用し、
    // クロスオーバー仕様の新グレード「CROSSTAR」を追加。Honda SENSING
    // を全グレードに標準装備。
    facelift: {
      fromYear: '2016', toYear: '2019',
      note: '今回の改良では、外観に加えて安全装備を中心にアップデート。',
      points: ['グリルレスの新しいフロントマスクに変更', 'クロスオーバー仕様の新グレード「CROSSTAR」を追加', 'Honda SENSINGを全グレードに標準装備'],
    },
  },
  {
    numeral: 'III',
    era: '現行モデル',
    title: 'GT5型',
    code: '6AA-GT5',
    startYear: '2024',
    yearRange: '2024–現在',
    period: '2024年〜現在',
    image: '/images/cars/freed/gen3-2024.webp',
    annotations: [
      { x: 20, y: 45, label: '水平に伸びるスリムな<wbr>LEDヘッドライト', dir: 'top', labelX: 22 },
      { x: 42, y: 47, label: 'グリルと一体化した<wbr>水平基調のフロントフェイス', dir: 'top', labelX: 58 },
    ],
    facelift: null,
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'FREED',
  brand: 'ホンダ', // used only for JSON-LD ("ホンダ FREED GT5型" etc.)
  maker: 'Honda', // English, for grouping cards on the Home page (see src/home.js) -- CSS uppercases it for display
  order: 8, // Home page display order within All Cars -- lower shows first. Appended after STEPWGN, joining the existing Honda group rather than starting a new one.
  // CarVista Design Identity -- see docs/brand/design-identity.md. The
  // standing reference for Hero copy, annotation vocabulary, and SEO
  // tone for this vehicle; check new copy against these words before
  // writing it, don't invent tone per-page.
  //
  // Honda's own development concept for the current (3rd) generation:
  // "'Smile' Just Right Mover" -- building on the previous generation's
  // own "ちょうどいい" (just right) positioning toward "こころの余裕"
  // (peace of mind/spaciousness of heart). Sourced coverage describes
  // the redesign as trading the old triangle+square cabin silhouette
  // for a cleaner, more upright form with headlight/grille/door-handle/
  // slide-door-rail aligned on one horizontal line.
  designRole: 'The just-right compact.',
  designIdentity: ['Approachable', 'Compact', 'Cheerful'],
  // Words this vehicle's copy must not reach for -- Luxurious/Formal
  // directly contradict the "just right, unpretentious" positioning at
  // the heart of FREED's own concept; Aggressive opposes the
  // "Smile"/cheerful register Honda's own copy leads with.
  designAvoid: ['Luxurious', 'Aggressive', 'Formal'],
  // Fixed across every generation's image so Hero/Compare/Timeline
  // never accidentally mix grades or colors -- see
  // docs/brand/design-identity.md. "AIR" is the current generation's
  // standard-trim lineup (vs. the SUV-styled CROSSTAR) -- same "AIR"
  // naming Honda also uses for STEPWGN's own standard trim. "フィヨルド
  // ミスト・パール" (Fjord Mist Pearl, name verified 2026-07-31, no "II"
  // suffix) is a real Honda color choice available on FREED -- not
  // AIR-exclusive as an earlier version of this comment claimed; it's
  // also used on STEPWGN. Sourced as evoking cool Nordic air, matching
  // the light, airy tone of Approachable/Cheerful directly, and it's
  // what the supplied reference photos actually show -- not chosen for
  // popularity alone.
  representativeGrade: 'AIR',
  representativeColor: 'Fjord Mist Pearl',
  // Hero vignette tint (see .hero-vignette in car-page.css) -- a fresh,
  // cool cyan-neutral lift vs. the base (11,12,14), reading as "fresh
  // air" (echoing Fjord Mist) and distinct from every other vehicle's
  // register (VOXY's cooler steel-blue, Vellfire's magenta-cool,
  // ESQUIRE's silvery-neutral).
  heroScrim: '12, 14, 14',
  // Current (3rd generation) generation's official overall length --
  // see docs/brand/design-identity.md's "What Reference Length is".
  // FREED is meaningfully smaller than every other vehicle on the site
  // (~4310mm vs. ~4695mm+ for the Mainstream cluster) -- its own
  // Compact minivan cluster, not a Mainstream-cluster member despite
  // also being a Honda. Internal production metadata only -- never
  // render this as a spec on the page.
  referenceLengthMm: 4310,
  tagline: 'かたちは、時代を語る。',
  heroImage: '/images/cars/freed/hero-gen3-3q.webp',
  // Drives <title>/description/canonical/OGP/Twitter -- see the
  // seo-inject plugin in vite.config.js. Nothing else in this page's
  // <head> is hand-written.
  seo: {
    title: 'FREED 歴代モデル一覧 — CarVista',
    description: 'ホンダ フリード全3世代を画像で比較。型式・販売期間・デザインの進化が一目でわかる。',
  },
  defaultIndex: 2,
  generations,
}
