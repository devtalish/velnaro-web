# The admin inbox

A private page at `/admin` listing enquiries sent through the contact form.
Sign-in is Supabase Auth; admin authorization is a separate allowlist in
`public.admin_users`.

The app uses two public Supabase browser values and two server-only secrets.
SMTP credentials remain in Supabase Edge Function secrets:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NOTIFY_WEBHOOK_SECRET
```

The public browser values may be omitted for a frontend-only preview. The
contact form and admin inbox require the Supabase URL, anon key and service-role
key. Admin email retry additionally requires `NOTIFY_WEBHOOK_SECRET`, which
must exactly match the Edge Function secret. Never expose either server-only
secret with a `NEXT_PUBLIC_` prefix or commit it.

---

## How access works

| Question | Answered by |
| --- | --- |
| Is the visitor a real user on this project? | Supabase Auth |
| May that user read and delete enquiries? | A row in `public.admin_users` |

A signed-in user is not automatically an admin. `admin_users` has no
application insert, update or delete policy. Promotion and removal happen in
the Supabase SQL editor.

### Enforced in three places

1. **`proxy.ts`:** redirects requests with no session before a private page
   renders and refreshes the Supabase token.
2. **The page and every Server Action:** `getAdminState()` re-checks admin
   authorization because Server Actions can be called directly.
3. **Row-level security:** admin select/delete policies protect the browser
   client. Contact inserts use the server-only service-role client after
   request validation and database-backed rate limiting.

---

## Setup

### 1. Run the SQL migrations

Supabase Dashboard → **SQL Editor**. Run every migration in
`supabase/migrations/` in numerical order: `0001` through `0004`.

The migrations create the schema, restrict public table access, add the atomic
contact rate limiter and separate email delivery fields, then replace the
temporary IP hash with a keyed fingerprint in migration `0004`. That final
migration also clears historical raw IP values.

The schema includes:

| Object | Purpose |
| --- | --- |
| `contact_submissions` | Contact enquiries and delivery status |
| `admin_users` | Allowlist of people who may read/delete enquiries |
| `is_admin()` | Authorization check used by RLS policies |
| RLS policies | Admin select/delete; no public direct contact inserts |
| `grant_admin()` / `revoke_admin()` | SQL-editor admin management |
| `consume_contact_rate_limit()` | Atomic database-backed rate limiting |
| Notification claim functions | Prevent concurrent duplicate email delivery |

### 2. Create your admin account

Create the account through Supabase Dashboard → Authentication → Users → Add
user. Then grant access in the SQL editor:

```sql
select public.grant_admin('your@email.com');
```

Use your own email and a strong unique password. The public repository does not
contain default credentials. Confirm the user is verified and appears in
`public.admin_users`.

### 3. Turn off public signup and configure URLs

Dashboard → Authentication → Providers → Email → disable **Enable sign-ups**.

Under Authentication → URL Configuration:

- Set the Site URL to the canonical deployed origin.
- Add only the required admin and development redirect URLs.
- Remove obsolete or untrusted redirect origins.

### 4. Connect the app

Project Settings → API. Copy the Project URL and anon key into your host's
environment variables. Configure:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-server-only-service-role-key
NOTIFY_WEBHOOK_SECRET=the-same-secret-configured-in-supabase
NEXT_PUBLIC_SITE_URL=https://velnaro.agency
```

The anon key is public. The service-role key is highly privileged and must
remain server-only. Public contact inserts are denied at the table-grant level;
the server API validates and rate-limits before inserting.

---

## Lead notification emails

The app does not send email. A Supabase Edge Function does, so SMTP credentials
live in Supabase and never touch the repository or Vercel:

```
INSERT on contact_submissions
  → Database Webhook
    → notify-contact Edge Function
      → visitor acknowledgement
      → owner lead notification
      → separate delivery statuses saved to the row
```

### Deploy the function

Link the Supabase CLI to the correct project, then deploy:

```bash
supabase link --project-ref YOUR_SUPABASE_PROJECT_REF
supabase functions deploy notify-contact
openssl rand -hex 32
```

Store the generated secret securely. Set SMTP values and the generated secret
in Supabase:

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

Use the exact same secret in three places: the Supabase Edge Function secret,
the database webhook's `x-webhook-secret` header and Vercel's server-only
`NOTIFY_WEBHOOK_SECRET` environment variable. Never generate separate values.
Redeploy Vercel after changing its environment variable.

### Wire up the webhook

Dashboard → **Database → Webhooks → Create a new hook**:

| Field | Value |
| --- | --- |
| Table | `contact_submissions` |
| Events | `Insert` only |
| Type | Supabase Edge Functions |
| Edge Function | `notify-contact` |
| HTTP Headers | `x-webhook-secret: <the generated value>` |

The Edge Function rejects requests without the matching secret. Keep the secret
private; anyone who obtains it could attempt to trigger mail delivery.

### What gets sent

| Recipient | Contents |
| --- | --- |
| Visitor | Acknowledgement that the message arrived, with a copy of their inquiry |
| VELNARO | Lead details with Reply-To set to the visitor |

The two emails are attempted independently. The admin inbox shows separate
owner-notification and visitor-acknowledgement outcomes.

Configure a real SMTP provider and verify its host, port, username and app
password. For the Supabase Edge Function, use port 465 (implicit TLS) or 2525 (STARTTLS if supported). Supabase Edge Functions block outbound connections to ports 25 and 587. Supabase Auth SMTP is configured separately and follows its provider's documented port settings.

### Admin retry

When a notification is marked failed, an authorized admin can retry it from
the inbox. This action calls the protected Edge Function from the server. It
requires Vercel's `NOTIFY_WEBHOOK_SECRET` to match the Supabase secret. It
does not expose the secret to the browser.

### Supabase Auth emails

Password resets and invitations are sent by Supabase Auth using the SMTP
configured under Authentication → **SMTP Settings**. The Edge Function SMTP
settings do not automatically configure Supabase Auth email delivery.

---

## Living with it

**Forgot the password.** This version does not include a self-service password-reset screen. Use Supabase Dashboard → Authentication → Users to send a recovery email or reset the account, and make sure custom Auth SMTP is configured.

**A second admin.** Invite them in Authentication → Users → Invite, then run:

```sql
select public.grant_admin('them@example.com');
```

**Signed in but told "Not an admin".** The account has no `admin_users` row.
Run the grant statement above using the exact account email.

**A lead never emailed.** Check the owner and acknowledgement delivery statuses
in `/admin`. Inspect `supabase functions logs notify-contact`, SMTP settings
and the database webhook configuration.

**Admin retry is unavailable.** Check the Vercel `NOTIFY_WEBHOOK_SECRET` value
matches the Supabase Edge Function secret exactly, then redeploy Vercel.

**A submission is missing.** Check the contact API logs, migrations
`0001`–`0004`, service-role configuration and rate-limit RPC availability.
