// Pure data. No imports, no logic, no DOM -- this file describes one
// vehicle and nothing else. All rendering/interaction lives in
// src/car-page.js; the bootstrap that wires this data into it lives
// in src/entries/esquire.js.
//
// All published facts below are checked against the Toyota sources in
// `references`. ESQUIRE is CarVista's first single-generation vehicle:
// launched 2014-10-29 and listed by Toyota through 2021-12 without a
// full model change. It shares its
// platform and model-code family with VOXY/NOAH's own 80系
// (ZRR80G/ZRR85G) -- a third sibling on the same body-in-white, same
// pattern as the NOAH/VOXY twin pair already established elsewhere on
// this site.
//
// era is '初代' (first generation), not '現行モデル' -- unlike every
// other vehicle here, ESQUIRE is discontinued, so it is NOT an
// ongoing/current model; do not relabel this "current" later.
//
// Annotation x/y coordinates were measured directly against this
// vehicle's actual (user-supplied) photo.
//
// gen1-2014 image (2026-08-01): the supplied source photo had zero
// margin top and bottom -- the roofline touched row 0 and the front
// tire/bumper touched the last row, both genuinely cropped (confirmed
// by cropping and viewing the top/bottom strips directly, not just
// eyeballing the full frame), unlike every other vehicle's photo on
// the site. There's no more of the original photo to recover past that
// crop, so fixed it non-destructively: scaled the whole image down 14%
// (uniform, no distortion) and centered it on the same 1408x668 canvas,
// padded with the photo's own background color (sampled from its own
// clean top corners) with a ~36px feathered alpha edge so the resized
// photo blends into the pad instead of showing a hard rectangle seam.
// Car pixels themselves are unchanged, just smaller within the frame
// with real breathing room on every side now.
const generations = [
  {
    numeral: 'I',
    era: '初代',
    title: '80系',
    code: 'ZRR80G / ZRR85G / ZWR80G',
    startYear: '2014',
    yearRange: '2014–2021',
    period: '2014年〜2021年',
    image: '/images/cars/esquire/gen1-2014.webp',
    annotations: [
      { x: 22, y: 48, label: '中世の盾を模した<wbr>大型メッキグリル', dir: 'bottom', labelX: 22 },
      { x: 58, y: 15, label: 'メッキを纏った上質な<wbr>フロントフェイス', dir: 'top', labelX: 60 },
    ],
    // 2017年7月3日改良: グリル幅を拡大しコンセプトモチーフ（中世
    // ヨーロッパの従騎士の盾）をより具現化。ヘッドライトユニットを
    // 縮小し、メッキ装飾をヘッドライト下からグリル横まで拡大。
    // https://gazoo.com/car/point/salespoint/17/07/03_4/
    facelift: {
      fromYear: '2014', toYear: '2017',
      points: ['フロントグリルの幅を拡大し盾のモチーフを強調', 'メッキ装飾をヘッドライト下からグリル横まで拡大', '縦基調のラインで立体感のあるデザインに変更'],
    },
  },
]

export default {
  references: { items: [
    { generations: '80系・発売時', label: 'トヨタ 2014年エスクァイア発売資料', url: 'https://global.toyota/jp/newsroom/toyota/21796684.html' },
    { generations: '80系・2017年改良', label: 'トヨタ 2017年マイナーチェンジ資料', url: 'https://global.toyota/jp/newsroom/toyota/21823080.html' },
    { generations: '販売期間', label: 'トヨタ認定中古車 エスクァイア歴代モデル', url: 'https://toyota.jp/ucar/catalog/brand-TOYOTA/car-ESQUIRE/' },
  ] },
  eyebrow: 'CARVISTA',
  vehicleName: 'ESQUIRE',
  brand: 'トヨタ', // used only for JSON-LD ("トヨタ ESQUIRE 80系" etc.)
  maker: 'Toyota', // English, for grouping cards on the Home page (see src/home.js) -- CSS uppercases it for display
  order: 5, // Home page display order within All Cars -- lower shows first. Placed right after NOAH/VOXY (3/4): ESQUIRE is their premium derivative, not an unrelated Toyota, so it reads as that family's third member, not a random addition to the list.
  // CarVista Design Identity -- see docs/brand/design-identity.md. The
  // standing reference for Hero copy, annotation vocabulary, and SEO
  // tone for this vehicle; check new copy against these words before
  // writing it, don't invent tone per-page.
  //
  // ESQUIRE's own official concept is "新上級コンパクトキャブワゴン"
  // (a new upscale compact cab-wagon), pursuing 高級感/上質感
  // (luxury/refined feel) -- explicitly contrasted against VOXY's
  // "スポーティ・先進的" (sporty/advanced) and positioned as the third,
  // upscale-focused sibling alongside VOXY/NOAH on the same platform.
  // https://gazoo.com/car/point/guide/15/02/09_6/ ,
  // https://www.suv-land.jp/related_topic/240/
  designRole: 'The refined compact.',
  designIdentity: ['Refined', 'Elegant', 'Polished'],
  // Words this vehicle's copy must not reach for -- Aggressive/Sporty
  // are VOXY's own claimed register within the same Mainstream cluster
  // (see below), and directly contradict a "refined/elegant" vehicle;
  // Utilitarian would undercut the entire upscale concept the real
  // vehicle was built around.
  designAvoid: ['Aggressive', 'Sporty', 'Utilitarian'],
  // Fixed across the (single) generation's image -- see
  // docs/brand/design-identity.md. "Gi" is ESQUIRE's premium-tier
  // grade (vs. the base "Xi"); a documented special package on this
  // grade is literally named "Gi プレミアムパッケージ ブラックテーラード"
  // (Gi Premium Package Black Tailored) -- both the grade and the
  // "Tailored" naming reinforce Refined/Elegant/Polished directly, and
  // match the black paint of the supplied photos.
  representativeGrade: 'Gi',
  representativeColor: 'Black',
  // Hero vignette tint (see .hero-vignette in car-page.css) -- a
  // whisper cool/silvery lift vs. the neutral base (11,12,14), reading
  // as "polished chrome" rather than any other vehicle's register
  // (distinct from Alphard's warm bronze, Vellfire's magenta-cool).
  heroScrim: '13, 13, 15',
  // Same platform/length as VOXY/NOAH (see the platform note above) --
  // see docs/brand/design-identity.md's "What Reference Length is".
  // Internal production metadata only -- never render this as a spec
  // on the page.
  referenceLengthMm: 4695,
  tagline: 'かたちは、時代を語る。',
  heroImage: '/images/cars/esquire/hero-gen1-3q.webp',
  generationGuide: {
    title: 'ESQUIREは「何代目」より、2017年7月改良の前後を確認する',
    intro: 'ESQUIREは2014年から2021年まで1世代のみです。中古車を見分けるときは、世代番号ではなく2017年7月3日のマイナーチェンジ、Xi／Gi、ガソリン／ハイブリッドを分けて確認します。',
    items: [
      {
        title: '80系・2014年発売時',
        description: 'バンパー下部まで伸びる縦基調グリルとメッキ加飾が発売時からの特徴です。2017年改良後も同じ80系なので、型式だけでは改良前後を確定できません。',
        meta: 'ZRR80G / ZRR85G / ZWR80G・2014年10月発売',
      },
    ],
  },
  evolutionNotes: [
    {
      title: '2017年7月：薄型LEDランプとグリル意匠を変更',
      text: 'トヨタ公式発表ではBi-Beam LEDヘッドランプ、面発光LEDクリアランスランプ、フロントグリルとリヤコンビネーションランプの意匠変更が示されています。外観写真はランプとグリルを一組で確認します。',
      meta: '同時にGi “Premium Package”を新設定。専用内装を全車共通の改良差として扱いません。',
    },
    {
      title: '中古車確認：兄弟車・グレード・パワートレーンを分ける',
      text: 'VOXY／NOAHと基本構成を共有しますが、ESQUIREは専用の縦基調グリルとメッキ表現を持ちます。写真で絞った後、正式グレード、初度登録、型式、ガソリン／ハイブリッドを車両情報で照合します。',
      meta: '初度登録時期だけで2017年改良前後を断定せず、現車仕様を販売店へ確認します。',
    },
  ],
  guides: [
    { href: '/compare-voxy-noah-esquire.html', label: 'VOXY・NOAH・ESQUIREの違い', description: '兄弟車の位置づけとフロントマスクを、世代条件を明示して比較する。', image: '/images/cars/esquire/compare-standard-v1.png' },
  ],
  // Drives <title>/description/canonical/OGP/Twitter -- see the
  // seo-inject plugin in vite.config.js. Nothing else in this page's
  // <head> is hand-written. Keep this Japanese, matching every other
  // CarVista vehicle page and the Japanese search intent for this model.
  seo: {
    title: 'ESQUIRE 歴代モデル一覧 — CarVista',
    description: 'トヨタ エスクァイア（2014〜2021年）を画像で比較。80系のデザイン変化と型式が一目でわかる。',
  },
  defaultIndex: 0,
  generations,
}
