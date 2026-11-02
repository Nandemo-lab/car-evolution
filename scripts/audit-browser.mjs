import { spawnSync } from 'node:child_process'

// Keep the browser audit dependency-free. These CDP audits launch the
// installed Edge binary directly, so release QA does not depend on Playwright
// or a separately downloaded browser.
const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173'
const checks = [
  ['mobile navigation', 'scripts/audit-mobile-navigation-edge.mjs'],
  ['home card loading', 'scripts/audit-home-cards-edge.mjs'],
  ['comparison UI', 'scripts/capture-final-ui-edge.mjs'],
]
const failures = []

for (const [name, script] of checks) {
  const result = spawnSync(process.execPath, [script], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      AUDIT_BASE_URL: baseUrl,
      BEFORE_BASE_URL: baseUrl,
      AFTER_BASE_URL: baseUrl,
    },
    encoding: 'utf8',
  })
  process.stdout.write(result.stdout || '')
  process.stderr.write(result.stderr || '')
  if (result.status !== 0) failures.push({ name, status: result.status, signal: result.signal })
}

console.log(JSON.stringify({ baseUrl, checks: checks.map(([name]) => name), failures }, null, 2))
if (failures.length) process.exitCode = 1
