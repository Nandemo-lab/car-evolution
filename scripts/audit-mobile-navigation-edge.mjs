import { spawn, spawnSync } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

const edge='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const port=9338
const baseUrl=process.env.AUDIT_BASE_URL||'http://127.0.0.1:4173'
const outputDir=resolve(process.env.AUDIT_OUTPUT_DIR||'outputs/mobile-navigation-qa-2026-10-31')
const profileDir=resolve(tmpdir(),'carvista-edge-mobile-navigation')
const pages=['','cars/sienta.html','n-box-jf1-zenki-kouki.html','roomy-tank-thor-justy.html','privacy.html']
const widths=[375,390,1440]
await mkdir(outputDir,{recursive:true})
const edgeProcess=spawn(edge,[`--remote-debugging-port=${port}`,'--headless=new','--disable-gpu','--no-first-run',`--user-data-dir=${profileDir}`,'about:blank'],{stdio:'ignore'})
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms))
let socket,nextId=0
const pending=new Map()
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
  const evaluate=(expression,awaitPromise=false)=>send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise},sessionId)
  const results=[]
  for(const page of pages){
    for(const width of widths){
      const height=width===1440?1000:844
      await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<700},sessionId)
      await send('Page.navigate',{url:`${baseUrl}/${page}`},sessionId);await wait(700)
      await evaluate(`new Promise(resolve=>{if(document.querySelector('[data-mobile-quick-nav]'))return resolve();const deadline=Date.now()+5000;const timer=setInterval(()=>{if(document.querySelector('[data-mobile-quick-nav]')||Date.now()>deadline){clearInterval(timer);resolve()}},50)})`,true)
      const top=(await evaluate(`(()=>{const n=document.querySelector('[data-mobile-quick-nav]');return {exists:!!n,hidden:n?.getAttribute('aria-hidden'),display:n?getComputedStyle(n).display:null,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,links:n?[...n.querySelectorAll('a')].map(a=>a.getAttribute('href')):[],heights:n?[...n.querySelectorAll('a,button')].map(e=>Math.round(e.getBoundingClientRect().height)):[]}})()`)).result.value
      await evaluate(`scrollTo(0,Math.min(document.documentElement.scrollHeight-innerHeight,900))`);await wait(850)
      const scrolled=(await evaluate(`(()=>{const n=document.querySelector('[data-mobile-quick-nav]');const r=n.getBoundingClientRect();return {hidden:n.getAttribute('aria-hidden'),bottom:Math.round(innerHeight-r.bottom),height:Math.round(r.height),covered:document.elementFromPoint(innerWidth/2,innerHeight-8)?.closest?.('[data-mobile-quick-nav]')!==null}})()`)).result.value
      if(width<700&&page==='cars/sienta.html'){
        const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false},sessionId)
        await writeFile(resolve(outputDir,`sienta-${width}-content.png`),Buffer.from(shot.data,'base64'))
      }
      let topReturned=null
      let footer=null
      if(width<700&&page==='cars/sienta.html'){
        await evaluate(`scrollTo(0,document.documentElement.scrollHeight)`);await wait(850)
        footer=(await evaluate(`(()=>{const n=document.querySelector('[data-mobile-quick-nav]');return {hidden:n.getAttribute('aria-hidden'),scrollBottom:Math.round(document.documentElement.scrollHeight-innerHeight-scrollY)}})()`)).result.value
        const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false},sessionId)
        await writeFile(resolve(outputDir,`sienta-${width}-footer.png`),Buffer.from(shot.data,'base64'))
        await evaluate(`document.querySelector('[data-scroll-top]')?.click()`);await wait(1300)
        topReturned=(await evaluate(`scrollY`)).result.value
      }
      results.push({page:page||'index.html',width,top,scrolled,footer,topReturned})
    }
  }
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true},sessionId)
  await send('Page.navigate',{url:`${baseUrl}/n-box-jf1-zenki-kouki.html`},sessionId);await wait(700)
  await evaluate(`scrollTo(0,900);document.querySelector('[data-facelift-part]')?.click()`);await wait(200)
  const modal=(await evaluate(`(()=>({dialog:!!document.querySelector('dialog[open]'),navHidden:document.querySelector('[data-mobile-quick-nav]').getAttribute('aria-hidden'),blocked:document.body.classList.contains('mobile-quick-nav-blocked')}))()`)).result.value
  await send('Page.navigate',{url:`${baseUrl}/`},sessionId);await wait(700)
  await evaluate(`scrollTo(0,900);document.querySelector('#model-query')?.focus()`);await send('Emulation.setDeviceMetricsOverride',{width:390,height:540,deviceScaleFactor:1,mobile:true},sessionId);await wait(250)
  const keyboard=(await evaluate(`(()=>({focused:document.activeElement?.id,navHidden:document.querySelector('[data-mobile-quick-nav]').getAttribute('aria-hidden'),blocked:document.body.classList.contains('mobile-quick-nav-blocked')}))()`)).result.value
  const failures=results.filter(result=>!result.top.exists||result.top.overflow>1||result.top.links.join('|')!=='/'||(result.width<700&&(result.top.hidden!=='true'||result.top.display==='none'||result.top.heights.some(height=>height<44)||(result.topReturned!==null&&result.topReturned>2)))||(result.width>=700&&result.top.display!=='none'))
  if(!results.some(result=>result.width<700&&result.scrolled.hidden==='false')&&!results.some(result=>result.footer?.hidden==='false'))failures.push({visibility:'ナビが安全な位置でも表示されない'})
  if(!modal.dialog||modal.navHidden!=='true'||!modal.blocked)failures.push({modal})
  if(keyboard.focused!=='model-query'||keyboard.navHidden!=='true'||!keyboard.blocked)failures.push({keyboard})
  const report={browser:'Microsoft Edge',baseUrl,checks:results.length,failures,modal,keyboard,results}
  await writeFile(resolve(outputDir,'results.json'),JSON.stringify(report,null,2))
  console.log(JSON.stringify({browser:report.browser,baseUrl,checks:report.checks,failures,modal,keyboard},null,2))
  if(failures.length)process.exitCode=1
}finally{
  socket?.close()
  if(process.platform==='win32')spawnSync('taskkill',['/PID',String(edgeProcess.pid),'/T','/F'],{stdio:'ignore'});else edgeProcess.kill()
  await wait(250);await rm(profileDir,{recursive:true,force:true}).catch(()=>{})
}
