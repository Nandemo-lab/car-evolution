import { spawn, spawnSync } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const port = 9341
const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173'
const outputDir = resolve(process.env.AUDIT_OUTPUT_DIR || 'outputs/voxy-noah-final-ux-2026-11-02')
const profileDir = resolve(tmpdir(), 'carvista-edge-voxy-noah-final')
const paths = ['/cars/voxy.html', '/cars/noah.html', '/compare-voxy-noah.html']
const widths = [320, 375, 390, 430, 1440]
const edgeProcess = spawn(edge, [`--remote-debugging-port=${port}`, '--headless=new', '--disable-gpu', '--no-first-run', `--user-data-dir=${profileDir}`, 'about:blank'], { stdio: 'ignore' })
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
let socket
let nextId = 0
const pending = new Map()

await mkdir(outputDir, { recursive: true })
try {
  let version
  for (let attempt = 0; attempt < 30; attempt++) {
    try { version = await fetch(`http://127.0.0.1:${port}/json/version`).then(response => response.json()); break } catch { await wait(100) }
  }
  if (!version) throw new Error('Edge DevTools did not start')
  socket = new WebSocket(version.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject })
  socket.onmessage = event => {
    const message = JSON.parse(event.data)
    if (!message.id || !pending.has(message.id)) return
    const task = pending.get(message.id); pending.delete(message.id)
    message.error ? task.reject(new Error(message.error.message)) : task.resolve(message.result)
  }
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++nextId
    pending.set(id, { resolve, reject })
    socket.send(JSON.stringify({ id, method, params, sessionId }))
  })
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
  await send('Page.enable', {}, sessionId)
  await send('Runtime.enable', {}, sessionId)
  const results = []
  for (const path of paths) {
    for (const width of widths) {
      const height = width === 1440 ? 1000 : 844
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 700 }, sessionId)
      await send('Page.navigate', { url: `${baseUrl}${path}` }, sessionId)
      await wait(900)
      await send('Runtime.evaluate', { awaitPromise: true, expression: `(async()=>{for(let y=0;y<document.body.scrollHeight;y+=650){scrollTo(0,y);await new Promise(r=>setTimeout(r,18))}scrollTo(0,0);const images=[...document.images];await Promise.race([Promise.all(images.map(img=>img.complete?Promise.resolve():new Promise(r=>{img.addEventListener('load',r,{once:true});img.addEventListener('error',r,{once:true})}))),new Promise(r=>setTimeout(r,5000))])})()` }, sessionId)
      const evaluated = await send('Runtime.evaluate', { returnByValue: true, expression: `(()=>{const cards=[...document.querySelectorAll('.comparison-grid .comparison-card')].map(card=>{const r=card.getBoundingClientRect();return {left:Math.round(r.left),top:Math.round(r.top),width:Math.round(r.width),height:Math.round(r.height)}});const inactive=document.querySelector('.timeline-item:not([aria-current="true"]) .timeline-thumb img');return {overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,brokenImages:[...document.images].filter(img=>img.naturalWidth<1).map(img=>img.currentSrc||img.src),pendingImages:[...document.images].filter(img=>!img.complete).map(img=>img.currentSrc||img.src),relatedImages:[...document.querySelectorAll('.next-discovery img,.vehicle-guides img,.comparison-next img')].map(img=>({src:img.currentSrc||img.src,width:img.naturalWidth,height:img.naturalHeight})),pair:cards.length===2?{sideBySide:Math.abs(cards[0].top-cards[1].top)<=2,rects:cards}:null,inactiveTimelineFilter:inactive?getComputedStyle(inactive).filter:null}})()` }, sessionId)
      const name = path.replace(/^\//, '').replaceAll('/', '-').replace('.html', '')
      const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }, sessionId)
      await writeFile(resolve(outputDir, `${name}-${width}.png`), Buffer.from(shot.data, 'base64'))
      if (path === '/compare-voxy-noah.html') {
        await send('Runtime.evaluate', { expression: `document.querySelector('.comparison-grid').scrollIntoView({block:'center'})` }, sessionId)
        await wait(120)
        const pairShot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }, sessionId)
        await writeFile(resolve(outputDir, `${name}-${width}-pair.png`), Buffer.from(pairShot.data, 'base64'))
      }
      results.push({ path, width, ...evaluated.result.value })
    }
  }
  const failures = results.filter(result => result.overflow > 1 || result.brokenImages.length || (result.path === '/compare-voxy-noah.html' && result.width < 700 && !result.pair?.sideBySide))
  await writeFile(resolve(outputDir, 'results.json'), JSON.stringify({ baseUrl, failures, results }, null, 2))
  console.log(JSON.stringify({ baseUrl, checked: results.length, failures }, null, 2))
  if (failures.length) process.exitCode = 1
} finally {
  socket?.close()
  if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(edgeProcess.pid), '/T', '/F'], { stdio: 'ignore' })
  else edgeProcess.kill()
  await wait(250)
  await rm(profileDir, { recursive: true, force: true }).catch(() => {})
}
