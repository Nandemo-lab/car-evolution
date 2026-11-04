import { spawn, spawnSync } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9357;
const baselineOrigin = process.env.BASELINE_ORIGIN || 'https://carvista.jp';
const candidateOrigin = process.env.CANDIDATE_ORIGIN || 'http://127.0.0.1:8787';
const outputDir = resolve(process.env.AUDIT_OUTPUT_DIR || 'outputs/cloudflare-migration/visual');
const profileDir = resolve(tmpdir(), 'carvista-edge-cloudflare-parity');
const allPaths = ['/', '/cars/voxy.html', '/cars/noah.html', '/cars/serena.html', '/cars/n-box.html', '/cars/prius.html', '/cars/stepwgn.html', '/cars/harrier.html', '/cars/tanto.html', '/cars/freed.html', '/land-cruiser-300-vs-250.html', '/compare-voxy-noah.html', '/privacy.html', '/contact.html'];
const allViewports = [{ name: '375', width: 375, height: 844 }, { name: '390', width: 390, height: 844 }, { name: '430', width: 430, height: 932 }, { name: '768', width: 768, height: 1024 }, { name: '1280', width: 1280, height: 900 }];
const paths = process.env.AUDIT_PATHS ? process.env.AUDIT_PATHS.split(',') : allPaths;
const requestedWidths = process.env.AUDIT_WIDTHS?.split(',') || [];
const viewports = requestedWidths.length ? allViewports.filter((item) => requestedWidths.includes(item.name)) : allViewports;
const wait = (ms) => new Promise((done) => setTimeout(done, ms));

await mkdir(outputDir, { recursive: true });
const edgeProcess = spawn(edge, [`--remote-debugging-port=${port}`, '--headless=new', '--disable-gpu', '--no-first-run', `--user-data-dir=${profileDir}`, 'about:blank'], { stdio: 'ignore' });
let socket;
let nextId = 0;
const pending = new Map();
try {
  let version;
  for (let attempt = 0; attempt < 40; attempt++) {
    try { version = await fetch(`http://127.0.0.1:${port}/json/version`).then((response) => response.json()); break; } catch { await wait(100); }
  }
  if (!version) throw new Error('Edge DevTools did not start');
  socket = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((done, reject) => { socket.onopen = done; socket.onerror = reject; });
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const task = pending.get(message.id); pending.delete(message.id);
    message.error ? task.reject(new Error(message.error.message)) : task.resolve(message.result);
  };
  const send = (method, params = {}, sessionId) => new Promise((done, reject) => {
    const id = ++nextId; pending.set(id, { resolve: done, reject });
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  await send('Page.enable', {}, sessionId);
  await send('Runtime.enable', {}, sessionId);
  const rows = [];
  for (const [label, origin] of [['vercel', baselineOrigin], ['cloudflare-local', candidateOrigin]]) {
    for (const pathname of paths) {
      for (const viewport of viewports) {
        await send('Emulation.setDeviceMetricsOverride', { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.width < 700 }, sessionId);
        await send('Page.navigate', { url: `${origin}${pathname}` }, sessionId);
        await wait(1200);
        await send('Runtime.evaluate', { awaitPromise: true, expression: `(async()=>{await document.fonts?.ready;scrollTo(0,document.body.scrollHeight);await new Promise(r=>setTimeout(r,350));scrollTo(0,0);await new Promise(r=>setTimeout(r,150))})()` }, sessionId);
        const evaluated = await send('Runtime.evaluate', { returnByValue: true, expression: `(()=>({title:document.title,h1:document.querySelector('h1')?.textContent?.replace(/\\s+/g,' ').trim()||'',scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,scrollHeight:document.documentElement.scrollHeight,brokenImages:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).length,imageCount:document.images.length,linkCount:document.links.length}))()` }, sessionId);
        const slug = pathname === '/' ? 'index' : pathname.replace(/^\//, '').replace(/[/.]/g, '-');
        const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }, sessionId);
        await writeFile(resolve(outputDir, `${label}-${slug}-${viewport.name}.png`), Buffer.from(shot.data, 'base64'));
        rows.push({ label, pathname, viewport: viewport.name, ...evaluated.result.value });
      }
    }
  }
  const differences = [];
  for (const expected of rows.filter((row) => row.label === 'vercel')) {
    const actual = rows.find((row) => row.label === 'cloudflare-local' && row.pathname === expected.pathname && row.viewport === expected.viewport);
    for (const field of ['title', 'h1', 'scrollWidth', 'clientWidth', 'scrollHeight', 'brokenImages', 'imageCount', 'linkCount']) {
      if (expected[field] !== actual?.[field]) differences.push({ pathname: expected.pathname, viewport: expected.viewport, field, expected: expected[field], actual: actual?.[field] });
    }
  }
  const failures = rows.filter((row) => row.scrollWidth > row.clientWidth + 1 || row.brokenImages);
  await writeFile(resolve(outputDir, 'report.json'), `${JSON.stringify({ baselineOrigin, candidateOrigin, screenshots: rows.length, failures, differences, rows }, null, 2)}\n`);
  console.log(JSON.stringify({ screenshots: rows.length, failures: failures.length, differences: differences.length, outputDir }, null, 2));
  if (failures.length || differences.length) process.exitCode = 1;
} finally {
  socket?.close();
  if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(edgeProcess.pid), '/T', '/F'], { stdio: 'ignore' });
  else edgeProcess.kill();
  await wait(250);
  await rm(profileDir, { recursive: true, force: true }).catch(() => {});
}
