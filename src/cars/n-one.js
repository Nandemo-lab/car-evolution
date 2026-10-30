const generations = [
  {
    numeral: 'I', era: '初代', title: 'JG1 / JG2', code: 'JG1 / JG2', startYear: '2012', yearRange: '2012–2020', period: '2012年11月〜2020年3月', image: '/images/cars/n-one/jg1-2012-g-l-package-ff-v1.png',
    annotations: [{ x: 66, y: 45, label: '丸目と横長グリル', dir: 'top', labelX: 68 }, { x: 31, y: 60, label: '台形キャビン', dir: 'top', labelX: 28 }],
    facelift: { fromYear: '2012', toYear: '2020', note: '初代はJG1がFF、JG2が4WD。Premium・RS・ターボは外装や動力が異なります。', points: ['2012年11月：初代発売', '2017年12月：外装・装備を刷新', '2020年3月：初代の生産終了'] },
  },
  {
    numeral: 'II', era: '2代目・現行', title: 'JG3 / JG4', code: 'JG3 / JG4', startYear: '2020', yearRange: '2020–現在', period: '2020年11月〜現在', image: '/images/cars/n-one/jg3-2020-original-ff-v1.png',
    annotations: [{ x: 68, y: 43, label: '丸目を継承', dir: 'top', labelX: 69 }, { x: 32, y: 59, label: '骨格と型式は新世代', dir: 'top', labelX: 30 }],
    facelift: { fromYear: '2020', toYear: '現在', note: '見た目は初代の考え方を継承しますが、JG3/JG4へ世代交代。RSの6MTなどグレード差を分けます。', points: ['2020年11月：2代目発売', 'Original／Premium／RSを設定', '型式と登録時期で最終確認'] },
  },
]

export default {
  eyebrow: 'CARVISTA', vehicleName: 'N-ONE', brand: 'ホンダ', maker: 'Honda', order: 30,
  aliases: ['N-ONE', 'NONE', 'N ONE', 'エヌワン', 'えぬわん', 'JG1', 'JG2', 'JG3', 'JG4'],
  designRole: '初代の造形を継承しながら、型式と骨格を更新した軽ハッチ。', designIdentity: ['Round lamps', 'Short overhang', 'Tall cabin'], designAvoid: ['N-BOX face', 'RS aero on Original', 'Aftermarket grille'],
  representativeGrade: '初代G・Lパッケージ／2代目Original・FF', representativeColor: 'Beige / White', heroScrim: '9, 9, 10', referenceLengthMm: 3395,
  references: { checkedAt: '2026年10月30日', items: [
    { generations: '初代', label: 'Honda 2012年N-ONE発売資料', url: 'https://global.honda/jp/news/2012/4121101-n-one.html' },
    { generations: '2代目', label: 'Honda 2020年N-ONE発売資料', url: 'https://global.honda/jp/news/2020/4201119-n-one.html' },
    { generations: '現行諸元', label: 'Honda N-ONE主要諸元', url: 'https://www.honda.co.jp/N-ONE/common/pdf/n-one_spec_list.pdf' },
  ] },
  tagline: '顔が似ていても世代は別。JG1/JG2とJG3/JG4を型式で確かめる。', heroImage: '/images/cars/n-one/jg3-2020-original-ff-v1.png', homeCardImage: '/images/cars/n-one/jg3-2020-original-ff-v1.png',
  generationGuide: { title: 'N-ONEは「似た顔のまま世代交代」した', intro: '2代目は初代の丸目と台形キャビンを意図的に継承しています。中古車写真だけで初代・2代目を断定せず、型式と初度登録時期を併用します。', layout: 'chronology', items: [
    { title: '2012年11月2日：初代を発売', description: 'JG1はFF、JG2は4WD。G、Premium、Tourerなどで外装・ターボ有無が異なるため、掲載画像の顔を全グレード共通とは扱いません。', meta: 'JG1／JG2' },
    { title: '2020年11月20日：2代目を発売', description: 'JG3はFF、JG4は4WD。丸目を継承しつつ、Honda SENSINGやRSの6MTなど商品構成を更新しました。', meta: 'JG3／JG4' },
    { title: '写真では灯火とバンパーを合わせて見る', description: '丸目だけでは世代判別できません。グリル、バンパー下部、灯火内部と、車両情報の型式を同時に確認します。', meta: '顔つき単独で断定しない' },
    { title: '購入時は外装系統と動力を固定', description: 'Original／Premium／RS、自然吸気／ターボ、FF／4WDを分け、車台番号から販売店へ仕様照会します。', meta: 'グレード差を世代差にしない' },
  ] },
  guides: [
    { href: '/cars/n-box.html', label: 'N-BOXの歴代を見る', title: 'N-BOX 歴代・型式', description: '同じHonda軽の世代と型式を比較。', image: '/images/cars/n-box/top-card-front-right-v2.png' },
    { href: '/cars/wagon-r-smile.html', label: 'ワゴンRスマイルを見る', title: 'WAGON R SMILE 歴代・型式', description: '丸目とスライドドアを持つ軽ワゴンを確認。', image: '/images/cars/wagon-r-smile/mx91s-2024-hybrid-x-ff-v1.png' },
  ],
  seo: { title: 'N-ONE 歴代・型式｜JG1/JG2とJG3/JG4の違い | CarVista', description: 'ホンダN-ONEの初代JG1/JG2と2代目JG3/JG4を整理。似た丸目でも世代を間違えない型式、グレード、外観と中古車確認手順を公式資料で解説します。' },
  defaultIndex: 1, generations,
}
