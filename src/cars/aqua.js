const generations = [
  { numeral: 'I', era: '初代', title: 'NHP10', code: 'DAA-NHP10', startYear: '2011', yearRange: '2011–2021', period: '2011年12月〜2021年7月', image: '/images/cars/aqua/nhp10-2011-s-ff-v1.png', annotations: [{ x: 31, y: 43, label: '背の低い<wbr>三角形ランプ', dir: 'top', labelX: 29 }, { x: 69, y: 58, label: '低く長い<wbr>ハッチバック', dir: 'top', labelX: 70 }], facelift: { fromYear: '2011', toYear: '2014・2017', note: '掲載画像は発売時S・2WD代表。2014年と2017年の外観改良、G\u2019s／Crossoverは別に確認します。', points: ['2011年12月：初代発売', '2014年12月：フロント意匠を変更', '2017年6月：再改良、Crossover追加'] } },
  { numeral: 'II', era: '2代目・現行', title: 'MXPK10系', code: 'MXPK10 / MXPK11 / MXPK15 / MXPK16', startYear: '2021', yearRange: '2021–現在', period: '2021年7月〜現在', image: '/images/cars/aqua/mxpk11-2021-z-ff-v1.png', annotations: [{ x: 31, y: 43, label: '横長の<wbr>薄いランプ', dir: 'top', labelX: 29 }, { x: 69, y: 56, label: '丸みのある<wbr>2代目ボディ', dir: 'top', labelX: 70 }], facelift: { fromYear: '2021', toYear: '2025・2026', note: '掲載画像は発売時Z・2WD代表。GR SPORTは専用外装のため標準Zと混ぜません。', points: ['2021年7月：2代目発売', '2WDとE-Fourで型式が異なる', '2026年7月：GR SPORTを追加'] } },
]

export default {
  eyebrow: 'CARVISTA', vehicleName: 'AQUA', brand: 'トヨタ', maker: 'Toyota', order: 19,
  aliases: ['アクア', 'あくあ', 'AQUA', 'NHP10', 'MXPK10', 'MXPK11', 'MXPK15', 'MXPK16'],
  designRole: 'ハイブリッド専用の5ドアコンパクト。', designIdentity: ['Hybrid hatch', 'Compact', 'Two generations'], designAvoid: ['Prius parts', 'GR SPORT-only exterior', 'Crossover-only trim'],
  representativeGrade: '2021年発売 Z・2WD', representativeColor: 'Platinum White Pearl', heroScrim: '9, 12, 14', referenceLengthMm: 4050,
  references: { checkedAt: '2026年10月30日', items: [
    { generations: '初代', label: 'Toyota 2011年アクア発売資料', url: 'https://global.toyota/jp/newsroom/toyota/21780024.html' },
    { generations: '2代目', label: 'Toyota 2021年新型アクア発売資料', url: 'https://global.toyota/jp/newsroom/toyota/35550666.html' },
    { generations: '2代目', label: 'Toyota アクア車種ギャラリー・改良履歴', url: 'https://global.toyota/jp/mobility/toyota-brand/gallery/aqua.html' },
    { generations: '現行諸元', label: 'Toyota アクア主要諸元表', url: 'https://toyota.jp/pages/contents/request/webcatalog/aqua/aqua_main_202509.pdf' },
  ] },
  tagline: 'NHP10からMXPK10系へ。顔だけでなく駆動方式と型式で確認。', heroImage: '/images/cars/aqua/mxpk11-2021-z-ff-v1.png', homeCardImage: '/images/cars/aqua/mxpk11-2021-z-ff-v1.png',
  generationGuide: { title: 'アクアは2011年初代、2021年2代目', intro: 'ハイブリッド専用車として続く2世代を整理します。掲載画像は発売時の初代S・2WDと2代目Z・2WD代表です。Crossover、G\u2019s、GR SPORTなどの専用外装は世代差に混ぜません。', layout: 'chronology', items: [
    { title: '2011年12月：初代NHP10を発売', description: '1.5L THS IIと2WDを組み合わせた単一型式が基本です。2014年、2017年に外観改良があるため、NHP10という型式だけでは顔つきの時期まで決まりません。', meta: '初代 · DAA-NHP10' },
    { title: '2021年7月：2代目MXPK10系へ', description: 'TNGAのGA-Bプラットフォームへ移行し、E-Fourを初設定。型式は電池・駆動方式等で分かれるため、MXPKの後ろまで車検証で確認します。', meta: '2代目 · MXPK10／11／15／16' },
    { title: '写真だけで迷う条件', description: '初代の2014・2017年改良、Crossover、G\u2019sと、2代目GR SPORTはバンパーやホイールが標準車と異なります。専用外装を世代全体の特徴として扱わないことが重要です。', meta: '標準車と専用外装を分離' },
    { title: '中古車の確認順', description: '外観で世代を絞り、車検証の型式、2WD／E-Four、グレード、製造時期を販売店へ照会します。初度登録月だけで改良前後を断定しません。', meta: '外観 → 型式 → 駆動 → 製造時期' },
  ] },
  guides: [
    { href: '/cars/prius.html', label: 'PRIUSの歴代を見る', title: 'PRIUS 歴代・型式', description: '同じToyotaハイブリッド専用車を比較。', image: '/images/cars/prius/top-card-front-right-v2.png' },
    { href: '/cars/yaris.html', label: 'YARIS／VITZを見る', title: 'YARIS／VITZ 歴代・型式', description: 'ガソリンとハイブリッドを選べる同クラス候補。', image: '/images/cars/yaris/mxph10-2020-hybrid-g-ff-v1.png' },
  ],
  seo: { title: 'アクア 歴代・型式 NHP10/MXPK10系の違い | CarVista', description: 'トヨタ アクアの初代NHP10と2代目MXPK10系を公式資料で整理。発売・改良時期、外観、駆動方式、専用外装と中古車確認順を解説します。' },
  defaultIndex: 1, generations,
}
