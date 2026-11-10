# Deployment

The public website can be deployed to Vercel as a frontend preview without connecting Supabase. The contact form, private admin inbox and email notifications require the production configuration below.

If you only want a frontend-only preview, skip to
[Front end only](#front-end-only-no-database-no-email). It needs no
environment variables, but its contact form and admin features will not work.

---

## 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Run migrations `0001` through `0004` in numerical order. Do not skip migration `0004`: it replaces the temporary unkeyed IP hash with a keyed fingerprint and clears legacy raw IP values.
3. Create your admin in Supabase Dashboard → Authentication → Users → Add user,
   then grant admin access in the SQL editor:

   ```sql
   select public.grant_admin('your@email.com');
   ```

   This repository is public, so migrations deliberately do **not** ship with
   hardcoded credentials. Use your own email and a long unique password.

4. Turn off public signup: Authentication → Providers → Email → disable
   **Enable sign-ups**.
5. Project Settings → **API** → copy the **Project URL**, **anon/publishable key**, and **service_role/secret key**. The service-role key is server-only.

Add these Vercel environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; never expose to the browser)
- `NEXT_PUBLIC_SITE_URL` (for example, `https://velnaro.agency`)
- `NOTIFY_WEBHOOK_SECRET` (server-only; the exact shared secret configured below)

Never prefix either server-only secret with `NEXT_PUBLIC_`, commit it, or paste it into chat.

## 2. The lead notification email

Link the Supabase CLI to your actual project first. The project reference is the subdomain in your Supabase project URL:

```bash
supabase link --project-ref YOUR_SUPABASE_PROJECT_REF
```

Deploy the Edge Function:

```bash
supabase functions deploy notify-contact

# Generate one strong secret and store it in your password manager.
openssl rand -hex 32
```

Set the SMTP and function secrets. Replace every example value, and use the exact generated secret for `NOTIFY_WEBHOOK_SECRET`:

```bash
supabase secrets set \
  SMTP_HOST=smtp.example.com \
  SMTP_PORT=465 \
  SMTP_USER=hello@velnaro.agency \
  SMTP_PASS='your-smtp-app-password' \
  CONTACT_RECIPIENT_EMAIL=hello@velnaro.agency \
  OWNER_NAME="VELNARO" \
  SITE_URL=https://velnaro.agency \
  NOTIFY_WEBHOOK_SECRET="PASTE_THE_GENERATED_VALUE_HERE"
```

Then Dashboard → **Database → Webhooks → Create a new hook**:

| Field | Value |
| --- | --- |
| Table | `contact_submissions` |
| Events | `Insert` only |
| Type | Supabase Edge Functions |
| Edge Function | `notify-contact` |
| HTTP Headers | `x-webhook-secret: <the exact generated value>` |

Use the same generated secret in all three places: the Edge Function secret, the database webhook header and Vercel's `NOTIFY_WEBHOOK_SECRET`. Do not generate separate values. Redeploy Vercel after changing its environment variables.

The function refuses to process requests if the secret is missing or invalid. Any SMTP provider may work if it supports the configured transport. Port 465 is implicit TLS; port 587 normally negotiates STARTTLS. Verify the provider's actual host, port and authentication requirements.

## 3. Supabase Auth email delivery

Password resets and invites are sent by Supabase Auth, not by the notification Edge Function. Configure your own SMTP under Authentication → **SMTP Settings**; Supabase's built-in sender is rate-limited and is not intended for production.

In Authentication → URL Configuration:

- Set **Site URL** to the deployed origin (for example, `https://velnaro.agency`).
- Add only the required redirect URLs, including the deployed admin route and any explicitly used preview/local development URLs.
- Remove obsolete or untrusted redirect origins.

Confirm the admin account exists, is confirmed, and has a row in `public.admin_users`. Keep public signups disabled.

## 4. Deploy to Vercel

1. Import `devtalish/velnaro-web` into Vercel.
2. Select the Next.js framework preset.
3. Add the environment variables listed in Section 1 to the intended environments. Do not add SMTP credentials to Vercel; those belong in Supabase Edge Function secrets.
4. Deploy and confirm the deployment uses the intended Git branch and domain.

A frontend-only deployment can render without Supabase configuration, but contact submissions and admin operations will return unavailable/not-connected states until the required server and browser environment variables are configured.

### Custom domain

Vercel → **Settings → Domains** → add the domain and follow its DNS instructions. Set `NEXT_PUBLIC_SITE_URL` to the canonical deployed origin, without a trailing slash, then redeploy. This variable drives canonical URLs, `robots.txt`, `sitemap.xml` and Open Graph URLs.

After deployment, verify DNS and HTTPS, submit the sitemap in [Google Search Console](https://search.google.com/search-console), and check structured data with the [Rich Results Test](https://search.google.com/test/rich-results).

## Front end only (no database, no email)

This is a separate frontend-only deployment mode. The contact form, private admin inbox, API routes and Supabase integration must be removed or replaced with an explicitly configured hosted form service. Do not use this mode if you need the current contact and admin functionality.

## Other hosts

The Next.js application requires a supported Node.js runtime for the installed Next.js version. Email is sent by Supabase, not by the web host. Verify the host's Node.js and Next.js compatibility before deploying outside Vercel.

## Production checklist

- [ ] Migrations `0001`, `0002`, `0003` **and** `0004` applied successfully in numerical order
- [ ] `select email from public.admin_users;` returns only the intended administrator address(es)
- [ ] Public signup disabled in Supabase Auth
- [ ] Supabase Auth Site URL and redirect allowlist contain only intended origins
- [ ] `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL` and `NOTIFY_WEBHOOK_SECRET` configured in Vercel
- [ ] `SUPABASE_SERVICE_ROLE_KEY` and `NOTIFY_WEBHOOK_SECRET` are server-only and absent from client bundles
- [ ] `notify-contact` Edge Function deployed and its SMTP/shared-secret values configured
- [ ] Database webhook configured for `contact_submissions` INSERT with the matching `x-webhook-secret`
- [ ] Supabase Auth SMTP configured for admin invitations and password resets
- [ ] `/admin` redirects signed-out visitors to `/admin/login`
- [ ] Test submission appears in `/admin`
- [ ] Owner notification and visitor acknowledgement are both received
- [ ] Failed notification can be retried by an authorized admin
- [ ] Rate limiting, honeypot handling, admin deletion and unauthorized access have been tested
- [ ] `velnaro.agency` DNS and HTTPS work, and the configured mailbox receives mail
- [ ] `/sitemap.xml` and `/robots.txt` resolve and reference the canonical domain
- [ ] Desktop, tablet and mobile browser QA completed; external preview embeds checked
- [ ] Legal identity, jurisdiction, retention, provider-region and transfer disclosures confirmed by the owner
- [ ] `npm audit`, `npm run lint`, `npm run typecheck` and `npm run build` pass

Do not treat a successful build as proof that production services, email delivery, DNS, authentication or legal compliance are ready.

## Troubleshooting

**`/admin` shows "Database not connected".** Check the public Supabase URL and anon key, and confirm the deployment was rebuilt after environment changes.

**The contact form returns unavailable.** Check `SUPABASE_SERVICE_ROLE_KEY`, the Supabase URL, and whether migrations `0001`–`0004` were applied. Check server logs for rate-limit RPC failures.

**Signed in, but told "Not an admin".** The account has no `admin_users` row. Run `select public.grant_admin('you@example.com');` in the Supabase SQL editor.

**Sign-in says "Invalid email or password".** Check that the user exists under Authentication → Users, is confirmed, and that the Auth Site URL/redirect configuration is correct.

**The form saves but no email arrives.** Check the row's owner and acknowledgement delivery statuses in `/admin`. Inspect `supabase functions logs notify-contact`, verify SMTP secrets and confirm the database webhook fired with the correct shared-secret header.

**Admin retry says it is not configured.** Verify Vercel's `NOTIFY_WEBHOOK_SECRET` exactly matches the Supabase Edge Function secret, and redeploy Vercel after changing it.

**Login loops back to `/admin/login`.** Confirm the deployed origin is HTTPS and included in Supabase Auth's redirect allowlist.
