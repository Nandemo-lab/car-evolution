const generations = [
  {
    numeral: 'I',
    era: '初代',
    title: 'RU系',
    code: 'RU1 / RU2 / RU3 / RU4',
    startYear: '2013',
    yearRange: '2013–2021',
    period: '2013年12月〜2021年4月',
    image: '/images/cars/vezel/gen1-2013-hybrid-z-ff-v1.png',
    annotations: [
      { x: 32, y: 47, label: '上下に分かれた<wbr>フロント', dir: 'top', labelX: 27 },
      { x: 72, y: 37, label: '隠しリアドア<wbr>ハンドル', dir: 'top', labelX: 72 },
    ],
    facelift: {
      fromYear: '2013',
      toYear: '2018',
      note: '2018年2月16日にマイナーモデルチェンジ。',
      points: ['フロントバンパーとグリルを変更', 'インラインタイプLEDヘッドライトを採用', 'Honda SENSINGを全タイプに標準装備'],
    },
  },
  {
    numeral: 'II',
    era: '2代目・現行',
    title: 'RV系',
    code: 'RV3 / RV4 / RV5 / RV6',
    startYear: '2021',
    yearRange: '2021–現在',
    period: '2021年4月〜現在',
    image: '/images/cars/vezel/rv5-2026-ehev-z-ff-v1.png',
    annotations: [
      { x: 31, y: 47, label: '水平基調の<wbr>フロント', dir: 'top', labelX: 29 },
      { x: 71, y: 37, label: 'クーペライクな<wbr>後席まわり', dir: 'top', labelX: 71 },
    ],
    facelift: {
      fromYear: '2021',
      toYear: '2024・2026',
      note: '2024年と2026年は同じ2代目RV系の段階的な改良です。',
      points: ['2024年：グリル、バンパー、リアランプとe:HEV制御を改良', '2025年：CONNECT関連オプション追加、e:HEV RSを追加', '2026年：グレード別に外装色と快適装備を改良'],
    },
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'VEZEL',
  brand: 'ホンダ',
  maker: 'Honda',
  order: 17,
  designRole: 'The urban crossover.',
  designIdentity: ['Clean', 'Coupe-like', 'Versatile'],
  designAvoid: ['Off-road heavy', 'Minivan', 'Formal luxury'],
  representativeGrade: 'Launch representative by generation',
  representativeColor: 'Slate gray pearl',
  heroScrim: '10, 13, 16',
  referenceLengthMm: 4340,
  references: {
    checkedAt: '2026年10月29日',
    items: [
      { generations: '初代RU系', label: 'Honda 2013年VEZEL発売資料', url: 'https://global.honda/jp/news/2013/4131219-vezel.html' },
      { generations: '初代RU系', label: 'Honda 2018年マイナーモデルチェンジ資料', url: 'https://global.honda/jp/news/2018/4180215-vezel.html' },
      { generations: '2代目RV系', label: 'Honda 2021年VEZEL発売資料', url: 'https://global.honda/jp/news/2021/4210422-vezel.html' },
      { generations: '2代目RV系', label: 'Honda 2024年マイナーモデルチェンジ資料', url: 'https://global.honda/jp/news/2024/4240425-vezel.html' },
      { generations: '2代目RV系', label: 'Honda 2026年マイナーモデルチェンジ資料', url: 'https://global.honda/jp/news/2026/4261022-vezel.html' },
    ],
  },
  tagline: '型式と改良時期で、違いを見抜く。',
  heroImage: '/images/cars/vezel/rv5-2026-ehev-z-ff-v1.png',
  homeCardImage: '/images/cars/vezel/rv5-2026-ehev-z-ff-v1.png',
  generationGuide: {
    title: 'RU系とRV系を見分ける代表ポイント',
    intro: 'まず型式の先頭とボディーの面構成を確認します。2024年・2026年の改良はRV系の世代内変更で、フルモデルチェンジではありません。',
    items: [
      { title: '初代 RU系', description: '中央へ絞ったフロントと、張り出したフェンダーが目印。', meta: '2013年〜2021年 · RU1 / RU2 / RU3 / RU4' },
      { title: '2代目 RV系', description: '水平基調のフロントと、面をそろえたクリーンなボディー。', meta: '2021年〜現在 · RV3 / RV4 / RV5 / RV6' },
      { title: '2024・2026年改良', description: 'どちらもRV系。2026年はグレード別に外装色と快適装備を変更。', meta: '2024年4月／2026年10月' },
    ],
  },
  guides: [
    { href: '/vezel-2024-vs-2026.html', label: '2024年仕様・2026年改良の違い', description: 'e:HEV Z・FFを固定し、外装色と装備差を公式資料で確認する。', image: '/images/cars/vezel/rv5-2026-ehev-z-ff-v1.png' },
  ],
  seo: {
    title: 'VEZEL 歴代モデル・RU系/RV系の違いと型式 | CarVista',
    description: 'ホンダ ヴェゼル初代RU系と2代目RV系を画像で比較。2013年・2021年の世代交代、2018年・2024年・2025年・2026年の改良境界と型式の見分け方を整理します。',
  },
  defaultIndex: 1,
  generations,
}
