# VELNARO

Production website for **VELNARO**, a digital agency working across three divisions:

- Software Development & Digital Solutions
- AI Automation & Business Systems
- AI Search Visibility — AEO & GEO

The site is built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Three.js / React Three Fiber, Motion, and Supabase.

> **Domain note:** the production identity is being migrated to `https://velnaro.agency`. DNS and mailbox readiness are deployment checks, not guaranteed by this repository. Confirm both before publishing.

## Local development

Requires Node 20.9+.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The visual site can run without environment variables; the contact form and admin inbox require Supabase configuration.

## Environment variables

Copy `.env.example` to `.env`. The frontend can run without configuration, but the contact form requires the Supabase values below:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Live domain, no trailing slash. Drives `metadataBase`, canonical URLs, `sitemap.xml`, `robots.txt`, and Open Graph URLs. Target: `https://velnaro.agency`. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification token. |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (public by design; RLS enforces browser access). |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key required by the contact API and admin inbox operations. Never prefix with `NEXT_PUBLIC_` or commit it. |
| `NOTIFY_WEBHOOK_SECRET` | Server-only copy of the Edge Function webhook secret, used by admins to retry failed email notifications. Never expose it to the browser. |

The contact API uses the service-role key only in a `server-only` module to validate, rate-limit and insert submissions. Admin access uses Supabase Auth plus the `admin_users` allowlist. Notification email is sent by a Supabase Edge Function using SMTP secrets stored in Supabase.

## Scripts

```bash
npm run dev     # local development
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
npm run typecheck # TypeScript
```

## Project structure

| Path | Contents |
| --- | --- |
| `app/` | Routes, root layout/metadata, API route, sitemap, robots, manifest, icons |
| `components/` | Page sections, portfolio/Work components, services, contact, admin, UI |
| `constants/` | Site identity, services, projects, navigation, contact, SEO values |
| `types/` | Shared TypeScript types |
| `hooks/`, `helpers/`, `animations/` | Reusable client hooks, formatters, Motion variants |
| `lib/` | Supabase clients and admin auth/data helpers |
| `supabase/` | Migration, RLS policies, and the `notify-contact` Edge Function |
| `public/` | Logo mark, project/brand assets, 3D model, Open Graph image |
| `docs/` | Architecture, deployment, admin, and customization notes |

## Contact form and admin

- The form posts to `/api/contact`, which validates input and inserts into Supabase.
- `/admin` is a private inbox behind Supabase Auth and an `admin_users` allowlist. It is excluded from indexing.
- Lead and acknowledgement emails require the Supabase Edge Function and its SMTP secrets, plus a database webhook on `contact_submissions`.

Setup and operations: [`docs/deployment.md`](docs/deployment.md), [`docs/admin.md`](docs/admin.md).

## Documentation

| | |
| --- | --- |
| [`docs/architecture.md`](docs/architecture.md) | Project structure, 3D layer, auth, database |
| [`docs/deployment.md`](docs/deployment.md) | Vercel, Supabase, Edge Function, production checklist |
| [`docs/admin.md`](docs/admin.md) | Admin panel, auth model, SQL, lead emails |
| [`docs/customization.md`](docs/customization.md) | Content, assets, palette, and structure notes |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Conventions and contribution flow |

## Licensing

Source code is MIT-licensed — see [`LICENSE`](LICENSE). Brand content, copy, project assets, and third-party assets are not covered by that licence — see [`NOTICE`](NOTICE). Review both before redistributing or reusing this repository.
