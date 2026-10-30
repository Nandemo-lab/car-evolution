const generations = [
  { numeral: 'I', era: '初代 VITZ', title: '10系', code: 'SCP10 / NCP10系', startYear: '1999', yearRange: '1999–2005', period: '1999年1月〜2005年2月', image: '/images/cars/yaris/scp10-1999-u-ff-v1.png', annotations: [{ x: 31, y: 43, label: '丸い<wbr>ヘッドランプ', dir: 'top', labelX: 29 }, { x: 69, y: 56, label: '短く高い<wbr>初代ボディ', dir: 'top', labelX: 70 }], facelift: { fromYear: '1999', toYear: '2002', note: '掲載画像は発売時U・5ドア代表。3ドアやRSを標準5ドアと混ぜません。', points: ['1999年1月：初代発売', '3ドアと5ドアを設定', '2002年に外観・装備を改良'] } },
  { numeral: 'II', era: '2代目 VITZ', title: '90系', code: 'KSP90 / SCP90 / NCP91 / NCP95', startYear: '2005', yearRange: '2005–2010', period: '2005年2月〜2010年12月', image: '/images/cars/yaris/ksp90-2005-f-ff-v1.png', annotations: [{ x: 31, y: 43, label: '大きな<wbr>涙滴型ランプ', dir: 'top', labelX: 29 }, { x: 69, y: 56, label: '丸い<wbr>2代目ボディ', dir: 'top', labelX: 70 }], facelift: { fromYear: '2005', toYear: '2007・2010', note: '掲載画像は発売時F・1.0L・2WD代表。RSは専用外装です。', points: ['2005年2月：2代目発売', '1.0L・1.3L・1.5Lを設定', 'RSと標準系を分けて確認'] } },
  { numeral: 'III', era: '3代目 VITZ', title: '130系', code: 'KSP130 / NSP130 / NCP131 / NSP135', startYear: '2010', yearRange: '2010–2020', period: '2010年12月〜2020年2月', image: '/images/cars/yaris/nsp130-2010-f-ff-v1.png', annotations: [{ x: 31, y: 43, label: '横長の<wbr>鋭いランプ', dir: 'top', labelX: 29 }, { x: 69, y: 56, label: '低く長い<wbr>130系', dir: 'top', labelX: 70 }], facelift: { fromYear: '2010', toYear: '2014・2017', note: '掲載画像は発売時F・1.3L・2WD代表。2014年と2017年の顔変更があります。', points: ['2010年12月：3代目発売', '2014年：大開口フロントへ変更', '2017年：ハイブリッド追加'] } },
  { numeral: 'IV', era: '4代目・YARIS', title: '210系', code: 'KSP210 / MXPA10 / MXPH10系', startYear: '2020', yearRange: '2020–現在', period: '2020年2月〜現在', image: '/images/cars/yaris/mxph10-2020-hybrid-g-ff-v1.png', annotations: [{ x: 31, y: 43, label: '細い<wbr>ヘッドランプ', dir: 'top', labelX: 29 }, { x: 69, y: 56, label: 'GA-Bの<wbr>低い構え', dir: 'top', labelX: 70 }], facelift: { fromYear: '2020', toYear: '現在', note: '掲載画像は発売時HYBRID G・2WD代表。ヤリス クロスとGRヤリスは別車種です。', points: ['2020年2月：国内名をYARISへ', '1.0L・1.5L・ハイブリッドを設定', 'ヤリス クロス／GRヤリスとは分離'] } },
]

export default {
  eyebrow: 'CARVISTA', vehicleName: 'YARIS / VITZ', brand: 'トヨタ', maker: 'Toyota', order: 20,
  aliases: ['ヤリス', 'やりす', 'YARIS', 'ヴィッツ', 'ビッツ', 'VITZ', 'SCP10', 'KSP90', 'KSP130', 'KSP210', 'MXPA10', 'MXPH10'],
  designRole: '国内名ヴィッツからヤリスへ続くToyotaコンパクト。', designIdentity: ['Compact hatch', 'Vitz to Yaris', 'Four generations'], designAvoid: ['Yaris Cross', 'GR Yaris', 'Overseas sedan'],
  representativeGrade: '2020年発売 HYBRID G・2WD', representativeColor: 'Coral Crystal Shine', heroScrim: '10, 11, 13', referenceLengthMm: 3940,
  references: { checkedAt: '2026年10月30日', items: [
    { generations: '初代', label: 'Toyota 1999年ヴィッツ発売資料', url: 'https://global.toyota/jp/detail/11662965' },
    { generations: '2代目', label: 'Toyota 2005年ヴィッツ フルモデルチェンジ資料', url: 'https://global.toyota/jp/newsroom/toyota/21788515.html' },
    { generations: '3代目', label: 'Toyota 2010年ヴィッツ フルモデルチェンジ資料', url: 'https://global.toyota/jp/newsroom/toyota/21782374.html' },
    { generations: '4代目', label: 'Toyota 2020年ヤリス発売資料', url: 'https://global.toyota/jp/newsroom/toyota/30486400.html' },
    { generations: '現行諸元', label: 'Toyota ヤリス主要諸元表', url: 'https://toyota.jp/pages/contents/yaris/001_p_001/pdf/yaris_spec_202511.pdf' },
  ] },
  tagline: 'ヴィッツ3世代からヤリスへ。名称変更と世代交代を分けて読む。', heroImage: '/images/cars/yaris/mxph10-2020-hybrid-g-ff-v1.png', homeCardImage: '/images/cars/yaris/mxph10-2020-hybrid-g-ff-v1.png',
  generationGuide: { title: 'ヴィッツ3世代の後、2020年に国内名をヤリスへ', intro: '日本のヴィッツとヤリスを連続した4世代として整理します。ただしヤリス クロス、GRヤリスは別の車体・商品系統です。掲載画像は各世代の標準5ドア系を基準にしています。', layout: 'chronology', items: [
    { title: '1999年：初代ヴィッツ', description: '短い全長と高い室内を両立した10系。3ドアと5ドアがあるため、ドア数も確認します。', meta: '10系 · SCP10／NCP10系' },
    { title: '2005年：2代目90系', description: 'ボディを拡大し、1.0L・1.3L・1.5Lを設定。RSの専用バンパーを標準Fの世代特徴として扱いません。', meta: '90系 · KSP90ほか' },
    { title: '2010年：3代目130系', description: '低く長いプロポーションへ移行。2014年と2017年に顔が変わり、2017年にはハイブリッドを追加しました。', meta: '130系 · KSP130／NSP130ほか' },
    { title: '2020年：国内名をヤリスへ', description: 'GA-Bプラットフォームを採用し、1.0L・1.5L・ハイブリッドを設定。名称変更だけでなく、車体とパワートレーンを刷新した世代交代です。', meta: '210系 · KSP210／MXPA10／MXPH10系' },
    { title: '中古車の確認順', description: 'まずVITZ／YARISの車名、次に型式、ドア数、エンジン、駆動方式、製造時期を確認します。RS、GR SPORT、GRヤリス、ヤリス クロスを同じ外装条件に混ぜません。', meta: '車名 → 型式 → 動力 → グレード' },
  ] },
  guides: [
    { href: '/cars/aqua.html', label: 'AQUAの歴代を見る', title: 'AQUA 歴代・型式', description: 'ハイブリッド専用の同クラス候補。', image: '/images/cars/aqua/mxpk11-2021-z-ff-v1.png' },
    { href: '/cars/raize.html', label: 'RAIZEを見る', title: 'RAIZE 型式・改良履歴', description: '全長4m以下のSUVを選ぶ場合の候補。', image: '/images/cars/raize/a202a-2021-hybrid-z-ff-v1.png' },
  ],
  seo: { title: 'ヤリス／ヴィッツ 歴代・型式 10/90/130/210系の違い | CarVista', description: 'トヨタ ヴィッツからヤリスまで4世代を公式資料で整理。型式、発売時期、外観、グレード差、ヤリスクロスやGRとの違いを解説します。' },
  defaultIndex: 3, generations,
}
