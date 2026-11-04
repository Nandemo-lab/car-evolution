import { spawnSync } from 'node:child_process';

// GA4 measurement IDs are public identifiers embedded in the shipped bundle,
// not credentials. Keeping the existing production ID here makes a local or CI
// Cloudflare build deterministic without copying Vercel-only environment state.
const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const result = spawnSync(command, ['run', 'build'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: { ...process.env, VITE_GA_MEASUREMENT_ID: 'G-0KJP4GT8H8' },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
