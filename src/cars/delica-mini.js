const generations = [
  { numeral: 'I', era: '初代', title: 'B3系', code: 'B34A / B35A / B37A / B38A', startYear: '2023', yearRange: '2023–2025', period: '2023年5月〜2025年10月', image: '/images/cars/delica-mini/b38a-2023-t-premium.webp', annotations: [{ x: 31, y: 43, label: '細いグリルと<wbr>半円形の灯火', dir: 'top', labelX: 28 }, { x: 68, y: 51, label: '縦方向の<wbr>バンパー加飾', dir: 'top', labelX: 70 }], facelift: { fromYear: '2023', toYear: '2025', note: '2025年6月のPremium Limitedは初代の特別仕様。2代目ではありません。', points: ['2023年：初代発売', '2025年6月：Premium Limited追加', 'G／TはNA／ターボの区分'] } },
  { numeral: 'II', era: '2代目', title: 'BA系', code: 'BA1A / BA2A / BA5A / BA6A', startYear: '2025', yearRange: '2025–現在', period: '2025年10月〜現在', image: '/images/cars/delica-mini/ba6a-2025-t-premium.webp', annotations: [{ x: 30, y: 42, label: '四つの開口と<wbr>大きな灯火', dir: 'top', labelX: 27 }, { x: 69, y: 51, label: '角張った<wbr>ボディ', dir: 'top', labelX: 71 }], facelift: { fromYear: '2025', toYear: '現行', note: '掲載車はT Premium DELIMARU Package・4WD代表です。', points: ['2025年10月：フルモデルチェンジ', '5つのドライブモードを採用', 'DELIMARU Packageは追加装備条件'] } },
]

export default {
  eyebrow: 'CARVISTA', vehicleName: 'DELICA MINI', brand: '三菱', maker: 'Mitsubishi', order: 21, aliases: ['デリカミニ'], designRole: 'A compact Delica-themed kei wagon.', designIdentity: ['Active', 'Tall cabin', '4WD option'], designAvoid: ['Delica D:5', 'Dealer decals', 'Custom parts'], representativeGrade: '2025年 T Premium DELIMARU Package・4WD', representativeColor: 'Ash Green Metallic', heroScrim: '8, 12, 14', referenceLengthMm: 3395,
  references: { checkedAt: '2026年10月29日', items: [
    { generations: '初代B3系', label: '三菱 初代デリカミニ発売資料', url: 'https://www.mitsubishi-motors.com/jp/newsroom/newsrelease/2023/20230525_1.html' },
    { generations: '初代B3系', label: '三菱 2025年Premium Limited資料', url: 'https://www.mitsubishi-motors.com/jp/newsroom/newsrelease/2025/20250403_1.html' },
    { generations: '2代目BA系', label: '三菱 2代目デリカミニ発表資料', url: 'https://www.mitsubishi-motors.com/jp/newsroom/newsrelease/2025/20250918_3.html' },
    { generations: '2代目BA系', label: '三菱 2代目デリカミニ発売資料', url: 'https://www.mitsubishi-motors.com/file.jsp?id=234592' },
  ] },
  tagline: '2025年の特別仕様とフルモデルチェンジを取り違えない。', heroImage: '/images/cars/delica-mini/ba6a-2025-t-premium.webp', homeCardImage: '/images/cars/delica-mini/top-card-front-right-v1.png',
  generationGuide: { title: 'デリカミニは2023年初代、2025年2代目', intro: 'デリカミニは2023年に独立車名として登場し、2025年10月に2代目へフルモデルチェンジしました。掲載画像は初代T Premiumと2代目T Premium DELIMARU Packageの4WD代表。パッケージ装備を世代差に含めません。', layout: 'chronology', items: [
    { title: '2023年5月：初代B3系', description: 'G／T、Premium、2WD／4WDを設定。Tはターボを示しますが、駆動方式やPremium装備までは決まりません。', meta: 'B34A／B35A／B37A／B38A' },
    { title: '2025年6月：初代Premium Limited', description: '装備をまとめた特別仕様車で、初代のままです。同年10月発売の2代目と登録年だけで混同しないようにします。', meta: '特別仕様 · 世代交代ではない' },
    { title: '2025年10月：2代目BA系', description: '四つの開口と大きな灯火、角張ったボディへ刷新。DELIMARU PackageのGoogle搭載画面等はパッケージ条件です。', meta: 'BA1A／BA2A／BA5A／BA6A' },
    { title: '外観で迷う条件', description: '用品のサイドデカール、DELICA文字、ルーフレールは装着条件があります。グリルと灯火、型式、グレード、用品明細を合わせます。', meta: '純正標準外装と用品を分離' },
    { title: '中古車の確認順', description: 'B3／BAの型式、G／T、2WD／4WD、Premium系、パッケージ、製造時期を確認。車高はルーフレールやキャリアも含め実測します。', meta: '型式 → 過給 → 駆動 → 装備' },
  ] },
  guides: [{ href: '/delica-mini-b3-vs-ba.html', label: 'デリカミニ初代・2代目の違い', title: 'デリカミニB3系とBA系の違い', description: 'ターボ・4WDでそろえ、外観と装備を比較。', image: '/images/cars/delica-mini/ba6a-2025-t-premium.webp' }],
  seo: { title: 'デリカミニ 歴代・型式｜B3系・BA系の違い | CarVista', description: '三菱デリカミニの初代B3系と2代目BA系、2025年特別仕様と世代交代、グレード・駆動差、中古車確認順を公式資料で整理します。' }, defaultIndex: 1, generations,
}
