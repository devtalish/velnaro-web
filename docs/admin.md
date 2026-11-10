# The admin inbox

A private page at `/admin` listing everything sent through the contact form.
Sign-in is Supabase Auth; who counts as an admin is a row in a table you control
from the SQL editor.

The app uses two public Supabase browser values and one server-only service-role
secret for the contact API. SMTP credentials remain in Supabase Edge Function
secrets. Never expose the service-role key with a `NEXT_PUBLIC_` prefix:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

The public browser values may be omitted for a frontend-only preview. The contact
form requires all three values; without them it returns a clear unavailable
response and does not accept submissions.

---

## How access works

Two questions, kept deliberately separate:

| Question | Answered by |
| --- | --- |
| Are you a real user on this project? | Supabase Auth |
| Are you allowed to read the enquiries? | A row in `public.admin_users` |

Conflating them is the mistake this design exists to avoid. If "signed in"
implied "admin", then anyone who ever obtained an account on the project (a
signup you left open, an invite meant for something else, an OAuth provider you
enable next year) could read every visitor's name, email address and IP.

`admin_users` has no insert, update or delete policy. **Nothing the application
can be tricked into doing will add an admin.** Promotion happens in the SQL
editor, on purpose.

### Enforced in three places

1. **`proxy.ts`:** bounces requests with no session before a page renders, and
   refreshes the Supabase token on the way through.
2. **The page and every Server Action:** `getAdminState()` re-checks, because
   Server Actions are reachable by direct POST regardless of what the proxy did.
3. **Row-level security:** admin select/delete policies protect the browser
   client. The contact API uses a server-only service-role client after input
   validation and a database-backed rate-limit check.

---

## Setup

### 1. Run the SQL

Supabase Dashboard → **SQL Editor**. Run every SQL migration in `supabase/migrations/` in numerical order. This
creates the schema, restricts public table access, adds the atomic contact
rate limiter and separate email delivery fields, then replaces the temporary
IP hash with a keyed fingerprint in migration `0004`. Raw IP values are cleared
from existing contact records by that migration.

It creates:

| | |
| --- | --- |
| `contact_submissions` | The table every enquiry lands in, with its index and length limits |
| `admin_users` | The allowlist of people who may read it |
| `is_admin()` | The check every policy calls |
| The policies | Admin select and delete; public direct inserts are denied; service-role API inserts only |
| `grant_admin()` and friends | How you add and remove admins |

### 2. Create your admin account

The migration file does **not** create an admin for you — hardcoding credentials
in a SQL file that lives in a public repository would be a security hole.
Create the account through Supabase Dashboard → Authentication → Users → Add user. Then grant access in the SQL editor:

```sql
select public.grant_admin('your@email.com');
```

Use your own email and a strong unique password. Creating users through the
Dashboard avoids coupling setup to Supabase's internal Auth table schema.

### 3. Connect the app

Project Settings → API. Copy the **Project URL** and the **anon** key into
`.env`, and into your host's environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=your-server-only-service-role-key
```

The anon key is **not** a secret. The service-role key is highly privileged and
must remain server-only: never add a `NEXT_PUBLIC_` prefix or commit its value.
RLS restricts browser reads/deletes; public contact inserts are denied at the
table-grant level and the server API performs validation and rate limiting.

### 4. Turn off public signup

Dashboard → Authentication → Providers → Email → **disable "Enable sign-ups"**.
An account with no `admin_users` row already sees nothing, but there is no
reason to let strangers create one.

Then sign in at `/admin/login`.

---

## Lead notification emails

The app does not send email. A Supabase Edge Function does, so the SMTP
credentials live in Supabase and never touch this repository or your web host.

```
INSERT on contact_submissions
  → Database Webhook
    → notify-contact Edge Function
      → acknowledgement to the visitor
      → the lead to you (Reply-To: the visitor)
      → writes separate owner and visitor acknowledgement status fields back to the row
```

### Deploy it

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

Use the exact same generated value in the `x-webhook-secret` HTTP header when configuring the database webhook. Do not generate a second value for the header.

### Wire up the webhook

Dashboard → **Database → Webhooks → Create a new hook**:

| Field | Value |
| --- | --- |
| Table | `contact_submissions` |
| Events | `Insert` only |
| Type | Supabase Edge Functions |
| Edge Function | `notify-contact` |
| HTTP Headers | `x-webhook-secret: <the value you generated>` |

**That header is what protects the function.** Without it, anyone who discovers
the URL can post a payload and make your SMTP account send mail from your
domain. The function refuses to process requests if the secret is unset — it
returns `503` and logs the error, rather than silently running unprotected.

### What gets sent

Two emails per enquiry, both from `supabase/functions/notify-contact/email-template.ts`,
the only email templates in this project:

| To | What it says |
| --- | --- |
| **The visitor** | A short acknowledgement: their message arrived, you read them yourself, expect a reply within a business day. Includes a copy of what they wrote. |
| **You** | The lead (name, email, budget, message, timestamp) with `Reply-To` set to the visitor, so replying answers them. |

The acknowledgement and owner notification are attempted independently. The
admin inbox displays their outcomes separately so an acknowledgement failure
does not hide a successful lead notification.

Set `OWNER_NAME` and `SITE_URL` alongside the SMTP secrets so the
acknowledgement signs off with the agency name and links back to the site.

### Auth emails

Password resets and invites are sent by Supabase itself, using whatever SMTP you
configure under Authentication → **SMTP Settings**. The built-in sender is
rate-limited and not meant for production, so add your own there too.

Those emails use Supabase's default styling. This project ships no templates for
them. With one admin who rarely resets a password, custom branding on a
password-reset email is not worth the five files it costs. Restyle them in the
Dashboard if you ever want to.

---

## Living with it

**Forgot the password.** `/admin/login` → Supabase sends a reset through the
template above. There is no password in any config file to look up any more.

**A second admin.** Invite them (Authentication → Users → Invite), then
`select public.grant_admin('them@example.com');`.

**Signed in but told "Not an admin".** The account is real; it has no
`admin_users` row. The page shows the exact SQL to fix it.

**Locked out by rate limiting.** Supabase enforces sign-in limits at the auth
server. Wait a few minutes. (The previous version counted failures in memory,
which on serverless meant every instance counted separately, one of several
reasons this moved to Supabase Auth.)

**A lead never emailed.** Check `/admin` first. The row is written by the app and
the email is sent by the Edge Function afterwards, so an enquiry present in the
list with an owner notification or visitor acknowledgement warning is an SMTP problem,
not a form problem. `supabase functions logs notify-contact` has the detail.

---

## What this replaced

The first version kept an `admin_users` table with bcrypt hashes it managed
itself. The second moved to `ADMIN_EMAIL` / `ADMIN_PASSWORD` in the environment,
with a hand-rolled HMAC session cookie and an in-memory login throttle.

Supabase Auth brings password hashing, refresh-token rotation and password
reset. The service-role key is now required only by the server-side contact
intake route; keep it out of browser bundles and source control.








opencode -s ses_e49a3befdffela4QCTT8IPcYCU