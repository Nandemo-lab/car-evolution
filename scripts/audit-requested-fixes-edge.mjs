import { spawn, spawnSync } from 'node:child_process'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const edge = process.env.BROWSER_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173'
const outputDir = resolve('outputs/requested-fixes-2026-11-07')
const profile = await mkdtemp(join(tmpdir(), 'carvista-requested-fixes-'))
const port = 9950 + Math.floor(Math.random() * 40)
await mkdir(outputDir, { recursive:true })
const browser = spawn(edge, [`--remote-debugging-port=${port}`, '--headless=new', '--disable-gpu', '--no-first-run', `--user-data-dir=${profile}`, 'about:blank'], { stdio:'ignore' })
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
let socket, nextId = 0
const pending = new Map()

try {
  let version
  for (let attempt=0; attempt<60; attempt++) { try { version=await fetch(`http://127.0.0.1:${port}/json/version`).then(r=>r.json()); break } catch { await wait(100) } }
  if (!version) throw new Error('Edge DevTools did not start')
  socket = new WebSocket(version.webSocketDebuggerUrl)
  await new Promise((resolve,reject)=>{ socket.onopen=resolve; socket.onerror=reject })
  socket.onmessage = event => { const m=JSON.parse(event.data); if (m.id && pending.has(m.id)) { const p=pending.get(m.id); pending.delete(m.id); m.error?p.reject(new Error(m.error.message)):p.resolve(m.result) } }
  const send=(method,params={},sessionId)=>new Promise((resolve,reject)=>{ const id=++nextId; pending.set(id,{resolve,reject}); socket.send(JSON.stringify({id,method,params,sessionId})) })
  const {targetId}=await send('Target.createTarget',{url:'about:blank'})
  const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true})
  await send('Page.enable',{},sessionId); await send('Runtime.enable',{},sessionId)
  const evaluate=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true},sessionId)).result.value
  const results=[]
  for (const width of [320,375,390,430,1440]) {
    await send('Emulation.setDeviceMetricsOverride',{width,height:width===1440?1000:844,deviceScaleFactor:1,mobile:width<700},sessionId)
    await send('Page.navigate',{url:`${baseUrl}/`},sessionId); await wait(1200)
    const home=await evaluate(`(()=>{const makers=[...document.querySelectorAll('.maker-name')].map(e=>e.textContent.trim());const legacy=[...document.querySelectorAll('.mini-card')].find(e=>e.textContent.includes('LEGACY'));const img=legacy?.querySelector('img');return {makers,unique:new Set(makers).size,legacyScale:img?getComputedStyle(img).transform:'',updates:document.querySelector('.site-updates')?.innerText||'',overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth}})()`)
    if (width===390) { const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true},sessionId); await writeFile(join(outputDir,'home-390.png'),Buffer.from(shot.data,'base64')) }
    for (const slug of ['legacy','levorg']) {
      await send('Page.navigate',{url:`${baseUrl}/cars/${slug}.html`},sessionId); await wait(900)
      const labels=await evaluate(`(()=>{const labels=[...document.querySelectorAll('.annotation-label')].map(e=>{const r=e.getBoundingClientRect();return {text:e.textContent.trim(),x:r.x,y:r.y,w:r.width,h:r.height}});const overlaps=labels.flatMap((a,i)=>labels.slice(i+1).filter(b=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y).map(b=>[a.text,b.text]));return {labels,overlaps,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth}})()`)
      if (width===390) { const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true},sessionId); await writeFile(join(outputDir,`${slug}-390.png`),Buffer.from(shot.data,'base64')) }
      results.push({width,slug,labels})
    }
    await send('Page.navigate',{url:`${baseUrl}/cars/kicks.html`},sessionId); await wait(1000)
    const kicks=await evaluate(`(()=>{const image=[...document.images].find(img=>img.src.includes('kicks-p15-2020-studio-v1.webp'));return {found:!!image,loaded:!!image?.naturalWidth,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth}})()`)
    if (width===390) { const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true},sessionId); await writeFile(join(outputDir,'kicks-390.png'),Buffer.from(shot.data,'base64')) }
    results.push({width,slug:'home',home},{width,slug:'kicks',kicks})
  }
  const failures=results.filter(row=>row.home?(row.home.unique!==row.home.makers.length||row.home.overflow>1||!row.home.updates.includes('2026年11月7日')||row.home.legacyScale==='none'):row.labels?(row.labels.overlaps.length||row.labels.overflow>1):(!row.kicks.found||!row.kicks.loaded||row.kicks.overflow>1))
  const report={baseUrl,results,failures}
  await writeFile(join(outputDir,'results.json'),JSON.stringify(report,null,2))
  console.log(JSON.stringify({baseUrl,checks:results.length,failures},null,2))
  if(failures.length) process.exitCode=1
} finally {
  socket?.close()
  spawnSync('taskkill',['/PID',String(browser.pid),'/T','/F'],{stdio:'ignore'})
  await wait(250); await rm(profile,{recursive:true,force:true}).catch(()=>{})
}
