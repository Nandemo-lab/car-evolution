import { spawn } from 'node:child_process'
import { mkdtemp, readdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const edge='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const baseUrl=process.env.AUDIT_BASE_URL||'http://127.0.0.1:4173'
const slugs=(await readdir(new URL('../src/cars/',import.meta.url))).filter(name=>name.endsWith('.js')).map(name=>name.replace('.js','')).sort()
const cars=new Map(await Promise.all(slugs.map(async slug=>[slug,(await import(`../src/cars/${slug}.js`)).default])))
const priority=new Set(['noah','voxy','alphard','vellfire','prius','n-box','sienta','corolla-cross'])
const cases=slugs.flatMap(slug=>[390,...(priority.has(slug)?[320,375,1440]:[])] .map(width=>({slug,width})))
const port=9800+Math.floor(Math.random()*150)
const profile=await mkdtemp(join(tmpdir(),'carvista-generation-selector-'))
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
  await send('Page.enable',{},sessionId);await send('Runtime.enable',{},sessionId)
  const evaluate=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true},sessionId)).result.value
  const results=[]

  for(const {slug,width} of cases){
    const car=cars.get(slug)
    const count=car.generations.length
    await send('Emulation.setDeviceMetricsOverride',{width,height:width===1440?1000:844,deviceScaleFactor:1,mobile:width<700},sessionId)
    await send('Page.navigate',{url:`${baseUrl}/cars/${slug}.html`},sessionId)
    for(let attempt=0;attempt<100;attempt++){
      const ready=await evaluate(`document.readyState==='complete'&&!!document.querySelector('#detail-code')&&${count===1?'true':"!!document.querySelector('.timeline-item')"}`)
      if(ready)break
      await wait(100)
    }
    const state=await evaluate(`(()=>{
      const timeline=document.querySelector('#timeline'), options=document.querySelector('.timeline-options')
      const buttons=[...document.querySelectorAll('.timeline-item')]
      const selected=buttons.filter(button=>button.getAttribute('aria-current')==='true')
      const first=buttons[0]
      const beforeY=scrollY
      first?.click()
      return {
        timeline:!!timeline, mode:timeline?.className||'single', buttons:buttons.length,
        selected:selected.length, heading:timeline?.textContent.includes('世代を選んで見比べる')||false,
        explanation:timeline?.textContent.includes('画像・型式・販売期間が切り替わります')||false,
        current:document.querySelector('#timeline-current')?.textContent||'', hint:document.querySelector('.timeline-scroll-hint')?.textContent||'',
        optionOverflow:options?options.scrollWidth-options.clientWidth:0,
        pageOverflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
        minTap:buttons.length?Math.min(...buttons.map(button=>Math.min(button.getBoundingClientRect().width,button.getBoundingClientRect().height))):0,
        hasSelectedText:!!selected[0]?.querySelector('.timeline-status'), compare:!!document.querySelector('#compare'), beforeY
      }
    })()`)
    await wait(320)
    state.after=await evaluate(`({current:document.querySelector('#timeline-current')?.textContent||'',code:document.querySelector('#detail-code')?.textContent||'',scrollY})`)
    results.push({slug,width,count,firstCode:car.generations[0].code,...state})
  }

  const failures=results.filter(result=>{
    if(result.pageOverflow>1)return true
    if(result.count===1)return result.timeline||result.compare
    if(!result.timeline||result.buttons!==result.count||result.selected!==1||!result.heading||!result.explanation||!result.hasSelectedText||result.minTap<44)return true
    if(result.count<=4&&(result.mode!=='timeline timeline--grid'||result.optionOverflow>1))return true
    if(result.count>=5&&(result.mode!=='timeline timeline--scroll'||!result.hint.includes('横にスワイプ')))return true
    return result.after.current!=='初代を表示中'||result.after.code!==result.firstCode||result.after.scrollY!==result.beforeY
  })
  console.log(JSON.stringify({baseUrl,checks:results.length,vehiclePages:slugs.length,failures},null,2))
  if(failures.length)process.exitCode=1
}finally{
  socket?.close()
  await new Promise(resolve=>{browser.once('exit',resolve);browser.kill();setTimeout(resolve,1200)})
  await rm(profile,{recursive:true,force:true}).catch(()=>{})
}
