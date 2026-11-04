import { appendFile, cp, readFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const source = resolve('dist');
const target = resolve('dist-cloudflare-preview');
await rm(target, { recursive: true, force: true });
await cp(source, target, { recursive: true });
const headersPath = resolve(target, '_headers');
const current = await readFile(headersPath, 'utf8');
if (!current.includes('X-Robots-Tag: noindex, nofollow')) {
  await appendFile(headersPath, '\n/*\n  X-Robots-Tag: noindex, nofollow\n');
}
console.log(`Prepared noindex Cloudflare preview at ${target}`);
