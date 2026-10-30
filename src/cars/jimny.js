const generations = [
  { numeral: '3D', era: '小型3ドア', title: 'JIMNY SIERRA', code: 'JB74W', startYear: '2018', yearRange: '2018–現在', period: '2018年7月〜現在', image: '/images/cars/jimny/jb74w-2018-jc-v1.jpg', annotations: [{ x: 34, y: 42, label: '3ドアの<wbr>短いボディ', dir: 'top', labelX: 31 }, { x: 69, y: 53, label: 'ワイド<wbr>フェンダー', dir: 'top', labelX: 72 }], facelift: { fromYear: '2018', toYear: '現行', note: '軽ジムニーJB64Wとは排気量・車幅・車種区分が異なります。', points: ['1.5L・小型乗用車', '3ドア・4人乗り', 'ワイドフェンダーで軽ジムニーと区別'] } },
  { numeral: '5D', era: '小型5ドア', title: 'JIMNY NOMADE', code: 'JC74W', startYear: '2025', yearRange: '2025–現在', period: '2025年4月〜現在', image: '/images/cars/jimny/jc74w-2025-nomade-fc-v1.jpg', annotations: [{ x: 34, y: 42, label: 'リヤドアを持つ<wbr>5ドア', dir: 'top', labelX: 31 }, { x: 68, y: 53, label: '長い<wbr>ホイールベース', dir: 'top', labelX: 71 }], facelift: { fromYear: '2025', toYear: '現行', note: 'ノマドはシエラの「次世代」ではなく、併売される5ドアの別車種です。', points: ['1.5L・小型乗用車', '5ドア・4人乗り', 'シエラより全長・軸距を340mm延長'] } },
]

export default {
  eyebrow: 'CARVISTA', vehicleName: 'JIMNY FAMILY', cardName: 'JIMNY', brand: 'スズキ', maker: 'Suzuki', order: 22, aliases: ['ジムニー', 'ジムニーシエラ', 'ジムニーノマド', 'ノマド', 'SIERRA', 'NOMADE'], designRole: 'Three distinct Jimny body and registration categories.', designIdentity: ['Ladder frame', 'Part-time 4WD', 'Compact'], designAvoid: ['Treating Nomade as next generation', 'Mixing kei and small car specs', 'Aftermarket parts'], representativeGrade: '2025年 ジムニーノマドFC', representativeColor: 'Sizzling Red Metallic', heroScrim: '8, 10, 12', referenceLengthMm: 3890,
  references: { checkedAt: '2026年10月29日', items: [
    { generations: '全系譜', label: 'スズキ ジムニー公式歴史', url: 'https://www.suzuki.co.jp/car/jimny/special/history/' },
    { generations: '軽ジムニー／シエラ', label: 'スズキ 2018年ジムニー・シエラ発売', url: 'https://www.suzuki.co.jp/release/a/2018/0705/' },
    { generations: 'ノマドJC74W', label: 'スズキ 2025年ジムニーノマド発表', url: 'https://www.suzuki.co.jp/release/a/2025/0130/index.html' },
    { generations: '小型ジムニー系譜', label: 'スズキ デジタルライブラリー', url: 'https://www.suzuki.co.jp/suzuki_digital_library/1_auto/jimnysmall.html' },
  ] },
  tagline: '軽、3ドア小型、5ドア小型。世代ではなく区分から選ぶ。', heroImage: '/images/cars/jimny/jc74w-2025-nomade-fc-v1.jpg', homeCardImage: '/images/cars/jimny/top-card-front-right-v2.png',
  generationGuide: { title: 'ジムニー・シエラ・ノマドは同じ名前の「世代順」ではない', intro: '現行は軽自動車のジムニーJB64W、小型3ドアのシエラJB74W、小型5ドアのノマドJC74Wという別区分です。ノマドはシエラを置き換える次世代ではありません。掲載画像は小型車同士のシエラJCとノマドFCです。', layout: 'chronology', items: [
    { title: '1970年〜：軽ジムニーの系譜', description: 'LJ10から始まり、現行は2018年登場のJB64W。軽規格の0.66L・3ドアで、シエラやノマドの1.5L諸元を当てはめません。', meta: '軽自動車 · 現行JB64W' },
    { title: '1977年〜：小型ジムニーの系譜', description: 'ジムニー8、1000、1300、ワイド、シエラへ続く小型車系譜。1993年からシエラ名が使われ、現行JB74Wは2018年登場です。', meta: '小型乗用車 · 3ドア' },
    { title: '2018年：ジムニーシエラJB74W', description: '1.5L、3ドア、4人乗り。軽JB64Wより幅広いフェンダーを持ちますが、外装用品が多いため型式を優先します。', meta: 'JB74W · 1.5L · 3ドア' },
    { title: '2025年：ジムニーノマドJC74W', description: '1.5L、5ドア、4人乗り。シエラより全長とホイールベースを延長した併売モデルで、定員が増えた車ではありません。', meta: 'JC74W · 1.5L · 5ドア' },
    { title: '中古車の確認順', description: '車検証のJB64W／JB74W／JC74W、排気量、ドア数、定員を確認。社外グリルやオーバーフェンダーだけで車種を断定しません。', meta: '型式 → 排気量 → ドア → 定員' },
  ] },
  guides: [{ href: '/jimny-sierra-vs-nomade.html', label: 'シエラ・ノマドの違い', title: 'ジムニーシエラとノマドの違い', description: '1.5L・4WDで3ドアと5ドアを比較。', image: '/images/cars/jimny/jc74w-2025-nomade-fc-v1.jpg' }],
  seo: { title: 'ジムニー 歴代・型式｜軽・シエラ・ノマドの違い | CarVista', description: 'スズキ ジムニー、シエラ、ノマドの関係と型式を整理。JB64W・JB74W・JC74W、3/5ドア、軽・小型区分、中古車確認順を解説します。' }, defaultIndex: 1, generations,
}
