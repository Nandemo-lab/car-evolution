import { spawn, spawnSync } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const port = 9335
const beforeBase = process.env.BEFORE_BASE_URL || 'https://carvista.jp'
const afterBase = process.env.AFTER_BASE_URL || 'http://127.0.0.1:4173'
const outputDir = resolve(process.env.AUDIT_OUTPUT_DIR || 'outputs/comparison-final-ui-2026-10-31')
const profileDir = resolve(tmpdir(), 'carvista-edge-final-ui')
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
  const results = []
  for (const [state, baseUrl] of [['before', beforeBase], ['after', afterBase]]) {
    for (const page of ['n-box-jf1-zenki-kouki', 'voxy-80-zenki-kouki']) {
      for (const width of [375, 390, 1440]) {
        const height = width === 1440 ? 1000 : 844
        await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 700 }, sessionId)
        await send('Page.navigate', { url: `${baseUrl}/${page}.html` }, sessionId)
        await wait(1100)
        const metrics = await send('Runtime.evaluate', { returnByValue: true, expression: `(()=>{const comparison=document.querySelector('[data-comparison-view-target]');const firstImage=comparison?.querySelector('img');return {overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,pageHeight:document.documentElement.scrollHeight,imageTop:firstImage?Math.round(firstImage.getBoundingClientRect().top+scrollY):null,markers:document.querySelectorAll('.lc-image-marker').length,imageLabels:document.querySelectorAll('.lc-image-labels span').length,toggleHeight:Math.round(document.querySelector('[data-comparison-view]')?.getBoundingClientRect().height||0)}})()` }, sessionId)
        const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }, sessionId)
        await writeFile(resolve(outputDir, `${page}-${width}-${state}.png`), Buffer.from(shot.data, 'base64'))
        results.push({ state, page, width, ...metrics.result.value })
      }
    }
  }
  await writeFile(resolve(outputDir, 'metrics.json'), JSON.stringify(results, null, 2))
  const failures = results.filter(result => result.overflow > 1 || (result.state === 'after' && (result.markers !== 0 || result.imageLabels < 4)) || (result.width < 700 && result.toggleHeight < 44))
  console.log(JSON.stringify({ checked: results.length, failures, results }, null, 2))
  if (failures.length) process.exitCode = 1
} finally {
  socket?.close()
  if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(edgeProcess.pid), '/T', '/F'], { stdio: 'ignore' })
  else edgeProcess.kill()
  await wait(250)
  await rm(profileDir, { recursive: true, force: true }).catch(() => {})
}
