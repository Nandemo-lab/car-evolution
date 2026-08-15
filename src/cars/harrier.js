const generations = [
  {
    numeral: 'I', era: '初代', title: '10系', code: 'MCU10W',
    startYear: '1997', yearRange: '1997–2003', period: '1997年12月〜2003年2月',
    image: '/images/cars/harrier/gen1-1997-mcu10w.png',
    annotations: [
      { x: 35, y: 50, label: '上下2段のフロントマスクと<br>ハリアー専用エンブレム', dir: 'top', labelX: 27 },
      { x: 59, y: 31, label: '直立したキャビンを持つ<br>初代らしいSUVプロポーション', dir: 'top', labelX: 65 },
    ],
    facelift: { fromYear: '1997', toYear: '2000', points: ['フロントグリルとバンパー意匠を変更', 'ヘッドランプとリヤコンビランプを改良', '内外装と装備を更新'] },
  },
  {
    numeral: 'II', era: '2代目', title: '30系', code: 'MCU35W',
    startYear: '2003', yearRange: '2003–2013', period: '2003年2月〜2013年7月',
    image: '/images/cars/harrier/gen2-2003-mcu35w.png',
    annotations: [
      { x: 35, y: 49, label: '縦に伸びるプロジェクター式<br>ヘッドランプ', dir: 'top', labelX: 27 },
      { x: 59, y: 30, label: '低く長くなったノーズと<br>流麗なルーフライン', dir: 'top', labelX: 65 },
    ],
    facelift: { fromYear: '2003', toYear: '2006', points: ['フロントグリルとバンパー意匠を変更', 'ヘッドランプとリヤコンビランプを改良', '内外装と装備を更新'] },
  },
  {
    numeral: 'III', era: '3代目', title: '60系', code: 'ZSU60W',
    startYear: '2013', yearRange: '2013–2020', period: '2013年12月〜2020年6月',
    image: '/images/cars/harrier/gen3-2013-zsu60w.png',
    annotations: [
      { x: 35, y: 48, label: '細いランプと透明感のある<br>アッパーグリル', dir: 'top', labelX: 27 },
      { x: 58, y: 29, label: 'クーペを思わせる<br>なだらかなルーフライン', dir: 'top', labelX: 65 },
    ],
    facelift: { fromYear: '2013', toYear: '2017', points: ['フロントマスクと灯火類の意匠を刷新', 'ターボ車を追加', 'Toyota Safety Sense Pを設定'] },
  },
  {
    numeral: 'IV', era: '現行モデル', title: '80系', code: 'MXUA80',
    startYear: '2020', yearRange: '2020–現在', period: '2020年6月〜現在',
    image: '/images/cars/harrier/gen4-2020-mxua80.png',
    annotations: [
      { x: 35, y: 47, label: '鋭いL字発光の<br>薄型ヘッドランプ', dir: 'top', labelX: 27 },
      { x: 61, y: 30, label: '低くワイドになった<br>ファストバック調シルエット', dir: 'top', labelX: 67 },
    ],
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'HARRIER',
  brand: 'トヨタ',
  maker: 'Toyota',
  order: 6,
  designRole: 'The urban luxury crossover.',
  designIdentity: ['Elegant', 'Flowing', 'Sophisticated'],
  designAvoid: ['Rugged', 'Boxy', 'Utilitarian'],
  representativeGrade: '各世代の通常販売モデルを代表する仕様',
  representativeColor: '各年式で公式設定されたホワイトパール系純正色',
  heroScrim: '10, 13, 15',
  referenceLengthMm: 4740,
  tagline: '都市型SUVは、流麗さを磨き続ける。',
  heroImage: '/images/cars/harrier/gen4-2020-mxua80.png',
  generationGuide: {
    title: '10・30・60・80系を見分ける代表ポイント',
    intro: '国内ハリアーは1997年の初代10系から、2代目30系、国内専用として再出発した3代目60系、現行80系へ進化しました。ここでは国内販売モデルだけを対象に、販売期間と代表型式、フロントマスク、ランプ、キャビン形状の違いを統一画像で比較します。',
    items: [
      { title: '10系', description: '直立気味のキャビン、上下に分かれたフロントマスク、厚い樹脂クラッディングが初代の目印です。', meta: '1997年〜2003年 · MCU10W' },
      { title: '30系', description: '縦長のプロジェクターランプと、初代より低く流麗になったボディで判別できます。', meta: '2003年〜2013年 · MCU35W' },
      { title: '60系', description: '薄いヘッドランプ、透明感のあるグリル、クーペ調ルーフで独自性を強めました。', meta: '2013年〜2020年 · ZSU60W' },
      { title: '80系', description: 'L字発光の薄型ランプと低くワイドなスタンス、ファストバック調の後姿が特徴です。', meta: '2020年〜現在 · MXUA80' },
    ],
  },
  guides: [
    {
      label: '60系 前期・後期の違い',
      eyebrow: '60 SERIES · FACELIFT GUIDE',
      title: '60系 前期・後期の違い',
      description: '2017年6月8日を境に変わったヘッドランプ、バンパー、フォグ周辺を統一画像で比較。中古車写真から判別する要点を確認できます。',
      href: '/harrier-60-zenki-kouki.html',
      cta: '前期・後期を見分ける',
      image: '/images/cars/harrier/gen3-2017-zsu60w-post-facelift.png',
    },
  ],
  seo: {
    title: 'HARRIER 歴代モデル・10系/30系/60系/80系の違い — CarVista',
    description: 'トヨタ ハリアー歴代4世代を統一画像で比較。初代10系から30系、60系、現行80系まで、販売期間、代表型式、見分け方とデザインの進化が一目でわかります。',
  },
  defaultIndex: 3,
  generations,
  references: [
    { label: 'トヨタ ハリアーを新発売（1997年）', href: 'https://global.toyota/jp/newsroom/toyota/32865761.html' },
    { label: 'トヨタ ハリアーをフルモデルチェンジ（2003年）', href: 'https://global.toyota/jp/newsroom/toyota/21778597.html' },
    { label: '新型ハリアーを発売（2013年）', href: 'https://global.toyota/jp/detail/1019785' },
    { label: '新型ハリアーを発売（2020年）', href: 'https://global.toyota/jp/newsroom/toyota/32732514.html' },
  ],
}
