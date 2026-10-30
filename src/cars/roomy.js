const generations = [{
  numeral: 'I', era: '初代・現行', title: 'M900A / M910A', code: 'M900A / M910A', startYear: '2016', yearRange: '2016–現在', period: '2016年11月〜現在', image: '/images/cars/roomy/m900a-2026-custom-gt-ff-v1.webp',
  annotations: [{ x: 31, y: 42, label: '2020年以降の<wbr>大型グリル', dir: 'top', labelX: 28 }, { x: 68, y: 55, label: '両側スライドの<wbr>背高ボディ', dir: 'top', labelX: 71 }],
  facelift: { fromYear: '2016', toYear: '2020・2026', note: '国内ROOMYは1世代。2020年は外観を含む改良、2026年は安全・装備改良です。', points: ['2016年11月：初代発売', '2020年9月：フロント意匠を刷新', '2026年8月：安全・装備を更新'] },
}]

export default {
  eyebrow: 'CARVISTA', vehicleName: 'ROOMY', brand: 'トヨタ', maker: 'Toyota', order: 25,
  aliases: ['ルーミー', 'るーみー', 'ROOMY', 'M900A', 'M910A'],
  designRole: 'コンパクトな両側スライドドアワゴン。', designIdentity: ['Tall cabin', 'Sliding doors', 'Compact footprint'], designAvoid: ['Tank badge', 'Thor face', 'Aftermarket aero'],
  representativeGrade: '2026年8月改良 カスタムG-T・2WD', representativeColor: 'Plum Brown Crystal Mica', heroScrim: '10, 9, 13', referenceLengthMm: 3705,
  references: { checkedAt: '2026年10月30日', items: [
    { generations: '初代', label: 'Toyota 2016年ROOMY発売資料', url: 'https://global.toyota/jp/detail/14142573' },
    { generations: '初代', label: 'Toyota 2020年ROOMYマイナーチェンジ資料', url: 'https://global.toyota/jp/newsroom/toyota/33670235.html' },
    { generations: '初代', label: 'Toyota 2026年ROOMY一部改良資料', url: 'https://global.toyota/jp/newsroom/toyota/44782616.html' },
    { generations: '現行諸元', label: 'Toyota ROOMY主要諸元', url: 'https://toyota.jp/pages/contents/roomy/001_p_006/pdf/roomy_spec_202610.pdf' },
  ] },
  tagline: '1世代のまま継続。2020年の顔変更と標準／カスタムを分ける。', heroImage: '/images/cars/roomy/m900a-2026-custom-gt-ff-v1.webp', homeCardImage: '/images/cars/roomy/top-card-front-right-v2.png',
  generationGuide: { title: 'ROOMYは2016年から続く1世代', intro: 'M900Aは2WD、M910Aは4WDの型式軸です。掲載画像は2026年8月改良のカスタムG-T・2WD代表。標準車G／Xとカスタムでは顔が異なるため、カスタムの外観を全グレード共通とは扱いません。', layout: 'chronology', items: [
    { title: '2016年11月9日：初代を発売', description: '1.0L自然吸気とターボ、2WDと4WDを設定。背の高い室内と両側スライドドアを持ちます。カスタム系と標準系はグリル・バンパー意匠が異なります。', meta: 'M900A／M910A · 5人乗り' },
    { title: '2020年9月15日：マイナーチェンジ', description: 'フロントフェイスを刷新し、衝突回避支援機能を更新。2020年以前と以後の写真は、まずカスタム同士・標準車同士に条件をそろえて比較します。', meta: '同一世代内の外観改良' },
    { title: '2026年8月31日：安全・装備を更新', description: 'パーキングサポートブレーキなどを全車標準化し、ディスプレイオーディオを設定。フルモデルチェンジではなく、型式M900A／M910Aのまま続く一部改良です。', meta: '世代交代ではない' },
    { title: '中古車は顔よりグレード条件を先に固定', description: '標準／カスタム、自然吸気／ターボ、2WD／4WDをそろえ、製造時期と装備表を販売店へ照会します。画像だけでターボや安全装備の適用を断定しません。', meta: '外装系統 → 動力 → 駆動 → 装備' },
  ] },
  guides: [
    { href: '/roomy-tank-thor-justy.html', label: '4兄弟の違いを見る', title: 'ROOMY・TANK・THOR・JUSTYの違い', description: '型式、車名、標準／カスタムを混同しない確認順。', image: '/images/cars/roomy/top-card-front-right-v2.png' },
    { href: '/cars/solio.html', label: 'SOLIOの歴代を見る', title: 'SOLIO 歴代・型式', description: 'コンパクトなスライドドア車を型式と世代で比較。', image: '/images/cars/solio/top-card-front-right-v2.png' },
    { href: '/cars/sienta.html', label: 'SIENTAの歴代を見る', title: 'SIENTA 歴代・型式', description: '3列シートも候補に含める場合の比較先。', image: '/images/cars/sienta/top-card-front-right-v2.png' },
  ],
  seo: { title: 'ルーミー 歴代・型式 M900A/M910Aと2020年改良の違い | CarVista', description: 'トヨタ ルーミーの2016年発売、2020年マイナーチェンジ、2026年改良を整理。標準車とカスタム、型式、動力・駆動の確認順を公式資料で解説します。' },
  defaultIndex: 0, generations,
}
