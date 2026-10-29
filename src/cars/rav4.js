const generations = [
  {
    numeral: 'V', era: '5代目', title: '50系', code: 'MXAA52 / MXAA54 / AXAH52 / AXAH54 / AXAP54', startYear: '2019', yearRange: '2019–2025', period: '2019年4月〜2025年',
    image: '/images/cars/rav4/axah54-2019-hybrid-g.webp',
    annotations: [{ x: 30, y: 44, label: '台形グリルと<wbr>角形フォグ周辺', dir: 'top', labelX: 27 }, { x: 70, y: 49, label: '角張った<wbr>フェンダー', dir: 'top', labelX: 72 }],
    facelift: { fromYear: '2019', toYear: '2021・2022', note: 'Adventureの外観変更やPHV追加は、同じ50系内の仕様追加・改良です。', points: ['2020年：PHVを追加', '2021年：Adventureにハイブリッドを設定', 'グレードで全長・グリル・ホイールが異なる'] },
  },
  {
    numeral: 'VI', era: '6代目', title: '60系', code: 'AXAN64 / AXAP64', startYear: '2025', yearRange: '2025–現在', period: '2025年12月〜現在',
    image: '/images/cars/rav4/axan64-2025-hev-z.webp',
    annotations: [{ x: 29, y: 43, label: 'ハンマーヘッド調の<wbr>薄い灯火', dir: 'top', labelX: 27 }, { x: 67, y: 51, label: '直線的な<wbr>ボディ面', dir: 'top', labelX: 70 }],
    facelift: { fromYear: '2025', toYear: '2026', note: '国内はHEVを先行発売し、PHEVは2026年に追加。動力方式を年式だけで決めません。', points: ['2025年12月：HEVを発売', '2026年：PHEVを追加', 'Z・Adventure・GR SPORTで外観と寸法条件が異なる'] },
  },
]

export default {
  eyebrow: 'CARVISTA', vehicleName: 'RAV4', brand: 'トヨタ', maker: 'Toyota', order: 19,
  aliases: ['ラブフォー', 'ラヴフォー'], designRole: 'Toyota’s practical all-road SUV.', designIdentity: ['Utility', 'Hybrid', '4WD'], designAvoid: ['GR-only', 'Overseas-only trim', 'Modified parts'],
  representativeGrade: '2025年 HEV Z・E-Four', representativeColor: 'Urban Rock', heroScrim: '10, 13, 16', referenceLengthMm: 4600,
  references: { checkedAt: '2026年10月29日', items: [
    { generations: '初代', label: 'Toyota RAV4 1994年発売資料', url: 'https://global.toyota/en/detail/7862794' },
    { generations: '2代目', label: 'Toyota RAV4 2000年発売資料', url: 'https://global.toyota/en/detail/7932597' },
    { generations: '3代目', label: 'Toyota RAV4 2005年発売資料', url: 'https://global.toyota/jp/newsroom/toyota/21779736.html' },
    { generations: '5代目50系', label: 'Toyota RAV4 2019年発売資料', url: 'https://global.toyota/jp/newsroom/toyota/27546080.html' },
    { generations: '6代目60系', label: 'Toyota 新型RAV4発表資料', url: 'https://global.toyota/jp/newsroom/toyota/43738655.html' },
  ] },
  tagline: '国内の空白期間と、グレードで変わる顔を分けて確認。', heroImage: '/images/cars/rav4/axan64-2025-hev-z.webp', homeCardImage: '/images/cars/rav4/top-card-front-right-v1.png',
  generationGuide: { title: '国内RAV4は初代から6代目へ。4代目は国内未販売', intro: 'RAV4は1994年に国内で始まり、2000年、2005年と世代交代しました。グローバル4代目は日本で通常販売されず、2019年の50系で国内復帰。掲載画像は国内5代目HYBRID Gと6代目HEV ZのE-Four代表です。', layout: 'chronology', items: [
    { title: '1994〜2005年：初代・2代目・3代目', description: '初代は3ドアから始まり、2代目、3代目でボディと用途を拡大。古い中古車は型式だけでなく、3／5ドア、駆動方式、登録時期を合わせて確認します。', meta: '国内初期3世代' },
    { title: '国内販売の空白：グローバル4代目を混ぜない', description: '海外の4代目画像を国内中古車の「国内4代目」として扱いません。国内では3代目の後、2019年の50系で復帰しています。', meta: '国内仕様と海外仕様を分離' },
    { title: '2019年：5代目50系', description: 'ガソリン、ハイブリッド、後のPHVを設定。Adventureなどは標準系とグリルや全長条件が違うため、写真比較ではグレードと動力方式を固定します。', meta: 'MXAA／AXAH／AXAP' },
    { title: '2025年：6代目60系', description: '国内はHEVを先行し、PHEVを後から追加。薄い灯火と直線的な面が視覚上の目印ですが、Z・Adventure・GR SPORTの外装差を世代差に含めません。', meta: 'AXAN64／AXAP64' },
    { title: '中古車の確認順', description: 'グリルと灯火で世代候補を絞り、車検証の型式、駆動方式、動力方式、グレード、製造時期を販売店に確認します。用品や外装交換車は写真だけで断定しません。', meta: '顔 → 型式 → 動力 → グレード' },
  ] },
  guides: [{ href: '/rav4-50-vs-60.html', label: 'RAV4 50系・60系の違い', title: 'RAV4 50系と60系の違い', description: '2.5Lハイブリッド・E-Fourで比較条件を固定。', image: '/images/cars/rav4/axan64-2025-hev-z.webp' }],
  seo: { title: 'RAV4 歴代・型式｜50系・60系の見分け方 | CarVista', description: 'トヨタRAV4の歴代、型式、国内販売の空白、50系・60系の外観とグレード差、中古車の確認順を公式資料で整理します。' }, defaultIndex: 1, generations,
}
