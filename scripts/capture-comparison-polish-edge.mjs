import { spawn, spawnSync } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

const edge='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const port=9334
const baseUrl=process.env.AUDIT_BASE_URL||'http://127.0.0.1:4173'
const outputDir=resolve(process.env.AUDIT_OUTPUT_DIR||'outputs/comparison-polish-2026-10-31')
const profileDir=resolve(tmpdir(),'carvista-edge-comparison-polish')
await mkdir(outputDir,{recursive:true})
const processEdge=spawn(edge,[`--remote-debugging-port=${port}`,'--headless=new','--disable-gpu','--no-first-run',`--user-data-dir=${profileDir}`,'about:blank'],{stdio:'ignore'})
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms))
let nextId=0
const pending=new Map()
let socket
const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++nextId;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))})

try{
  let version
  for(let attempt=0;attempt<30;attempt++){
    try{version=await fetch(`http://127.0.0.1:${port}/json/version`).then(response=>response.json());break}catch{await wait(100)}
  }
  if(!version)throw new Error('Edge DevTools did not start')
  socket=new WebSocket(version.webSocketDebuggerUrl)
  await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject})
  socket.onmessage=event=>{const message=JSON.parse(event.data);if(message.id&&pending.has(message.id)){const task=pending.get(message.id);pending.delete(message.id);message.error?task.reject(new Error(message.error.message)):task.resolve(message.result)}}
  const {targetId}=await send('Target.createTarget',{url:'about:blank'})
  const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true})
  const sessionSend=(method,params={})=>new Promise((resolve,reject)=>{const id=++nextId;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params,sessionId}))})
  await sessionSend('Page.enable')
  await sessionSend('Runtime.enable')
  const results=[]
  for(const target of ['n-box-jf1-zenki-kouki','voxy-80-zenki-kouki']){
    for(const width of [375,390,1440]){
      const height=width===1440?1000:844
      await sessionSend('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<700})
      await sessionSend('Page.navigate',{url:`${baseUrl}/${target}.html`})
      await wait(1200)
      await sessionSend('Runtime.evaluate',{expression:`document.querySelector('[data-comparison-view-target]').scrollIntoView({block:'center'})`})
      await wait(200)
      const pair=await sessionSend('Page.captureScreenshot',{format:'png',captureBeyondViewport:false})
      await writeFile(resolve(outputDir,`${target}-${width}-pair.png`),Buffer.from(pair.data,'base64'))
      if(width<700){
        await sessionSend('Runtime.evaluate',{expression:`document.querySelector('[data-comparison-view="single"]').click()`})
        await wait(250)
        const single=await sessionSend('Page.captureScreenshot',{format:'png',captureBeyondViewport:false})
        await writeFile(resolve(outputDir,`${target}-${width}-single.png`),Buffer.from(single.data,'base64'))
      }
      const evaluated=await sessionSend('Runtime.evaluate',{returnByValue:true,expression:`(()=>{const target=document.querySelector('[data-comparison-view-target]');return {overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,mode:target.classList.contains('is-single-view')?'single':'pair',cards:[...target.children].map(card=>Math.round(card.getBoundingClientRect().width)),markers:document.querySelectorAll('.lc-image-marker').length,toggles:[...document.querySelectorAll('[data-comparison-view]')].map(button=>({pressed:button.getAttribute('aria-pressed'),height:Math.round(button.getBoundingClientRect().height)}))}})()`})
      results.push({target,width,...evaluated.result.value})
    }
  }
  await writeFile(resolve(outputDir,'edge-metrics.json'),JSON.stringify(results,null,2))
  const failures=results.filter(result=>result.overflow>1||result.markers<2||(result.width<700&&result.toggles.some(toggle=>toggle.height<44))||(result.width<700&&result.mode!=='single')||(result.width<700&&Math.max(...result.cards)<280))
  console.log(JSON.stringify({browser:'Microsoft Edge',baseUrl,checked:results.length,failures,results},null,2))
  if(failures.length)process.exitCode=1
}finally{
  socket?.close()
  if(process.platform==='win32')spawnSync('taskkill',['/PID',String(processEdge.pid),'/T','/F'],{stdio:'ignore'})
  else processEdge.kill()
  await wait(300)
  await rm(profileDir,{recursive:true,force:true}).catch(()=>{})
}
