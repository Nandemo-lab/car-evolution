import { spawn } from 'node:child_process'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const edge='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const baseUrl=process.env.AUDIT_BASE_URL||'http://127.0.0.1:4173'
const approvedPages=['compare-voxy-noah.html','cars/noah.html','cars/voxy.html','tanto-la600s-zenki-kouki.html']
const pages=process.env.AUDIT_PAGES
 ? process.env.AUDIT_PAGES.split(',').map(value=>value.trim()).filter(value=>approvedPages.includes(value))
 : approvedPages
if(!pages.length)throw new Error('AUDIT_PAGES did not include an approved advertising page')
const widths=[1440,375,390]
const port=9500+Math.floor(Math.random()*300)
const profile=await mkdtemp(join(tmpdir(),'carvista-ninja-qa-'))
const browser=spawn(edge,[`--remote-debugging-port=${port}`,'--headless=new','--disable-gpu','--no-first-run',`--user-data-dir=${profile}`,'about:blank'],{stdio:'ignore'})
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms))
let socket,nextId=0
const pending=new Map()
try{
 let version
 for(let attempt=0;attempt<60;attempt++){try{version=await fetch(`http://127.0.0.1:${port}/json/version`).then(r=>r.json());break}catch{await wait(100)}}
 if(!version)throw new Error('Edge DevTools did not start')
 socket=new WebSocket(version.webSocketDebuggerUrl)
 await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject})
 socket.onmessage=event=>{const m=JSON.parse(event.data);if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(new Error(m.error.message)):p.resolve(m.result)}}
 const send=(method,params={},sessionId)=>new Promise((resolve,reject)=>{const id=++nextId;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params,sessionId}))})
 const {targetId}=await send('Target.createTarget',{url:'about:blank'})
 const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true})
 await send('Page.enable',{},sessionId);await send('Runtime.enable',{},sessionId);await send('Network.enable',{},sessionId)
 const requests=[]
 socket.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.sessionId===sessionId&&m.method==='Network.responseReceived'&&/shinobi\.jp/.test(m.params.response.url))requests.push({url:m.params.response.url,status:m.params.response.status})})
 const evaluate=expression=>send('Runtime.evaluate',{expression,returnByValue:true},sessionId)
 const results=[]
 for(const page of pages)for(const width of widths){
  requests.length=0
  await send('Emulation.setDeviceMetricsOverride',{width,height:width===1440?1000:844,deviceScaleFactor:1,mobile:width<700},sessionId)
  await send('Page.navigate',{url:`${baseUrl}/${page}`},sessionId);await wait(1800)
  const state=(await evaluate(`(()=>{const s=document.querySelector('[data-commercial-slot="ninja-carvista"]');if(!s)return {exists:false};s.scrollIntoView({block:'center'});const r=s.getBoundingClientRect(),style=getComputedStyle(s);return {exists:true,placement:s.dataset.adPlacement,slotWidth:Math.round(r.width),slotHeight:Math.round(r.height),display:style.display,visibility:style.visibility,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,mainText:(document.querySelector('h1')?.textContent||'').trim(),before:s.previousElementSibling?.tagName,after:s.nextElementSibling?.className,creativeFrames:s.querySelectorAll('iframe').length,creativeImages:s.querySelectorAll('img').length}})()`)).result.value
  await wait(400)
  results.push({page,viewportWidth:width,...state,requests:[...requests]})
 }
 const failures=results.filter(r=>!r.exists||r.slotWidth>302||r.slotHeight<284||r.display==='none'||r.visibility==='hidden'||r.overflow>1||r.placement!==r.page||!r.requests.some(q=>q.url.includes('/o/7715cbec85d744324b7fe2302020e023')&&q.status===200))
 console.log(JSON.stringify({baseUrl,checks:results.length,failures,results},null,2))
 if(failures.length)process.exitCode=1
}finally{
 socket?.close()
 await new Promise(resolve=>{browser.once('exit',resolve);browser.kill();setTimeout(resolve,1200)})
 await rm(profile,{recursive:true,force:true}).catch(()=>{})
}
