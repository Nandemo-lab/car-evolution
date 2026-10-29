export default {
  root: '#generation-comparison-page',
  vehicle: 'JIMNY',
  intent: 'sierra-vs-nomade',
  eyebrow: 'SUZUKI · 2018 / 2025 · 1.5L 4WD',
  heading: 'ジムニーシエラとノマド<br />3ドア・5ドアの違い',
  intro: '2018年発売のジムニーシエラJCと、2025年発売のジムニーノマドFCを比較。どちらも1.5L・パートタイム4WDですが、ドア数、全長、ホイールベース、後席への入り方が違います。',
  answer: {
    title: '後席を日常的に使うならノマド、短い車体を優先するならシエラ。',
    text: 'ノマドは5ドア化し、シエラより全長が340mm、ホイールベースが330mm長い一方、全幅は同じ1,645mmです。軽自動車のジムニーJB64Wは幅1,475mm・0.66Lで、今回の2台とは別区分です。'
  },
  imageNote: '左は2018年発売時のジムニーシエラJC・JB74W、右は2025年発売時のジムニーノマドFC・JC74W。ともに1.5L・4WDの純正外装を基準にした比較用制作画像です。ボディ色は判別材料にしません。',
  cars: [
    {
      id: 'jimny-sierra', short: 'SIERRA JC', name: 'ジムニーシエラ JC', label: '2018 · 3BA-JB74W · 3ドア',
      image: '/images/cars/jimny/jb74w-2018-jc-v1.png', alt: '2018年ジムニーシエラJC JB74Wの比較用制作画像',
      text: '1.5L・4人乗りの小型車。後席へは前席を倒して乗り降りします。軽のジムニーよりワイドなフェンダーを備えます。'
    },
    {
      id: 'jimny-nomade', short: 'NOMADE FC', name: 'ジムニーノマド FC', label: '2025 · 3BA-JC74W · 5ドア',
      image: '/images/cars/jimny/jc74w-2025-nomade-fc-v1.png', alt: '2025年ジムニーノマドFC JC74Wの比較用制作画像',
      text: '1.5L・4人乗りの5ドア。延長したホイールベースとリヤドアにより、後席アクセスと4名乗車時の荷室を改善しています。'
    }
  ],
  identification: [
    { title: 'シエラ：短い3ドア', text: 'フロントドアの後ろに乗降用ドアがなく、後輪までの側面が短いのが目印。ワイドフェンダーで軽のジムニーと区別します。' },
    { title: 'ノマド：長い5ドア', text: '前後ドアと長い側面、延びたホイールベースが目印。専用のガンメタリック塗装グリルもありますが、用品交換車はドア数と型式を優先します。' }
  ],
  changesTitle: '3ドアと5ドアで変わること',
  changes: [
    { title: '小回りはシエラが有利', text: '最小回転半径はシエラ4.9m、ノマド5.7m。狭い住宅街や林道の切り返しは、全長だけでなく実際の進入路と駐車区画で確認します。' },
    { title: '後席アクセスはノマド', text: 'ノマドはリヤドアから直接乗降できます。チャイルドシートや後席の利用頻度が高い場合は、ドア開口と前席位置を実車で試す価値があります。' },
    { title: 'どちらも4人乗り', text: '5ドアになってもノマドは4人乗りです。ドア数の増加を定員増と混同せず、4名乗車時に必要な荷物が収まるかを確認します。' }
  ],
  dimensions: [
    ['全長', '3,550 mm', '3,890 mm'], ['全幅', '1,645 mm', '1,645 mm'], ['全高', '1,730 mm', '1,725 mm'], ['ホイールベース', '2,250 mm', '2,590 mm']
  ],
  dimensionNote: 'スズキ公式諸元の国内仕様。シエラJCとノマドFCはともに1.5L・パートタイム4WD・4人乗り。用品装着車は実寸を販売店で確認してください。',
  choices: [
    { title: 'シエラが向く条件', text: '短い車体、小回り、3ドアの簡潔さを優先する場合。後席利用が少ないか、前席を倒す乗降方法を許容できるかが判断点です。' },
    { title: 'ノマドが向く条件', text: '家族や同乗者が後席を頻繁に使い、5ドアと荷室の奥行きを重視する場合。長い車体と5.7mの最小回転半径を自宅周辺で確認します。' }
  ],
  used: [
    { title: '型式で3ドア・5ドアを確認', text: '車検証や車両情報で、シエラはJB74W、ノマドはJC74Wを確認します。JB64Wは軽自動車のジムニーです。似た英数字でも区分が違います。' },
    { title: 'グリルだけで断定しない', text: '社外グリルや外装用品が多い車種です。ドア数、ホイールベース、型式、車台番号による販売店照会を組み合わせます。' },
    { title: '納期と中古価格は都度確認', text: '発表時の受注状況や中古相場は変わります。記事掲載時の価格だけで判断せず、見積日、登録時期、保証継承、用品費をそろえて比較します。' }
  ],
  links: [
    { title: 'デリカミニの新旧比較', text: '軽スーパーハイト系の4WD選びも確認。', href: '/delica-mini-b3-vs-ba.html', image: '/images/cars/delica-mini/ba6a-2025-t-premium.webp' },
    { title: 'RAV4 50系・60系の違い', text: 'より大きなSUVの世代差を見る。', href: '/rav4-50-vs-60.html', image: '/images/cars/rav4/axan64-2025-hev-z.webp' }
  ],
  sources: [
    { label: 'スズキ 2018年ジムニー／シエラ発売', href: 'https://www.suzuki.co.jp/release/a/2018/0705/' },
    { label: 'スズキ ジムニーシエラ主要諸元', href: 'https://www.suzuki.co.jp/car/jimny_sierra/asset/pdf/detail/detail.pdf' },
    { label: 'スズキ 2025年ジムニーノマド発表', href: 'https://www.suzuki.co.jp/release/a/2025/0130/index.html' },
    { label: 'スズキ ノマド／シエラ主要諸元', href: 'https://www.suzuki.co.jp/suzuki_digital_library/pdf/1_auto/jimnysmall/214.pdf' }
  ],
  historyHref: '/#comparison-links-title', historyLabel: 'SUV・世代比較ガイド一覧へ', shareText: 'ジムニーシエラとノマドの違い', compactIdentification: true
}
