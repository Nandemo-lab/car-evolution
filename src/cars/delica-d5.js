// Pure data. No imports, no logic, no DOM -- this file describes one
// vehicle and nothing else. All rendering/interaction lives in
// src/car-page.js; the bootstrap that wires this data into it lives in
// src/entries/delica-d5.js.
//
// IMPORTANT, read before editing generations below: Delica D:5 has never
// received a full model change. It launched in January 2007 (CV1W/CV2W/
// CV5W) and has been continuously updated since -- a large November 2009
// change, a genuinely major exterior redesign in 2019 (widely called a
// "ビッグマイナーチェンジ" in the press, not a new generation), and a
// further running update in January 2026 (S-AWC four-wheel control, new
// grille/bumper, 8-inch digital meter). CarVista's two supplied photos
// show the pre-2019 face and the post-2019 face, so the two entries below
// are deliberately labeled "前期"/"後期" (early-type/late-type -- real
// terminology this vehicle's own press and owner community already use,
// e.g. "デリカD:5(前期型)を買うなら") rather than "初代"/"2代目", which
// would misrepresent a single continuously-produced model as two full
// generations.
//
// Sourced facts cross-checked against Mitsubishi Motors' own newsroom/
// spec pages plus independent catalog sources (nextage.jp, spectank.jp) --
// no invented specs.
//
// gen1/gen2 images (2026-08-01, superseded): the ORIGINAL supplied
// source photos had white studio backgrounds and real floor-reflection
// texture near the tires. Eight rounds were spent trying to
// reconstruct a dark CarVista-style background/floor from those white-
// background photos (see git history on this block for the full
// account of what each round got wrong). All of that is now moot: the
// user supplied proper black-studio source photos directly
// (デリカ初代.png / デリカ2代目.png), so gen1-2007/gen2-2019 are a pure
// format conversion of those -- resized to fit the shared 1408x668
// canvas by height (no crop; the source's 1.50:1 aspect is narrower
// than the canvas's 2.11:1), letterboxed with the source's own edge
// color, then WebP-encoded at a quality high enough to be visually
// lossless. No background removal, no floor/shadow synthesis, no
// masking, no noise, no color/level/tone changes of any kind -- per
// explicit instruction, these two files are complete as supplied and
// must not be re-edited. Do not resurrect the reconstruction approach
// below for any future vehicle that already has a proper black-studio
// source photo; it only applies when the source has the wrong
// background and needs one built from nothing.
//
// Rounds 1-8 (historical, kept for the reusable lessons only -- the
// technique itself no longer applies to this vehicle's current images):
// (1-3) mask-based background removal (gradient-threshold flood fill +
// "floor crush" override + dilation, tuned three ways) all left visible
// block/patch artifacts -- the mask itself is unavoidably noisy in that
// zone, so filling a noisy mask with flat color always produced blocky
// results regardless of tuning.
// (4) Rebuilt as a fully synthetic ground plane (smooth gradient) below
// a fixed cutoff row instead of classifying real pixels at all -- still
// read as a visible seam because it was perfectly smooth/noise-free
// next to real photo grain above it.
// (5) Added procedurally-generated random noise + a tone curve
// calibrated against SERENA's own real floor profile (brightens toward
// the bottom edge, like a real reflection) -- reduced the defect but a
// full-frame read of the actual output file (not a zoomed crop) still
// showed a faint but real full-width band: the brightening curve had no
// x-dependence, so it lit up evenly all the way to empty space far from
// the car where no reflection should exist -- a "patch" is exactly what
// a geometrically uniform horizontal region reads as at normal size,
// even with locally smooth noise.
// (6, 2026-08-01) Dropped the separate "floor" tone curve and added a
// texture transplant -- but only to the ground-contact zone near the
// tires. Still visibly wrong: measuring row-by-row noise (stddev) in
// the background strips beside the car showed the ENTIRE rest of the
// frame -- not just some narrow seam -- was a perfectly flat, zero-
// noise computed gradient (stddev == 0.00 for ~70% of the image
// height), with grain only in that one small floor patch. A patch of
// texture inside an otherwise glass-smooth synthetic field reads as a
// band regardless of how well the patch itself is blended -- the v6
// writeup's own framing ("nothing for the eye to identify as a
// separate region") was right but applied to the wrong region: the
// floor was never the odd one out, the untouched 70% of flat
// background was. Confirmed by the same check against Serena's own
// reference image (real photo): its background stddev is never 0 at
// any row, rising gradually toward the bottom, matching real sensor
// grain everywhere, not just near the tires.
// (7, 2026-08-01) Added subtle luminance noise across the whole
// background instead of just the floor zone -- fixed the band, but
// direct user feedback against the rendered page caught a new problem:
// noise density that high (touching ~70-77% of the frame) read as a
// pale haze over the entire lower half, working against this brand's
// actual target look (flat black studio, car reads as grounded purely
// by contact shadow -- see VOXY/SERENA). Adding texture was solving
// the wrong problem: this background was never a real photo needing
// grain to blend into, it's a synthetic reconstruction that should
// just commit to being flat.
// (8, 2026-08-01, current) Reset, not iterated-on: every background
// pixel (same per-row-baseline classification as v7, so car body/
// tires/glass stay untouched) is now one flat near-black RGB value --
// the same tone as the frame's own top corners -- with 1-level dither
// only to prevent 8-bit banding, no gradient, no noise. No separate
// floor treatment at all; whatever natural darkening already existed
// right at the tire base (outside the background threshold, so never
// touched by any of these passes) is the only ground-contact cue,
// matching VOXY/SERENA's actual construction. Verified by reading the
// output files directly (solid black, no seam, no haze) after this
// exact failure mode -- v5's x-independent brightening curve -- was
// the diagnosed cause of the original band; re-adding any brightness
// gradient here should be treated as regressing a known-bad approach,
// not a variant worth re-trying.
const generations = [
  {
    numeral: 'I',
    era: '前期',
    title: 'CV5W型 前期',
    code: 'DBA-CV5W',
    startYear: '2007',
    yearRange: '2007–2019',
    period: '2007年〜2019年',
    image: '/images/cars/delica-d5/gen1-2007.webp',
    annotations: [
      { x: 25, y: 61, label: 'クロームスラット基調のグリル', dir: 'bottom', labelX: 23 },
      { x: 63, y: 17, label: '直立したキャブオーバー風のシルエット', dir: 'top', labelX: 64 },
    ],
    facelift: null,
  },
  {
    numeral: 'II',
    era: '後期',
    title: 'CV1W型 後期',
    code: '3BA-CV1W',
    startYear: '2019',
    yearRange: '2019–現在',
    period: '2019年〜現在',
    image: '/images/cars/delica-d5/gen2-2019.webp',
    annotations: [
      { x: 24, y: 58, label: '台形グリルとスキッドガーニッシュ', dir: 'bottom', labelX: 22 },
      { x: 44, y: 24, label: 'シャープに切れ上がるヘッドライト', dir: 'top', labelX: 44 },
    ],
    // 2026年1月9日、走行性能を中心とした一部改良を実施(フルモデル
    // チェンジではない)。
    // https://www.mitsubishi-motors.com/jp/newsroom/newsrelease/2025/20251218_2.html
    facelift: {
      fromYear: '2019', toYear: '2026',
      note: '2026年の改良では、外観に加えて走行性能・先進装備を中心にアップデート。',
      points: ['四輪制御システム「S-AWC」と4つのドライブモードを追加', '8インチカラー液晶メーターを採用', 'フロントグリル・バンパーを刷新'],
    },
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'DELICA D:5',
  brand: '三菱', // used only for JSON-LD ("三菱 デリカD:5 CV5W型 前期" etc.)
  maker: 'Mitsubishi', // English, for grouping cards on the Home page (see src/home.js) -- CarVista's first Mitsubishi vehicle
  order: 10, // Home page display order within All Cars -- appended after every existing maker (Toyota/Nissan/Honda) so their relative order is untouched; Mitsubishi becomes a new group after Honda.
  // CarVista Design Identity -- see docs/brand/design-identity.md. Sourced
  // from Mitsubishi's own stated development theme for this vehicle:
  // "ミニバンの優しさ"と"SUVの力強さ"の融合 -- a minivan/SUV hybrid built
  // around real off-road capability (185mm ground clearance, 21.0°
  // approach / 23.0° departure angles) and a square, functional body.
  // Sole member of a new cluster (see docs/brand/design-identity.md) --
  // no other CarVista vehicle competes in the SUV-influenced minivan
  // space, so there's no same-segment collision to check against yet.
  designRole: 'The rugged all-rounder.',
  designIdentity: ['Rugged', 'Functional', 'Adventurous'],
  // Direct opposite of the Rugged/Functional register -- an SUV-minivan
  // built around off-road capability shouldn't read as refined or
  // street-sporty.
  designAvoid: ['Elegant', 'Luxury', 'Refined'],
  // "G" is the current lineup's base grade (vs. P / G-Power Package /
  // LUXFZ-LUDFZ) -- standard, not loaded, matching the Functional
  // register. Diamond White Pearl is a real, sourced Mitsubishi color
  // name (cited as the current model's most popular choice) and matches
  // what both supplied generation photos actually show.
  representativeGrade: 'G',
  representativeColor: 'ダイヤモンドホワイトパール',
  // Hero vignette tint -- a cool graphite/steel lift vs. the base
  // (11,12,14), reading as harder/more industrial than any existing
  // vehicle's own scrim, matching Rugged/Functional.
  heroScrim: '10, 11, 13',
  // Current-generation approx. overall length -- see docs/brand/
  // design-identity.md's "What Reference Length is". Internal production
  // metadata only -- never render this as a spec on the page (the
  // `specs` field below is the real, separately-sourced display data).
  referenceLengthMm: 4790,
  tagline: 'かたちは、時代を語る。',
  // Hero uses the original デリカTOP.png as-is (black), by explicit
  // decision -- its atmospheric studio lighting (fog, floor reflection)
  // reads closer to VOXY/SERENA's own Hero photos than any available
  // white alternative, and a black-to-white paint recolor was tried and
  // rejected (a genuinely black photo has no hidden white diffuse-
  // reflectance data to recover; lifting shadow/midtone luminance
  // posterized into a harsh edge-lit silhouette instead of a clean
  // repaint -- unlike the yellow/beige recolors on Sienta/Solio, which
  // had real color+saturation to remap). This means Hero (black) and
  // the generation photos (white, per representativeColor below) are
  // knowingly NOT the same color -- an accepted exception to this
  // project's color-consistency rule, prioritizing Hero's studio mood
  // over strict color matching for this vehicle specifically. Only
  // cropped/padded to the shared 1408x668 hero canvas; not recolored,
  // background-processed, or zoomed beyond that.
  heroImage: '/images/cars/delica-d5/hero-cv1w-3q.webp',
  seo: {
    title: 'DELICA D:5 歴代モデル一覧 — CarVista',
    description: '三菱 デリカD:5の前期・後期モデルを画像で比較。オールラウンドミニバンとしての外観の変化が一目でわかる。',
  },
  defaultIndex: 1,
  generations,
}
