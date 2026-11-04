# CarVista Cloudflare migration runbook

Scope: `carvista.jp` only. Do not change other projects or delete the Vercel project.

## Selected architecture

- Cloudflare Workers Static Assets, with no Worker script.
- Build: `npm run build:cloudflare`
- Output: `dist/`
- Existing `.html` URLs are preserved with `html_handling: none`.
- Existing historical redirects remain HTTP 308 through `public/_redirects`.
- Existing response security headers remain in `public/_headers`.
- The preview project is separate and sends `X-Robots-Tag: noindex, nofollow`.

## DNS baseline (2026-11-05 JST)

- Nameservers: `01.dnsv.jp`, `02.dnsv.jp`, `03.dnsv.jp`, `04.dnsv.jp`
- Apex A: `216.198.79.1` (Vercel)
- `www` CNAME: `4f4894ec549112de.vercel-dns-017.com`
- Public MX/TXT/AAAA: none detected
- Cloudflare-assigned nameservers: `amanda.ns.cloudflare.com`, `mario.ns.cloudflare.com`

## Cutover sequence

1. Confirm Cloudflare has the imported apex A and `www` CNAME records before changing nameservers.
2. Replace only the four authoritative nameservers at the registrar with the two assigned Cloudflare nameservers.
3. Wait for the Cloudflare zone to become active. Do not delete the Vercel project or deployment.
4. Attach `carvista.jp` to the `carvista-static` Worker as a Custom Domain.
5. Add a proxied placeholder record for `www` and a zone-level Single Redirect from `www` to apex using HTTP 308 and preserving path/query.
6. Re-run full HTTP, redirect, SEO, visual, GA4, ads.txt, SSL, and Lighthouse checks.

## Rollback

If production QA finds a material failure, remove the Worker custom-domain route and restore the authoritative nameservers to `01.dnsv.jp` through `04.dnsv.jp`. The apex A and `www` CNAME in the original DNS continue to point at the retained Vercel production. Do not delete Vercel until a separate approval after a stability period.
