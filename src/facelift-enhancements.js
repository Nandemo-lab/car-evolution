const nbox = {
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
      { label: '前期', src: '/images/cars/n-box/gen1-2011.png', alt: 'N-BOX JF1前期' },
      { label: '後期', src: '/images/cars/n-box/jf1-2015-post-facelift-v1.png', alt: 'N-BOX JF1後期' },
    ],
    parts: [
      { id: 'headlamp', label: 'ヘッドライト周辺', focus: [{ x: 38, y: 51, scale: 2.42 }, { x: 41, y: 51, scale: 2.35 }], notes: ['前期', '後期'], point: '公式発表は標準車の外観刷新を示しますが、灯体単独の仕様変更は明記していません。灯火とグリル端のつながりを補助的に比較します。' },
      { id: 'grille', label: 'フロントグリル', focus: [{ x: 35, y: 56, scale: 2.5 }, { x: 38, y: 55, scale: 2.42 }], notes: ['前期', '後期'], point: '公式掲載のG・Lパッケージ画像で、横桟とエンブレム周辺、下側開口の組み合わせが変わったことを確認できます。' },
      { id: 'bumper', label: 'フロントバンパー', focus: [{ x: 35, y: 67, scale: 2.32 }, { x: 38, y: 67, scale: 2.28 }], notes: ['前期', '後期'], point: '下部開口とナンバー周辺を一組で確認します。グレード、オプション、交換部品がある車両は外観だけで断定しません。' },
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
      { label: '前期ZS', src: '/images/cars/voxy/80-zs-pre-facelift-v1.png', alt: 'VOXY 80系ZS前期' },
      { label: '後期ZS', src: '/images/cars/voxy/80-zs-post-facelift-v1.png', alt: 'VOXY 80系ZS後期' },
    ],
    parts: [
      { id: 'headlamp', label: 'ヘッドライト', focus: [{ x: 34, y: 46, scale: 2.32 }, { x: 35, y: 46, scale: 2.32 }], notes: ['前期ZS', '後期ZS'], point: '前期の丸いプロジェクターを含む二段灯に対し、後期は薄型Bi-Beam LEDと面発光LEDクリアランスランプを採用しています。' },
      { id: 'grille', label: 'フロントグリル', focus: [{ x: 29, y: 54, scale: 2.2 }, { x: 30, y: 54, scale: 2.2 }], notes: ['前期ZS', '後期ZS'], point: '後期はフロントグリル意匠を変更。ランプだけでなく中央開口と上側グリルのつながりを見ます。' },
      { id: 'bumper', label: 'ZSバンパー', focus: [{ x: 28, y: 65, scale: 2.1 }, { x: 29, y: 65, scale: 2.1 }], notes: ['前期ZS', '後期ZS'], point: '後期ZSは外側フレームが［ハ］字を描き、フォグを低い位置へ置く専用意匠です。標準X／Vとは分けて確認します。' },
    ],
  },
}

export function withFaceliftEnhancement(data) {
  return data.vehicle === 'N-BOX' && data.intent === 'jf1-pre-post' ? { ...data, ...nbox } : data
}
