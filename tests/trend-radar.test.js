import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import test from 'node:test';

const execFileAsync = promisify(execFile);

test('fixture run creates an evidence-separated candidate report without network access', async () => {
  const output = await mkdtemp(path.join(tmpdir(), 'carvista-trend-radar-'));
  await execFileAsync(process.execPath, ['scripts/trend-radar.mjs', '--fixture'], {
    cwd: process.cwd(),
    env: { ...process.env, TREND_RADAR_OUTPUT: output, TREND_RADAR_NOW: '2026-10-29T00:00:00Z' },
  });
  const result = JSON.parse(await readFile(path.join(output, 'result.json'), 'utf8'));
  assert.equal(result.due, true);
  assert.equal(result.candidates.length, 1);
  assert.equal(result.candidates[0].score.socialBuzz, 0);
  assert.match(result.candidates[0].productionSpec.publish, /本人承認/);
});

test('weekly wake-up is skipped on the off week', async () => {
  const output = await mkdtemp(path.join(tmpdir(), 'carvista-trend-radar-'));
  await execFileAsync(process.execPath, ['scripts/trend-radar.mjs'], {
    cwd: process.cwd(),
    env: { ...process.env, TREND_RADAR_OUTPUT: output, TREND_RADAR_NOW: '2026-11-04T00:17:00Z' },
  });
  const result = JSON.parse(await readFile(path.join(output, 'result.json'), 'utf8'));
  assert.equal(result.due, false);
  assert.equal(result.candidates.length, 0);
});
