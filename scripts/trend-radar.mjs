import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const force = args.has('--force');
const fixture = args.has('--fixture');
const outputDir = path.resolve(root, process.env.TREND_RADAR_OUTPUT || 'outputs/trend-radar');
const config = JSON.parse(await readFile(path.join(root, 'config/trend-radar-sources.json'), 'utf8'));
const now = process.env.TREND_RADAR_NOW ? new Date(process.env.TREND_RADAR_NOW) : new Date();
const anchor = Date.parse('2026-10-28T00:17:00Z');
const elapsedWeeks = Math.floor((now.getTime() - anchor) / (7 * 86400000));
const due = force || fixture || (elapsedWeeks >= 0 && elapsedWeeks % 2 === 0);

await mkdir(outputDir, { recursive: true });

function normalize(value = '') {
  return value.normalize('NFKC').toLowerCase().replace(/[\s・_/—–―‐-]+/g, '');
}

function decodeHtml(value = '') {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:nbsp|#160);/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function absoluteUrl(href, base) {
  try {
    const url = new URL(href, base);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    return url.href.split('#')[0];
  } catch {
    return null;
  }
}

function parseDate(text) {
  const match = text.match(/(20\d{2})[./年-](\d{1,2})[./月-](\d{1,2})日?/);
  if (!match) return null;
  const date = new Date(`${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}T00:00:00+09:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseNearestDate(html, position) {
  const start = Math.max(0, position - 1400);
  const slice = decodeHtml(html.slice(start, Math.min(html.length, position + 600)));
  const matches = [...slice.matchAll(/(20\d{2})[./年-](\d{1,2})[./月-](\d{1,2})日?/g)];
  if (!matches.length) return null;
  const nearest = matches[matches.length - 1];
  return parseDate(nearest[0]);
}

function detectModel(text) {
  const haystack = normalize(text);
  const known = config.models.find((model) => model.aliases.some((alias) => haystack.includes(normalize(alias))));
  if (known) return known;
  const quoted = text.match(/[「『]([^」』]{2,30})[」』]/)?.[1]?.trim();
  if (!quoted || /^(新型|特別仕様|モデル|車両|商品)/.test(quoted)) return null;
  return { name: quoted, aliases: [quoted], discovered: true };
}

function isRecent(date) {
  if (!date) return false;
  const age = now.getTime() - date.getTime();
  return age >= -86400000 && age <= config.lookbackDays * 86400000;
}

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(url, {
      headers: { 'user-agent': 'CarVista-Trend-Radar/1.0 (+https://carvista.jp/)' },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function extractOfficialItems(html, source) {
  const items = [];
  const linkPattern = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(linkPattern)) {
    const title = decodeHtml(match[2]);
    if (title.length < 4 || !config.announcementTerms.some((term) => title.includes(term))) continue;
    const model = detectModel(title);
    if (!model) continue;
    // Several official newsroom cards keep the date in a sibling block hundreds
    // of characters before the title link, so inspect the complete card-sized area.
    const date = parseNearestDate(html, match.index) || parseDate(match[1]);
    if (!isRecent(date)) continue;
    const url = absoluteUrl(match[1], source.url);
    if (!url || new URL(url).hostname !== new URL(source.url).hostname) continue;
    items.push({ maker: source.maker, title, url, date: date.toISOString().slice(0, 10), model: model.name });
  }
  return [...new Map(items.map((item) => [item.url, item])).values()];
}

function extractTrendItems(xml) {
  const items = [];
  for (const match of xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
    const block = match[1];
    const title = decodeHtml((block.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '');
    const model = detectModel(title);
    if (!model) continue;
    const traffic = decodeHtml((block.match(/<ht:approx_traffic>([\s\S]*?)<\/ht:approx_traffic>/i) || [])[1] || '');
    const published = decodeHtml((block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i) || [])[1] || '');
    items.push({ model: model.name, title, traffic, published });
  }
  return items;
}

async function repositoryCorpus() {
  const entries = await readdir(root, { withFileTypes: true });
  const htmlFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.html')).map((entry) => entry.name);
  const srcFiles = [];
  for (const directory of ['src/cars', 'src/data/comparisons']) {
    try {
      for (const entry of await readdir(path.join(root, directory), { withFileTypes: true })) {
        if (entry.isFile()) srcFiles.push(path.join(directory, entry.name));
      }
    } catch {}
  }
  return normalize([...htmlFiles, ...srcFiles].join(' '));
}

function fixtureData() {
  return {
    official: [{ maker: 'Honda', title: '新型「TEST CAR」を発売', url: 'https://example.invalid/test-car', date: now.toISOString().slice(0, 10), model: 'VEZEL' }],
    trends: [{ model: 'VEZEL', title: '新型ヴェゼル', traffic: '1,000+', published: now.toUTCString() }],
  };
}

const status = {
  generatedAt: now.toISOString(),
  due,
  mode: fixture ? 'fixture' : 'live',
  lookbackDays: config.lookbackDays,
  sources: [],
  socialSignals: {
    x: '取得なし（認証不要で安定した公式検索APIがないため）',
    instagram: '取得なし（認証不要で安定した公式検索APIがないため）',
    youtube: '取得なし（APIキー不要の横断検索を使用しないため）',
  },
  candidates: [],
  errors: [],
};

if (!due) {
  await writeFile(path.join(outputDir, 'result.json'), JSON.stringify(status, null, 2));
  console.log(JSON.stringify({ due: false, candidateCount: 0, reason: '14-day gate' }));
  process.exit(0);
}

let official = [];
let trends = [];
if (fixture) {
  ({ official, trends } = fixtureData());
} else {
  for (const source of config.officialSources) {
    try {
      const html = await fetchText(source.url);
      const items = extractOfficialItems(html, source);
      official.push(...items);
      status.sources.push({ type: 'official', name: source.maker, url: source.url, ok: true, matches: items.length });
    } catch (error) {
      status.sources.push({ type: 'official', name: source.maker, url: source.url, ok: false, matches: 0 });
      status.errors.push(`${source.maker}: ${error.message}`);
    }
  }
  for (const source of config.trendSources) {
    try {
      const xml = await fetchText(source.url);
      const items = extractTrendItems(xml);
      trends.push(...items);
      status.sources.push({ type: 'search-trend', name: source.name, url: source.url, ok: true, matches: items.length });
    } catch (error) {
      status.sources.push({ type: 'search-trend', name: source.name, url: source.url, ok: false, matches: 0 });
      status.errors.push(`${source.name}: ${error.message}`);
    }
  }
}

const corpus = await repositoryCorpus();
for (const item of official) {
  const model = config.models.find((entry) => entry.name === item.model) || { name: item.model, aliases: [item.model] };
  const trendMatches = trends.filter((trend) => trend.model === item.model);
  const overlap = model.aliases.some((alias) => corpus.includes(normalize(alias)));
  const score = {
    officialEvidence: 40,
    searchDemand: trendMatches.length ? 20 : 0,
    socialBuzz: 0,
    uniqueValue: overlap ? 5 : 15,
    monetization: 5,
    assetEfficiency: overlap ? 5 : 2,
  };
  const total = Object.values(score).reduce((sum, value) => sum + value, 0);
  if (total < config.candidateThreshold) continue;
  status.candidates.push({
    ...item,
    total,
    score,
    existingCoverage: overlap ? 'あり（既存ページとの差分確認が必要）' : '明確な一致なし',
    searchTrendEvidence: trendMatches,
    socialEvidence: '未取得。SNS話題性は加点していない。',
    productionSpec: {
      required: ['公式発表の変更点整理', '既存URLとの検索意図重複確認', '比較対象の年式・型式・グレード固定', '既存Master Assetの適合確認'],
      imagePolicy: overlap ? '既存Assetを優先。適合しなければ制作前HOLD。' : '公式外観資料を確定できるまでAsset制作禁止。',
      publish: '本人承認まで非公開',
    },
  });
}

status.candidates.sort((a, b) => b.total - a.total || a.model.localeCompare(b.model, 'ja'));
const fingerprint = createHash('sha256')
  .update(status.candidates.map((candidate) => `${candidate.model}|${candidate.url}|${candidate.date}`).join('\n'))
  .digest('hex')
  .slice(0, 16);
status.fingerprint = fingerprint;

const report = [
  '# CarVista Trend Radar',
  '',
  `- 調査日時: ${status.generatedAt}`,
  `- 対象期間: 過去${status.lookbackDays}日`,
  `- 有力候補: ${status.candidates.length}件`,
  `- Fingerprint: ${fingerprint}`,
  '',
  '## 信号の扱い',
  '',
  '- 公式発表: メーカー公式ページのみを根拠に採用',
  '- 検索需要: Google Trends Japan RSSに車名が現れた場合のみ加点',
  '- SNS: 認証不要で安定取得できないため未取得・未加点',
  '',
  ...(status.candidates.length ? status.candidates.flatMap((candidate, index) => [
    `## ${index + 1}. ${candidate.model}（${candidate.total}/100）`,
    '',
    `- 公式発表: [${candidate.title}](${candidate.url})`,
    `- 発表日: ${candidate.date}`,
    `- 既存重複: ${candidate.existingCoverage}`,
    `- 検索トレンド: ${candidate.searchTrendEvidence.length ? candidate.searchTrendEvidence.map((item) => item.title).join(' / ') : '確認なし'}`,
    `- SNS: ${candidate.socialEvidence}`,
    `- 画像方針: ${candidate.productionSpec.imagePolicy}`,
    '- 公開: 本人承認まで行わない',
    '',
  ]) : ['## 結果', '', '有力候補なし。Issue・画像・ページ制作は行わない。', '']),
  '## 取得エラー',
  '',
  ...(status.errors.length ? status.errors.map((error) => `- ${error}`) : ['- なし']),
  '',
].join('\n');

await Promise.all([
  writeFile(path.join(outputDir, 'result.json'), JSON.stringify(status, null, 2)),
  writeFile(path.join(outputDir, 'report.md'), report),
]);
console.log(JSON.stringify({ due: true, candidateCount: status.candidates.length, fingerprint, errors: status.errors.length }));

const healthyOfficialSources = status.sources.filter((source) => source.type === 'official' && source.ok).length;
if (!fixture && healthyOfficialSources < Math.ceil(config.officialSources.length / 2)) {
  console.error(`Official source health below threshold: ${healthyOfficialSources}/${config.officialSources.length}`);
  process.exitCode = 2;
}
