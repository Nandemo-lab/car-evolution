export default {
  root: '#generation-comparison-page',
  vehicle: 'COROLLA CROSS',
  intent: '2023-vs-2025',
  eyebrow: 'TOYOTA · 2023 / 2025 · HYBRID Z 2WD',
  heading: 'カローラ クロス<br />2023年・2025年の違い',
  intro: '同じ初代10系のハイブリッドZ・2WDで条件を固定し、2025年5月改良の外観・装備差と中古車確認点を整理します。',
  answer: {
    title: '2025年型は、同色グリルと刷新したランプ・バンパーが目印。',
    text: '世代交代ではありません。2023年型と2025年型はともにZVG13の1.8Lハイブリッド・2WDですが、2025年はフロント意匠、Zの18インチホイール、快適・安全装備を更新しました。',
  },
  imageNote: '画像は2023年10月改良後と2025年5月改良後のハイブリッドZ・2WD代表。色調は比較用にそろえています。掲載画像はCarVista制作で、実車写真・Toyota公式画像ではありません。GR SPORTや特別仕様車を示す画像ではありません。',
  cars: [
    {
      id: 'corolla-cross-2023', short: '2023年仕様', name: 'HYBRID Z', label: '2023 · 6AA-ZVG13 · 2WD',
      image: '/images/cars/corolla-cross/zvg13-2023-hybrid-z-ff-v1.jpg',
      alt: '2023年改良カローラクロス ハイブリッドZ 2WDの比較用制作画像',
      text: 'パワートレーン刷新後、外観大幅改良前のZ。大きな黒い下部グリルと従来型ランプがフロントの手がかりです。',
      presentation: { scale: 1, x: 0, y: 2 },
    },
    {
      id: 'corolla-cross-2025', short: '2025年改良', name: 'HYBRID Z', label: '2025 · 6AA-ZVG13 · 2WD',
      image: '/images/cars/corolla-cross/zvg13-2025-hybrid-z-ff-v1.jpg',
      alt: '2025年改良カローラクロス ハイブリッドZ 2WDの比較用制作画像',
      text: '同色のパンチング状グリル、刷新したヘッドランプとバンパー、デザイン変更した18インチホイールを採用。',
      presentation: { scale: 1, x: 0, y: 2 },
    },
  ],
  identification: [
    { title: '2023：黒い大開口が主役', text: 'エンブレム下に大きな黒いグリルが広がり、銀色の外周加飾が目立ちます。2021年発売型と外観が近いため、写真だけで2023年の機構刷新後と断定できません。' },
    { title: '2025：同色グリルと細い灯火', text: 'ボディ同色の小孔パターンが横へ広がり、ランプとバンパー形状も変わります。ただしGR SPORTは専用フロントなので、同じ2025年登録でも別に扱います。' },
  ],
  changes: [
    { title: '外から見える変更', text: '2025年改良ではバンパー／ヘッドランプとボディ同色グリルを採用し、Zの18インチホイールも変更。外観で最も判別しやすいのはフロントですが、補修・交換歴がある車は書類確認を優先します。' },
    { title: '外観だけでは分からない変更', text: '2025年型Zはシートベンチレーションを標準設定し、アダプティブハイビームや床下透過表示付きパノラミックビューモニターをメーカーオプション設定。装着有無は写真や「Z」の表記だけで決まりません。' },
    { title: '2023年改良との関係', text: '2023年にハイブリッドの電動モジュール刷新、安全・コネクティッド機能の拡充を実施。2025年はその後の同一世代内改良です。「2025年が2代目」「2023年が前期」と単純化せず、改良時期を表記します。' },
  ],
  dimensions: [['全長','4,490 mm','4,455 mm'],['全幅','1,825 mm','1,825 mm'],['全高','1,620 mm','1,620 mm'],['ホイールベース','2,640 mm','2,640 mm']],
  dimensionNote: '2023年10月ハイブリッドZ・2WDと2025年5月ハイブリッドZ・2WDのToyota公表値。用品・特別仕様車・GR SPORTへ流用しません。2025年型はバンパー変更に伴い全長が35mm短くなっています。',
  choices: [
    { title: '2023年仕様が候補になる人', text: '従来の力強い黒グリルを好み、中古車価格と在庫の選択肢を重視する人。製造時期、Zの装備、2WD／E-Four、オプションを同じ条件で見積もります。' },
    { title: '2025年仕様が候補になる人', text: '新しいフロント意匠やZの快適装備を重視する人。GR SPORTや特別仕様車の価格・専用装備を標準Zの差として混ぜず、必要装備の有無を確認します。' },
  ],
  used: [
    { title: '初度登録月だけで決めない', text: '2025年登録でも改良前在庫の可能性があります。車検証の型式、製造時期、フロント写真、装備明細を販売店へ照会します。' },
    { title: 'ZVG13でも外観は一つではない', text: '両方ともZVG13を使うため、型式だけで改良前後は決まりません。車台番号から製造時期と仕様を確認し、年式別カタログと照合します。' },
    { title: 'GR SPORTを比較へ混ぜない', text: '2025年8月発売のGR SPORTは2.0Lハイブリッド・E-Four、専用外装・19インチホイールです。今回の1.8L Z・2WDとはパワートレーンも駆動方式も異なります。' },
  ],
  links: [
    { title: 'カローラ クロスの型式・改良履歴', text: '2021年発売からの改良境界を確認。', href: '/cars/corolla-cross.html', image: '/images/cars/corolla-cross/zvg13-2025-hybrid-z-ff-v1.jpg' },
    { title: 'RAV4 50系・60系の違い', text: 'ひと回り大きいToyota SUVも見る。', href: '/rav4-50-vs-60.html', image: '/images/cars/rav4/axan64-2025-hev-z.webp' },
  ],
  sources: [
    { label: 'Toyota 2023年カローラ クロス一部改良', href: 'https://global.toyota/jp/newsroom/toyota/39926142.html' },
    { label: 'Toyota 2025年カローラ クロス一部改良', href: 'https://global.toyota/jp/newsroom/toyota/42821873.html' },
    { label: 'Toyota カローラ クロス公式中古車カタログ', href: 'https://toyota.jp/ucar/catalog/brand-TOYOTA/car-COROLLA_CROSS/' },
    { label: 'Toyota認定中古車 2025年5月 ハイブリッドZ車両情報', href: 'https://toyota.jp/ucar/catalog/brand-TOYOTA/car-COROLLA_CROSS/202505/10158211/' },
  ],
  historyHref: '/cars/corolla-cross.html', historyLabel: 'カローラ クロスの型式・改良履歴へ',
  shareText: 'カローラ クロス2023年と2025年の違い', compactIdentification: true,
}
