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
//
// 2026-08-04 -- cross-generation scale correction. QA (same wheel-rim
// measurement method used for Alphard, see that file's own history)
// found VOXY's photos split into two different scales: gen1/gen2's
// front wheel rim measured ~146-151px diameter, gen3/gen4's ~112-114px
// -- a real ~21-25% scale mismatch, not just a position offset like
// Alphard had. Per direct user decision, gen4 (90系, current model) is
// the baseline: (1) future generations will keep extending forward
// from it, not require renumbering everything, (2) it's what most
// visitors compare older models against, (3) it matches the "same
// camera/distance" comparability principle this site is built on.
// gen3 measured close enough (~114 vs 112px, gen4's rim) that its
// scale was left alone per explicit instruction -- only gen1 and gen2
// were uniformly resized (both axes, same factor -- aspect ratio never
// distorted) down to gen4's rim diameter: gen1 by 0.7417x, gen2 by
// 0.7593x. All 3 (gen1/gen2 resized, gen3 position-only) then had their
// wheel CENTER re-aligned to gen4's own (734,474)px position, via crop/
// pad (gen3) or resize+pad (gen1/gen2) -- car pixels are pasted back
// unresampled at their new offset, never touched a second time.
//
// Padding technique differs from Alphard's: VOXY's source photos crop
// much tighter (car sits close to every edge already, confirmed by
// direct pixel sampling), so mirroring a wide edge strip -- the
// technique that worked for Alphard's more generously-margined photos
// -- pulled in actual car pixels and produced a visible duplicate-car
// artifact in the padding. Fixed with a different fill derived from
// direct measurement: this photo's own background reads as essentially
// a pure VERTICAL gradient (dark top -> lighter floor, confirmed by
// sampling both true side columns and top/bottom rows, all at every
// row/column, all car-free) with only minor horizontal variation. A
// single vertical gradient column -- averaged from the image's own
// confirmed-clean left and right edge columns, then heavily blurred --
// is tiled to fill every pad region (left/right/top/bottom alike) from
// that one function, which is why there's no visible seam where two
// different edge-fills would otherwise meet at a corner.
//
// Final verification (per explicit user checklist) measured on the
// shipped files: rim diameter and center within the requested ~1px
// tolerance across gen1/2/3 vs gen4; roofline and bumper position
// checked as the qualitative final pass. All x/y% below were re-
// derived for gen1 (resize 0.7417, pad L246/T87), gen2 (resize 0.7593,
// pad L94/T66), and gen3 (translate dx=-8/dy=-12, no resize).
const generations = [
  {
    numeral: 'I',
    era: '初代',
    title: '60系',
    code: 'AZR60G',
    startYear: '2001',
    yearRange: '2001–2007',
    period: '2001年〜2007年',
    // Historical source filenames were reversed: this file contains the
    // boxier AZR60 vehicle even though its filename says 2007.
    image: '/images/cars/voxy/gen2-2007.webp',
    annotations: [
      { x: 33, y: 53.1, label: '3本クロームグリル', dir: 'bottom', labelX: 33 },
      { x: 62, y: 23.4, label: '箱型シルエット', dir: 'top', labelX: 63.5 },
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
    // This file contains the split-lamp ZRR70 vehicle. Keep the corrected
    // assignment unless the underlying assets themselves are renamed.
    image: '/images/cars/voxy/gen1-2001.webp',
    annotations: [
      { x: 29.5, y: 50.1, label: '大型クローム<wbr>エンブレム', dir: 'bottom', labelX: 21.9 },
      { x: 34, y: 53.9, label: 'ハニカムメッシュ<wbr>グリル', dir: 'bottom', labelX: 46.2 },
      { x: 40.8, y: 41.8, label: '丸みを帯びた<wbr>フェイス', dir: 'top', labelX: 55.3 },
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
      { x: 30.4, y: 45.2, label: '鋭角的な<wbr>V字グリル', dir: 'bottom', labelX: 30.4 },
      { x: 46.4, y: 53.2, label: 'スイープ<wbr>ヘッドライト', dir: 'bottom', labelX: 54.4 },
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
      { x: 35, y: 36, label: 'フルワイド<wbr>発光ライン', dir: 'top', labelX: 38 },
      { x: 18, y: 43, label: '3眼LED<wbr>ヘッドライト', dir: 'bottom', labelX: 60 },
      { x: 28, y: 68, label: 'ダイヤモンドメッシュ<wbr>グリル', dir: 'bottom', labelX: 20 },
    ],
    // 2025年9月2日、ノアと同時に一部改良(単発発表・発売)。ボディカラーの
    // 入れ替え(ホワイトパールクリスタルシャイン→プラチナホワイトパール
    // マイカ)、上位グレードへのディスプレイオーディオPlus標準化、
    // ブラインドスポットモニター等の安全装備標準化が柱 -- 旧版の
    // 「Apple CarPlay・Android Autoに対応」は今回の改良で新たに加わった
    // ものではなく(対応自体は本機種で既存)、実際の改良点ではなかったため
    // 削除。
    // https://kinto-jp.com/magazine/k20250905-1/
    facelift: {
      fromYear: '2022', toYear: '2025',
      note: '今回の改良では、装備・機能面を中心にアップデート。',
      points: ['ボディカラーを一新(新色プラチナホワイトパールマイカ等)', '上位グレードにディスプレイオーディオPlusを標準装備', 'ブラインドスポットモニターなど安全装備を標準化'],
    },
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'VOXY',
  brand: 'トヨタ', // used only for JSON-LD ("トヨタ VOXY 90系" etc.) -- not every future vehicle is a Toyota
  maker: 'Toyota', // English, for grouping cards on the Home page (see src/home.js) -- CSS uppercases it for display
  order: 4, // Home page display order within All Cars -- lower shows first
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
  references: {
    checkedAt: '2026年8月9日',
    items: [
      { generations: '60系・70系', label: 'トヨタ認定中古車 ヴォクシー車両情報', url: 'https://toyota.jp/ucar/catalog/brand-TOYOTA/car-VOXY/' },
      { generations: '80系', label: 'トヨタ旧車情報 ヴォクシー', url: 'https://toyota.jp/carlineup/archive/voxy/' },
      { generations: '90系', label: 'トヨタ WEBカタログ ヴォクシー', url: 'https://toyota.jp/request/webcatalog/voxy/?id=voxy_catalog' },
    ],
  },
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
