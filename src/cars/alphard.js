// Pure data. No imports, no logic, no DOM -- this file describes one
// vehicle and nothing else. All rendering/interaction lives in
// src/car-page.js; the bootstrap that wires this data into it lives
// in src/entries/alphard.js.
//
// All facts below (periods, model codes, dimensions, design/facelift
// content) are drawn from official Toyota catalogs, press releases,
// and other reliable public sources -- no invented specs. See the
// project memory for the source list.
//
// Annotation x/y dot positions were re-checked directly against this
// vehicle's actual photos (2026-07-29, all 27 generations site-wide --
// see git history). labelX/dir placement was further tuned (2026-07-30)
// to keep every leader line's caption inside the visible margin at
// mobile widths.
//
// 2026-08-03 -- cross-generation ground-line alignment. QA found the 4
// gen photos (each already 1408x668, Detail/Compare render them at true
// 1:1 with no crop/transform -- see .detail-image/.compare-image in
// car-page.css) placed the car at a different height within that same
// canvas per generation: measured directly off the front wheel's metal
// rim (a small, high-contrast, near-circular feature -- far more
// reliable than trying to read the roofline's top edge on a 3/4-angle
// photo, which this project has repeatedly found gives noisy results).
// Rim DIAMETER was consistent within ~2px across all 4 (~78-80px) --
// i.e. car scale/zoom was never actually the problem, despite a prior
// uniform 86.5% shrink having been applied site-wide as if it were.
// Rim CENTER Y, however, ran 507 / 490 / 485 / 459px for gen 1/2/3/4 --
// a real, monotonic ~48px drift, each generation's photo sitting
// progressively higher in its own frame than the last. Fixed with a
// per-generation vertical translate (crop one edge + mirror-pad the
// opposite edge with that same edge's own background, car pixels never
// touched) so all 4 gens' tire-ground line lands at the same y: gen1
// shifted up 22px, gen2 up 5px, gen3 unchanged (0, used as the
// alignment reference), gen4 down 27px. Each generation's annotation
// y% below was re-derived afterward to match (dy% = shift_px / 668 *
// 100) -- if this vehicle's photos are ever regenerated/replaced,
// re-verify this alignment doesn't need to be redone from scratch.
//
// 2026-08-03 -- studio canvas expanded (same day, follow-up request).
// Per explicit user instruction: car pixels must never be touched/
// resampled/regenerated -- only the surrounding background may change.
// Each of the 4 gen photos (post-alignment-fix above) was expanded from
// 1408x668, background-only, ratio-locked to 1408:668 so the whole
// frame still fills the existing 2.108:1 display boxes with zero crop
// (the added space is fully visible, never clipped by object-fit:
// cover). The car itself was pasted back at its exact original pixel
// content, just offset into the bigger canvas -- never resampled.
// Every added pixel is a mirror-reflection of that same photo's own
// existing edge strip (two sequential 1D mirrors, horizontal then
// vertical, so corners blend too) -- no flat fill, no synthesized/AI
// content.
//
// Went through 4 rounds of sizing, based on real screenshots (not DOM/
// file inspection) -- record all of them so a future session doesn't
// just re-guess again:
//   1. +190px L/R, +90px T/B (1788x848) -- too much: read as flat,
//      uniform dead space ("不自然"), shrank the Detail-view car more
//      than wanted.
//   2. +95px L/R, +45px T/B (1598x758) -- overcorrected the other way:
//      next screenshot showed the photo box reading as visibly cropped/
//      tight ("両端が切れてる").
//   3. +137px L/R, +65px T/B (1682x798) -- shipped, then reconsidered
//      at a higher level: a cross-vehicle comparison (see below) showed
//      this pushed Alphard's Detail/Compare images to read MORE
//      spacious than their actual peers.
//   4. **Back down to +95px L/R, +45px T/B (1598x758) -- current,
//      approved.** Same size as round 2, chosen deliberately this time
//      (not a bounce) after the comparison below. Each round re-derived
//      the untouched 1408x668 car core losslessly by cropping back out
//      of the previous file at its known paste offset -- the car pixels
//      have never been resampled across any of these 4 passes.
//
// The cross-vehicle check that settled it (2026-08-04): user asked to
// compare all 5 published TOP/hero images (VOXY/SERENA/SOLIO/SPACIA/
// ALPHARD) for occupancy/margin/presence. Found CarVista actually runs
// two established crop conventions: a tight "presence-first" one (VOXY,
// SERENA, and Alphard's own TOP -- car fills ~90-100% of frame, minimal
// margin) vs. a spacious "product-shot" one (SOLIO, SPACIA -- clear
// margin on all sides). Alphard's TOP belongs to the tight cluster and
// stays untouched -- see heroImage below, still the deliberate gold
// exception. Separately confirmed VOXY's and SERENA's own gen1-4 files
// are STILL native 1408x668 (zero background extension) -- i.e.
// Alphard's real peers for the Detail/Compare component specifically
// have no extension at all. User's explicit call: TOP images are a
// different UI role (deliberately tight/dramatic, see the Hero comment
// in car-page.css) from Detail/Compare (a generation-comparison tool,
// doesn't need to fill the frame the way TOP does) -- so Detail/Compare
// doesn't have to match TOP's or VOXY/SERENA's zero-extension tightness
// exactly, but shouldn't drift far enough to look unrelated to them
// either. +95/+45 (round 2's size) was picked as that balance: still
// visibly roomier than VOXY/SERENA's edge-to-edge Detail crop, but far
// short of round 3's noticeably-more-spacious 137/65. **Treat 95/45 as
// the settled, approved size for Alphard's Detail/Compare images --
// don't re-expand toward 137 or 190 without new explicit direction.**
// All x/y% below were re-derived for the 1598x758 canvas via nx% =
// (oldX%/100*1408 + 95) / 1598 * 100, ny% = (oldY%/100*668 + 45) / 758
// * 100 -- re-verified by rendering each new dot back onto its image
// and confirming it still lands on the intended physical feature.
const generations = [
  {
    numeral: 'I',
    era: '初代',
    title: '10系',
    code: 'ANH10W',
    startYear: '2002',
    yearRange: '2002–2008',
    period: '2002年〜2008年',
    image: '/images/cars/alphard/gen1-2002.webp',
    // annotation x/y re-derived (2026-08-03) against the newly supplied
    // photo (Alphard1代目.png) -- grid overlay + marker-dot verification
    // against the actual output file, not eyeballed against a thumbnail.
    // y re-adjusted (-3.3pt) after the source photo itself was shifted
    // up 22px to align its wheel-ground line with the other 3
    // generations, then both x/y re-adjusted again for the canvas
    // expansion -- see the two alignment notes above.
    annotations: [
      { x: 35, y: 54.4, label: 'メッキ基調の堂々とした<wbr>グリル', dir: 'bottom', labelX: 35 },
      { x: 58.8, y: 28.8, label: '直線的で<wbr>四角いフォルム', dir: 'top', labelX: 60.6 },
    ],
    // 2005年4月のマイナーチェンジ。旧版は3点目に「アダプティブフロント
    // ライティングシステムを追加」としていたが、ANH10Wへの搭載を裏付ける
    // 一次情報が見つからず(AFS自体は2002年の保安基準改正で解禁された技術
    // だが、採用は「上級車種を中心に順次」であり本車種への搭載は未確認)、
    // 誤情報のリスクを避けて確認できた事実に差し替え。
    // https://gazoo.com/catalog/maker/TOYOTA/ALPHARD_V/200205/
    facelift: {
      fromYear: '2002', toYear: '2005',
      points: ['グリルのデザインを刷新', 'ヘッドライト・フロントバンパー・テールランプの意匠を変更', '左フェンダーにアンダーミラーを追加'],
    },
  },
  {
    numeral: 'II',
    era: '2代目',
    title: '20系',
    code: 'ANH20W',
    startYear: '2008',
    yearRange: '2008–2015',
    period: '2008年〜2015年',
    image: '/images/cars/alphard/gen2-2008.webp',
    // 20系は「初代10系の箱型プロポーションを保ちながら、初めて曲面主体の
    // 面構成を取り入れた世代」というのが実車の特徴として最も語られる点
    // (10系は直線的な面主体、30系以降でさらに彫りの深い造形へ進む、その
    // 中間に位置する)。annotationsは1点=1つの実在する箇所を指す仕組みの
    // ため、この「先代からの変化」自体は最初のフロントライン注釈の文言に
    // 込めている(単独の"世代総評"用テキスト欄は存在しない)。
    // annotation x/y re-derived (2026-08-03) against the newly supplied
    // photo (Alphard2代目.png), then re-adjusted twice more same day for
    // the wheel-ground alignment shift and the canvas expansion -- see
    // the two alignment notes above.
    annotations: [
      { x: 43.8, y: 45.6, label: '直線的だった先代から<wbr>丸みを帯びたフロントライン', dir: 'top', labelX: 57 },
      { x: 41.2, y: 56.2, label: '横バー基調の<wbr>グリル', dir: 'bottom', labelX: 28 },
      { x: 51.8, y: 56.2, label: '切れ長の大型<wbr>ヘッドランプ', dir: 'bottom', labelX: 63.2 },
    ],
    facelift: {
      fromYear: '2008', toYear: '2011',
      points: ['グリルの形状をスクエアに近づけて刷新', 'グリル内のスポークを太めの3本に変更', 'より力強く高級感のある表情に'],
    },
  },
  {
    numeral: 'III',
    era: '3代目',
    title: '30系',
    code: 'AGH30W',
    startYear: '2015',
    yearRange: '2015–2023',
    period: '2015年〜2023年',
    image: '/images/cars/alphard/gen3-2015.webp',
    // このvehicle画像・注釈は2018年マイナーチェンジ後(後期)の外観を写した
    // ものとして統一(2026-08-03、ユーザー指定)。前期(2015-2017)はグリルが
    // ナンバープレートまで届かないメッキ中心の意匠だったのに対し、後期
    // (2018-2023)は縦基調でナンバー下まで届くグリルへ拡大し、ヘッドライトも
    // グリルから伸びるフレームを巻き込む複雑な形状に変更 -- 供給された写真
    // (Alphard3代目.png)はこの後期の意匠と一致する。
    // https://cartune.co.jp/magazine/articles/1619
    // annotation x/y re-derived (2026-08-03) against the newly supplied
    // photo (Alphard3代目.png), then re-adjusted for the canvas
    // expansion (gen3 was the alignment reference, unshifted, for the
    // wheel-ground fix -- see the note above).
    annotations: [
      { x: 44.7, y: 57.1, label: 'ナンバー下まで拡大した<wbr>縦基調グリル', dir: 'bottom', labelX: 32.4 },
      { x: 50, y: 71.2, label: '彫りが深くなった<wbr>フロントバンパー', dir: 'bottom', labelX: 63.2 },
    ],
    // 2018年1月のマイナーチェンジ。旧版のfacelift(パワートレイン/TSS/
    // Executive Lounge S)は実在するが外観面の変更が抜けていたため、
    // このvehicleが今まさに描いている「後期化」そのものを1点目に追加。
    facelift: {
      fromYear: '2015', toYear: '2018',
      note: '今回の改良では、外観に加えて走行性能と安全装備を中心にアップデート。',
      points: ['グリル・ヘッドライトを縦基調の意匠に刷新', 'Toyota Safety Senseを全車標準化', '最上級グレード「Executive Lounge S」を追加'],
    },
  },
  {
    numeral: 'IV',
    era: '現行モデル',
    title: '40系',
    code: '3BA-AGH40W',
    startYear: '2023',
    yearRange: '2023–現在',
    period: '2023年〜現在',
    image: '/images/cars/alphard/gen4-2023.webp',
    // annotation x/y re-derived (2026-08-03) against the newly supplied
    // photo (Alphard4代目.png), then re-adjusted twice more same day for
    // the wheel-ground alignment shift and the canvas expansion -- see
    // the two alignment notes above.
    annotations: [
      { x: 41.2, y: 48.2, label: '縦方向に直線的な<wbr>「逆スラント」フェイス', dir: 'top', labelX: 39.4 },
      { x: 41.2, y: 56.2, label: 'トヨタエンブレムを据えた<wbr>グリル', dir: 'bottom', labelX: 54.4 },
      { x: 72, y: 50, label: '凹凸のある立体的な<wbr>ボディサイド', dir: 'top', labelX: 74.7 },
    ],
    // 「今回の改良」という汎用フレーズは、2023年6月のフルモデルチェンジと
    // 2025年1月の年次改良が地続きに読めてしまい紛らわしいとの指摘を受け、
    // 年を明記した表現に修正(2026-08-03)。2025年1月は7日(8人乗りHEV
    // 「X」追加・安全装備強化)と31日(PHEV追加)の二段階発売だったが、
    // このサイトの年次表記(単年)の粒度では合算して差し支えないと判断。
    // https://icar-sapporo.com/magazine/column/2025-alphard-vellfire-40-series-annual-update/
    facelift: {
      fromYear: '2023', toYear: '2025',
      note: '2025年1月の年次改良では、グレード構成とパワートレインを中心にアップデート。',
      points: ['PHEV(プラグインハイブリッド)を「Executive Lounge」に設定', '特別仕様車「Spacious Lounge」を追加', 'デジタルインナーミラーを全車標準装備'],
    },
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'Alphard',
  brand: 'トヨタ',
  maker: 'Toyota', // English, for grouping cards on the Home page (see src/home.js) -- CSS uppercases it for display
  order: 1, // Home page display order within All Cars -- lower shows first
  // CarVista Design Identity -- see docs/brand/design-identity.md. The
  // standing reference for Hero copy, annotation vocabulary, and SEO
  // tone for this vehicle; check new copy against these words before
  // writing it, don't invent tone per-page.
  designRole: 'The flagship luxury.', // one-line "what is this vehicle" -- read first, before Identity/Avoid
  designIdentity: ['Presence', 'Luxury', 'Dignified'],
  // Words this vehicle's copy must not reach for -- Sporty/Playful/
  // Casual would undercut the formal-luxury register that separates
  // Alphard from its own Toyota siblings (VOXY, NOAH).
  designAvoid: ['Sporty', 'Playful', 'Casual'],
  // Fixed across every generation's image so Hero/Compare/Timeline
  // never accidentally mix grades or colors -- see
  // docs/brand/design-identity.md. Black (paint code 202) is Alphard's
  // single most popular color in Japan (roughly half of buyers), and
  // sourced coverage describes it as reinforcing exactly this vehicle's
  // Presence/Dignified register ("高級感...重厚感"). "Z" is the grade
  // most associated with Alphard's signature face across the line,
  // distinct from the Executive Lounge halo trim's cabin-focused
  // luxury -- consistent with this project's own policy of showing the
  // most representative spec, not necessarily the top grade.
  representativeGrade: 'Z',
  representativeColor: 'Black (202)',
  // Hero vignette tint (see .hero-vignette in car-page.css) -- a few RGB
  // units warmer/deeper than the neutral base (11,12,14), matching
  // Presence/Dignified. Whisper-subtle by design, not a color filter.
  heroScrim: '15, 11, 8',
  // Current (40系) generation's approx. overall length -- see
  // docs/brand/design-identity.md's "What Reference Length is". Alphard
  // is CarVista's largest vehicle and should read ~5-10% bigger in
  // frame than the Mainstream cluster (VOXY/NOAH/SERENA/STEPWGN) once
  // images are (re)generated with scale in mind -- not retroactive to
  // already-published photos. Internal production metadata only --
  // never render this as a spec on the page.
  referenceLengthMm: 4945,
  tagline: 'かたちは、時代を語る。',
  // 2026-07-30: heroImage was swapped to a gold-painted photo by direct
  // user request, as a deliberate one-off exception to
  // representativeColor above -- Timeline/Detail/Compare for all 4
  // generations still show Black (202), matching representativeColor.
  // Do not "fix" this mismatch by regenerating the other images or by
  // changing representativeColor without asking first; both were an
  // explicit choice, not an oversight.
  heroImage: '/images/cars/alphard/hero-gen4-3q.webp',
  // 2026-08-04: a black homeCardImage override (cropped from gen4-2023.png)
  // was tried here to make Home's card match every sibling's cool/black
  // tone instead of the gold Hero -- reverted by direct user request, so
  // Home's mini-card now falls back to heroImage (gold) like it did
  // originally. Do not re-add a homeCardImage override for color reasons
  // without asking first.
  // Drives <title>/description/canonical/OGP/Twitter -- see the
  // seo-inject plugin in vite.config.js. Nothing else in this page's
  // <head> is hand-written.
  seo: {
    title: 'Alphard 歴代モデル一覧 — CarVista',
    description: 'トヨタ アルファード全4世代を画像で比較。型式・販売期間・デザインの進化が一目でわかる。',
  },
  defaultIndex: 3,
  generations,
}
