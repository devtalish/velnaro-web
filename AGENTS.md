<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Milestones 0‑5 (summary)

**Milestone 0** – Audit & defect register (no Critical defects).  
**Milestone 1** – Domain/email migration to `velnaro.agency` / `hello@velnaro.agency`; repo identity sweep; README/CONTRIBUTING rewrite; lint/build clean; no `velnaro.com` in output.  
**Milestone 2** – Homepage/nav/logo/service‑card links + three‑division hero positioning; single home `h1`; service‑card hrefs; SEO constants updated; lint/build pass.  
**Milestone 3** – Service‑page structural unification (Software Dev → SectionHeader/grids), copy corrections (remove invented claims, fix headings, neutralise casing), AI‑Automation layout/spacing fixes, AI‑Search typo/table/a11y fixes, CTA/contact‑copy alignment.  
**Milestone 4** – Personal‑content removal, legal copy finalisation, code‑hygiene verification, final quality audit (h1 count, link integrity, meta‑tag consistency, no `velnaro.com`, branding strings present).  
**Milestone 5** – Visual‑QA & deployment‑prep (breakpoint checks, accessibility sanity, SEO final audit, deployment‑readiness checklist).

Historical milestone notes only. Do not treat the old production-readiness statement as current verification; the current audit branch still requires passing CI, live Supabase/Vercel checks, legal review, and browser QA.

## Deployment readiness (Milestone 5)

- **Lint & build** were previously reported as passing; this audit has not yet reproduced those checks. Current GitHub Actions results are the source of truth.
- **Built‑page audit** confirms: exactly one home `<h1>`, 6 service links, 3 “Explore this service” CTAs, footer logo 24 px, hero role string, no `velnaro.com`, `hello@velnaro.agency` present, title and meta‑tags consistent.
- **Accessibility sanity** – colour contrast uses the current `@theme` palette; ARIA labels on key interactive elements (service‑card CTA, back links).
- **SEO final audit** – sitemap (`/sitemap.xml`) and robots (`/robots.txt`) generate correctly for the 15 public routes; all Open‑Graph/Twitter meta‑tags match the three‑division branding; no `velnaro.com` references in the output.
- **Deployment scripts** – prior milestone notes reported `npm run dev`, `npm run build`, and `npm run start` working. The contact endpoint now requires `SUPABASE_SERVICE_ROLE_KEY` as a server-only secret; never commit it or expose it with `NEXT_PUBLIC_`.

The site is not cleared for production until current CI passes, Supabase migrations/secrets/webhook and SMTP are verified, and responsive browser QA is completed.

<!-- END:nextjs-agent-rules -->

## Milestones 0‑6 (summary)

**Milestone 0** – Audit & defect register (no Critical defects).  
**Milestone 1** – Domain/email migration to `velnaro.agency` / `hello@velnaro.agency`; repo identity sweep; README/CONTRIBUTING rewrite; lint/build clean; no `velnaro.com` in output.  
**Milestone 2** – Homepage/nav/logo/service‑card links + three‑division hero positioning; single home `h1`; service‑card hrefs; SEO constants updated; lint/build pass.  
**Milestone 3** – Service‑page structural unification (Software Dev → SectionHeader/grids), copy corrections (remove invented claims, fix headings, neutralise casing), AI‑Automation layout/spacing fixes, AI‑Search typo/table/a11y fixes, CTA/contact‑copy alignment.  
**Milestone 4** – Personal‑content removal, legal copy finalisation, code‑hygiene verification, final quality audit (h1 count, link integrity, meta‑tag consistency, no `velnaro.com`, branding strings present).  
**Milestone 5** – Visual‑QA & deployment‑prep (breakpoint checks, accessibility sanity, SEO final audit, deployment‑readiness checklist).  
**Milestone 6** – Post‑launch monitoring & continuous improvement: SEO/freshness checks, accessibility scans, performance tracking (Core Web Vitals), contact‑form/email health, documentation updates, and optional quick‑win “last updated” notation.

All milestones follow a strict “one‑milestone‑at‑a‑time, stop‑for‑approval” protocol. This historical milestone summary is not a current production sign-off. Follow the active audit PR checklist for unresolved checks.
