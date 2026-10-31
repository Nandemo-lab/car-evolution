import { spawn, spawnSync } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

const edge='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const port=9340
const baseUrl=process.env.AUDIT_BASE_URL||'http://127.0.0.1:4173'
const outputDir=resolve(process.env.AUDIT_OUTPUT_DIR||'outputs/mobile-navigation-stability-2026-10-31')
const profileDir=resolve(tmpdir(),'carvista-edge-mobile-nav-stability')
await mkdir(resolve(outputDir,'frames'),{recursive:true})
const edgeProcess=spawn(edge,[`--remote-debugging-port=${port}`,'--headless=new','--disable-gpu','--no-first-run',`--user-data-dir=${profileDir}`,'about:blank'],{stdio:'ignore'})
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms))
let socket,nextId=0,frameIndex=0
const pending=new Map(),samples=[],frames=[]
try{
  let version
  for(let attempt=0;attempt<30;attempt++){try{version=await fetch(`http://127.0.0.1:${port}/json/version`).then(response=>response.json());break}catch{await wait(100)}}
  if(!version)throw new Error('Edge DevTools did not start')
  socket=new WebSocket(version.webSocketDebuggerUrl)
  await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject})
  socket.onmessage=event=>{const message=JSON.parse(event.data);if(message.id&&pending.has(message.id)){const task=pending.get(message.id);pending.delete(message.id);message.error?task.reject(new Error(message.error.message)):task.resolve(message.result)}}
  const send=(method,params={},sessionId)=>new Promise((resolve,reject)=>{const id=++nextId;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params,sessionId}))})
  const {targetId}=await send('Target.createTarget',{url:'about:blank'})
  const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true})
  await send('Page.enable',{},sessionId);await send('Runtime.enable',{},sessionId)
  const evaluate=(expression)=>send('Runtime.evaluate',{expression,returnByValue:true},sessionId)
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true},sessionId)
  await send('Page.navigate',{url:`${baseUrl}/cars/sienta.html`},sessionId);await wait(900)
  const sample=async phase=>{
    const value=(await evaluate(`(()=>{const h=document.querySelector('[data-mobile-site-header]'),b=document.querySelector('[data-scroll-top]'),hr=h.getBoundingClientRect(),br=b.getBoundingClientRect();return {time:performance.now(),phase:${JSON.stringify(phase)},scrollY:Math.round(scrollY),hidden:h.getAttribute('aria-hidden'),buttonHidden:b.getAttribute('aria-hidden'),visible:h.classList.contains('is-visible'),headerTransform:getComputedStyle(h).transform,headerTop:Math.round(hr.top),buttonBottom:Math.round(innerHeight-br.bottom),innerHeight,visualHeight:Math.round(visualViewport?.height||innerHeight)}})()`)).result.value
    samples.push(value);return value
  }
  const frame=async phase=>{
    const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false},sessionId)
    const name=`frames/frame-${String(++frameIndex).padStart(2,'0')}.png`
    await writeFile(resolve(outputDir,name),Buffer.from(shot.data,'base64'));frames.push({name,phase})
  }
  const move=async(y,phase,capture=false)=>{await evaluate(`scrollTo(0,${y})`);await wait(140);await sample(phase);if(capture)await frame(phase)}
  for(const y of [0,150,260,370,520,720,920,1120])await move(y,'continuous-down',y===0||y===370||y===720||y===1120)
  for(let i=0;i<30;i++){await wait(100);await sample('hold-high');if(i===0||i===14||i===29)await frame('hold-high')}
  for(const y of [920,720,520,320,220])await move(y,'continuous-up',y===720||y===220)
  for(let i=0;i<10;i++){await wait(100);await sample('hold-low')}
  await move(900,'viewport-setup',true)
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:700,deviceScaleFactor:1,mobile:true},sessionId)
  for(let i=0;i<10;i++){await wait(100);await sample('viewport-short');if(i===4)await frame('viewport-short')}
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true},sessionId)
  for(let i=0;i<10;i++){await wait(100);await sample('viewport-normal');if(i===4)await frame('viewport-normal')}
  await move(99999,'bottom',true)
  for(let i=0;i<10;i++){await wait(100);await sample('hold-bottom')}
  const phases=['hold-high','hold-low','viewport-short','viewport-normal','hold-bottom']
  const phaseStability=phases.map(phase=>{const rows=samples.filter(row=>row.phase===phase);return {phase,samples:rows.length,states:[...new Set(rows.map(row=>`${row.hidden}/${row.buttonHidden}`))],headerTopRange:[Math.min(...rows.map(row=>row.headerTop)),Math.max(...rows.map(row=>row.headerTop))],buttonBottomRange:[Math.min(...rows.map(row=>row.buttonBottom)),Math.max(...rows.map(row=>row.buttonBottom))]}})
  const unexpected=phaseStability.filter(item=>item.states.length!==1||((item.phase==='hold-low')!==item.states.includes('true/true')))
  const flips=samples.slice(1).filter((row,index)=>row.hidden!==samples[index].hidden).length
  const report={browser:'Microsoft Edge',baseUrl,durationMs:Math.round(samples.at(-1).time-samples[0].time),sampleCount:samples.length,flips,phaseStability,unexpected,timeline:samples}
  await writeFile(resolve(outputDir,'timeline.json'),JSON.stringify(report,null,2))
  const replay=`<!doctype html><meta charset="utf-8"><title>CarVista mobile navigation stability replay</title><style>body{margin:0;background:#07090b;color:#fff;font:14px system-ui;display:grid;place-items:center;min-height:100vh}main{width:min(390px,100%)}img{display:block;width:100%;background:#000}p{margin:10px 0;color:#b9c0c7}</style><main><img id="frame" alt="固定ナビ連続操作の再生"><p id="caption"></p></main><script>const frames=${JSON.stringify(frames)};let i=0;const image=document.querySelector('#frame'),caption=document.querySelector('#caption');function play(){const f=frames[i++%frames.length];image.src=f.name;caption.textContent=(i-1)+' / '+frames.length+' · '+f.phase}play();setInterval(play,600)</script>`
  await writeFile(resolve(outputDir,'operation-replay.html'),replay)
  console.log(JSON.stringify({browser:report.browser,baseUrl,durationMs:report.durationMs,samples:report.sampleCount,flips,phaseStability,unexpected,replay:'operation-replay.html'},null,2))
  if(unexpected.length)process.exitCode=1
}finally{
  socket?.close()
  if(process.platform==='win32')spawnSync('taskkill',['/PID',String(edgeProcess.pid),'/T','/F'],{stdio:'ignore'});else edgeProcess.kill()
  await wait(250);await rm(profileDir,{recursive:true,force:true}).catch(()=>{})
}
