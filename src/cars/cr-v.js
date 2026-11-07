const generations = [
  {numeral:'I',era:'初代',title:'RD1／RD2',code:'RD1 / RD2',startYear:'1995',yearRange:'1995–2001',period:'1995年10月〜2001年',facelift:{note:'1995年に登場した初代。型式で世代を確認します。',points:['1995年登場','RD1／RD2','公式画像未掲載']}},
  {numeral:'II',era:'2代目',title:'RD4〜RD7',code:'RD4 / RD5 / RD6 / RD7',startYear:'2001',yearRange:'2001–2006',period:'2001年〜2006年',facelift:{note:'2代目はRD4〜RD7系。駆動方式と年式を併せて確認します。',points:['2001年登場','RD4〜RD7系','公式画像未掲載']}},
  {numeral:'III',era:'3代目',title:'RE3／RE4',code:'RE3 / RE4',startYear:'2006',yearRange:'2006–2011',period:'2006年〜2011年',facelift:{note:'背面スペアタイヤを廃した3代目。RE3／RE4で確認します。',points:['2006年登場','RE3／RE4','公式画像未掲載']}},
  {numeral:'IV',era:'4代目',title:'RM1／RM4',code:'RM1 / RM4',startYear:'2011',yearRange:'2011–2016',period:'2011年〜2016年',facelift:{note:'4代目はRM1／RM4。国内販売終了後の海外仕様と混同しません。',points:['2011年登場','RM1／RM4','公式画像未掲載']}},
  {numeral:'V',era:'5代目',title:'RW／RT系',code:'RW1 / RW2 / RT5 / RT6',startYear:'2018',yearRange:'2018–2022',period:'2018年〜2022年',facelift:{note:'ガソリンRW系とハイブリッドRT系を設定。型式とパワートレインを分けます。',points:['2018年国内発売','RW／RT系','公式画像未掲載']}},
  {numeral:'VI',era:'6代目・現行',title:'RS5／RS6',code:'RS5 / RS6',startYear:'2026',yearRange:'2026–現在',period:'2026年2月27日〜現在',image:'/images/cars/cr-v/cr-v-2026-studio-v1.webp',annotations:[{x:67,y:39,label:'薄いLEDランプと水平グリル',dir:'top',labelX:68},{x:68,y:63,label:'大きな黒いロア開口',dir:'bottom',labelX:69}],facelift:{note:'掲載画像はe:HEV RS・FF代表。BLACK EDITIONは4WD専用で装備・外装条件が異なります。',points:['2026年2月27日発売','6AA-RS5／RS6','e:HEV RS']}}
]
export default {
  eyebrow:'NEW MODEL',vehicleName:'CR-V',brand:'ホンダ',maker:'HONDA',order:41,
  aliases:['CR-V','CRV','シーアールブイ','しーあーるぶい','RD1','RD2','RD4','RD5','RD6','RD7','RE3','RE4','RM1','RM4','RW1','RW2','RT5','RT6','RS5','RS6'],
  designRole:'1995年から続くHonda SUV。2026年に国内6代目が登場。',designIdentity:['Horizontal grille','e:HEV RS','6th generation'],designAvoid:['overseas trim','BLACK EDITION generalization','generation mixing'],representativeGrade:'e:HEV RS・FF',representativeColor:'メテオロイドグレー・メタリック',heroScrim:'8, 10, 13',
  references:{checkedAt:'2026年11月7日',items:[{generations:'6代目',label:'Honda 新型CR-V発売資料',url:'https://global.honda/jp/news/2026/4260226-cr-v.html'},{generations:'6代目',label:'Honda CR-V主要諸元表',url:'https://www.honda.co.jp/CR-V/common/pdf/cr-v_spec_list.pdf'},{generations:'歴代',label:'Honda CR-V 30周年資料',url:'https://global.honda/jp/news/2025/4251009.html'}]},
  tagline:'初代RD系から2026年RS系まで6世代。型式と顔で見分ける。',heroImage:'/images/cars/cr-v/cr-v-2026-studio-v1.webp',homeCardImage:'/images/top-cards/cr-v.webp',
  generationGuide:{title:'CR-Vの6世代',intro:'国内販売の空白期間を近い世代へ丸めず、型式と発売時期で確認します。',layout:'chronology',items:generations.map(g=>({title:`${g.era} ${g.title}`,description:g.facelift.note,meta:`${g.code} · ${g.period}`}))},
  evolutionNotes:[{title:'6代目の顔',text:'薄いLEDランプ、水平なグリル、大きな黒い下部開口が目印です。',meta:'e:HEV RS'},{title:'型式',text:'FFは6AA-RS5、4WDは6AA-RS6。BLACK EDITIONは4WD専用です。',meta:'公式諸元'},{title:'販売空白',text:'4代目終了後と5代目終了後に国内販売の空白があります。初度登録年だけで海外仕様へ寄せません。',meta:'国内系譜'}],
  guides:[{href:'/cars/vezel.html',label:'VEZELを見る',description:'HondaコンパクトSUVの世代。',image:'/images/top-cards/vezel.webp'},{href:'/cars/forester.html',label:'FORESTERを見る',description:'SUBARU SUVの6世代。',image:'/images/top-cards/forester.webp'},{href:'/cars/rav4.html',label:'RAV4を見る',description:'トヨタSUVの歴代。',image:'/images/top-cards/rav4.webp'}],
  seo:{title:'CR-V歴代・型式｜初代RDから2026年新型RS5・RS6まで | CarVista',description:'Honda CR-Vの国内6世代を公式資料で整理。RD・RE・RM・RW/RT・RS型式、販売期間、2026年e:HEV RSの外観を確認。'},defaultIndex:5,generations,
}
