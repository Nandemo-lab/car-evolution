// Pure data. No imports, no logic, no DOM -- this file describes one
// vehicle and nothing else. All rendering/interaction lives in
// src/car-page.js; the bootstrap that wires this data into it lives in
// src/entries/n-box.js.
//
// All facts below (periods, model codes, the 2026 minor change) are
// cross-checked against multiple independent sources (Honda's own
// newsroom, Car Watch, nextage.jp/goo-net catalog pages) -- no invented
// specs. N-BOX has had exactly two full model changes (2011->2017,
// 2017->2023) plus, mid-way through its current (3rd) generation, a
// genuinely visible "big minor change" on 2026-07-17 -- see
// https://global.honda/jp/news/2026/4260716-n-box.html . That update did
// NOT change the model code (JF5/JF6 both before and after) and Honda's
// own material is explicit that the *standard* N-BOX body (as opposed to
// N-BOX CUSTOM, a separate trim line not depicted here) kept its
// "round-eye" headlight/grille language largely as-is -- so this is
// deliberately NOT modeled as a 4th generation (which would misrepresent
// automotive history CarVista doesn't actually have), but as a 前期/後期
// split of the 3rd generation, the same real terminology already used
// for Delica D:5's own non-full-model-change history (see
// src/cars/delica-d5.js). This is a standing rule going forward for any
// vehicle with a press-confirmed, visually-real minor change: full
// generation change -> a new numbered entry with its own 初代/2代目/...
// era; a same-generation visual refresh -> 前期/後期 within that one
// generation, never a fabricated new generation number.
//
// Images (2026-08-03): 5 source photos supplied by the user (初代/2代目/
// 3代目/4代目/TOP), all final/complete -- no color/lighting/shape edits
// applied. Each generation photo was uniformly scaled (car-body-width
// normalized across all 4, not a flat per-image ratio -- source photos
// had two different native resolutions/framings) and cropped/padded
// (background-only) onto the shared 1408x668 canvas; see
// docs/architecture/image-integration-checklist.md. The now-unused
// スペーシア4代目.png sibling file for this same supplied batch does NOT
// apply here (that note lives in spacia.js) -- N-BOX's own 4代目.png IS
// used, as the 後期 (post-2026) entry's photo.
const generations = [
  {
    numeral: 'I',
    era: '初代',
    title: 'JF1/JF2型',
    code: 'JF1/JF2',
    startYear: '2011',
    yearRange: '2011–2017',
    period: '2011年〜2017年',
    image: '/images/cars/n-box/gen1-2011.webp',
    annotations: [
      { x: 36, y: 57, label: 'クロームバー基調の<wbr>フロントグリル', dir: 'bottom', labelX: 34 },
      { x: 60, y: 23, label: '角型シルエットの<wbr>背の高いボディ', dir: 'top', labelX: 60 },
    ],
    facelift: null,
  },
  {
    numeral: 'II',
    era: '2代目',
    title: 'JF3/JF4型',
    code: 'JF3/JF4',
    startYear: '2017',
    yearRange: '2017–2023',
    period: '2017年〜2023年',
    image: '/images/cars/n-box/gen2-2017.webp',
    annotations: [
      { x: 33, y: 58, label: '厚みを増した<wbr>クロームグリル', dir: 'bottom', labelX: 31 },
      { x: 63, y: 22, label: 'より水平基調になった<wbr>ルーフライン', dir: 'top', labelX: 63 },
    ],
    facelift: null,
  },
  {
    numeral: 'III',
    era: '前期',
    title: 'JF5/JF6型 前期',
    code: 'JF5/JF6',
    startYear: '2023',
    yearRange: '2023–2026',
    period: '2023年〜2026年',
    image: '/images/cars/n-box/gen3-2023.webp',
    annotations: [
      { x: 48, y: 61, label: '人の瞳を想起させる<wbr>丸型LEDヘッドライト', dir: 'bottom', labelX: 48 },
      { x: 32, y: 66, label: '丸穴デザインの<wbr>フロントグリル', dir: 'bottom', labelX: 30 },
    ],
    facelift: null,
  },
  {
    numeral: 'IV',
    era: '後期',
    title: 'JF5/JF6型 後期',
    code: 'JF5/JF6',
    startYear: '2026',
    yearRange: '2026–現在',
    period: '2026年〜現在',
    image: '/images/cars/n-box/gen3-2026.webp',
    annotations: [
      { x: 49, y: 58, label: '丸型ヘッドライトの<wbr>親しみやすい表情を継承', dir: 'bottom', labelX: 49 },
      { x: 63, y: 24, label: '乗る人すべてを包む<wbr>水平基調のデザイン', dir: 'top', labelX: 63 },
    ],
    // 2026年7月17日、標準モデルの外観言語を維持したまま一部改良を実施
    // (フルモデルチェンジではない -- 型式もJF5/JF6のまま変更なし)。
    // https://global.honda/jp/news/2026/4260716-n-box.html
    facelift: null,
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'N-BOX',
  brand: 'ホンダ', // used only for JSON-LD ("ホンダ N-BOX JF5/JF6型 後期" etc.)
  maker: 'Honda', // English, for grouping cards on the Home page (see src/home.js) -- joins the existing Honda group (STEPWGN/FREED)
  order: 12, // Home page display order within All Cars -- appended after FREED (8) within the existing Honda group.
  // CarVista Design Identity -- see docs/brand/design-identity.md. Sourced
  // from Honda's own N-BOX design interview and 3rd-gen grand concept
  // ("ハッピー・リズム・ボックス", theme "みんなのN"): "男性的でも女性的
  // でもない...愛嬌がありながら、でも凛々しい...水平基調のデザインが乗る
  // 人すべてをやさしく包む一体感" -- a warm, universally-approachable
  // register, not a sharp or sporty one.
  // First member of a new "Kei super-height wagon" cluster alongside
  // Spacia (see docs/brand/design-identity.md) -- N-BOX and Spacia are
  // real-world direct rivals (Japan's two best-selling kei tall wagons),
  // so their keyword families must genuinely differ, same discipline as
  // NOAH/VOXY.
  designRole: 'The everyone\'s kei car.',
  designIdentity: ['Friendly', 'Approachable', 'Universal'],
  // Direct opposite of Friendly/Approachable/Universal, plus Spacia's own
  // claimed register (Playful/Sturdy/Adventurous, container-motif/
  // industrial) so the two cluster-mates don't blur together.
  designAvoid: ['Aggressive', 'Industrial', 'Exclusive'],
  // "G" is the base/standard grade in the current G/L/EX lineup (Custom
  // is a separate trim line, not depicted here) -- not loaded, not
  // stripped, matching every supplied photo's plain "N BOX" badge.
  representativeGrade: 'G',
  // Real, current-generation (JF5/JF6) Honda color name -- sourced as a
  // "beautiful white shining like sunlight" register, reinforcing the
  // Friendly/warm identity above and matching every supplied photo.
  representativeColor: 'プレミアムサンライトホワイト・パール',
  // Hero vignette tint -- a warm, soft lift vs. the base (11,12,14),
  // matching Friendly/Approachable rather than any harder/industrial
  // register.
  heroScrim: '14, 13, 11',
  // Current-generation (kei-jidousha regulatory max) overall length --
  // see docs/brand/design-identity.md's "What Reference Length is".
  // Internal production metadata only -- never render this as a spec on
  // the page. CarVista's smallest vehicle yet, tied with Spacia (both at
  // the kei-car legal length ceiling), visibly smaller in frame than
  // even ソリオ (3,810mm).
  referenceLengthMm: 3395,
  tagline: 'かたちは、時代を語る。',
  heroImage: '/images/cars/n-box/hero-jf5-3q.webp',
  seo: {
    title: 'N-BOX 歴代モデル一覧 — CarVista',
    description: 'ホンダ N-BOXの初代から現行(3代目 前期/後期)までを画像で比較。軽スーパーハイトワゴンとしてのデザインの進化が一目でわかる。',
  },
  defaultIndex: 3,
  generations,
}
