const generations = [
  {
    numeral: 'I', era: '初代', title: '10系', code: 'NHW10 / NHW11',
    startYear: '1997', yearRange: '1997–2003', period: '1997年12月〜2003年8月',
    image: '/images/cars/prius/gen1-1997-nhw10.png',
    annotations: [
      { x: 36, y: 50, label: '独立したトランクを持つ<wbr>4ドアセダン', dir: 'top', labelX: 55 },
      { x: 34, y: 65, label: '小さなグリルと<wbr>丸いヘッドランプ', dir: 'bottom', labelX: 27 },
    ],
    facelift: { fromYear: '1997', toYear: '2000', note: '2000年5月に内外装とハイブリッドシステムを改良。', points: ['フロント・リヤの意匠を変更', '型式をNHW11へ変更', '海外販売を開始'] },
  },
  {
    numeral: 'II', era: '2代目', title: '20系', code: 'NHW20',
    startYear: '2003', yearRange: '2003–2011', period: '2003年9月〜2011年12月',
    image: '/images/cars/prius/gen2-2003-nhw20.png',
    annotations: [
      { x: 57, y: 30, label: 'ルーフ頂点を後方へ置く<wbr>トライアングルシルエット', dir: 'top', labelX: 61 },
      { x: 38, y: 62, label: 'セダンから進化した<wbr>5ドアリフトバック', dir: 'bottom', labelX: 32 },
    ],
    facelift: { fromYear: '2003', toYear: '2005', points: ['ヘッドランプとテールランプの意匠を変更', 'フロントグリルとバンパーを改良', '内装色・装備を見直し'] },
  },
  {
    numeral: 'III', era: '3代目', title: '30系', code: 'ZVW30',
    startYear: '2009', yearRange: '2009–2015', period: '2009年5月〜2015年12月',
    image: '/images/cars/prius/gen3-2009-zvw30.png',
    annotations: [
      { x: 55, y: 30, label: '先代を磨いた<wbr>低空気抵抗シルエット', dir: 'top', labelX: 60 },
      { x: 34, y: 59, label: '鋭いランプと<wbr>台形ロアグリル', dir: 'bottom', labelX: 28 },
    ],
    facelift: { fromYear: '2009', toYear: '2011', points: ['ヘッドランプとフロントバンパーを刷新', 'テールランプの意匠を変更', 'ボディ剛性と乗り心地を改良'] },
  },
  {
    numeral: 'IV', era: '4代目', title: '50系', code: 'ZVW50 / ZVW51 / ZVW55',
    startYear: '2015', yearRange: '2015–2023', period: '2015年12月〜2023年1月',
    image: '/images/cars/prius/gen4-2015-zvw51-pre-facelift.png',
    annotations: [
      { x: 53, y: 31, label: 'TNGAが生んだ<wbr>低重心プロポーション', dir: 'top', labelX: 60 },
      { x: 40, y: 55, label: '縦へ伸びる<wbr>稲妻形ヘッドランプ', dir: 'bottom', labelX: 31 },
    ],
    facelift: { fromYear: '2015', toYear: '2018', note: '掲載Assetは2015年発売時の前期型。後期型との詳細比較は別Asset案件です。', points: ['前後ランプの造形を親しみやすい意匠へ変更', 'フロントバンパーを刷新', 'Toyota Safety Senseを全車標準化'] },
  },
  {
    numeral: 'V', era: '現行モデル', title: '60系', code: 'MXWH60 / MXWH65 / ZVW60 / ZVW65',
    startYear: '2023', yearRange: '2023–現在', period: '2023年1月〜現在',
    image: '/images/cars/prius/gen5-2023-mxwh60.png',
    annotations: [
      { x: 55, y: 30, label: 'さらに低く長くなった<wbr>モノフォルム', dir: 'top', labelX: 61 },
      { x: 37, y: 54, label: '薄いコの字型の<wbr>ハンマーヘッドランプ', dir: 'bottom', labelX: 29 },
    ],
  },
]

export default {
  eyebrow: 'CARVISTA',
  vehicleName: 'PRIUS',
  brand: 'トヨタ',
  maker: 'Toyota',
  order: 5,
  designRole: 'The hybrid pioneer.',
  designIdentity: ['Innovative', 'Aerodynamic', 'Progressive'],
  designAvoid: ['SUV-like', 'Retro', 'Ornate'],
  representativeGrade: '各世代の通常販売HEV代表仕様',
  representativeColor: 'Toyota公式で確認したライトニュートラル系純正色',
  heroScrim: '10, 13, 15',
  referenceLengthMm: 4600,
  tagline: '先駆けは、かたちを変え続ける。',
  heroImage: '/images/cars/prius/gen5-2023-mxwh60.png',
  homeCardImage: '/images/cars/prius/home-card-v3.png',
  generationGuide: {
    title: '10・20・30・50・60系を見分ける代表ポイント',
    intro: 'プリウスの歴代モデルは、初代10系だけが独立トランクの4ドアセダンです。2代目以降はトライアングルシルエットの5ドアへ移行し、30系、低重心の50系、さらに低くワイドな60系へ進化しました。まず外観で世代を絞り、販売期間と車検証の型式で確定します。',
    items: [
      { title: '10系', description: '独立したトランクと丸いキャビンを持つ、唯一の4ドアセダン。', meta: '1997年〜2003年 · NHW10 / NHW11' },
      { title: '20系', description: 'トライアングルシルエットを初採用した5ドア。2009年以降はEXとして継続しました。', meta: '2003年〜2011年 · NHW20' },
      { title: '30系', description: '先代の輪郭を鋭く整え、台形の大きな下部開口を採用。', meta: '2009年〜2015年 · ZVW30' },
      { title: '50系', description: 'TNGAによる低重心ボディ。前期は縦へ伸びる稲妻形ランプで判別。', meta: '2015年〜2023年 · ZVW50 / ZVW51 / ZVW55' },
      { title: '60系', description: '低く長いモノフォルムと、薄いハンマーヘッドランプを採用。', meta: '2023年〜現在 · MXWH60 / MXWH65 / ZVW60 / ZVW65' },
    ],
  },
  guides: [
    {
      eyebrow: '50 VS 60 · GENERATION GUIDE', title: '50系と60系の違い', description: '4代目と5代目を外観・サイズ・ハイブリッドで比較。',
      href: '/prius-50-vs-60.html', cta: '世代の違いを見る', image: '/images/cars/prius/gen5-2023-mxwh60.png',
    },
    {
      eyebrow: '50 SERIES · FACELIFT GUIDE',
      title: '50系 前期・後期の違い',
      description: '2018年12月を境に変わったヘッドランプ、グリル、バンパーを統一画像で比較。中古車写真から見分ける要点を確認できます。',
      href: '/prius-50-zenki-kouki.html',
      cta: '前期・後期を見分ける',
      image: '/images/cars/prius/gen4-2018-zvw51-post-facelift.png',
    },
  ],
  seo: {
    title: 'PRIUS 歴代モデル・10系/20系/30系/50系/60系の違い — CarVista',
    description: 'トヨタ プリウス歴代5世代を統一画像で比較。初代から30系・50系・60系まで、販売期間、代表型式、見分け方とデザイン進化が一目でわかる。',
  },
  defaultIndex: 4,
  generations,
}
