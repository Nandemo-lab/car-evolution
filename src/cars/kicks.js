const generations = [
  {numeral:'I',era:'国内初代',title:'P15型',code:'P15 / SNP15',startYear:'2020',yearRange:'2020–2026',period:'2020年6月〜2026年6月',annotations:[{x:50,y:50,label:'Vモーショングリル',dir:'top',labelX:50}],facelift:{note:'日本ではe-POWER専用車として導入。旧型画像は公式外観を固定できないため掲載しません。',points:['2020年6月：国内発売','2代目e-POWER','P15系を車検証で確認']}},
  {numeral:'II',era:'国内2代目・現行',title:'P16型',code:'P16 / SNP16',startYear:'2026',yearRange:'2026–現在',period:'2026年6月18日〜現在',image:'/images/cars/kicks/kicks-2026-studio-v1.webp',annotations:[{x:69,y:38,label:'横基調グリルと上下2段の灯火',dir:'top',labelX:68},{x:68,y:65,label:'ディンプル模様の標準バンパー',dir:'bottom',labelX:69}],facelift:{note:'掲載画像はX・2WDの標準外装代表。Gのグロスブラック外装、ROCK CREEK専用グリルは混同しません。',points:['2026年6月18日発売','第3世代e-POWER','e-4ORCE設定']}}
]
export default {
  eyebrow:'NEW MODEL',vehicleName:'KICKS',brand:'日産',maker:'NISSAN',order:40,
  aliases:['KICKS','キックス','きっくす','P15','SNP15','P16','SNP16','6AA-P16','6AA-SNP16','X+','ROCK CREEK'],
  designRole:'国内初代P15から新型P16までを、標準外装と派生仕様を分けて確認。',designIdentity:['Stacked lamps','3rd-generation e-POWER','e-4ORCE'],designAvoid:['overseas specification','ROCK CREEK mixing','G exterior generalization'],
  representativeGrade:'X・2WD',representativeColor:'レゾナンスブルー／ブラック2トーン',heroScrim:'8, 10, 13',
  references:{checkedAt:'2026年11月7日',items:[
    {generations:'国内2代目',label:'日産 新型キックス発表（発売日・グレード・技術）',url:'https://global.nissannews.com/ja-JP/releases/260617-01-j'},
    {generations:'国内2代目',label:'日産 キックス環境情報（P16/SNP16型式）',url:'https://www.nissan.co.jp/INFO/E_NOTE/KICKS/index.html'},
    {generations:'国内2代目',label:'日産 ROCK CREEK発表（専用外装・発売時期）',url:'https://global.nissannews.com/ja-JP/releases/260820-01-j'},
  ]},
  tagline:'P15から新型P16へ。標準XとG／ROCK CREEKを混同せず見分ける。',heroImage:'/images/cars/kicks/kicks-2026-studio-v1.webp',homeCardImage:'/images/top-cards/kicks.webp',
  generationGuide:{title:'KICKSの国内2世代',intro:'初度登録年だけで境界年を断定せず、P15／P16の型式で確定します。',layout:'chronology',items:generations.map(g=>({title:`${g.era} ${g.title}`,description:g.facelift.note,meta:`${g.code} · ${g.period}`}))},
  evolutionNotes:[{title:'新型P16の顔',text:'横基調グリルと上下2段の灯火が目印。X系の下部はディンプル模様です。',meta:'X代表'},{title:'Gを分ける',text:'Gはグロスブラックの外装を採用。標準Xの外観差として一般化しません。',meta:'グレード差'},{title:'ROCK CREEKを分ける',text:'3スロットグリルやラバレッド加飾を持つ別仕様で、2026年12月23日発売予定です。',meta:'専用外装'},{title:'型式で確認',text:'2WDは6AA-P16、e-4ORCEは6AA-SNP16。グレードと駆動を車検証・注文書で照合します。',meta:'P16系'}],
  guides:[{href:'/cars/serena.html',label:'SERENAを見る',description:'日産ミニバンの6世代。',image:'/images/top-cards/serena.webp'},{href:'/cars/roox.html',label:'ROOXを見る',description:'日産の軽ハイトワゴン。',image:'/images/top-cards/roox.webp'},{href:'/cars/vezel.html',label:'VEZELを見る',description:'同クラスSUVの世代を確認。',image:'/images/top-cards/vezel.webp'}],
  seo:{title:'新型キックス歴代・型式｜P15とP16の違い・2026年発売 | CarVista',description:'日産KICKSの国内初代P15と2026年新型P16を公式資料で整理。第3世代e-POWER、e-4ORCE、X・G・ROCK CREEKの外観差を確認。'},defaultIndex:1,generations,
}
