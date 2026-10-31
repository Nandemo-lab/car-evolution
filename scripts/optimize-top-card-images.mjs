import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
const require=createRequire(import.meta.url)
const sharp=require('sharp')

const sources={
 alphard:'images/cars/alphard/top-card-v2.webp',vellfire:'images/cars/vellfire/top-card-v2.webp',noah:'images/cars/noah/top-card-front-right-v2.png',voxy:'images/cars/voxy/top-card-front-right-v2.png',esquire:'images/cars/esquire/top-card-front-right-v2.png',prius:'images/cars/prius/top-card-front-right-v2.png',harrier:'images/cars/harrier/top-card-front-right-v2.png',sienta:'images/cars/sienta/top-card-front-right-v2.png','corolla-cross':'images/cars/corolla-cross/top-card-front-right-v2.png',aqua:'images/cars/aqua/mxpk11-2021-z-ff-v1.png',rav4:'images/cars/rav4/top-card-front-right-v1.png',yaris:'images/cars/yaris/mxph10-2020-hybrid-g-ff-v1.png',raize:'images/cars/raize/a202a-2021-hybrid-z-ff-v1.png',roomy:'images/cars/roomy/top-card-front-right-v3.png',serena:'images/cars/serena/top-card-v2.webp',roox:'images/cars/roox/top-card-front-right-v1.png',stepwgn:'images/cars/stepwgn/top-card-front-right-v2.png',freed:'images/cars/freed/top-card-front-right-v2.png','n-box':'images/cars/n-box/top-card-front-right-v2.png',vezel:'images/cars/vezel/top-card-front-right-v2.png','n-one':'images/cars/n-one/jg3-2020-original-ff-v1.png','delica-d5':'images/cars/delica-d5/top-card-front-right-v2.png','delica-mini':'images/cars/delica-mini/top-card-front-right-v2.png',solio:'images/cars/solio/top-card-front-right-v2.png',spacia:'images/cars/spacia/top-card-front-right-v2.png',jimny:'images/cars/jimny/top-card-front-right-v2.png',hustler:'images/cars/hustler/top-card-front-right-v2.png','wagon-r-smile':'images/cars/wagon-r-smile/mx91s-2024-hybrid-x-ff-v1.png',tanto:'images/cars/tanto/top-card-front-right-v2.png',move:'images/cars/move/top-card-front-right-v2.png','cx-5':'images/cars/cx-5/top-card-front-right-v2.png'
}
const sourceRoot=resolve('public')
const outputRoot=resolve('public/images/top-cards')
await mkdir(outputRoot,{recursive:true})
for(const [slug,source] of Object.entries(sources)){
 await sharp(resolve(sourceRoot,source)).resize({width:800,withoutEnlargement:true}).webp({quality:84,smartSubsample:true,effort:6}).toFile(resolve(outputRoot,`${slug}.webp`))
}
const registryPath=resolve('docs/product/vehicle-image-verification-registry.tsv')
const registry=(await readFile(registryPath,'utf8')).trim().split(/\r?\n/)
const header=registry.shift()
const rows=registry.map(line=>line.split('\t'))
const byPath=new Map(rows.map(row=>[row[0],row]))
for(const [slug,source] of Object.entries(sources)){
 const sourcePath=`/${source}`
 const sourceRow=byPath.get(sourcePath)
 if(!sourceRow)throw new Error(`Verification source missing: ${sourcePath}`)
 const derivative=`/images/top-cards/${slug}.webp`
 if(!byPath.has(derivative)){
  const row=[derivative,'/',sourceRow[2],sourceRow[3],sourceRow[4],sourceRow[5],`TOP専用800px WebP派生。外観考証は ${sourcePath} の記録を継承し、元Assetは保持。`,'2026-10-31']
  rows.push(row);byPath.set(derivative,row)
 }
}
rows.sort((a,b)=>a[0].localeCompare(b[0],'en'))
await writeFile(registryPath,`${header}\n${rows.map(row=>row.join('\t')).join('\n')}\n`)
console.log(`Optimized ${Object.keys(sources).length} TOP card images.`)
