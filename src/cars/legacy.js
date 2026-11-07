const generations = [
  {numeral:'I',era:'初代',title:'BC / BF系',code:'BC5 / BF5 ほか',startYear:'1989',yearRange:'1989–1993',period:'1989年2月〜1993年',annotations:[{x:50,y:50,label:'直線的なセダン／ワゴンボディ',dir:'top',labelX:50}],facelift:{fromYear:'1989',toYear:'1993',note:'セダンはBC、ツーリングワゴンはBF。初代からボディ型式を分けて確認します。',points:['1989年：初代シリーズ発売','セダンBC／ワゴンBF','グレード差とボディ差を混同しない']}},
  {numeral:'II',era:'2代目',title:'BD / BG系',code:'BD5 / BG5 ほか',startYear:'1993',yearRange:'1993–1998',period:'1993年10月〜1998年',annotations:[{x:50,y:50,label:'丸みを増した低いワゴン形状',dir:'top',labelX:50}],facelift:{fromYear:'1993',toYear:'1998',note:'セダンBD、ツーリングワゴンBG。アウトバックの源流となるグランドワゴンも同時期です。',points:['1993年：2代目発売','1995年：北米でOutback生産開始','国内クロスオーバーは別ボディ仕様として確認']}},
  {numeral:'III',era:'3代目',title:'BE / BH系',code:'BE5 / BH5 ほか',startYear:'1998',yearRange:'1998–2003',period:'1998年6月〜2003年',annotations:[{x:50,y:50,label:'B4名称と二灯調のフロント',dir:'top',labelX:50}],facelift:{fromYear:'1998',toYear:'2003',note:'1998年12月からセダンに「B4」の名称を使用。ワゴンBH、B4はBEです。',points:['1998年：3代目シリーズ発売','1998年12月：B4登場','ランカスターは後のOutback系譜']}},
  {numeral:'IV',era:'4代目',title:'BL / BP系',code:'BL5 / BP5 ほか',startYear:'2003',yearRange:'2003–2009',period:'2003年5月〜2009年',image:'/images/cars/legacy/legacy-bp5-2006-20gt-studio-v1.webp',annotations:[{x:68,y:39,label:'鋭いヘッドランプと小型グリル',dir:'top',labelX:67},{x:58,y:25,label:'2.0GTのボンネットスクープ',dir:'top',labelX:55}],facelift:{fromYear:'2003',toYear:'2009',note:'掲載画像は2006年改良後のTouring Wagon 2.0GT（BP5）代表。B4はBL、OutbackはBP系でも車高・外装が異なります。',points:['2003年：4代目Touring Wagon／B4発売','2006年：フロント意匠を改良','同じBPでもTouring WagonとOutbackを外観で区別']}},
  {numeral:'V',era:'5代目',title:'BM / BR系',code:'BM9 / BR9 / BRG ほか',startYear:'2009',yearRange:'2009–2014',period:'2009年5月〜2014年',annotations:[{x:50,y:50,label:'大型化したボディとサッシュ付ドア',dir:'top',labelX:50}],facelift:{fromYear:'2009',toYear:'2014',note:'Touring Wagon、B4、Outbackを同時展開した国内最後の世代です。',points:['2009年：5代目発売','Touring WagonはBR、B4はBM','OutbackもBR系だが車高・外装が異なる']}},
  {numeral:'VI',era:'6代目',title:'BN / BS系',code:'BN9 / BS9',startYear:'2014',yearRange:'2014–2020',period:'2014年10月〜2020年（B4）',annotations:[{x:50,y:50,label:'国内はB4とOutbackを展開',dir:'top',labelX:50}],facelift:{fromYear:'2014',toYear:'2020',note:'国内ではB4（BN9）とOutback（BS9）を発売。Touring Wagonは設定されません。',points:['2014年：B4／Outbackを発売','2017年：大幅改良','北米7代目セダンを国内6代目と混同しない']}},
  {numeral:'—',era:'国内最終系譜',title:'Outback BT系',code:'BT5',startYear:'2021',yearRange:'2021–2025',period:'2021年〜2025年3月受注終了',generationLabel:'Outback国内最終系譜',annotations:[{x:50,y:50,label:'クロスオーバー専用ボディ',dir:'top',labelX:50}],facelift:{fromYear:'2021',toYear:'2025',note:'国内のLEGACY名称はOutbackのみで継続。B4やTouring Wagonの同世代ではありません。',points:['国内販売はOutbackのみ','B4／Touring Wagonは設定なし','2025年3月末までの受注で国内販売終了予定']}},
]

export default {
  eyebrow:'CARVISTA',vehicleName:'LEGACY',brand:'スバル',maker:'SUBARU',order:36,
  aliases:['レガシィ','れがしぃ','LEGACY','レガシー','B4','ツーリングワゴン','TOURING WAGON','アウトバック','OUTBACK','BC5','BF5','BD5','BG5','BE5','BH5','BL5','BP5','BM9','BR9','BRG','BN9','BS9','BT5'],
  designRole:'セダン、Touring Wagon、Outbackへ枝分かれしたSUBARUのグランドツーリング系譜。',
  designIdentity:['Grand Touring','Symmetrical AWD','Three body lineages'],designAvoid:['body-type mixing','US-only generation mixing','grade-generalization'],
  representativeGrade:'4代目 Touring Wagon 2.0GT（2006年改良後）',representativeColor:'Newport Blue Pearl',heroScrim:'8, 10, 13',
  references:{checkedAt:'2026年11月7日',items:[
    {generations:'初代〜4代目',label:'SUBARU LEGACY世界累計生産300万台・主な沿革',url:'https://www.subaru.co.jp/news/archives/05_01_03/05_03_15.html'},
    {generations:'初代',label:'初代LEGACY 歴史遺産車（1989年Touring Wagon）',url:'https://www.subaru.co.jp/news/2024_11_07_194518/'},
    {generations:'4代目',label:'4代目LEGACY Touring Wagon／B4発表（2003年）',url:'https://www.subaru.co.jp/news/archives/03_04_06/03_05_23.htm'},
    {generations:'4代目',label:'LEGACYシリーズ改良・Touring Wagon 2.0GT（2006年）',url:'https://www.subaru.co.jp/news/archives/06_04_06/06_05_24.html'},
    {generations:'5代目',label:'5代目LEGACYシリーズ発表（2009年）',url:'https://www.subaru.co.jp/news/archives/09_04_06/09_05_20.html'},
    {generations:'6代目',label:'LEGACY Outback／B4発表（2014年）',url:'https://www.subaru.co.jp/news/archives/14_10_12/14_10_24_110012.html'},
    {generations:'国内最終系譜',label:'LEGACY Outback国内受注終了予定（2025年3月末）',url:'https://www.subaru.co.jp/news/2024_10_24_122621/'},
  ]},
  tagline:'1989年からの6世代と、国内最終Outback系譜をボディタイプ別に確認。',
  heroImage:'/images/cars/legacy/legacy-bp5-2006-20gt-studio-v1.webp',homeCardImage:'/images/top-cards/legacy.webp',
  generationGuide:{title:'LEGACYの世代とボディタイプ',intro:'まず世代を選び、次にB4（セダン）・Touring Wagon・Outbackのどのボディかを型式で確認します。',layout:'chronology',items:generations.map(g=>({title:`${g.era} ${g.title}`,description:g.facelift.note,meta:`${g.code} · ${g.period}`}))},
  evolutionNotes:[
    {title:'B4',text:'3代目から使われたスポーツセダン名。Touring Wagonとはボディ形状と型式が異なります。',meta:'セダン'},
    {title:'Touring Wagon',text:'初代から5代目まで国内展開した低いステーションワゴン。2014年の6代目では設定されません。',meta:'ステーションワゴン'},
    {title:'Outback',text:'ワゴンを基礎に車高とSUV機能を高めたクロスオーバー。国内では最後までLEGACY名を継承しました。',meta:'クロスオーバー'},
  ],
  guides:[
    {href:'/cars/levorg.html',label:'LEVORGを見る',description:'国内Touring Wagonの後継的位置づけを確認。',image:'/images/top-cards/levorg.webp'},
    {href:'/cars/forester.html',label:'FORESTERを見る',description:'正統派SUBARU SUVの6世代。',image:'/images/top-cards/forester.webp'},
    {href:'/cars/crosstrek.html',label:'CROSSTREKを見る',description:'コンパクトなクロスオーバーの系譜。',image:'/images/top-cards/crosstrek.webp'},
  ],
  seo:{title:'レガシィ歴代・型式｜B4・ツーリングワゴン・アウトバックの違い | CarVista',description:'SUBARU LEGACYの初代BC/BFから6代目BN/BS、国内最終Outback BTまで、発売時期、型式、B4・Touring Wagon・Outbackの違いを公式資料で整理。'},
  defaultIndex:3,generations,
}
