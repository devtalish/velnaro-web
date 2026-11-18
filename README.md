# VELNARO

Production website for **VELNARO**, a digital agency working across three divisions:

- Software Development & Digital Solutions
- AI Automation & Business Systems
- AI Search Visibility — AEO & GEO

The site is built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Three.js / React Three Fiber, Motion, and Supabase.

> **Domain note:** the production identity is intended for `https://velnaro.agency`. DNS and mailbox readiness must be confirmed before publishing.

## Local development

Requires Node 20.9+.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

Copy `.env.example` to `.env.local`. Keep all secret values out of Git.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Site origin used for canonical URLs and metadata. Use `http://localhost:3000` locally. |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (optional for the public site). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (public by design; RLS protects data). |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key used for private inbox storage, rate limiting and admin operations. Never expose it to the browser. |
| `RESEND_API_KEY` | Server-only Resend API key used to send contact form enquiries directly to `hello@velnaro.agency`. |
| `RESEND_FROM_EMAIL` | Verified sender identity in Resend, e.g. `VELNARO <website@velnaro.agency>`. The sending domain must be verified with Resend. |
| `NOTIFY_WEBHOOK_SECRET` | Optional server-only shared secret for admin retry notifications through the Supabase Edge Function. |

## Contact form and admin

The public contact endpoint sends each valid enquiry directly to `hello@velnaro.agency` through Resend. The visitor's email is set as Reply-To so replies go back to the person who submitted the form.

To activate email delivery:
1. Create a Resend account and generate an API key.
2. Verify the sending domain in Resend and add the DNS records Resend provides.
3. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in your local environment and later in the hosting provider's server-side environment settings.
4. Restart the local development server and submit a test enquiry.

Supabase is optional for direct email delivery. When configured, enquiries are also stored in the private admin inbox. Without Supabase, email delivery still works, but the private inbox will not retain submissions. A lightweight in-process rate limit is used as a fallback; production should use the persistent Supabase rate limiter.

The private `/admin` inbox requires Supabase Auth and an `admin_users` allowlist. Notification acknowledgements to visitors still depend on the optional Supabase Edge Function and its SMTP configuration.

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
| `supabase/` | Migrations, RLS policies and the `notify-contact` Edge Function |
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
