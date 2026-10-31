import { spawn, spawnSync } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

const edge='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const port=9342
const baseUrl=process.env.AUDIT_BASE_URL||'http://127.0.0.1:4173'
const outputDir=resolve(process.env.AUDIT_OUTPUT_DIR||'outputs/home-card-loading-qa-2026-10-31')
const profileDir=resolve(tmpdir(),`carvista-home-cards-${Date.now()}`)
const widths=[375,390,1440]
await mkdir(outputDir,{recursive:true})
const edgeProcess=spawn(edge,[`--remote-debugging-port=${port}`,'--headless=new','--disable-gpu','--no-first-run',`--user-data-dir=${profileDir}`,'about:blank'],{stdio:'ignore'})
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms))
let socket,nextId=0
const pending=new Map()
try{
 let version
 for(let attempt=0;attempt<40;attempt++){try{version=await fetch(`http://127.0.0.1:${port}/json/version`).then(response=>response.json());break}catch{await wait(100)}}
 if(!version)throw new Error('Edge DevTools did not start')
 socket=new WebSocket(version.webSocketDebuggerUrl)
 await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject})
 socket.onmessage=event=>{const message=JSON.parse(event.data);if(message.id&&pending.has(message.id)){const task=pending.get(message.id);pending.delete(message.id);message.error?task.reject(new Error(message.error.message)):task.resolve(message.result)}}
 const send=(method,params={},sessionId)=>new Promise((resolve,reject)=>{const id=++nextId;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params,sessionId}))})
 const {targetId}=await send('Target.createTarget',{url:'about:blank'})
 const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true})
 await send('Page.enable',{},sessionId);await send('Runtime.enable',{},sessionId)
 const evaluate=(expression,awaitPromise=false)=>send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise},sessionId)
 const results=[]
 for(const width of widths){
  const height=width===1440?1000:844
  await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<700},sessionId)
  await send('Page.navigate',{url:`${baseUrl}/`},sessionId);await wait(800)
  const state=async phase=>(await evaluate(`(()=>{const cards=[...document.querySelectorAll('.mini-card:not(.mini-card--soon)')];const images=cards.map(card=>{const image=card.querySelector('img');const rect=image?.getBoundingClientRect();return {name:card.querySelector('.mini-card-name')?.textContent.trim(),src:image?.getAttribute('src')||null,loading:image?.loading||null,complete:image?.complete||false,naturalWidth:image?.naturalWidth||0,visible:rect?rect.bottom>0&&rect.top<innerHeight:false}});return {phase:${JSON.stringify(phase)},scrollY:Math.round(scrollY),documentHeight:document.documentElement.scrollHeight,allCarsTop:Math.round(document.querySelector('#all-cars').getBoundingClientRect().top+scrollY),makerGroups:document.querySelectorAll('.maker-group').length,cardCount:cards.length,imageCount:images.filter(item=>item.src).length,loaded:images.filter(item=>item.naturalWidth>0).length,broken:images.filter(item=>item.complete&&item.naturalWidth===0),pending:images.filter(item=>!item.complete&&item.naturalWidth===0),overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,images}})()`)).result.value
  const screenshot=async phase=>{const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false},sessionId);await writeFile(resolve(outputDir,`home-${width}-${phase}.png`),Buffer.from(shot.data,'base64'))}
  const initial=await state('initial')
  await evaluate(`document.querySelector('#all-cars').scrollIntoView({block:'start'})`)
  const immediate=await state('scroll-immediate');await screenshot('scroll-immediate')
  for(let step=0;step<6;step++){await evaluate(`scrollBy(0,Math.round(innerHeight*.8))`);await wait(120)}
  const during=await state('scroll-during');await screenshot('scroll-during')
  await wait(5000)
  await evaluate(`scrollTo(0,document.documentElement.scrollHeight)`);await wait(1500)
  const settled=await state('settled');await screenshot('settled')
  if(width===390){
   const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height:settled.documentHeight,scale:1}},sessionId)
   await writeFile(resolve(outputDir,'home-390-full-settled.png'),Buffer.from(shot.data,'base64'))
  }
  results.push({width,initial,immediate,during,settled})
 }
 const failures=[]
 for(const result of results){
  if(result.settled.cardCount!==31||result.settled.imageCount!==31)failures.push({width:result.width,type:'count',state:result.settled})
  if(result.settled.loaded!==31||result.settled.broken.length||result.settled.pending.length)failures.push({width:result.width,type:'load',state:result.settled})
  if(result.settled.overflow>1)failures.push({width:result.width,type:'overflow',value:result.settled.overflow})
 }
 const report={browser:'Microsoft Edge',baseUrl,results,failures}
 await writeFile(resolve(outputDir,'results.json'),JSON.stringify(report,null,2))
 console.log(JSON.stringify({browser:report.browser,baseUrl,failures,summary:results.map(({width,initial,immediate,during,settled})=>({width,initial:`${initial.loaded}/${initial.imageCount}`,immediate:`${immediate.loaded}/${immediate.imageCount}`,during:`${during.loaded}/${during.imageCount}`,settled:`${settled.loaded}/${settled.imageCount}`,broken:settled.broken.length,pending:settled.pending.length}))},null,2))
 if(failures.length)process.exitCode=1
}finally{
 socket?.close()
 if(process.platform==='win32')spawnSync('taskkill',['/PID',String(edgeProcess.pid),'/T','/F'],{stdio:'ignore'});else edgeProcess.kill()
 await wait(250);await rm(profileDir,{recursive:true,force:true}).catch(()=>{})
}
