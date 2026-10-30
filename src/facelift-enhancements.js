const nbox = {
  compactFinalUi: true,
  imageViewToggle: true,
  comparisonTitle: '前期・後期を画像で比較',
  changesTitle: '2015年改良で変わったこと',
  visualHighlights: [
    { title: '1｜グリル', text: '前期は細い横桟、後期は太い水平部とHondaマーク周辺を見る。' },
    { title: '2｜バンパー', text: '上下の開口とナンバー周辺を一組で比較する。' },
    { title: '3｜派生車を除外', text: 'Custom、Plus、SLASHの専用顔を標準車の前後差に混ぜない。' },
  ],
  changeMatrix: [
    { label: '外観', status: 'changed', text: 'ベースモデルを親しみやすく上質なデザインへ変更。' },
    { label: 'ヘッドライト', status: 'unverified', text: '公式発表は外観刷新を示しますが、灯体仕様単独の変更内容は明記していません。' },
    { label: 'グリル', status: 'changed', text: '公式掲載のG・Lパッケージ画像で前後意匠差を確認。' },
    { label: 'バンパー', status: 'changed', text: '公式掲載画像で下部開口を含む前面意匠差を確認。' },
    { label: '安全装備', status: 'unverified', text: '今回の公式改良資料だけでは前後差を断定しません。' },
    { label: '内装', status: 'conditional', text: '合皮コンビシートはCustom／Plus Customのターボ車。標準車全体の変更ではありません。' },
    { label: 'パワートレイン', status: 'changed', text: '対象FF車のJC08燃費25.6km/Lへの向上を確認。機構差は断定しません。' },
    { label: 'グレード例外', status: 'conditional', text: '後席スライド、IR／UVカットガラス等はタイプ別・メーカーオプションです。' },
  ],
  detailCompare: {
    images: [
      { label: '前期', src: '/images/cars/n-box/gen1-2011.png', alt: 'N-BOX JF1前期', width: 1408, height: 668 },
      { label: '後期', src: '/images/cars/n-box/jf1-2015-post-facelift-v1.png', alt: 'N-BOX JF1後期', width: 1820, height: 864 },
    ],
    parts: [
      { id: 'grille', label: 'フロントグリル', focus: [{ x: 35.3, y: 58.2, size: 48 }, { x: 35.7, y: 55.1, size: 48 }], notes: ['前期', '後期'], point: '前期は細い横桟が重なる構成、後期は太い上下2本の水平部とHondaマーク周辺を一組で確認します。' },
    ],
  },
}

export const voxy80Enhancement = {
  changeMatrix: [
    { label: '外観', status: 'changed', text: '薄型LEDランプ、グリル、リヤ意匠を変更。ZSは［ハ］字テーマを採用。' },
    { label: 'ヘッドライト', status: 'changed', text: 'Bi-Beam LEDと面発光LEDクリアランスランプを採用。' },
    { label: 'グリル', status: 'changed', text: '公式発表でフロントグリルの意匠変更を確認。' },
    { label: 'バンパー', status: 'conditional', text: '掲載するZSは専用［ハ］字テーマ。標準X／Vの外装とは分けます。' },
    { label: '安全装備', status: 'unverified', text: '2017年改良資料は安全装備の世代差を明記していないため断定しません。' },
    { label: '内装', status: 'changed', text: '黒基調、メーター意匠、収納・テーブル・USB電源を改良。内装色は仕様によります。' },
    { label: 'パワートレイン', status: 'unverified', text: '今回の公式改良資料だけでは機構変更を断定しません。' },
    { label: 'グレード例外', status: 'conditional', text: 'ZS、ZS“煌”、GR SPORT、標準X／Vで外装・装備が異なります。' },
  ],
  detailCompare: {
    images: [
      { label: '前期ZS', src: '/images/cars/voxy/80-zs-pre-facelift-v1.png', alt: 'VOXY 80系ZS前期', width: 1741, height: 903 },
      { label: '後期ZS', src: '/images/cars/voxy/80-zs-post-facelift-v1.png', alt: 'VOXY 80系ZS後期', width: 1741, height: 903 },
    ],
    parts: [
      { id: 'headlamp', label: 'ヘッドライト', focus: [{ x: 37.4, y: 47.2, size: 34 }, { x: 38.1, y: 46.7, size: 34 }], notes: ['前期ZS', '後期ZS'], point: '前期の丸いプロジェクターを含む二段灯に対し、後期は薄型Bi-Beam LEDと面発光LEDクリアランスランプを採用しています。' },
      { id: 'grille', label: 'フロントグリル', focus: [{ x: 31.5, y: 54.7, size: 46 }, { x: 32.2, y: 54.1, size: 46 }], notes: ['前期ZS', '後期ZS'], point: '後期はフロントグリル意匠を変更。ランプだけでなく中央開口と上側グリルのつながりを見ます。' },
      { id: 'bumper', label: 'ZSバンパー', focus: [{ x: 31.3, y: 66.2, size: 48 }, { x: 31.8, y: 65.8, size: 48 }], notes: ['前期ZS', '後期ZS'], point: '後期ZSは外側フレームが［ハ］字を描き、フォグを低い位置へ置く専用意匠です。標準X／Vとは分けて確認します。' },
    ],
  },
}

export function withFaceliftEnhancement(data) {
  if (data.vehicle === 'N-BOX' && data.intent === 'jf1-pre-post') return {
    ...data,
    ...nbox,
    cars: data.cars.map(car => ({ ...car, markers: [{ label: '1', x: car.id === 'jf1pre' ? 35 : 36, y: car.id === 'jf1pre' ? 57 : 54 }] })),
    visualFirst: true,
  }
  const shortNames = data.cars.map(car => car.short).join(' ')
  return {
    ...data,
    comparisonTitle: data.comparisonTitle || '2台を画像で比較',
    changesTitle: data.changesTitle || (/前期|後期|改良/.test(shortNames) ? '改良で変わったこと' : '世代交代で変わったこと'),
    visualFirst: data.visualFirst !== false,
  }
}
