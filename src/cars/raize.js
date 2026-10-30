const generations = [{ numeral: 'I', era: '初代・現行', title: 'A200系', code: 'A200A / A201A / A202A / A210A', startYear: '2019', yearRange: '2019–現在', period: '2019年11月〜現在', image: '/images/cars/raize/a202a-2021-hybrid-z-ff-v1.png', annotations: [{ x: 31, y: 43, label: '薄いランプと<wbr>大きなグリル', dir: 'top', labelX: 29 }, { x: 69, y: 57, label: '5ナンバーの<wbr>角型SUV', dir: 'top', labelX: 70 }], facelift: { fromYear: '2019', toYear: '2021', note: '掲載画像は2021年追加のZ・ハイブリッド・2WD代表。ガソリン4WDとは型式・動力が異なります。', points: ['2019年11月：1.0Lターボで発売', '2021年11月：1.2Lとハイブリッド追加', 'Rockyは兄弟車だが同一車名ではない'] } }]

export default {
  eyebrow: 'CARVISTA', vehicleName: 'RAIZE', brand: 'トヨタ', maker: 'Toyota', order: 21,
  aliases: ['ライズ', 'らいず', 'RAIZE', 'A200A', 'A201A', 'A202A', 'A210A'],
  designRole: '全長4m以下の5ナンバー・コンパクトSUV。', designIdentity: ['Compact SUV', '5-number size', 'DNGA'], designAvoid: ['RAV4 parts', 'Rocky badge', 'Modellista'],
  representativeGrade: '2021年改良 Z・ハイブリッド・2WD', representativeColor: 'Turquoise Blue Mica Metallic', heroScrim: '8, 12, 14', referenceLengthMm: 3995,
  references: { checkedAt: '2026年10月30日', items: [
    { generations: '初代', label: 'Toyota 2019年ライズ発売資料', url: 'https://global.toyota/jp/newsroom/toyota/30286397.html' },
    { generations: '2021年改良', label: 'Toyota 2021年ハイブリッド追加・一部改良資料', url: 'https://global.toyota/jp/newsroom/toyota/36254806.html' },
    { generations: '初代', label: 'Toyota ライズ車種ギャラリー', url: 'https://global.toyota/jp/mobility/toyota-brand/gallery/raize.html' },
  ] },
  tagline: '1世代の中で、1.0Lターボ・1.2L・ハイブリッドを分ける。', heroImage: '/images/cars/raize/a202a-2021-hybrid-z-ff-v1.png', homeCardImage: '/images/cars/raize/a202a-2021-hybrid-z-ff-v1.png',
  generationGuide: { title: 'ライズは2019年から1世代。2021年に動力を拡充', intro: '世代交代ではなく、同じA200系でパワートレーンと駆動方式が分かれます。掲載画像は2021年追加のZ・ハイブリッド・2WD代表です。兄弟車ロッキーやエアロ装着車の外観を混ぜません。', layout: 'chronology', items: [
    { title: '2019年11月：1.0Lターボで発売', description: '全長4m以下、全幅1,695mmの5ナンバーSUVとして登場。2WDはA200A、4WDはA210Aが基本です。', meta: '1.0Lターボ · A200A／A210A' },
    { title: '2021年11月：1.2Lとハイブリッドを追加', description: '2WDガソリンを1.2Lへ変更し、シリーズ式e-SMARTハイブリッドを追加。外観だけで動力方式を断定せず、型式を確認します。', meta: '1.2L A201A · HEV A202A' },
    { title: 'Rockyとの関係', description: 'ダイハツ ロッキーと基本骨格を共有しますが、車名、エンブレム、グレード、販売時期を同一扱いしません。中古車情報ではライズの型式とグレードを確認します。', meta: '兄弟車 ≠ 同一車種' },
    { title: '購入前に確認すること', description: '車検証の型式、2WD／4WD、ガソリン／ハイブリッド、グレード、純正外装を順に確認します。Zの17インチや専用加飾を全グレード標準と考えないでください。', meta: '型式 → 駆動 → 動力 → グレード' },
  ] },
  guides: [
    { href: '/cars/rav4.html', label: 'RAV4の歴代を見る', title: 'RAV4 歴代・型式', description: 'より大きいToyota SUVを比較。', image: '/images/cars/rav4/top-card-front-right-v1.png' },
    { href: '/cars/corolla-cross.html', label: 'COROLLA CROSSを見る', title: 'COROLLA CROSS 改良履歴', description: 'ひと回り大きいハイブリッドSUV候補。', image: '/images/cars/corolla-cross/top-card-front-right-v2.png' },
  ],
  seo: { title: 'ライズ 型式 A200A/A201A/A202A/A210Aの違い | CarVista', description: 'トヨタ ライズの2019年発売と2021年改良を公式資料で整理。1.0Lターボ、1.2L、ハイブリッド、2WD/4WD、型式と中古車確認順を解説します。' },
  defaultIndex: 0, generations,
}
