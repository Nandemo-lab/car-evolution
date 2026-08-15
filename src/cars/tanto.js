const generations = [
  {
    numeral: 'I', era: '初代', title: 'L350系', code: 'L350S / L360S',
    startYear: '2003', yearRange: '2003–2007', period: '2003年11月〜2007年12月',
    image: '/images/cars/tanto/gen1-2003-l350s.png',
    annotations: [
      { x: 35, y: 48, label: '上下2段の丸みあるランプと<br>短いフロントノーズ', dir: 'top', labelX: 27 },
      { x: 59, y: 29, label: '大きなガラス面と背の高い<br>初代らしいキャビン', dir: 'top', labelX: 66 },
    ],
  },
  {
    numeral: 'II', era: '2代目', title: 'L375系', code: 'L375S / L385S',
    startYear: '2007', yearRange: '2007–2013', period: '2007年12月〜2013年10月',
    image: '/images/cars/tanto/gen2-2007-l375s.png',
    annotations: [
      { x: 35, y: 48, label: '横長ランプと親しみやすい<br>シンプルなフロントマスク', dir: 'top', labelX: 27 },
      { x: 60, y: 31, label: '助手席側に初採用した<br>ミラクルオープンドア', dir: 'top', labelX: 67 },
    ],
  },
  {
    numeral: 'III', era: '3代目', title: 'LA600系', code: 'LA600S / LA610S',
    startYear: '2013', yearRange: '2013–2019', period: '2013年10月〜2019年7月',
    image: '/images/cars/tanto/gen3-2013-la600s.png',
    annotations: [
      { x: 35, y: 47, label: '角を強めたヘッドランプと<br>大きな下部開口', dir: 'top', labelX: 27 },
      { x: 60, y: 30, label: '両側スライドドアへ進化した<br>背高キャビン', dir: 'top', labelX: 67 },
    ],
  },
  {
    numeral: 'IV', era: '4代目／現行', title: 'LA650系', code: 'LA650S / LA660S',
    startYear: '2019', yearRange: '2019–現在', period: '2019年7月〜現在',
    image: '/images/cars/tanto/gen4-2019-la650s.png',
    annotations: [
      { x: 35, y: 46, label: '黒い水平ガーニッシュで結ぶ<br>端正なフロントフェイス', dir: 'top', labelX: 27 },
      { x: 60, y: 29, label: 'DNGAで磨いた視界と<br>スクエアな室内パッケージ', dir: 'top', labelX: 67 },
    ],
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'TANTO',
  brand: 'ダイハツ',
  maker: 'Daihatsu',
  order: 14,
  designRole: 'The family super-height pioneer.',
  designIdentity: ['Friendly', 'Spacious', 'Practical'],
  designAvoid: ['Custom-like', 'SUV-like', 'Low-roof'],
  representativeGrade: '各世代の標準タント X系・NA・2WD',
  representativeColor: '各年式で公式設定されたパールホワイト系純正色',
  heroScrim: '10, 13, 15',
  referenceLengthMm: 3395,
  tagline: '広さと使いやすさは、家族の日常を変えていく。',
  heroImage: '/images/cars/tanto/gen4-2019-la650s.png',
  generationGuide: {
    title: 'L350・L375・LA600・LA650系を見分ける代表ポイント',
    intro: '国内の標準タントを対象に、初代L350系から現行LA650系までを同一条件の画像で比較します。カスタム固有のグリルやエアロは混ぜず、フロントマスク、キャビン、スライドドアの進化を整理しました。',
    items: [
      { title: 'L350系', description: '丸みのある上下2段ランプ、短いノーズ、通常のヒンジ式後席ドアが初代の目印です。', meta: '2003年〜2007年 · L350S / L360S' },
      { title: 'L375系', description: '助手席側のセンターピラーをドアへ内蔵した「ミラクルオープンドア」を初採用。横長ランプの穏やかな顔つきです。', meta: '2007年〜2013年 · L375S / L385S' },
      { title: 'LA600系', description: '両側スライドドアへ進化し、ランプと下部開口を角張らせた力強い標準車フェイスが特徴です。', meta: '2013年〜2019年 · LA600S / LA610S' },
      { title: 'LA650系', description: 'DNGA第1弾。黒い水平ガーニッシュとスクエアな面構成で、視界と乗降性をさらに磨きました。', meta: '2019年〜現在 · LA650S / LA660S' },
    ],
  },
  guides: [],
  seo: {
    title: 'TANTO 歴代モデル・L350/L375/LA600/LA650系の違い — CarVista',
    description: 'ダイハツ タント歴代4世代を統一画像で比較。初代L350系からL375系、LA600系、現行LA650系まで、販売期間・型式・標準タントの見分け方とデザイン進化が一目でわかります。',
  },
  defaultIndex: 3,
  generations,
  references: [
    { label: 'ダイハツ「Tanto（タント）」新発売（2003年）', href: 'https://www.daihatsu.com/jp/news/2003/20031127-01.html' },
    { label: '新型タントを発売（2007年）', href: 'https://www.daihatsu.com/jp/news/2007/20071217-02.html' },
    { label: '新型タントを発売（2013年）', href: 'https://www.daihatsu.com/jp/news/2013/20131003-1.html' },
    { label: '新型タントを発売（2019年）', href: 'https://www.daihatsu.com/jp/news/2019/20190709-1.html' },
    { label: 'ダイハツ タント デザイン', href: 'https://www.daihatsu.com/jp/design/vehicle/tanto.html' },
  ],
}
