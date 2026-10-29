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
  representativeGrade: '初代2013年HYBRID Z・FF／2代目2026年e:HEV Z・FF',
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
  "title": "ヴェゼルは国内2世代。改良年と型式を分けて確認",
  "intro": "国内VEZELは2013年12月の初代RU系と、2021年4月の2代目RV系です。このページは世代・発売時期・型式の入口を整理した年表です。2026年10月29日時点で確認した最新改良は同年10月23日で、3代目への世代交代ではありません。歴代ページの画像は初代2013年HYBRID Z・FFと2代目2026年e:HEV Z・FFの代表です。すべての改良型を描いたものではありません。発売時同士の2013年／2021年比較は関連ガイドへ分けています。海外HR-Vの呼称・世代区分とは分けています。",
  "items": [
    {
      "title": "2013年12月20日：RU系の発売",
      "description": "ハイブリッドはRU3（FF）／RU4（4WD）、ガソリンはRU1（FF）／RU2（4WD）。1モーターのi-DCDに7速DCTを組み合わせたハイブリッドと、CVTのガソリン車を区別してください。掲載画像はHYBRID Z・FFで、他グレードの樹脂部やホイールは同じではありません。",
      "meta": "初代 · RU1／RU2／RU3／RU4"
    },
    {
      "title": "2018年2月16日：初代のマイナーチェンジ",
      "description": "グリルやバンパー、灯火類の意匠を更新。Honda SENSINGは全タイプ標準装備と案内されていますが非装着仕様の設定もあり、年式だけで個体の装備を断定できません。RSや後年追加のTOURING等の専用意匠を、初代全体の前後期差と混同しないことが重要です。",
      "meta": "同じRU系内の改良 · 掲載画像は改良前"
    },
    {
      "title": "2021年4月23日：RV系へ世代交代",
      "description": "ハイブリッドを2モーターのe:HEVへ刷新。RV5がFF、RV6が4WDで、発売時のガソリンGはRV3／RV4です。Z・FFの幅は1,790mm、全長は4,330mm。平らで長いボンネットと横方向を強調したフロントで初代と見分けられます。",
      "meta": "2代目 · RV3／RV4／RV5／RV6"
    },
    {
      "title": "2024年4月26日：RV系の外観・装備改良",
      "description": "フロントグリルとバンパー、後部のLED灯火を変更。XにはHuNTパッケージ、ZにはPLaYパッケージを設定しました。2021年の独立したPLaYと2024年以降のZ・PLaYパッケージは商品構成が異なるため、中古車欄の略称だけで屋根や駆動方式を判断しないでください。",
      "meta": "2代目の改良 · 新世代ではない"
    },
    {
      "title": "2025年10月24日：e:HEV RS追加",
      "description": "専用の低い車高、グリルなどを持つRSを追加。見た目が大きく違ってもRV系の一仕様です。RSの全高1,545mmを通常Zの駐車場適合判断に流用できません。立体駐車場は幅・高さに加えて重量や機械側の制限も確認します。",
      "meta": "専用グレード · FF／4WD設定"
    },
    {
      "title": "2026年10月23日：Z系の同色部を拡大",
      "description": "ZとZ・PLaYパッケージではホイールアーチや前後・サイドのガーニッシュをボディ同色化し、ヘッドランプ内部をブラック基調へ。G／X系の後席向け装備も拡充されています。「樹脂アーチが黒いから初代」「同色だからRS」といった単独判定は成立しません。",
      "meta": "確認済みの最新改良 · 2026年10月29日調査"
    },
    {
      "title": "年式を特定するときの照合順",
      "description": "車検証等で型式と駆動方式を確認し、製造時期とグレードを販売店に照会、最後に年式別装備表と外観を照合します。初度登録月と製造月は別です。ルーフ、グリル、ホイールが交換された車両では写真だけで決めず、車台番号による確認を優先してください。",
      "meta": "書類 → 製造時期 → 仕様 → 外観"
    }
  ],
  "layout": "chronology"
},
  guides: [
{"href":"/vezel-ru-vs-rv.html","label":"初代RU・2代目RVの違い","title":"ヴェゼルRU系とRV系の違い","description":"Z・FF同士でサイズ、ハイブリッド方式、中古車の確認手順を比較。","image":"/images/cars/vezel/rv5-2021-ehev-z.webp"},
    { href: '/vezel-2024-vs-2026.html', label: '2024年仕様・2026年改良の違い', description: 'e:HEV Z・FFを固定し、外装色と装備差を公式資料で確認する。', image: '/images/cars/vezel/rv5-2026-ehev-z-ff-v1.png' },
  ],
  seo: {
    title: 'VEZEL 歴代モデル・RU系/RV系の違いと型式 | CarVista',
    description: 'ホンダ ヴェゼル初代RU系と2代目RV系を画像で比較。2013年・2021年の世代交代、2018年・2024年・2025年・2026年の改良境界と型式の見分け方を整理します。',
  },
  defaultIndex: 1,
  generations,
}
