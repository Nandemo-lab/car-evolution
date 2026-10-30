const generations = [{
  numeral: 'I', era: '初代・現行', title: 'MX81S / MX91S', code: 'MX81S / MX91S', startYear: '2021', yearRange: '2021–現在', period: '2021年9月〜現在', image: '/images/cars/wagon-r-smile/mx91s-2024-hybrid-x-ff-v1.png',
  annotations: [{ x: 67, y: 43, label: '丸目と細い横桟', dir: 'top', labelX: 68 }, { x: 34, y: 58, label: '両側スライドドア', dir: 'top', labelX: 31 }],
  facelift: { fromYear: '2021', toYear: '2024', note: '1世代のまま継続。2024年12月はグリル・バンパーを含む一部仕様変更です。', points: ['2021年9月：発売', '2023年7月：装備変更', '2024年12月：外装・安全装備を更新'] },
}]

export default {
  eyebrow: 'CARVISTA', vehicleName: 'WAGON R SMILE', brand: 'スズキ', maker: 'Suzuki', order: 31,
  aliases: ['ワゴンRスマイル', 'ワゴンアールスマイル', 'わごんあーるすまいる', 'WAGON R SMILE', 'WAGONR SMILE', 'MX81S', 'MX91S'],
  designRole: 'ワゴンR系の室内性に両側スライドドアと丸目を組み合わせた軽ワゴン。', designIdentity: ['Round lamps', 'Sliding doors', 'Square cabin'], designAvoid: ['Spacia grille', 'Custom face', 'Aftermarket aero'],
  representativeGrade: '2024年12月改良 HYBRID X・2WD', representativeColor: 'Ivory / Taupe roof', heroScrim: '9, 9, 9', referenceLengthMm: 3395,
  references: { checkedAt: '2026年10月30日', items: [
    { generations: '初代', label: 'スズキ 2021年ワゴンRスマイル発売資料', url: 'https://www.suzuki.co.jp/release/a/2021/0827/index.html' },
    { generations: '初代', label: 'スズキ 2023年一部仕様変更資料', url: 'https://www.suzuki.co.jp/release/a/2023/0712/' },
    { generations: '初代', label: 'スズキ 2024年一部仕様変更資料', url: 'https://www.suzuki.co.jp/release/a/2024/1210/index.html' },
    { generations: '現行諸元', label: 'スズキ ワゴンRスマイル主要諸元', url: 'https://www.suzuki.co.jp/car/wagonr_smile/detail/pdf/detail.pdf' },
  ] },
  tagline: 'MX81S／MX91Sは新旧ではなく動力の違い。2024年改良は顔と装備で見る。', heroImage: '/images/cars/wagon-r-smile/mx91s-2024-hybrid-x-ff-v1.png', homeCardImage: '/images/cars/wagon-r-smile/mx91s-2024-hybrid-x-ff-v1.png',
  generationGuide: { title: 'ワゴンRスマイルは2021年から続く1世代', intro: 'MX81SはガソリンG、MX91Sはマイルドハイブリッド系の型式です。型式の違いを前期／後期と誤認せず、登録時期、グレード、フロント意匠を組み合わせます。', layout: 'chronology', items: [
    { title: '2021年9月10日：初代を発売', description: '丸目と両側スライドドアを採用。GとHYBRID S／Xでは動力・装備が異なり、MX81S／MX91Sの違いは年代区分ではありません。', meta: 'MX81S／MX91S' },
    { title: '2023年7月：装備と商品構成を変更', description: 'HYBRID Sへメッキ外装を追加し、特別仕様車Sリミテッドを設定。特別仕様の顔を標準グレード共通と扱いません。', meta: '特別仕様車を分離' },
    { title: '2024年12月：フロント意匠を更新', description: '丸みのあるバンパーとグリルへ変更し、安全装備も更新。フルモデルチェンジではなく同一世代の一部仕様変更です。', meta: '同一世代内の改良' },
    { title: '中古車は型式・グレード・製造時期で確認', description: 'MX81S／MX91S、G／HYBRID S／X、2WD／4WDを固定し、車台番号による販売店照会を併用します。', meta: '写真だけで断定しない' },
  ] },
  guides: [
    { href: '/cars/spacia.html', label: 'SPACIAの歴代を見る', title: 'SPACIA 歴代・型式', description: '同じスズキのスライドドア軽を比較。', image: '/images/cars/spacia/top-card-front-right-v2.png' },
    { href: '/cars/n-one.html', label: 'N-ONEの歴代を見る', title: 'N-ONE 歴代・型式', description: '丸目デザインの世代と型式を確認。', image: '/images/cars/n-one/jg3-2020-original-ff-v1.png' },
  ],
  seo: { title: 'ワゴンRスマイル 歴代・型式｜MX81S/MX91Sと2024年改良 | CarVista', description: 'スズキ ワゴンRスマイルの2021年発売、2023年・2024年改良を整理。MX81S/MX91S、グレード、外観と中古車での確認方法を公式資料で解説します。' },
  defaultIndex: 0, generations,
}
