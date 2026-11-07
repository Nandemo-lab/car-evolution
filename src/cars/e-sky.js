const generations = [{
  numeral:'NEW', era:'初代・発売予定', title:'e SKY', code:'国内車両型式は発売前のため未公表',
  startYear:'2026', yearRange:'2026年11月16日発売予定', period:'2026年11月16日 国内発売予定',
  image:'/images/cars/e-sky/e-sky-2026-studio-v1.webp', excludeFromYearFinder:true,
  annotations:[{x:70,y:43,label:'数字を思わせるLEDランプ',dir:'top',labelX:69},{x:67,y:62,label:'黒いロアバンパー',dir:'bottom',labelX:68}],
  facelift:{fromYear:'2026',toYear:'発売予定',note:'掲載画像はX・イマージョンブルーパールメタリック／ブラック2トーンルーフ代表。A・Gは装備やホイール条件が異なります。',points:['11月16日発売予定','A／G／Xの3機種','前輪駆動・26kWhバッテリー']},
}]

export default {
  eyebrow:'NEW MODEL',vehicleName:'e SKY',brand:'スズキ',maker:'SUZUKI',order:37,
  aliases:['e SKY','ESKY','eスカイ','イースカイ','いーすかい','軽EV'],
  designRole:'スズキ初の軽乗用EV。発売前のため、確定済みの公式発表だけを掲載。',
  designIdentity:['Digital lamp','HEARTECT-e','Kei EV'],designAvoid:['concept Vision e-Sky','accessory kit','grade mixing'],
  representativeGrade:'X・2WD',representativeColor:'イマージョンブルーパールメタリック ブラック2トーンルーフ',heroScrim:'8, 10, 13',
  references:{checkedAt:'2026年11月7日',items:[
    {generations:'初代',label:'スズキ 新型e SKY公式発表（発売日・価格・仕様）',url:'https://www.suzuki.co.jp/release/a/2026/1006/index.html'},
    {generations:'初代',label:'e SKY公式Webカタログ',url:'https://www.suzuki.co.jp/car/esky/'},
  ]},
  tagline:'2026年11月16日発売予定。3機種と外観・EV仕様を公式情報で確認。',
  heroImage:'/images/cars/e-sky/e-sky-2026-studio-v1.webp',homeCardImage:'/images/top-cards/e-sky.webp',
  generationGuide:{title:'発売前に確認できるe SKY',intro:'初度登録実績のない発売前モデルです。価格・航続距離・装備は公式発表済みの範囲だけを整理します。',layout:'chronology',items:[{title:'初代 e SKY',description:'スズライトのヘリテージ要素とデジタル調LEDランプを採用した軽乗用EV。',meta:'A／G／X · 2026年11月16日発売予定'}]},
  evolutionNotes:[
    {title:'外観',text:'角丸の灯火内にデジタル数字を思わせるグラフィック。細い黒色フロントパネルと黒いロア部で見分けます。',meta:'X代表'},
    {title:'EV仕様',text:'26kWhのリン酸鉄リチウムイオン電池とeAxleを採用。WLTC一充電走行距離は310kmです。',meta:'公式審査値'},
    {title:'発売前の注意',text:'中古車相場や初度登録実績はまだありません。Aは受注生産、装備はG・Xと異なります。',meta:'2026年11月7日時点'},
    {title:'充電・安全装備',text:'Xは10.1インチディスプレイオーディオを標準装備し、Gはメーカーオプション。デュアルセンサーブレーキサポートIIなどを採用します。充電時間と装備は購入時に機種別の公式諸元表で確認します。',meta:'機種別確認'},
  ],
  guides:[
    {href:'/cars/spacia.html',label:'SPACIAを見る',description:'同じスズキ軽乗用車の世代を確認。',image:'/images/top-cards/spacia.webp'},
    {href:'/cars/hustler.html',label:'HUSTLERを見る',description:'軽クロスオーバーとの外観差を確認。',image:'/images/top-cards/hustler.webp'},
    {href:'/cars/roox.html',label:'ROOXを見る',description:'日産の軽乗用車系譜を確認。',image:'/images/top-cards/roox.webp'},
  ],
  seo:{title:'e SKY 新型・発売日・グレード｜スズキ軽EVを画像で確認 | CarVista',description:'スズキ新型e SKYの2026年11月16日発売予定、A・G・X、26kWh電池、310km航続、外観の見分け方を公式資料で整理。'},
  defaultIndex:0,generations,
}
