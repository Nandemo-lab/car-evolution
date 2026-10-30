const generations = [
  {
    numeral: 'I', era: '初代', title: 'MR31S / MR41S', code: 'MR31S / MR41S', startYear: '2014', yearRange: '2014–2020', period: '2014年1月〜2020年1月', image: '/images/cars/hustler/mr31s-2014-x-ff-v1.webp',
    annotations: [{ x: 31, y: 42, label: '丸型ランプと<wbr>細いグリル', dir: 'top', labelX: 29 }, { x: 68, y: 58, label: '角を丸めた<wbr>初代ボディ', dir: 'top', labelX: 70 }],
    facelift: { fromYear: '2014', toYear: '2020', note: 'MR31SとMR41Sは同じ初代。型式の違いだけで外観の前後期を断定しません。', points: ['2014年1月：初代発売', 'X・2WD画像を外観代表に使用', '装備と駆動方式は車検証・仕様表で確認'] },
  },
  {
    numeral: 'II', era: '2代目・現行', title: 'MR52S / MR92S', code: 'MR52S / MR92S', startYear: '2020', yearRange: '2020–現在', period: '2020年1月〜現在', image: '/images/cars/hustler/mr92s-2026-hybrid-x-ff-v1.webp',
    annotations: [{ x: 30, y: 42, label: '角型ボディと<wbr>丸型ランプ', dir: 'top', labelX: 28 }, { x: 68, y: 56, label: '2026年の<wbr>逆台形グリル', dir: 'top', labelX: 70 }],
    facelift: { fromYear: '2020', toYear: '2024・2026', note: '2024年と2026年はフルモデルチェンジではなく2代目内の改良です。', points: ['2020年1月：2代目発売', '2024年5月：装備改良とタフワイルド追加', '2026年5月：フロント意匠と安全装備を更新'] },
  },
]

export default {
  eyebrow: 'CARVISTA', vehicleName: 'HUSTLER', brand: 'スズキ', maker: 'Suzuki', order: 24,
  aliases: ['ハスラー', 'はすらー', 'HUSTLER', 'MR31S', 'MR41S', 'MR52S', 'MR92S'],
  designRole: '軽ワゴンとSUVテイストを組み合わせたモデル。', designIdentity: ['Round lamps', 'Tall kei body', 'SUV accents'], designAvoid: ['Aftermarket grille', 'Tough Wild-only exterior', 'Jimny parts'],
  representativeGrade: '2026年5月改良 HYBRID X・2WD', representativeColor: 'Soft Beige Metallic', heroScrim: '9, 12, 12', referenceLengthMm: 3395,
  references: { checkedAt: '2026年10月30日', items: [
    { generations: '初代', label: 'スズキ 2013年ハスラー発表資料（2014年1月発売）', url: 'https://www.suzuki.co.jp/release/a/2013/1224/' },
    { generations: '2代目', label: 'スズキ 2019年ハスラー発表資料（2020年1月発売）', url: 'https://www.suzuki.co.jp/release/a/2019/1224/' },
    { generations: '2代目', label: 'スズキ 2024年ハスラー一部仕様変更資料', url: 'https://www.suzuki.co.jp/release/a/2024/0524/' },
    { generations: '2代目', label: 'スズキ 2026年ハスラー一部仕様変更資料', url: 'https://www.suzuki.co.jp/release/a/2026/0527/' },
    { generations: '現行諸元', label: 'スズキ ハスラー主要諸元', url: 'https://www.suzuki.co.jp/car/hustler/detail/pdf/detail.pdf' },
  ] },
  tagline: '丸いランプは共通。型式とグリルで2世代を分ける。', heroImage: '/images/cars/hustler/mr92s-2026-hybrid-x-ff-v1.webp', homeCardImage: '/images/cars/hustler/top-card-front-right-v2.png',
  generationGuide: { title: 'ハスラーは2014年初代、2020年2代目', intro: '初代MR31S／MR41Sと2代目MR52S／MR92Sを区別します。掲載画像は初代X・2WDと、2026年5月改良後の2代目HYBRID X・2WD代表です。タフワイルド等の専用外装を世代差に混ぜません。', layout: 'chronology', items: [
    { title: '2014年1月：初代を発売', description: '丸型ヘッドランプと細い横基調グリル、角を丸めた背の高いボディが目印です。MR31S／MR41Sの違いは写真だけで確定せず、車検証とパワートレインを確認します。', meta: '初代 · MR31S／MR41S' },
    { title: '2020年1月：2代目へフルモデルチェンジ', description: '丸型ランプを残しながら、より角張ったボディと3連のサイドウインドー意匠へ変更。MR52Sはターボ系、MR92Sは自然吸気系が中心ですが、グレードと駆動方式も併記して判断します。', meta: '2代目 · MR52S／MR92S' },
    { title: '2024年と2026年：同じ2代目内の改良', description: '2024年は安全・快適装備を更新しタフワイルドを追加。2026年はHYBRID X／Gのフロントを逆台形グリルとボディ色を前へ出したバンパーへ改めました。専用外装車とは分けて見ます。', meta: '世代交代ではない' },
    { title: '中古車は型式・仕様・製造時期で確定', description: '写真では純正外装かを先に確認し、車検証の型式、ターボ有無、2WD／4WD、製造時期を販売店へ照会します。外装交換車は顔だけで年式を断定しません。', meta: '外観 → 型式 → 動力 → 製造時期' },
  ] },
  guides: [
    { href: '/cars/spacia.html', label: 'SPACIAの歴代を見る', title: 'SPACIA 歴代・型式', description: '同じスズキ軽でも、室内高とスライドドアを優先する候補。', image: '/images/cars/spacia/top-card-front-right-v2.png' },
    { href: '/cars/jimny.html', label: 'JIMNY系を見る', title: 'JIMNY／SIERRA／NOMADE', description: '悪路性能とボディ区分を優先する場合の比較候補。', image: '/images/cars/jimny/top-card-front-right-v2.png' },
  ],
  seo: { title: 'ハスラー 歴代・型式 MR31S/MR41S/MR52S/MR92Sの違い | CarVista', description: 'スズキ ハスラーの初代と2代目、2024年・2026年改良を公式資料で整理。型式、外観、グレード差と中古車確認順を解説します。' },
  defaultIndex: 1, generations,
}
