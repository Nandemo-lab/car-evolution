// Pure data. No imports, no logic, no DOM -- this file describes one
// vehicle and nothing else. All rendering/interaction lives in
// src/car-page.js; the bootstrap that wires this data into it lives in
// src/entries/spacia.js.
//
// All facts below (periods, model codes) are cross-checked against
// multiple independent sources (goo-net.com, spectank.jp, Japanese
// Wikipedia) -- no invented specs. Spacia has had exactly two full model
// changes (2013->2017, 2017->2023); the current (3rd) generation has NO
// press-confirmed, visually-real minor change as of this writing (2026-08
// coverage describes only speculative/unconfirmed future updates) --
// unlike N-BOX (see src/cars/n-box.js), so this vehicle is modeled as a
// plain 3-generation timeline (初代/2代目/現行モデル), not split into
// 前期/後期. Per explicit project decision: only split a generation into
// 前期/後期 once a real minor change is actually confirmed by an official
// source, never pre-emptively.
//
// Images (2026-08-03): the user supplied 5 source photos (初代/2代目/
// 3代目/4代目/TOP), all final/complete -- no color/lighting/shape edits
// applied. Only 4 are used here (初代/2代目/3代目/TOP as hero); the
// スペーシア4代目.png file is deliberately NOT wired into the site --
// there is no confirmed 4th generation or confirmed minor-change split
// for this vehicle to justify a 4th timeline entry (see the note above).
// It remains in the user's Downloads folder, untouched, in case a future
// confirmed update gives it a real purpose.
//
// gen1-3 car scale (2026-08-04, corrected): an earlier pass claimed
// gen1-3 were already "uniformly scaled," but a real screenshot showed
// gen1/gen2's car noticeably larger than gen3's within the shared
// 1408x668 canvas -- measured directly (brightness-threshold bounding
// box, car is white against a near-black background at every row/
// column) rather than trusting the old claim: gen1/gen2's car bbox
// width was 60-63% of frame vs. gen3's 47%. gen3 (current model) was
// treated as the reference and left untouched; gen1/gen2 were uniformly
// scaled down (0.7517x / 0.7782x respectively -- resize, not a pixel/
// color edit) so their bbox width matches gen3's exactly, then
// re-centered on gen3's own bbox center and padded with each image's
// own sampled background color. Re-verified after: all three now
// measure 662-663px / ~47% bbox width. Annotation x/y below were
// re-derived afterward against the corrected files (grid overlay +
// marker-dot verification against the actual output).
const generations = [
  {
    numeral: 'I',
    era: '初代',
    title: 'MK32S/MK42S型',
    code: 'MK32S/MK42S',
    startYear: '2013',
    yearRange: '2013–2017',
    period: '2013年〜2017年',
    image: '/images/cars/spacia/gen1-2013.webp',
    annotations: [
      { x: 45, y: 62, label: '縦基調のクロームバー<wbr>グリル', dir: 'bottom', labelX: 35 },
      { x: 51, y: 61, label: '丸みを帯びた<wbr>ヘッドライト', dir: 'bottom', labelX: 63 },
    ],
    facelift: null,
  },
  {
    numeral: 'II',
    era: '2代目',
    title: 'MK53S型',
    code: 'MK53S',
    startYear: '2017',
    yearRange: '2017–2023',
    period: '2017年〜2023年',
    image: '/images/cars/spacia/gen2-2017.webp',
    annotations: [
      { x: 46, y: 54, label: 'Sマークを囲む<wbr>クロームグリル', dir: 'bottom', labelX: 46 },
      { x: 62, y: 21, label: '水平基調に変わった<wbr>ルーフライン', dir: 'top', labelX: 62 },
    ],
    facelift: null,
  },
  {
    numeral: 'III',
    era: '現行モデル',
    title: 'MK94S型',
    code: 'MK94S',
    startYear: '2023',
    yearRange: '2023–現在',
    period: '2023年〜現在',
    image: '/images/cars/spacia/gen3-2023.webp',
    annotations: [
      { x: 46, y: 49, label: 'Sマークを大きく掲げる<wbr>クロームグリル', dir: 'bottom', labelX: 35 },
      { x: 56, y: 48, label: 'シャープな造形の<wbr>ヘッドライト', dir: 'bottom', labelX: 65 },
    ],
    facelift: null,
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'SPACIA',
  brand: 'スズキ', // used only for JSON-LD ("スズキ スペーシア MK94S型" etc.)
  maker: 'Suzuki', // English, for grouping cards on the Home page (see src/home.js) -- joins the existing Suzuki group (ソリオ)
  order: 13, // Home page display order within All Cars -- appended after ソリオ (11) and N-BOX (12) within/after the existing Suzuki group.
  // CarVista Design Identity -- see docs/brand/design-identity.md. Sourced
  // from Suzuki's own stated concept ("わくわく満載！自由に使える安心・
  // 快適スペーシア") and exterior design language ("頑丈で大容量のコンテ
  // ナをモチーフ...工業製品のような角を面取りしたフォルム") -- a robust,
  // container-like, playfully-usable register, genuinely different from
  // N-BOX's own warm/universal family (see docs/brand/design-identity.md
  // for the new "Kei super-height wagon" cluster both vehicles share).
  designRole: 'The playful utility box.',
  designIdentity: ['Playful', 'Sturdy', 'Adventurous'],
  // Direct opposite of Playful/Sturdy/Adventurous, plus N-BOX's own
  // claimed cluster keywords (Friendly/Approachable/Universal) so the two
  // cluster-mates don't collide.
  designAvoid: ['Fragile', 'Formal', 'Universal'],
  // "HYBRID X" is the fuller-equipped mainstream grade (vs. entry-level
  // HYBRID G) -- Suzuki Safety Support and both power slide doors
  // standard, matching this vehicle's "usable, not stripped-down"
  // register.
  representativeGrade: 'HYBRID X',
  // Real, current most-popular Suzuki color (30.3% share per 2026 sales
  // data) -- matches every supplied photo.
  representativeColor: 'ピュアホワイトパール',
  // Hero vignette tint -- a clean, slightly cool lift vs. the base
  // (11,12,14), matching Sturdy/utility rather than N-BOX's warmer tone.
  heroScrim: '11, 13, 14',
  // Current-generation (kei-jidousha regulatory max) overall length --
  // see docs/brand/design-identity.md's "What Reference Length is".
  // Internal production metadata only -- never render this as a spec on
  // the page. Tied with N-BOX at the kei-car legal length ceiling,
  // CarVista's smallest vehicles yet.
  referenceLengthMm: 3395,
  tagline: 'かたちは、時代を語る。',
  heroImage: '/images/cars/spacia/hero-mk94s-3q.webp',
  // Home's mini-card (see the doc comment in src/home.js) -- SPACIA's
  // own Hero photo has the car positioned toward the left of its frame
  // at a different scale than SOLIO's (its Suzuki sibling, shown right
  // next to it in the same maker group), which read as visibly
  // inconsistent card-to-card despite both heroImage files being
  // 1408x668. This is a pure recrop of that same photo (headlight/
  // grille/mirror, no pixel values changed) matching SOLIO's own
  // mini-card framing/scale.
  homeCardImage: '/images/cars/spacia/home-card.webp',
  seo: {
    title: 'SPACIA 歴代モデル一覧 — CarVista',
    description: 'スズキ スペーシア全3世代を画像で比較。軽スーパーハイトワゴンとしてのデザインの進化が一目でわかる。',
  },
  defaultIndex: 2,
  generations,
}
