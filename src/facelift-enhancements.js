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
      { id: 'headlamp', label: 'ヘッドライト周辺', focus: [{ x: 38, y: 52, scale: 2.45 }, { x: 42, y: 51, scale: 2.35 }], notes: ['前期の灯火とグリル端のつながり。', '後期の灯火周辺とグリル端。'] },
      { id: 'grille', label: 'フロントグリル', focus: [{ x: 34, y: 57, scale: 2.55 }, { x: 38, y: 56, scale: 2.45 }], notes: ['前期の横桟とエンブレム周辺。', '後期の横桟と開口形状。'] },
      { id: 'bumper', label: 'フロントバンパー', focus: [{ x: 34, y: 68, scale: 2.35 }, { x: 37, y: 68, scale: 2.3 }], notes: ['前期の下部開口とナンバー周辺。', '後期の下部開口とバンパー面。'] },
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
      { id: 'headlamp', label: 'ヘッドライト', focus: [{ x: 34, y: 47, scale: 2.35 }, { x: 35, y: 46, scale: 2.35 }], notes: ['前期の丸いプロジェクターを含む二段灯。', '後期の薄型Bi-Beam LEDと面発光部。'] },
      { id: 'grille', label: 'フロントグリル', focus: [{ x: 29, y: 55, scale: 2.25 }, { x: 30, y: 54, scale: 2.25 }], notes: ['前期の横基調グリル。', '後期の中央開口と上側グリル。'] },
      { id: 'bumper', label: 'ZSバンパー', focus: [{ x: 28, y: 67, scale: 2.15 }, { x: 29, y: 66, scale: 2.15 }], notes: ['前期の横桟主体のフォグ周辺。', '後期の［ハ］字フレームと低いフォグ位置。'] },
    ],
  },
}

export function withFaceliftEnhancement(data) {
  return data.vehicle === 'N-BOX' && data.intent === 'jf1-pre-post' ? { ...data, ...nbox } : data
}
