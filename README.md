# VELNARO

Production website for **VELNARO**, a digital agency working across three divisions:

- Software Development & Digital Solutions
- AI Automation & Business Systems
- AI Search Visibility — AEO & GEO

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Three.js / React Three Fiber, Motion, and Supabase.

> **Domain note:** the production identity is intended for `https://velnaro.agency`. The domain and mailbox must be purchased/configured separately before they can be used.

## Local development

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Environment setup

Copy `.env.example` to `.env.local` and add your own Supabase project values. Keep `.env.local` private and out of Git.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Local site origin; use `http://localhost:3000` for development. |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public browser key; database policies protect private data. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key for validated contact intake, rate limiting and private admin operations. Never expose it to the browser. |
| `NOTIFY_WEBHOOK_SECRET` | Optional future notification-webhook secret. Not required for Supabase-only enquiries. |

## Contact form and admin inbox

The contact form stores validated enquiries in the Supabase `contact_submissions` table. It does not require Resend, a custom domain, or a mailbox. The form only reports success after Supabase confirms that the enquiry was saved.

The private `/admin` inbox requires:
1. Supabase migrations `0001` through `0004` applied in order.
2. The public Supabase URL and anon key.
3. The server-only service-role key.
4. A Supabase Auth user granted access through `public.admin_users`.

Keep public signups disabled. Never paste the service-role key into chat, source code, or a `NEXT_PUBLIC_` variable.

### Email notifications later

After purchasing a domain and setting up a mailbox, email notifications can be added through a verified email provider or a configured Supabase Edge Function. That is a separate optional phase; the contact form and admin inbox do not depend on it.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

## Project structure

| Path | Contents |
| --- | --- |
| `app/` | Routes, root layout/metadata, API route, sitemap, robots, manifest and icons |
| `components/` | Page sections, portfolio/Work components, services, contact, admin and UI |
| `constants/` | Site identity, services, projects, navigation, contact and SEO values |
| `types/` | Shared TypeScript types |
| `lib/` | Supabase clients and admin auth/data helpers |
| `supabase/` | Migrations, RLS policies and optional notification Edge Function |
| `public/` | Brand assets, project visuals and 3D model |
| `docs/` | Architecture, deployment, admin and customization notes |

## Documentation

- [Architecture](docs/architecture.md)
- [Deployment](docs/deployment.md)
- [Admin](docs/admin.md)
- [Customization](docs/customization.md)
- [Contributing](CONTRIBUTING.md)

## Licensing

Source code is MIT-licensed — see [LICENSE](LICENSE). Brand content, copy, project assets and third-party assets are not covered by that licence — see [NOTICE](NOTICE).
