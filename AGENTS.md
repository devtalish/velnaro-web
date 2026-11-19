# Repository guidance

This repository is the VELNARO website. Preserve its established visual identity, layout language, and palette when making changes; do not redesign or add sections unless requested.

## Stack and conventions

- Next.js App Router 16.4.5, React 19, TypeScript, Tailwind CSS v4, Motion, Three.js/React Three Fiber, Supabase.
- Read the matching Next.js documentation shipped in `node_modules/next/dist/docs/` before using unfamiliar APIs; this version has breaking changes.
- Keep secrets server-only. Never expose `SUPABASE_SERVICE_ROLE_KEY` with a `NEXT_PUBLIC_` prefix or commit environment files.
- Public contact submissions must go through `app/api/contact/route.ts`. Never restore direct anonymous table inserts.
- Keep database changes in ordered SQL migrations. Apply migrations `0001` through `0004` in numerical order.
- Do not make CI commit or push changes to a branch. CI must be read-only and reproducible.
- Do not claim production readiness based on build checks alone.

## Local verification

```bash
npm ci
npm audit
npm run lint
npm run typecheck
npm run build
deno check --frozen supabase/functions/notify-contact/index.ts
```

## Current release status

- The hardening work is on `audit-fixes-final-2026-11` in draft PR #2; `main` is intentionally unchanged.
- Automated checks must pass on the latest PR head before merge.
- Production remains gated on applying migrations `0001`–`0004`, setting Vercel/Supabase secrets, deploying the Edge Function and webhook, verifying the production Auth URL/redirect allowlist, and testing a real contact submission and both email paths.
- Responsive browser QA, third-party iframe checks, and owner/legal confirmation of entity identity, jurisdiction, retention, international transfers, and liability wording remain manual release gates.

## Content and data integrity

- Do not invent clients, project outcomes, testimonials, metrics, staff credentials, addresses, or legal details.
- Keep portfolio labels and live preview URLs grounded in the supplied project information.
- Treat all public form input and webhook payloads as untrusted; validate types, sizes, and headers before use.
- Keep the privacy notice aligned with actual data handling. Raw client IP addresses are not retained; a keyed fingerprint is used for rate limiting.
