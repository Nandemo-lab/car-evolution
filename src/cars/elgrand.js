const generations = [
  {numeral:'I',era:'初代',title:'E50系',code:'E50 / NE50 / ALE50 / ALWE50 ほか',startYear:'1997',yearRange:'1997–2002',period:'1997年5月〜2002年5月',annotations:[{x:50,y:50,label:'上下に厚い初代ボディ',dir:'top',labelX:50}],facelift:{fromYear:'1997',toYear:'2002',note:'1997年に登場した初代フルサイズミニバン。型式と駆動方式を車検証で確認します。',points:['1997年5月：E50型登場','後輪駆動系レイアウト','旧世代は公式画像未掲載']}},
  {numeral:'II',era:'2代目',title:'E51系',code:'E51 / NE51 / ME51 / MNE51',startYear:'2002',yearRange:'2002–2010',period:'2002年5月〜2010年8月',annotations:[{x:50,y:50,label:'低く横長のフロント意匠',dir:'top',labelX:50}],facelift:{fromYear:'2002',toYear:'2010',note:'2002年発売の2代目。2007年にはアラウンドビューモニターを世界で初めて採用しました。',points:['2002年5月：E51型発売','2007年：外観・装備を改良','2WD／4WDで型式が異なる']}},
  {numeral:'III',era:'3代目',title:'E52系',code:'TE52 / TNE52 / PE52 / PNE52',startYear:'2010',yearRange:'2010–2026',period:'2010年8月〜2026年',annotations:[{x:50,y:50,label:'低床・前輪駆動系のワイドボディ',dir:'top',labelX:50}],facelift:{fromYear:'2010',toYear:'2026',note:'低床化した3代目。長い販売期間中の外観改良やAUTECH等はグレード条件を分けて確認します。',points:['2010年8月：E52型発売','前輪駆動系レイアウトへ変更','2014年・2020年の外観改良を確認']}},
  {numeral:'IV',era:'4代目・現行',title:'E53系',code:'E53',startYear:'2026',yearRange:'2026–現在',period:'2026年7月〜現在',image:'/images/cars/elgrand/elgrand-2026-studio-v1.webp',annotations:[{x:67,y:39,label:'横一文字ランプと組子グリル',dir:'top',labelX:68},{x:71,y:62,label:'左右に広がるバンパー開口',dir:'bottom',labelX:72}],facelift:{fromYear:'2026',toYear:'現行',note:'掲載画像はG e-4ORCE・プリズムホワイト代表。Xは装備・ホイール条件が異なります。',points:['2026年7月：E53型発売','第3世代e-POWER＋e-4ORCE','IDS（電子制御サスペンション）']}},
]

export default {
  eyebrow:'NEW MODEL',vehicleName:'ELGRAND',brand:'日産',maker:'NISSAN',order:39,
  aliases:['ELGRAND','エルグランド','えるぐらんど','E50','E51','E52','E53','G e-4ORCE','X e-4ORCE'],
  designRole:'1997年から続く日産プレミアムミニバン。E53で電動AWDへ刷新。',
  designIdentity:['Kumiko grille','e-4ORCE','Premium minivan'],designAvoid:['Serena mixing','E52 mixing','grade-generalization'],
  representativeGrade:'G e-4ORCE',representativeColor:'プリズムホワイト',heroScrim:'8, 10, 13',
  references:{checkedAt:'2026年11月7日',items:[
    {generations:'4代目',label:'日産 新型ELGRAND公式サイト（デザイン・技術）',url:'https://www2.nissan.co.jp/SP/ELGRAND/'},
    {generations:'4代目',label:'日産FAQ E53型（2026年7月〜）',url:'https://faq2.nissan.co.jp/faq/show/82671'},
    {generations:'初代',label:'日産ヘリテージ 1997年E50型',url:'https://www.nissan-global.com/JP/COMPANY/PROFILE/HERITAGE/1990/'},
    {generations:'2代目',label:'日産2000年代ヘリテージ',url:'https://www.nissan-global.com/JP/COMPANY/PROFILE/HERITAGE/2000/'},
    {generations:'3代目',label:'日産2010年代ヘリテージ E52型',url:'https://www.nissan-global.com/JP/COMPANY/PROFILE/HERITAGE/2010/'},
  ]},
  tagline:'E50から新型E53まで4世代。型式とフロント意匠で見分ける。',
  heroImage:'/images/cars/elgrand/elgrand-2026-studio-v1.webp',homeCardImage:'/images/top-cards/elgrand.webp',
  generationGuide:{title:'ELGRANDの4世代',intro:'世代を選び、型式と発売時期、フロント意匠を照合します。旧世代は画像を推測で補いません。',layout:'chronology',items:generations.map(g=>({title:`${g.era} ${g.title}`,description:g.facelift.note,meta:`${g.code} · ${g.period}`}))},
  evolutionNotes:[
    {title:'E50・E51',text:'初代E50は1997年、2代目E51は2002年登場。型式と前後の改良年を車検証・記録簿で確認します。',meta:'後輪駆動系'},
    {title:'E52',text:'2010年に低床・前輪駆動系へ転換。販売期間が長く、外観改良と特別仕様の確認が重要です。',meta:'3代目'},
    {title:'E53',text:'横一文字ランプと組子着想グリルが目印。第3世代e-POWER、e-4ORCE、IDSを組み合わせます。',meta:'4代目'},
  ],
  guides:[
    {href:'/cars/alphard.html',label:'ALPHARDを見る',description:'トヨタのプレミアムミニバン4世代。',image:'/images/top-cards/alphard.webp'},
    {href:'/cars/vellfire.html',label:'VELLFIREを見る',description:'個性を強めた兄弟ミニバン。',image:'/images/top-cards/vellfire.webp'},
    {href:'/cars/serena.html',label:'SERENAを見る',description:'日産Mクラスミニバンの6世代。',image:'/images/top-cards/serena.webp'},
  ],
  seo:{title:'エルグランド歴代・型式｜E50・E51・E52・新型E53の違い | CarVista',description:'日産ELGRANDの初代E50から2026年新型E53まで、発売時期、型式、外観、e-POWER・e-4ORCEを公式資料で整理。'},
  defaultIndex:3,generations,
}
