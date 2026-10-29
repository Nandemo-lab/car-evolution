import { appendFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const resultPath = path.resolve(process.env.TREND_RADAR_OUTPUT || 'outputs/trend-radar', 'result.json');
const result = JSON.parse(await readFile(resultPath, 'utf8'));
const output = process.env.GITHUB_OUTPUT;
if (!output) throw new Error('GITHUB_OUTPUT is not set');
await appendFile(output, [
  `due=${result.due}`,
  `candidate_count=${result.candidates.length}`,
  `fingerprint=${result.fingerprint || 'none'}`,
  `source_errors=${result.errors.length}`,
  '',
].join('\n'));
