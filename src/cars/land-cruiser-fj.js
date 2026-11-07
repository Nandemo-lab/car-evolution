const generations = [{
  numeral:'I',era:'初代・現行',title:'LAND CRUISER FJ',code:'3BA-TRJ240W-GGTPK',startYear:'2026',yearRange:'2026–現在',period:'2026年5月14日〜現在',
  image:'/images/cars/land-cruiser-fj/land-cruiser-fj-2026-studio-v1.webp',
  annotations:[{x:70,y:42,label:'角形LEDランプとTOYOTAグリル',dir:'top',labelX:69},{x:72,y:65,label:'標準の角形バンパー',dir:'bottom',labelX:72}],
  facelift:{fromYear:'2026',toYear:'現行',note:'掲載画像はVX・スモーキーブルーの標準外装代表。2027年発売予定の丸目ランプ／アドベンチャーバンパーは含みません。',points:['2026年5月14日発売','VX・5人乗り・パートタイム4WD','2.7Lガソリン＋6速AT']},
}]

export default {
  eyebrow:'NEW MODEL',vehicleName:'LAND CRUISER FJ',cardName:'LAND CRUISER FJ',brand:'トヨタ',maker:'TOYOTA',order:38,
  aliases:['LAND CRUISER FJ','ランドクルーザーFJ','ランクルFJ','ランクル エフジェイ','LC FJ','FJ','3BA-TRJ240W-GGTPK','TRJ240W'],
  designRole:'ランドクルーザーに追加された扱いやすい5人乗りFJシリーズ。',
  designIdentity:['Freedom & Joy','Part-time 4WD','Compact Land Cruiser'],designAvoid:['round-headlamp option','250/300 mixing','ARB accessories'],
  representativeGrade:'VX',representativeColor:'スモーキーブルー',heroScrim:'8, 10, 13',
  references:{checkedAt:'2026年11月7日',items:[
    {generations:'初代',label:'トヨタ LAND CRUISER FJ発売ニュース（販売・主要仕様）',url:'https://global.toyota/jp/newsroom/toyota/44331089.html'},
    {generations:'初代',label:'LAND CRUISER FJ公式ページ',url:'https://toyota.jp/landcruiserfj/'},
    {generations:'初代',label:'2027年予定の丸目ランプ・バンパーは別オプション',url:'https://global.toyota/jp/newsroom/toyota/44936636.html'},
  ]},
  tagline:'2026年5月発売。VX標準外装と2027年予定オプションを混同せず確認。',
  heroImage:'/images/cars/land-cruiser-fj/land-cruiser-fj-2026-studio-v1.webp',homeCardImage:'/images/top-cards/land-cruiser-fj.webp',
  generationGuide:{title:'LAND CRUISER FJを確認',intro:'現行は初代のVXのみ。発売時の標準外装と、後から発表された外装オプションを分けて確認します。',layout:'chronology',items:[{title:'初代 LAND CRUISER FJ',description:'全長4,575mm、5人乗りの新しいランドクルーザーシリーズ。',meta:'VX · 2026年5月14日発売'}]},
  evolutionNotes:[
    {title:'標準フロント',text:'角形LEDランプ、TOYOTA文字の黒色グリル、縦スリット状ロア開口が発売時VXの基準です。',meta:'VX標準'},
    {title:'車体と駆動',text:'全長4,575mm・全幅1,855mm、ホイールベース2,580mm。2.7Lガソリンとパートタイム4WDを採用します。',meta:'5人乗り'},
    {title:'オプション注意',text:'丸目ヘッドランプとアドベンチャーバンパーは2027年1月上旬以降の発売予定。標準VXと混同しません。',meta:'別外装'},
  ],
  guides:[
    {href:'/land-cruiser-300-vs-250.html',label:'300・250比較を見る',description:'既存ランドクルーザー2車の位置づけを確認。',image:'/images/cars/land-cruiser/250-2024-gdj250w-vx.png'},
    {href:'/cars/pajero.html',label:'PAJEROを見る',description:'本格4WDの歴代系譜を確認。',image:'/images/top-cards/pajero.webp'},
    {href:'/cars/forester.html',label:'FORESTERを見る',description:'SUBARU SUVの世代を確認。',image:'/images/top-cards/forester.webp'},
  ],
  seo:{title:'ランドクルーザーFJ 新型・発売日・サイズ｜VX外観ガイド | CarVista',description:'2026年5月発売のLAND CRUISER FJ VXを公式資料で解説。標準角形ランプ、サイズ、2.7L・4WD、2027年予定の丸目オプションとの違いを整理。'},
  defaultIndex:0,generations,
}
