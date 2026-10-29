const generations = [
  { numeral: 'III', era: '3代目', title: 'B4系', code: 'B44A / B45A / B47A / B48A', startYear: '2020', yearRange: '2020–2025', period: '2020年3月〜2025年', image: '/images/cars/roox/b45a-2023-highway-star.webp', annotations: [{ x: 30, y: 44, label: '2023年改良の<wbr>V字グリル', dir: 'top', labelX: 27 }, { x: 70, y: 49, label: '縦長の<wbr>灯火まわり', dir: 'top', labelX: 72 }], facelift: { fromYear: '2020', toYear: '2023', note: '2023年は同じB4系内の外観改良。2025年のBB系とは別です。', points: ['2020年：ルークス名で登場', '2023年：フロント意匠を変更', '標準系とハイウェイスターで顔が異なる'] } },
  { numeral: 'IV', era: '4代目', title: 'BB系', code: 'BB1A / BB2A / BB5A / BB6A', startYear: '2025', yearRange: '2025–現在', period: '2025年10月〜現在', image: '/images/cars/roox/bb2a-2025-highway-star.webp', annotations: [{ x: 30, y: 43, label: 'かどまる四角の<wbr>グリル', dir: 'top', labelX: 28 }, { x: 68, y: 48, label: '四角い<wbr>キャビン', dir: 'top', labelX: 70 }], facelift: { fromYear: '2025', toYear: '現行', note: '掲載車はハイウェイスターGターボ・2WD代表です。', points: ['BB系へフルモデルチェンジ', 'カメラ表示と室内機能を刷新', '標準車・AUTECH LINEは別外装'] } },
]

export default {
  eyebrow: 'CARVISTA', vehicleName: 'ROOX', brand: '日産', maker: 'Nissan', order: 20, aliases: ['ルークス'], designRole: 'Nissan’s family super-height kei.', designIdentity: ['Slide doors', 'Tall cabin', 'Urban'], designAvoid: ['AUTECH-only', 'DAYZ', 'Modified aero'], representativeGrade: '2025年 ハイウェイスターGターボ・2WD', representativeColor: 'Sorbet Blue', heroScrim: '9, 12, 16', referenceLengthMm: 3395,
  references: { checkedAt: '2026年10月29日', items: [
    { generations: '初代から3代目', label: '日産 2020年新型ルークス発表', url: 'https://global.nissannews.com/ja-JP/releases/200225-01-j' },
    { generations: '3代目B4系', label: '日産 2023年ルークス改良', url: 'https://global.nissannews.com/ja-JP/releases/230417-01-j' },
    { generations: '4代目BB系', label: '日産 2025年新型ルークス発表', url: 'https://global.nissannews.com/ja-JP/releases/250919-01-j' },
    { generations: '4代目BB系', label: '日産 新型ルークス機能紹介', url: 'https://global.nissannews.com/ja-JP/releases/250822-01-j' },
  ] },
  tagline: 'ルークス、デイズ ルークス、再びルークス。名前と型式を分ける。', heroImage: '/images/cars/roox/bb2a-2025-highway-star.webp', homeCardImage: '/images/cars/roox/top-card-front-right-v1.png',
  generationGuide: { title: 'ルークスの4世代と名称の変化', intro: '日産は2009年のOEMモデルを初代と数え、2014年は「デイズ ルークス」、2020年に再び「ルークス」、2025年にBB系へ世代交代しました。掲載画像は3代目2023年改良後と4代目のハイウェイスターGターボ・2WD代表です。', layout: 'chronology', items: [
    { title: '2009年：初代ML21S', description: 'スズキからOEM供給を受けた初代。後のデイズ ルークスやB4系とは開発背景も型式体系も異なります。', meta: 'ML21S · 初代' },
    { title: '2014年：デイズ ルークス B21A', description: '車名に「デイズ」が付きました。中古車サイトで単にルークスと表示される場合があるため、正式車名と型式を確認します。', meta: 'B21A · 2代目' },
    { title: '2020年：ルークス B4系', description: '車名をルークスへ戻し、B44A／B45A等を設定。2023年のV字グリルは同世代内の改良で、標準系とハイウェイスターの外装差もあります。', meta: 'B44A〜B48A · 3代目' },
    { title: '2025年：ルークス BB系', description: 'BB1A／BB2A等へフルモデルチェンジ。かどまる四角の意匠が目印ですが、標準車、ハイウェイスター、AUTECH LINEを同じ顔として扱いません。', meta: 'BB1A〜BB6A · 4代目' },
    { title: '中古車の確認順', description: '正式車名、型式、NA／ターボ、2WD／4WD、標準系／ハイウェイスターを照合。2025年登録だけでBB系と決めず、製造時期と車台番号を販売店へ確認します。', meta: '名称 → 型式 → 動力 → 外装系統' },
  ] },
  guides: [{ href: '/roox-b4-vs-bb.html', label: 'ルークスB4系・BB系の違い', title: 'ルークス旧型と新型の違い', description: 'ハイウェイスターGターボ・2WDで新旧を比較。', image: '/images/cars/roox/bb2a-2025-highway-star.webp' }],
  seo: { title: 'ルークス 歴代・型式｜B4系・BB系の違い | CarVista', description: '日産ルークスの初代、デイズ ルークス、B4系、BB系を整理。名称、型式、改良、標準車とハイウェイスター、中古車の確認順を解説します。' }, defaultIndex: 1, generations,
}
