// Protected-environment, one-time cutover. Never print token or Cloudflare responses.
const token = process.env.CARVISTA_CF_REDIRECT_TOKEN
if (!token) throw new Error('Dedicated redirect token is missing')
const base = 'https://api.cloudflare.com/client/v4'
async function request(method, path, body) {
  const response = await fetch(`${base}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json', ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(15000),
  })
  if (response.status === 404 && path.endsWith('/rulesets/phases/http_request_dynamic_redirect/entrypoint')) return { missing: true }
  if (!response.ok) throw new Error(`Cloudflare ${method} failed (${response.status}); no response body logged`)
  const json = await response.json()
  if (!json.success) throw new Error(`Cloudflare ${method} returned unsuccessful status; no response body logged`)
  return json.result
}
const zones = await request('GET', '/zones?name=carvista.jp&per_page=50')
const matches = zones.filter(z => z.name === 'carvista.jp' && z.status === 'active')
if (matches.length !== 1 || matches[0].plan?.name !== 'Free Website') throw new Error('Zone or Free plan precondition changed')
const zoneId = encodeURIComponent(matches[0].id)
const records = await request('GET', `/zones/${zoneId}/dns_records?per_page=100&page=1`)
const expected = [
  ['A', 'carvista.jp', '216.198.79.1'],
  ['CNAME', 'www.carvista.jp', '4f4894ec549112de.vercel-dns-017.com'],
]
if (records.length !== 2 || !expected.every(([type, name, content]) => records.some(r => r.type === type && r.name === name && r.content === content && r.proxied === true && r.ttl === 1))) {
  throw new Error('Current DNS no longer matches reviewed baseline; no redirect written')
}
const dnssec = await request('GET', `/zones/${zoneId}/dnssec`)
const ssl = await request('GET', `/zones/${zoneId}/settings/ssl`)
if (dnssec.status !== 'disabled' || ssl.value !== 'full') throw new Error('DNSSEC/SSL baseline changed; no redirect written')
const phase = `/zones/${zoneId}/rulesets/phases/http_request_dynamic_redirect/entrypoint`
const existing = await request('GET', phase)
if (!existing?.missing) throw new Error('Existing redirect ruleset must be reviewed before changing it')
const rules = [
  {
    ref: 'carvista_www_to_apex_308', action: 'redirect',
    expression: '(http.host eq "www.carvista.jp")',
    description: 'CarVista www to canonical apex',
    action_parameters: { from_value: { target_url: { expression: 'concat("https://carvista.jp", http.request.uri.path)' }, status_code: 308, preserve_query_string: true } },
  },
  {
    ref: 'carvista_apex_http_to_https_308', action: 'redirect',
    expression: '(http.host eq "carvista.jp" and http.request.scheme eq "http")',
    description: 'CarVista apex HTTP to HTTPS',
    action_parameters: { from_value: { target_url: { expression: 'concat("https://carvista.jp", http.request.uri.path)' }, status_code: 308, preserve_query_string: true } },
  },
]
const created = await request('POST', `/zones/${zoneId}/rulesets`, { name: 'CarVista canonical redirects', kind: 'zone', phase: 'http_request_dynamic_redirect', rules })
if (created.rules?.length !== 2 || !rules.every(rule => created.rules.some(r => r.ref === rule.ref && r.enabled !== false))) throw new Error('Created redirects need manual verification')
console.log('Two CarVista 308 redirects created after exact DNS, SSL, DNSSEC and Free-plan preflight. No DNS record was changed.')
