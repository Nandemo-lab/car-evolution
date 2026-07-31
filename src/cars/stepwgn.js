// Pure data. No imports, no logic, no DOM -- this file describes one
// vehicle and nothing else. All rendering/interaction lives in
// src/car-page.js; the bootstrap that wires this data into it lives
// in src/entries/stepwgn.js.
//
// All facts below (periods, model codes, design/facelift content) are
// cross-checked against Honda's official vehicle archive plus
// independent catalog sources -- no invented specs. Six generations
// run from 1996 to today, same as serena.js -- comparePairs has five
// pairs, not three.
//
// Annotation x/y dot positions were re-checked directly against this
// vehicle's actual photos (2026-07-29, all 27 generations site-wide --
// see git history, includes a gen1-2 re-crop for framing consistency).
// gen1/gen2 photos were replaced again (2026-07-31, user-supplied) --
// their car was recorded noticeably smaller/higher in frame than every
// other generation on the site (measured: ~71% of frame height vs.
// ~87-93% for gen3-6), which is what actually caused the "見切れ"
// (cut off at the bottom) complaint -- a source-photo scale mismatch,
// not a CSS crop problem, so it couldn't be fixed by adjusting
// object-position/scale alone (verified: neither image had enough
// spare width margin to crop in on the height without cutting into
// the car's own front/rear). Annotation coordinates below were
// re-derived against these new photos, not carried over from the old
// ones.
const generations = [
  {
    numeral: 'I',
    era: '初代',
    title: 'RF1/2型',
    code: 'RF1',
    startYear: '1996',
    yearRange: '1996–2001',
    period: '1996年〜2001年',
    image: '/images/cars/stepwgn/gen1-1996.webp',
    annotations: [
      { x: 20, y: 63, label: '無骨で実用的なフロントグリル', dir: 'bottom', labelX: 20 },
      { x: 55, y: 15, label: '背の高いウォークスルー・ボディ', dir: 'top', labelX: 58 },
    ],
    facelift: {
      fromYear: '1996', toYear: '1999',
      points: ['マルチリフレクター式ヘッドランプへ変更', 'フロントバンパーのデザインを刷新'],
    },
  },
  {
    numeral: 'II',
    era: '2代目',
    title: 'RF3-8型',
    code: 'RF3',
    startYear: '2001',
    yearRange: '2001–2005',
    period: '2001年〜2005年',
    image: '/images/cars/stepwgn/gen2-2001.webp',
    annotations: [
      { x: 19, y: 61, label: 'キープコンセプトの台形グリル', dir: 'bottom', labelX: 19 },
      { x: 37, y: 75, label: '張り出したフェンダーアーチ（SPADA）', dir: 'bottom', labelX: 55 },
    ],
    facelift: {
      fromYear: '2001', toYear: '2003',
      note: '2003年、フロント・リアの意匠を全面刷新し、スポーティな派生モデル「SPADA」を追加。',
      points: ['フロント・リアのデザインを一新', 'スポーツグレード「SPADA」を追加'],
    },
  },
  {
    numeral: 'III',
    era: '3代目',
    title: 'RG1-4型',
    code: 'RG1',
    startYear: '2005',
    yearRange: '2005–2009',
    period: '2005年〜2009年',
    image: '/images/cars/stepwgn/gen3-2005.webp',
    annotations: [
      { x: 30, y: 58, label: '低められた車高と大型グリル', dir: 'bottom', labelX: 30 },
      { x: 70, y: 55, label: '両側スライドドアの採用', dir: 'bottom', labelX: 78 },
    ],
    facelift: {
      fromYear: '2005', toYear: '2007',
      note: '2007年、内外装を刷新するとともに「SPADA」を復活。',
      points: ['フロントまわりのデザインを刷新', 'スポーツグレード「SPADA」が復活'],
    },
  },
  {
    numeral: 'IV',
    era: '4代目',
    title: 'RK1-7型',
    code: 'RK1',
    startYear: '2009',
    yearRange: '2009–2015',
    period: '2009年〜2015年',
    image: '/images/cars/stepwgn/gen4-2009.webp',
    annotations: [
      { x: 31, y: 46, label: '角度のついたメッキグリル', dir: 'bottom', labelX: 31 },
      { x: 55, y: 48, label: '丸みを帯びた親しみやすいフェイス', dir: 'bottom', labelX: 66 },
    ],
    facelift: {
      fromYear: '2012', toYear: '2012',
      points: ['フロントデザインをより立体的な造形に変更', 'ヘッドライト・テールランプのグラフィックを一新'],
    },
  },
  {
    numeral: 'V',
    era: '5代目',
    title: 'RP1-5型',
    code: 'RP1',
    startYear: '2015',
    yearRange: '2015–2022',
    period: '2015年〜2022年',
    image: '/images/cars/stepwgn/gen5-2015.webp',
    annotations: [
      { x: 32, y: 48, label: '水平基調に広がるフロントフェイス', dir: 'bottom', labelX: 32 },
      { x: 58, y: 45, label: 'スリムなヘッドライト', dir: 'bottom', labelX: 68 },
    ],
    facelift: {
      fromYear: '2017', toYear: '2017',
      note: '2017年、フロントフェイスを大きく変更するとともにハイブリッド「e:HEV」を追加。',
      points: ['フロントフェイスのデザインを大幅に変更', 'ハイブリッドモデル「e:HEV」を追加'],
    },
  },
  {
    numeral: 'VI',
    era: '現行モデル',
    title: 'RP6-8型',
    code: 'RP6',
    startYear: '2022',
    yearRange: '2022–現在',
    period: '2022年〜現在',
    image: '/images/cars/stepwgn/gen6-2022.webp',
    // Timeline's shared 1.55x crop (see --timeline-object-position in
    // car-page.css) cut the front wheel right at the card's edge on
    // this generation's photo -- shifted left just for this thumbnail
    // (verified: wheel has real margin, headlight/grille still fully
    // shown).
    timelineObjectPosition: '26% 55%',
    annotations: [
      { x: 39, y: 30, label: '大型化した一体感のあるフロント', dir: 'top', labelX: 62 },
      { x: 25, y: 45, label: '存在感のある水平グリル', dir: 'top', labelX: 20 },
    ],
    facelift: null,
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'STEPWGN',
  brand: 'ホンダ', // used only for JSON-LD ("ホンダ STEPWGN RP6-8型" etc.)
  maker: 'Honda', // English, for grouping cards on the Home page (see src/home.js) -- CSS uppercases it for display
  order: 7, // Home page display order within All Cars -- lower shows first
  // CarVista Design Identity -- see docs/brand/design-identity.md. The
  // standing reference for Hero copy, annotation vocabulary, and SEO
  // tone for this vehicle; check new copy against these words before
  // writing it, don't invent tone per-page.
  designRole: 'The functional essential.', // one-line "what is this vehicle" -- read first, before Identity/Avoid
  designIdentity: ['Simple', 'Clean', 'Functional'],
  // Words this vehicle's copy must not reach for -- Flashy/Aggressive/
  // Luxury would contradict Honda's own stated utility-first concept
  // for this nameplate.
  designAvoid: ['Flashy', 'Aggressive', 'Luxury'],
  // Fixed across every generation's image so Hero/Compare/Timeline
  // never accidentally mix grades or colors -- see
  // docs/brand/design-identity.md. "AIR" is the current generation's
  // own standard nameplate (distinct from the sportier SPADA trim,
  // which this vehicle's Avoid list rules out anyway). Platinum White
  // Pearl is sourced as this nameplate's #1 color, described as
  // conveying reassuring, standard-choice confidence -- matches Simple/
  // Clean directly, not just popularity.
  representativeGrade: 'AIR',
  representativeColor: 'Platinum White Pearl',
  // Hero vignette tint (see .hero-vignette in car-page.css) -- a true
  // neutral gray vs. the base (11,12,14), matching Simple/Functional --
  // deliberately the smallest shift on the site. Whisper-subtle by
  // design, not a color filter.
  heroScrim: '12, 12, 12',
  // Current (RP6-8) generation's approx. overall length -- see
  // docs/brand/design-identity.md's "What Reference Length is". Anchors
  // this vehicle's apparent body scale relative to every other vehicle
  // on the site once images are (re)generated with scale in mind; not
  // retroactive to already-published photos. Internal production
  // metadata only -- never render this as a spec on the page.
  referenceLengthMm: 4800,
  tagline: 'かたちは、時代を語る。',
  heroImage: '/images/cars/stepwgn/hero-gen6-3q.webp',
  // Drives <title>/description/canonical/OGP/Twitter -- see the
  // seo-inject plugin in vite.config.js. Nothing else in this page's
  // <head> is hand-written.
  seo: {
    title: 'STEPWGN 歴代モデル一覧 — CarVista',
    description: 'ホンダ ステップワゴン全6世代を画像で比較。型式・販売期間・デザインの進化が一目でわかる。',
  },
  defaultIndex: 5,
  generations,
}
