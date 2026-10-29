const generations = [
  {
    numeral: 'I',
    era: '初代・現行',
    title: '10系',
    code: 'ZSG10 / ZVG11 / ZVG13 / ZVG15 / ZVG16',
    startYear: '2021',
    yearRange: '2021–現在',
    period: '2021年9月〜現在',
    image: '/images/cars/corolla-cross/zvg13-2025-hybrid-z-ff-v1.jpg',
    annotations: [
      { x: 31, y: 47, label: '2025年刷新の<wbr>同色グリル', dir: 'top', labelX: 28 },
      { x: 69, y: 38, label: 'SUVらしい<wbr>高いルーフ', dir: 'top', labelX: 70 },
    ],
    facelift: {
      fromYear: '2021',
      toYear: '2023・2025',
      note: '2023年は機構・安全装備、2025年は内外装を含む大幅改良。いずれも同じ初代です。',
      points: ['2023年：ハイブリッド機構刷新、ガソリンを2.0L化', '2025年：バンパー、ヘッドランプ、同色グリルを刷新', '2025年8月：2.0LハイブリッドのGR SPORTを追加'],
    },
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'COROLLA CROSS',
  brand: 'トヨタ',
  maker: 'Toyota',
  order: 18,
  designRole: 'The practical Corolla SUV.',
  designIdentity: ['Urban', 'Practical', 'Hybrid'],
  designAvoid: ['GR-only', 'Overseas face', 'Off-road custom'],
  representativeGrade: '2025年5月改良 ハイブリッドZ・2WD',
  representativeColor: 'Metal Stream Metallic',
  heroScrim: '10, 13, 16',
  referenceLengthMm: 4455,
  references: {
    checkedAt: '2026年10月29日',
    items: [
      { generations: '初代10系', label: 'Toyota 2021年カローラ クロス発売資料', url: 'https://global.toyota/jp/newsroom/toyota/35872053.html' },
      { generations: '初代10系', label: 'Toyota 2023年一部改良資料', url: 'https://global.toyota/jp/newsroom/toyota/39926142.html' },
      { generations: '初代10系', label: 'Toyota 2025年一部改良・GR SPORT設定資料', url: 'https://global.toyota/jp/newsroom/toyota/42821873.html' },
      { generations: '2025年仕様', label: 'Toyota カローラ クロス主要諸元表', url: 'https://toyota.jp/pages/contents/request/webcatalog/corollacross/corollacross_main_202509.pdf' },
    ],
  },
  tagline: '同じ初代でも、2023年と2025年で確認点が変わる。',
  heroImage: '/images/cars/corolla-cross/zvg13-2025-hybrid-z-ff-v1.jpg',
  // TOP cards use a front-right three-quarter view (front points right).
  // Keep this independent from the comparison pair, whose camera matching
  // must not be changed just to satisfy the home-grid presentation rule.
  homeCardImage: '/images/cars/corolla-cross/top-card-2025-front-right-v2.jpg',
  generationGuide: {
    title: '国内カローラ クロスは1世代。改良年を分けて確認',
    intro: '日本仕様は2021年9月に登場した10系が現行まで継続しています。2023年と2025年はフルモデルチェンジではなく同一世代内の改良です。型式はパワートレインと駆動方式で異なるため、外観だけでなく車検証と年式別装備表を組み合わせます。掲載画像は2025年5月改良のハイブリッドZ・2WD代表です。',
    items: [
      {
        title: '2021年9月14日：国内初代を発売',
        description: '1.8LガソリンはZSG10、1.8Lハイブリッドは2WDのZVG11とE-FourのZVG15を設定。発売時の大きな黒い下部グリルは初期仕様の目印ですが、Z・S・G／G Xではホイールや加飾が同じではありません。',
        meta: '初代 · ZSG10／ZVG11／ZVG15',
      },
      {
        title: '2023年10月18日：パワートレーンと安全装備を刷新',
        description: 'ハイブリッドの電動モジュールを刷新し、ガソリン車を1.8Lから2.0Lへ変更。Toyota Safety Senseやコネクティッド機能も拡充しました。外観の大刷新ではないため、写真だけで2021年仕様と2023年仕様を確定せず、型式・製造時期・装備表を確認します。',
        meta: '同一世代内の改良 · ZVG13／ZVG16などへ移行',
      },
      {
        title: '2025年5月23日：フロント意匠を大幅変更',
        description: 'バンパーとヘッドランプを刷新し、ボディ同色のパンチング状グリルを採用。ハイブリッドZの18インチホイールも変更しました。GR SPORTは専用バンパー、専用グリル、19インチホイールを持つため、標準Zの改良前後比較には混ぜません。',
        meta: '掲載画像の代表時期 · ハイブリッドZ・2WD',
      },
      {
        title: '中古車写真で迷ったときの確認順',
        description: 'まずグリルとヘッドランプで2025年改良の前後を見ます。次に車検証の型式と駆動方式、製造時期、グレードを販売店へ照会します。初度登録月だけでは在庫車や外装交換を除外できないため、車台番号による仕様確認を併用してください。',
        meta: '外観 → 型式 → 製造時期 → グレード',
      },
      {
        title: '購入判断は改良年より使用条件を固定',
        description: '2025年型は外観と快適・安全装備が新しく、2023年型は中古車の価格と在庫選択肢が比較材料です。Zの装備だけでなく、2WD／E-Four、駐車場幅、タイヤ費用、欲しい運転支援を同じ条件で見積もります。',
        meta: '装備名ではなく実車条件で比較',
      },
    ],
    layout: 'chronology',
  },
  guides: [
    { href: '/corolla-cross-2023-vs-2025.html', label: '2023年仕様・2025年改良の違い', title: 'カローラ クロス2023年と2025年の違い', description: 'ハイブリッドZ・2WDを固定し、外観と装備の境界を比較。', image: '/images/cars/corolla-cross/zvg13-2025-hybrid-z-ff-v1.jpg' },
    { href: '/rav4-50-vs-60.html', label: 'RAV4 50系・60系の違い', title: 'RAV4 50系と60系の違い', description: 'ひと回り大きいToyota SUVを比較。', image: '/images/cars/rav4/axan64-2025-hev-z.webp' },
  ],
  seo: {
    title: 'カローラ クロス 歴代・型式と2023/2025年改良の違い | CarVista',
    description: 'トヨタ カローラ クロスの2021年発売、2023年・2025年改良を整理。型式、外観の見分け方、グレード差、中古車購入時の確認順を公式資料で解説します。',
  },
  defaultIndex: 0,
  generations,
}
