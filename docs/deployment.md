# Deployment

The site deploys to Vercel with no configuration. What takes a few extra minutes
is the contact form: a Supabase table, an SMTP account, and the environment
variables that connect them.

If you only want the front end, skip to
[Front end only](#front-end-only-no-database-no-email). It needs no
environment variables at all.

---

## 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Run migrations `0001` through `0004` in numerical order. Migration `0004` switches to a keyed rate-limit fingerprint and clears legacy raw IP values.
3. Create your admin in Supabase Dashboard → Authentication → Users → Add user,
   then grant admin access in the SQL editor:

   ```sql
   select public.grant_admin('your@email.com');
   ```

   This repository is public, so the migration deliberately does **not** ship with
   hardcoded credentials. Use your own email and a long password.

4. Turn off public signup: Authentication → Providers → Email → disable
   **Enable sign-ups**.
5. Project Settings → **API** → copy the **Project URL** and the **anon** key.

> Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and the
> server-only `SUPABASE_SERVICE_ROLE_KEY` to Vercel. Never prefix the service-role
> key with `NEXT_PUBLIC_` or commit its value. The contact route requires it.

## 2. The lead notification email

Link the Supabase CLI to your actual project first. The project reference is the subdomain in your Supabase project URL:

```bash
supabase link --project-ref YOUR_SUPABASE_PROJECT_REF
```

The web app cannot send email. A Supabase Edge Function does, which is why no
SMTP credential appears in your host's environment.

```bash
supabase functions deploy notify-contact

# Generate a secret and copy the printed value into your password manager.
openssl rand -hex 32

# Paste that exact generated value below, and into the webhook header.
supabase secrets set \
  SMTP_HOST=smtp.example.com \
  SMTP_PORT=465 \
  SMTP_USER=hello@velnaro.agency \
  SMTP_PASS='app-password-not-your-account-password' \
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
| HTTP Headers | `x-webhook-secret: <paste the exact generated value>` |

That header is the only thing standing between the function and anyone who
learns its URL. The function refuses to run at all if the secret is missing —
it returns `503` instead of processing the payload.

Any provider works: Gmail with an **App Password**, Zoho, Resend, Mailgun,
Amazon SES. Port 465 is implicit TLS; 587 negotiates STARTTLS.

## 3. Auth emails

Password resets and invites are sent by Supabase, not by the app. Add your own
SMTP under Authentication → **SMTP Settings**, because the built-in sender is
rate-limited and not meant for production. They use Supabase's default styling;
this project ships no templates for them.

## 4. Deploy to Vercel

1. Push the repo to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repo. The Next.js
   preset is detected; nothing to change.
3. **Settings → Environment Variables** → add the applicable values from [`.env.example`](../.env.example), including the three Supabase variables and `NEXT_PUBLIC_SITE_URL`, for the environments you intend to deploy.
4. Deploy.

Both are optional: the site deploys and runs without them. You just get the
setup panel at `/admin` until they are set.

### Custom domain

Vercel → **Settings → Domains** → add yours and follow the DNS instructions,
then set `NEXT_PUBLIC_SITE_URL` to it and redeploy. That one variable drives
`metadataBase`, the canonical URL, `robots.txt`, `sitemap.xml` and every Open
Graph image URL. There is nothing else to update.

Afterwards, submit `https://velnaro.agency/sitemap.xml` in
[Google Search Console](https://search.google.com/search-console) and check the
structured data with the
[Rich Results Test](https://search.google.com/test/rich-results).

## Front end only (no database, no email)

Delete `app/api/contact/`, `app/admin/`, `app/api/admin/`, `lib/admin/`,
`supabase/` and `proxy.ts`, and point the contact form at a `mailto:` link or a
hosted form service. What is left is a static-friendly Next.js app that deploys
anywhere with zero environment variables.

## Other hosts

Nothing here is Vercel-specific. Any Node **20.9+** host works: Netlify,
Railway, Render, Fly.io, a VPS with `npm run build && npm run start`, or Docker
on `node:20-alpine`. The 3D scenes are client-only (`ssr: false`), so no host
needs a GPU. Email is sent by Supabase, not by the host, so there is no mail
transport to worry about either.

## Production checklist

- [ ] All SQL migrations (0001, 0002, 0003) run in order
- [ ] `select email from public.admin_users;` returns **your** address (no hardcoded defaults)
- [ ] Public signup disabled in Authentication → Providers → Email
- [ ] Both `NEXT_PUBLIC_` values and server-only `SUPABASE_SERVICE_ROLE_KEY` set in Vercel
- [ ] Edge Function deployed and its secrets set
- [ ] Webhook created, with the `x-webhook-secret` header
- [ ] Custom SMTP configured under Authentication → SMTP Settings
- [ ] `/admin` redirects to `/admin/login` when signed out
- [ ] A test submission appears in `/admin`, emails you, **and** acknowledges the sender
- [ ] `velnaro.agency` DNS resolves and `hello@velnaro.agency` receives mail
- [ ] `NEXT_PUBLIC_SITE_URL` set to `https://velnaro.agency`
- [ ] `/sitemap.xml` and `/robots.txt` both resolve and show that domain
- [ ] `public/og.jpg` replaced with the approved VELNARO 1200×630 preview
- [ ] `npm run build` passes

Worth confirming, since the whole design rests on it:

```bash
# Should return nothing at all.
npm run build && grep -ri "service_role" .next/ | grep -v ".map"
```

## Troubleshooting

**`/admin` shows "Database not connected".** The two `NEXT_PUBLIC_` values are
missing or still hold `.env.example` placeholders. Environment changes need a
redeploy to take effect.

**Signed in, but "Not an admin".** The Supabase account is real; it has no
`admin_users` row. Run `select public.grant_admin('you@example.com');` and the
page shows the exact statement.

**Sign-in says "Invalid email or password" and you are sure it isn't.** Check the
user exists under Authentication → Users and is **confirmed**. An unconfirmed
user cannot sign in with a password.

**Created the user with SQL and it still can't log in.** The `auth.identities`
row is what password sign-in looks up. `create_admin_user` writes it; a
hand-written `insert into auth.users` alone does not.

**HTTP 429 on login.** Supabase's own sign-in rate limit. Wait a few minutes.

**The form saves but no email arrives.** Check `/admin` first. A row that is
present, with an owner-notification or acknowledgement warning, means SMTP,
not the form. `supabase functions logs notify-contact` has the reason. A row
present with *no* warning means the webhook never fired: check Database →
Webhooks.

**Login loops back to `/admin/login`.** The session cookie is being dropped.
Supabase auth cookies are `Secure` in production, so the site must be HTTPS.
