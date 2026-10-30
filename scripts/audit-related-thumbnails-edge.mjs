import { spawn, spawnSync } from 'node:child_process'
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const port = 9336
const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173'
const outputDir = resolve(process.env.AUDIT_OUTPUT_DIR || 'outputs/related-thumbnail-qa-2026-10-31')
const profileDir = resolve(tmpdir(), 'carvista-edge-related-thumbnails')
const pages = []
for (const name of await readdir('dist')) {
  if (!name.endsWith('.html')) continue
  const html = await readFile(resolve('dist', name), 'utf8')
  if (html.includes('lc-related-card')) pages.push(name)
}
await mkdir(outputDir, { recursive: true })
const edgeProcess = spawn(edge, [`--remote-debugging-port=${port}`, '--headless=new', '--disable-gpu', '--no-first-run', `--user-data-dir=${profileDir}`, 'about:blank'], { stdio: 'ignore' })
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
let socket, nextId = 0
const pending = new Map()

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
    const id = ++nextId; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params, sessionId }))
  })
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
  await send('Page.enable', {}, sessionId); await send('Runtime.enable', {}, sessionId)
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true }, sessionId)
  const results = []
  for (const page of pages) {
    await send('Page.navigate', { url: `${baseUrl}/${page}` }, sessionId)
    await wait(350)
    await send('Runtime.evaluate', { expression: `document.querySelector('.lc-related-grid')?.scrollIntoView({block:'center'})` }, sessionId)
    await wait(350)
    const evaluated = await send('Runtime.evaluate', { returnByValue: true, expression: `(()=>({overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,images:[...document.querySelectorAll('.lc-related-card img')].map(img=>({src:img.currentSrc||img.src,complete:img.complete,width:img.naturalWidth,height:img.naturalHeight,loading:img.loading}))}))()` }, sessionId)
    results.push({ page, ...evaluated.result.value })
    if (page === 'n-box-jf1-zenki-kouki.html') {
      const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }, sessionId)
      await writeFile(resolve(outputDir, 'n-box-related-390.png'), Buffer.from(shot.data, 'base64'))
    }
  }
  const failures = results.filter(result => result.overflow > 1 || result.images.some(image => !image.complete || image.width < 1 || image.height < 1))
  await writeFile(resolve(outputDir, 'results.json'), JSON.stringify({ baseUrl, checkedPages: pages.length, failures, results }, null, 2))
  console.log(JSON.stringify({ baseUrl, checkedPages: pages.length, checkedImages: results.reduce((sum, result) => sum + result.images.length, 0), failures }, null, 2))
  if (failures.length) process.exitCode = 1
} finally {
  socket?.close()
  if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(edgeProcess.pid), '/T', '/F'], { stdio: 'ignore' })
  else edgeProcess.kill()
  await wait(250)
  await rm(profileDir, { recursive: true, force: true }).catch(() => {})
}
