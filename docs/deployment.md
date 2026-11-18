# Deployment

The public website can run locally without Supabase. Direct contact email delivery requires Resend configuration; the private admin inbox additionally requires Supabase.

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

## 2. Direct contact email delivery

The public contact form sends valid enquiries directly to `hello@velnaro.agency` through Resend. The visitor's email address is set as Reply-To.

1. Create a Resend account and generate an API key.
2. Add and verify the sending domain in Resend. Add the DNS records Resend provides at the domain's DNS host.
3. Set these server-only environment variables locally and later in your hosting provider:

   ```env
   RESEND_API_KEY=re_your_api_key
   RESEND_FROM_EMAIL=VELNARO <website@velnaro.agency>
   ```

4. The From address must use a domain verified by Resend. Do not expose the API key to the browser or commit it.
5. Restart the local server and submit a test enquiry. Confirm it arrives at `hello@velnaro.agency` and that Reply-To points to the submitter.

Supabase is not required for the email to be sent. If Supabase is configured, the same enquiry is also saved to the private admin inbox. Without Supabase, the email is still sent but the private inbox does not retain the enquiry. A process-local rate limiter is used as a fallback; use the persistent Supabase rate limiter for production traffic.

The optional Supabase Edge Function remains responsible for sending visitor acknowledgement emails and for admin retry workflows. Its SMTP setup is separate from the direct owner notification above.

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

The public site and direct contact email can run without Supabase. The private admin inbox and its acknowledgement/retry workflows remain unavailable until Supabase is configured.

### Custom domain

Vercel → **Settings → Domains** → add the domain and follow its DNS instructions. Set `NEXT_PUBLIC_SITE_URL` to the canonical deployed origin, without a trailing slash, then redeploy. This variable drives canonical URLs, `robots.txt`, `sitemap.xml` and Open Graph URLs.

After deployment, verify DNS and HTTPS, submit the sitemap in [Google Search Console](https://search.google.com/search-console), and check structured data with the [Rich Results Test](https://search.google.com/test/rich-results).

## Front end only (no database, no email)

This is a separate frontend-only deployment mode. The contact form, private admin inbox, API routes and Supabase integration must be removed or replaced with an explicitly configured hosted form service. Do not use this mode if you need the current contact and admin functionality.

## Other hosts

The Next.js application requires a supported Node.js runtime for the installed Next.js version. Direct owner email is sent through Resend from the server route. Verify the host's Node.js and Next.js compatibility before deploying outside Vercel.

## Production checklist

- [ ] Migrations `0001`, `0002`, `0003` **and** `0004` applied successfully in numerical order
- [ ] `select email from public.admin_users;` returns only the intended administrator address(es)
- [ ] Public signup disabled in Supabase Auth
- [ ] Supabase Auth Site URL and redirect allowlist contain only intended origins
- [ ] `RESEND_API_KEY` and `RESEND_FROM_EMAIL` configured as server-only environment variables\n- [ ] Sending domain verified with Resend and DNS records published\n- [ ] `NEXT_PUBLIC_SITE_URL` configured for the canonical site
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

**The contact form returns unavailable or cannot send.** Check `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and that the sender domain is verified in Resend. If Supabase is enabled, also check migrations `0001`–`0004` and the database rate-limit RPC.

**Signed in, but told "Not an admin".** The account has no `admin_users` row. Run `select public.grant_admin('you@example.com');` in the Supabase SQL editor.

**Sign-in says "Invalid email or password".** Check that the user exists under Authentication → Users, is confirmed, and that the Auth Site URL/redirect configuration is correct.

**The email does not arrive.** Check the Resend email logs and verify that the sender domain is verified and `RESEND_FROM_EMAIL` matches it. For visitor acknowledgements, separately check the Supabase Edge Function SMTP secrets and database webhook.

**Admin retry says it is not configured.** Verify Vercel's `NOTIFY_WEBHOOK_SECRET` exactly matches the Supabase Edge Function secret, and redeploy Vercel after changing it.

**Login loops back to `/admin/login`.** Confirm the deployed origin is HTTPS and included in Supabase Auth's redirect allowlist.
