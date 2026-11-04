import fs from 'node:fs/promises';
import path from 'node:path';

const values = process.argv.slice(2);
const args = {};
for (let index = 0; index < values.length; index += 2) args[values[index]?.replace(/^--/, '')] = values[index + 1];
if (!args.baseline || !args.candidate || !args.output) {
  console.error('Usage: node scripts/compare-hosting-parity.mjs --baseline <json> --candidate <json> --output <json>');
  process.exit(2);
}

const [baseline, candidate] = await Promise.all([
  fs.readFile(args.baseline, 'utf8').then(JSON.parse),
  fs.readFile(args.candidate, 'utf8').then(JSON.parse),
]);
const fields = ['status', 'title', 'description', 'canonical', 'robots', 'h1', 'jsonLd', 'internalLinks', 'adsensePublisher', 'ninjaAd', 'ogImage'];
const headers = ['x-content-type-options', 'referrer-policy', 'permissions-policy', 'x-frame-options', 'strict-transport-security', 'content-security-policy-report-only'];
const expectedPages = new Map(baseline.pages.map((page) => [page.pathname, page]));
const actualPages = new Map(candidate.pages.map((page) => [page.pathname, page]));
const differences = [];

for (const [pathname, expected] of expectedPages) {
  const actual = actualPages.get(pathname);
  if (!actual) {
    differences.push({ pathname, field: 'page', expected: 'present', actual: 'missing' });
    continue;
  }
  for (const field of fields) {
    if (JSON.stringify(expected[field]) !== JSON.stringify(actual[field])) differences.push({ pathname, field, expected: expected[field], actual: actual[field] });
  }
  for (const header of headers) {
    const expectedValue = expected.headers?.[header] || '';
    const actualValue = actual.headers?.[header] || '';
    if (expectedValue !== actualValue) differences.push({ pathname, field: `header:${header}`, expected: expectedValue, actual: actualValue });
  }
}
for (const pathname of actualPages.keys()) {
  if (!expectedPages.has(pathname)) differences.push({ pathname, field: 'page', expected: 'absent', actual: 'unexpected' });
}

const expectedProbes = new Map(baseline.probes.map((probe) => [probe.pathname, probe]));
const actualProbes = new Map(candidate.probes.map((probe) => [probe.pathname, probe]));
for (const [pathname, expected] of expectedProbes) {
  const actual = actualProbes.get(pathname);
  if (!actual) {
    differences.push({ pathname, field: 'probe', expected: 'present', actual: 'missing' });
    continue;
  }
  for (const field of ['status', 'location', 'contentType']) {
    const expectedValue = expected[field] || '';
    const actualValue = actual[field] || '';
    if (expectedValue !== actualValue) differences.push({ pathname, field: `probe:${field}`, expected: expectedValue, actual: actualValue });
  }
}

const report = {
  generatedAt: new Date().toISOString(), baselineOrigin: baseline.origin, candidateOrigin: candidate.origin,
  baselinePages: baseline.pages.length, candidatePages: candidate.pages.length,
  pass: differences.length === 0, differenceCount: differences.length, differences,
};
await fs.mkdir(path.dirname(args.output), { recursive: true });
await fs.writeFile(args.output, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ pass: report.pass, differences: report.differenceCount, output: args.output }, null, 2));
if (!report.pass) process.exitCode = 1;
