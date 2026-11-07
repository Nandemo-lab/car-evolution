const generations = [
  { numeral:'I', era:'初代', title:'L系', code:'L04系（L044G / L049GWほか）', startYear:'1982', yearRange:'1982–1991', period:'1982年5月〜1991年', annotations:[{x:50,y:50,label:'角形ボディと短い前後オーバーハング',dir:'top',labelX:50}], facelift:{fromYear:'1982',toYear:'1991',note:'3ドアから始まり、5ドアを追加。型式・ボディで確認します。',points:['1982年：初代発売','1983年：5ドアを追加','中古車は型式とボディ長を照合']} },
  { numeral:'II', era:'2代目', title:'V20 / V40系', code:'V14 / V24 / V44 / V46系ほか', startYear:'1991', yearRange:'1991–1999', period:'1991年1月〜1999年', annotations:[{x:50,y:50,label:'丸みを帯びた大型ボディ',dir:'top',labelX:50}], facelift:{fromYear:'1991',toYear:'1999',note:'ワイド系を含め仕様が多いため、外観だけでグレードを断定しません。',points:['SUPER SELECT 4WDを採用','3ドア／5ドアを設定','型式とエンジンの組み合わせを確認']} },
  { numeral:'III', era:'3代目', title:'V60 / V70系', code:'V63 / V65 / V73 / V75 / V78系ほか', startYear:'1999', yearRange:'1999–2006', period:'1999年9月〜2006年', annotations:[{x:50,y:50,label:'張り出したフェンダーと一体感あるボディ',dir:'top',labelX:50}], facelift:{fromYear:'1999',toYear:'2006',note:'モノコックを組み合わせた車体構造へ移行した世代です。',points:['1999年：3代目発売','2002年：外観を含む改良','年式と車両型式を併記して確認']} },
  { numeral:'IV', era:'4代目', title:'V80 / V90系', code:'V83 / V87 / V88 / V93 / V97 / V98系ほか', startYear:'2006', yearRange:'2006–2019', period:'2006年10月〜2019年8月（国内）', annotations:[{x:50,y:50,label:'縦基調グリルと直線的なフロント',dir:'top',labelX:50}], facelift:{fromYear:'2006',toYear:'2019',note:'国内向けは2019年に販売を終了。海外向け生産終了時期とは分けます。',points:['2006年：4代目発売','2014年：外観を含む改良','2019年：国内向け販売終了']} },
  { numeral:'NEW', era:'新型・発売予定', generationLabel:'新型（発売予定）', title:'2026年モデル', code:'国内車両型式は発売前のため未公表', startYear:'2026', yearRange:'2026年12月発売予定', period:'2026年12月17日 国内発売予定', image:'/images/cars/pajero/pajero-current-studio-v1.webp', excludeFromYearFinder:true, annotations:[{x:54,y:42,label:'SUPER EXCEED専用ハニカムグリル',dir:'top',labelX:55},{x:72,y:57,label:'縦型ランプのフロント意匠',dir:'bottom',labelX:75}], facelift:{fromYear:'2026',toYear:'発売予定',note:'掲載画像はSUPER EXCEED代表。EXCEED・GSR・GLSの横桟グリルと混同しません。',points:['2026年12月17日：国内発売予定','2.4Lクリーンディーゼルターボ＋8AT','7人乗り・Super Select 4WD-II／S-AWC']} },
]

export default {
  eyebrow:'CARVISTA', vehicleName:'PAJERO', brand:'三菱', maker:'Mitsubishi', order:32,
  aliases:['パジェロ','ぱじぇろ','PAJERO','L044G','V24W','V46W','V73W','V93W','V98W'],
  designRole:'本格4WDとして続いた歴史と、2026年の国内復活予定を分けて確認。', designIdentity:['Rugged','Authentic 4WD','Seven seats'], designAvoid:['Pajero Mini','Pajero iO','Pajero Sport'],
  representativeGrade:'2026年 SUPER EXCEED（発売予定）', representativeColor:'Moonstone Brown Metallic', heroScrim:'11, 9, 7',
  references:{checkedAt:'2026年11月7日',items:[
    {generations:'新型',label:'三菱自動車 新型PAJERO発表資料（2026年10月29日）',url:'https://www.mitsubishi-motors.com/jp/newsroom/newsrelease/2026/20261029_1.html'},
    {generations:'歴代',label:'三菱自動車 PAJERO 40周年公式資料',url:'https://www.mitsubishi-motors.com/jp/newsroom/newsrelease/2023/20231107_1.html'},
    {generations:'歴代',label:'MITSUBISHI MOTORS Heritage car history',url:'https://www.mitsubishi-motors.com/en/company/history/car/'},
  ]},
  tagline:'1982年からの4世代と、2026年12月発売予定の新型を分けて確認。', heroImage:'/images/cars/pajero/pajero-current-studio-v1.webp', homeCardImage:'/images/top-cards/pajero.webp',
  generationGuide:{title:'PAJEROの世代は型式と国内販売時期で確認',intro:'パジェロミニ、パジェロイオ、パジェロスポーツは別車種です。新型は国内発売前のため、初度登録年からの判定対象には含めません。',layout:'chronology',items:generations.map(g=>({title:`${g.era} ${g.title}`,description:g.facelift.note,meta:`${g.code} · ${g.period}`}))},
  evolutionNotes:[
    {title:'旧型4世代',text:'1982年の初代から2019年の国内販売終了までを、型式とボディで区別します。',meta:'L系 → V20/V40 → V60/V70 → V80/V90'},
    {title:'2026年新型',text:'発売予定車として扱い、価格・型式・装備を発売済みとは記載しません。',meta:'2026年12月17日 国内発売予定'},
  ],
  guides:[{href:'/cars/delica-d5.html',label:'DELICA D:5を見る',description:'三菱の3列車を用途の違いから確認。',image:'/images/top-cards/delica-d5.webp'},{href:'/cars/forester.html',label:'FORESTERを見る',description:'現行AWD SUVの世代を比較。',image:'/images/top-cards/forester.webp'}],
  seo:{title:'パジェロ歴代・型式｜1982年初代から2026年新型まで | CarVista',description:'三菱PAJEROの初代L系からV系4世代、2026年12月17日発売予定の新型までを公式資料で整理。型式、見分け方、SUPER EXCEEDの外観差を確認できます。'},
  defaultIndex:4, generations,
}
