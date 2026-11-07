const generations = [
  {numeral:'I',era:'初代',title:'ZE1',code:'ZE1',startYear:'1999',yearRange:'1999–2006',period:'1999年〜2006年',facelift:{note:'2人乗りのハイブリッドクーペ。現行EVとは車体形式が異なります。',points:['1999年登場','ZE1','公式画像未掲載']}},
  {numeral:'II',era:'2代目',title:'ZE2／ZE3',code:'ZE2 / ZE3',startYear:'2009',yearRange:'2009–2014',period:'2009年〜2014年',facelift:{note:'5ドアハッチバックの2代目。ZE2／ZE3を車検証で確認します。',points:['2009年登場','ZE2／ZE3','公式画像未掲載']}},
  {numeral:'III',era:'3代目',title:'ZE4',code:'ZE4',startYear:'2018',yearRange:'2018–2022',period:'2018年〜2022年',facelift:{note:'4ドアセダンの3代目。旧世代のボディ形状を現行へ混ぜません。',points:['2018年登場','ZE4','公式画像未掲載']}},
  {numeral:'IV',era:'4代目・現行',title:'RM7',code:'ZAA-RM7',startYear:'2026',yearRange:'2026–現在',period:'2026年4月17日〜現在',image:'/images/cars/insight/insight-2026-studio-v1.webp',annotations:[{x:69,y:40,label:'薄い灯火と水平フロントバー',dir:'top',labelX:69},{x:61,y:58,label:'フラッシュドアハンドル',dir:'bottom',labelX:52}],facelift:{note:'掲載画像は4代目EV・ダイヤモンドダスト・パール代表。従来3世代のハイブリッド車とは別のEVです。',points:['2026年4月17日発売','ZAA-RM7','EV・限定3,000台']}}
]
export default {
  eyebrow:'NEW MODEL',vehicleName:'INSIGHT',brand:'ホンダ',maker:'HONDA',order:42,
  aliases:['INSIGHT','インサイト','いんさいと','ZE1','ZE2','ZE3','ZE4','RM7','ZAA-RM7'],
  designRole:'ハイブリッドの先駆車から2026年EVクロスオーバーへ転換した4世代。',designIdentity:['EV crossover','flush handles','4th generation'],designAvoid:['hybrid carryover','sedan mixing','overseas specification'],representativeGrade:'4代目・単一タイプ',representativeColor:'ダイヤモンドダスト・パール',heroScrim:'8, 10, 13',
  references:{checkedAt:'2026年11月7日',items:[{generations:'4代目',label:'Honda 新型INSIGHT発売資料',url:'https://global.honda/jp/news/2026/4260416-insight.html'},{generations:'歴代・4代目',label:'Honda INSIGHT Press Information',url:'https://www.honda.co.jp/factbook/auto/INSIGHT/202604/4260416-insight.pdf'},{generations:'4代目',label:'Honda レスキュー資料（RM7型）',url:'https://www.honda.co.jp/rescue-auto/pdf/insight-ev.pdf'}]},
  tagline:'ZE1からEVのRM7まで4世代。ボディ形式とパワートレインの転換を確認。',heroImage:'/images/cars/insight/insight-2026-studio-v1.webp',homeCardImage:'/images/top-cards/insight.webp',
  generationGuide:{title:'INSIGHTの4世代',intro:'クーペ、ハッチバック、セダン、EVクロスオーバーで車体形式が大きく異なります。',layout:'chronology',items:generations.map(g=>({title:`${g.era} ${g.title}`,description:g.facelift.note,meta:`${g.code} · ${g.period}`}))},
  evolutionNotes:[{title:'4代目はEV',text:'従来のハイブリッド車から、5人乗りクロスオーバーEVへ転換しました。',meta:'RM7'},{title:'外観',text:'薄い灯火、水平フロントバー、フラッシュドアハンドルが目印です。',meta:'2026年仕様'},{title:'販売条件',text:'単一タイプ、FF、限定3,000台。中古車確認ではRM7型と登録時期を照合します。',meta:'公式発表'}],
  guides:[{href:'/cars/cr-v.html',label:'CR-Vを見る',description:'Honda SUVの6世代。',image:'/images/top-cards/cr-v.webp'},{href:'/cars/vezel.html',label:'VEZELを見る',description:'HondaコンパクトSUV。',image:'/images/top-cards/vezel.webp'},{href:'/cars/prius.html',label:'PRIUSを見る',description:'ハイブリッド車の世代比較。',image:'/images/top-cards/prius.webp'}],
  seo:{title:'インサイト歴代・型式｜ZE1・ZE2・ZE4・新型EV RM7の違い | CarVista',description:'Honda INSIGHTの4世代を公式資料で整理。1999年ZE1から2026年EVクロスオーバーRM7まで、発売時期・型式・外観を確認。'},defaultIndex:3,generations,
}
