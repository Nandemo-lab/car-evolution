const generations = [
  { numeral: 'II', era: '2代目', title: 'KF系', code: 'KFEP / KF5P / KF2P', startYear: '2017', yearRange: '2017–2026', period: '2017年2月〜2026年', image: '/images/cars/cx-5/kf5p-sports-appearance.webp', annotations: [{ x: 29, y: 45, label: '低いヘッドランプと<wbr>大型グリル', dir: 'top', labelX: 26 }, { x: 71, y: 48, label: '流れる<wbr>ボディ面', dir: 'top', labelX: 72 }], facelift: { fromYear: '2017', toYear: '2021', note: '2021年の商品改良で前後意匠を変更。エンジンと特別仕様を混同しません。', points: ['2021年：前後バンパーと灯火意匠を変更', 'ガソリン／ディーゼルで型式が異なる', 'Sports Appearance等はグレード固有外装'] } },
  { numeral: 'III', era: '3代目', title: 'KM系', code: 'KMYSDP', startYear: '2026', yearRange: '2026–現在', period: '2026年5月〜現在', image: '/images/cars/cx-5/kmysdp-2026-l.webp', annotations: [{ x: 29, y: 43, label: '幅広いグリルと<wbr>分離感のある灯火', dir: 'top', labelX: 26 }, { x: 70, y: 49, label: '長い軸距と<wbr>大きなキャビン', dir: 'top', labelX: 72 }], facelift: { fromYear: '2026', toYear: '現行', note: '掲載車は国内L・e-SKYACTIV G 2.5・4WD代表です。', points: ['3代目へフルモデルチェンジ', '2.5Lマイルドハイブリッドを採用', 'グレードで画面サイズや装備が異なる'] } },
]

export default {
  eyebrow: 'CARVISTA', vehicleName: 'CX-5', brand: 'マツダ', maker: 'Mazda', order: 23, aliases: ['CX5', 'シーエックスファイブ'],
  designRole: 'Mazda’s core crossover SUV.', designIdentity: ['Kodo', 'Skyactiv', 'Daily SUV'], designAvoid: ['CX-60', 'Overseas-only grade', 'Modified aero'], representativeGrade: '2026年 L・4WD', representativeColor: 'Soul Red Crystal Metallic', heroScrim: '10, 12, 15', referenceLengthMm: 4690,
  references: { checkedAt: '2026年10月29日', items: [
    { generations: '全世代', label: 'Mazda CX-5車種情報・系図', url: 'https://newsroom.mazda.com/ja/cars/1171/index.html' },
    { generations: '初代・2代目・3代目', label: 'Mazda CX-5累計500万台・沿革', url: 'https://newsroom.mazda.com/ja/publicity/release/2026/202601/260129a.html' },
    { generations: '2代目KF系', label: 'Mazda 2021年商品改良資料', url: 'https://newsroom.mazda.com/ja/publicity/release/2021/202111/211108a.html' },
    { generations: '3代目KM系', label: 'Mazda 新型CX-5国内発売資料', url: 'https://newsroom.mazda.com/ja/publicity/release/2026/202605/260521a.html' },
  ] },
  tagline: '2012年、2017年、2026年。型式と動力をそろえて読む。', heroImage: '/images/cars/cx-5/kmysdp-2026-l.webp', homeCardImage: '/images/cars/cx-5/top-card-front-right-v1.png',
  generationGuide: { title: 'CX-5は国内3世代。KF後期とKMを混同しない', intro: 'CX-5は2012年の初代KE、2017年の2代目KF、2026年の3代目KMへ移行しました。掲載画像は2代目後期25S Sports Appearanceと3代目L・4WDで、グレード外装を世代全体へ一般化しません。', layout: 'chronology', items: [
    { title: '2012年：初代KE系', description: 'SKYACTIV技術と魂動デザインを全面採用した最初の量産車。ガソリンとディーゼル、2WDと4WDで型式が分かれます。', meta: 'KE系 · 初代' },
    { title: '2017年：2代目KF系', description: '低い灯火と大型グリルへ進化。2021年の商品改良で前後意匠が変わったため、初期KFと後期KFを別世代と誤認しないようにします。', meta: 'KFEP／KF5P／KF2P' },
    { title: '2026年：3代目KM系', description: '国内で9年ぶりにフルモデルチェンジ。車体とホイールベースを拡大し、2.5Lマイルドハイブリッドを採用しました。旧型ディーゼルとの比較では燃料と動力の条件が一致しません。', meta: 'KM系 · e-SKYACTIV G 2.5' },
    { title: '写真で迷う条件', description: 'KF後期のSports Appearanceは黒い外装部品が特徴ですが、それ自体は世代判定ではなくグレード条件です。グリル、灯火、車体寸法候補を見た後に型式を確認します。', meta: '世代差とグレード差を分離' },
    { title: '中古車の確認順', description: '型式、初度登録、燃料、駆動方式、グレード、商品改良時期を車両情報と整備記録で照合。ディーゼルとガソリンの維持条件も同じ表に混ぜません。', meta: '型式 → 燃料 → 駆動 → 改良時期' },
  ] },
  guides: [{ href: '/cx-5-kf-vs-km.html', label: 'CX-5 KF系・KM系の違い', title: 'CX-5 KF系とKM系の違い', description: '2.5L・4WDでそろえ、サイズと装備を比較。', image: '/images/cars/cx-5/kmysdp-2026-l.webp' }],
  seo: { title: 'CX-5 歴代・型式｜KE・KF・KM系の違い | CarVista', description: 'マツダCX-5の初代KE、2代目KF、3代目KMを整理。改良境界、外観、動力・グレード差、中古車確認順を公式資料で解説します。' }, defaultIndex: 1, generations,
}
