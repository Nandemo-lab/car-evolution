// Pure data. No imports, no logic, no DOM -- this file describes one
// vehicle and nothing else. All rendering/interaction lives in
// src/car-page.js; the bootstrap that wires this data into it lives in
// src/entries/n-box.js.
//
// All facts below (periods, model codes, the 2026 minor change) are
// cross-checked against multiple independent sources (Honda's own
// newsroom, Car Watch, nextage.jp/goo-net catalog pages) -- no invented
// specs. N-BOX has had exactly two full model changes (2011->2017,
// 2017->2023) plus a minor change on 2026-07-17 -- see
// https://global.honda/jp/news/2026/4260716-n-box.html . That update did
// NOT change the model code (JF5/JF6 both before and after) and Honda's
// own material limits the front-face redesign to N-BOX CUSTOM. The
// standard N-BOX depicted here therefore remains one continuous third
// generation; the 2026 changes are described in its facelift panel.
//
// Images (2026-08-03): source photos supplied by the user, with the three
// actual generations used for the comparison -- no color/lighting/shape edits
// applied. Each generation photo was uniformly scaled (car-body-width
// normalized across all 4, not a flat per-image ratio -- source photos
// had two different native resolutions/framings) and cropped/padded
// (background-only) onto the shared 1408x668 canvas; see
// docs/architecture/image-integration-checklist.md. The now-unused
// スペーシア4代目.png sibling file for this same supplied batch does NOT
// apply here (that note lives in spacia.js).
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
    era: '現行モデル',
    title: 'JF5/JF6型',
    code: 'JF5/JF6',
    startYear: '2023',
    yearRange: '2023–現在',
    period: '2023年〜現在',
    image: '/images/cars/n-box/gen3-2023.webp',
    annotations: [
      { x: 48, y: 61, label: '人の瞳を想起させる<wbr>丸型LEDヘッドライト', dir: 'bottom', labelX: 48 },
      { x: 32, y: 66, label: '丸穴デザインの<wbr>フロントグリル', dir: 'bottom', labelX: 30 },
    ],
    // 2026年7月17日の変更はフルモデルチェンジではなく一部改良。
    // JF5/JF6型の3代目として継続する。
    facelift: {
      fromYear: '2023', toYear: '2026',
      note: '2026年の一部改良では、各タイプの個性を高める外装・仕様変更を実施。',
      points: ['N-BOX CUSTOMのフロントフェイスを刷新', 'N-BOX JOYに特別仕様車「BLACK STYLE」を設定', '外装クリア材を変更しボディーの艶感を向上'],
    },
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
  generationGuide: {
    title: '初代・2代目・3代目を見分ける代表ポイント',
    intro: 'N-BOXの基本的な世代差は、このページのTimeline・Compare・型式一覧で確認できます。中古車では外観だけで断定せず、JF型式と初度登録年を照合してください。',
    items: [
      { title: '初代', description: '細いグリルと、背の高い箱型シルエットが入口。', meta: '2011年〜2017年 · JF1 / JF2' },
      { title: '2代目', description: 'ライトとグリルの横方向のつながりがより明確。', meta: '2017年〜2023年 · JF3 / JF4' },
      { title: '3代目', description: '水平基調の灯火類と、すっきりしたフロントが目印。', meta: '2023年〜現在 · JF5 / JF6' },
    ],
  },
  guides: [
    { href:'/n-box-jf1-vs-jf3.html', label:'N-BOX JF1・JF3の違い', description:'初代と2代目の標準N-BOXを画像、型式、装備で比較する。', image:'/images/cars/n-box/gen2-2017.webp' },
    { href: '/n-box-jf3-vs-jf5.html', label: 'N-BOX JF3とJF5の違い', description: '標準車の2代目と3代目を画像・型式・装備で比較する。', image: '/images/cars/n-box/gen3-2023.webp' },
    { href: '/n-box-jf3-zenki-kouki.html', label: 'N-BOX 2代目（JF3/JF4）前期・後期の違い', description: '2020年12月の変更をCustomの統一画像で見分ける。' },
    { href: '/compare-n-box-spacia.html', label: 'N-BOX・SPACIAの違い', description: '現行の軽スーパーハイトワゴンを同じ視点で比べる。' },
  ],
  // User-supplied TOP composition (2026-08-07): low, front-emphasised
  // three-quarter view used only on discovery cards. The vehicle page Hero
  // and same-condition generation images remain unchanged.
  homeCardImage: '/images/cars/n-box/home-card.webp',
  seo: {
    title: 'N-BOX 歴代モデル・初代/2代目/3代目の違い — CarVista',
    description: 'ホンダ N-BOXの初代から現行3代目までを統一画像で比較。JF型式、販売期間、見分け方とデザイン進化が一目でわかる。',
  },
  defaultIndex: 2,
  generations,
}
