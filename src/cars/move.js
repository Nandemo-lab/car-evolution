const generations = [
  { numeral: 'VI', era: '6代目', title: 'LA150S / LA160S', code: 'LA150S / LA160S', startYear: '2014', yearRange: '2014–2023', period: '2014年12月〜2023年', image: '/images/cars/move/la150s-2014-x-sa-ff-v1.webp', annotations: [{ x: 31, y: 43, label: '横長ランプと<wbr>細いグリル', dir: 'top', labelX: 29 }, { x: 69, y: 56, label: 'ヒンジ式の<wbr>後席ドア', dir: 'top', labelX: 70 }], facelift: { fromYear: '2014', toYear: '2023', note: '掲載画像はX“SA”・2WD代表。カスタム専用外装とは分けます。', points: ['2014年12月：6代目発売', 'LA150Sは2WD、LA160Sは4WD', '標準車とカスタムで顔が異なる'] } },
  { numeral: 'VII', era: '7代目・現行', title: 'LA850S / LA860S', code: 'LA850S / LA860S', startYear: '2025', yearRange: '2025–現在', period: '2025年6月〜現在', image: '/images/cars/move/la850s-2025-x-ff-v1.webp', annotations: [{ x: 31, y: 42, label: '細長いランプと<wbr>黒いグリル', dir: 'top', labelX: 29 }, { x: 70, y: 54, label: '初採用の<wbr>後席スライドドア', dir: 'top', labelX: 71 }], facelift: { fromYear: '2025', toYear: '現在', note: '掲載画像はX・2WD代表。RSはターボや専用装備が異なります。', points: ['2025年6月：7代目発売', '後席スライドドアを初採用', 'LA850Sは2WD、LA860Sは4WD'] } },
]

export default {
  eyebrow: 'CARVISTA', vehicleName: 'MOVE', brand: 'ダイハツ', maker: 'Daihatsu', order: 26,
  aliases: ['ムーヴ', 'ムーブ', 'むーぶ', 'MOVE', 'LA150S', 'LA160S', 'LA850S', 'LA860S'],
  designRole: '日常の扱いやすさを重視した軽乗用車。', designIdentity: ['Kei wagon', 'Compact', 'Everyday use'], designAvoid: ['Move Canbus', 'Custom-only face', 'Aftermarket parts'],
  representativeGrade: '2025年6月発売 X・2WD', representativeColor: 'Sky Blue Metallic', heroScrim: '9, 12, 14', referenceLengthMm: 3395,
  references: { checkedAt: '2026年10月30日', items: [
    { generations: '歴代', label: 'ダイハツ 車種の歩み（ムーヴ）', url: 'https://www.daihatsu.com/jp/company/car_model/car_jp.html' },
    { generations: '6代目', label: 'ダイハツ 2014年6代目ムーヴ発売資料', url: 'https://www.daihatsu.com/jp/news/2014/20141212-1.html' },
    { generations: '6代目諸元', label: 'ダイハツ認定中古車 2014年ムーヴX“SA”・2WD', url: 'https://u-catch.daihatsu.co.jp/catalog/MOVE/GRADE__10094780/' },
    { generations: '7代目', label: 'ダイハツ 2025年7代目ムーヴ発売資料', url: 'https://www.daihatsu.com/jp/news/2025/20250605-1.html' },
    { generations: '7代目諸元', label: 'ダイハツ認定中古車 2025年ムーヴ車両情報', url: 'https://u-catch.daihatsu.co.jp/catalog/MOVE/MODEL__202506/' },
  ] },
  tagline: '2025年、ヒンジドアの軽ワゴンからスライドドア車へ。', heroImage: '/images/cars/move/la850s-2025-x-ff-v1.webp', homeCardImage: '/images/cars/move/la850s-2025-x-ff-v1.webp',
  generationGuide: { title: 'ムーヴは7世代。中古車では6代目と7代目を重点確認', intro: 'ムーヴは1995年に登場し、2025年6月に7代目へ移行しました。このページでは流通上の比較機会が多い6代目LA150S／LA160Sと、後席スライドドアへ変わった7代目LA850S／LA860Sを画像で整理します。', layout: 'chronology', items: [
    { title: '1995年から5世代：軽ワゴンとして進化', description: '初代から5代目までは軽ワゴンの基本形を磨いてきました。年式だけで型式を推測せず、車検証の型式とメーカーの世代資料を組み合わせて確認します。', meta: '1995年初代 → 2010年5代目' },
    { title: '2014年12月：6代目LA150S／LA160S', description: '標準車X“SA”は横長ランプと細いグリルを採用し、後席はヒンジ式ドアです。カスタムは専用フロントを持つため、標準車の顔を世代共通とは扱いません。', meta: 'LA150S＝2WD／LA160S＝4WD' },
    { title: '2025年6月：7代目LA850S／LA860S', description: 'ムーヴで初めて後席スライドドアを採用。Xは自然吸気、RSはターボで装備も異なるため、掲載画像のX・2WDとRSの仕様を混ぜません。', meta: 'LA850S＝2WD／LA860S＝4WD' },
    { title: '購入前はドア、型式、動力を順に確認', description: '写真では後席ドア方式と標準／カスタムを確認し、車検証の型式、2WD／4WD、自然吸気／ターボ、製造時期を販売店へ照会します。', meta: '外観 → 型式 → 駆動 → 動力' },
  ] },
  guides: [
    { href: '/cars/tanto.html', label: 'TANTOの歴代を見る', title: 'TANTO 歴代・型式', description: 'より背の高いスライドドア軽を比較する。', image: '/images/cars/tanto/top-card-front-right-v2.png' },
    { href: '/cars/n-box.html', label: 'N-BOXの歴代を見る', title: 'N-BOX 歴代・型式', description: 'スーパーハイト軽の世代と型式を比較する。', image: '/images/cars/n-box/top-card-front-right-v2.png' },
  ],
  seo: { title: 'ムーヴ 歴代・型式 LA150S/LA160S/LA850S/LA860Sの違い | CarVista', description: 'ダイハツ ムーヴの歴代と、6代目・7代目の型式、ヒンジドア／スライドドア、標準車とグレード差、中古車確認順を公式資料で整理します。' },
  defaultIndex: 1, generations,
}
