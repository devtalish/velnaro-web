# The VELNARO admin inbox

The private `/admin` area lists enquiries submitted through the website contact form. Supabase Auth handles sign-in; a separate allowlist in `public.admin_users` determines who can read and delete enquiries.

The first release stores enquiries in Supabase only. It does not send owner notifications or visitor acknowledgement emails. Email delivery is an optional later phase after the domain and mailbox are configured.

## Required environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-server-only-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The anon key is intended for browser use; RLS protects the data. The service-role key is highly privileged and must remain server-only. Never commit it or add a `NEXT_PUBLIC_` prefix.

## How access works

| Question | Answered by |
| --- | --- |
| Is the person signed in? | Supabase Auth |
| May the signed-in person read or delete enquiries? | A row in `public.admin_users` |
| Can a public visitor read the inbox? | No; admin authorization and RLS deny access |
| Can a public visitor insert directly into the table? | No; inserts go through the validated server API |

A signed-in user is not automatically an administrator. Admin promotion and removal happen in the Supabase SQL editor.

## Initial setup

### 1. Apply migrations

In Supabase Dashboard → **SQL Editor**, run all migrations in `supabase/migrations/` in numerical order: `0001` through `0004`.

They create the contact table and admin allowlist, restrict public table access, add database-backed rate limiting and notification-status columns, and replace the old IP hash with a keyed fingerprint. Migration `0004` also clears historical raw IP values.

### 2. Create and grant your admin account

Create a user under Supabase Dashboard → **Authentication → Users → Add user**. Then run:

```sql
select public.grant_admin('your-own-email@example.com');
```

Use your own email and a strong, unique password. Confirm the exact email appears in the admin allowlist:

```sql
select email, created_at from public.admin_users;
```

### 3. Disable public signups

Under **Authentication → Providers → Email**, disable **Enable sign-ups**. Keep only the administrator account(s) you intend to authorize.

### 4. Configure local credentials

Add the Supabase Project URL, anon key and service-role key to your local `.env.local` file. Restart the Next.js development server after changing environment variables.

## Verify the workflow

1. Sign in at `/admin/login`.
2. Open `/admin` and confirm the inbox loads.
3. Submit a test message through the public contact form.
4. Confirm the enquiry appears in the inbox.
5. Confirm the enquiry's name, email, budget and message are correct.
6. Delete the test enquiry after verification.
7. Sign out and confirm that the private inbox cannot be accessed without signing in.

## Email notifications later

When VELNARO owns its domain and has a working mailbox, owner notifications and visitor acknowledgements can be added. That future setup requires a verified email-sending provider or configured Supabase Edge Function, secure SMTP credentials and a webhook secret. None of those are required for the current database-only contact flow.

## Troubleshooting

**The inbox says Supabase is not configured.** Check the URL and anon key in `.env.local`, then restart the server.

**The contact form says it cannot save the enquiry.** Check the service-role key, migrations `0001`–`0004`, and the `consume_contact_rate_limit` database function. Check server logs for the error code; never expose the service-role key.

**Signed in but told “Not an admin”.** The signed-in email does not have a row in `public.admin_users`. Run `public.grant_admin()` with the exact email.

**The inbox is empty after a successful submission.** Confirm that the form was submitted against the same Supabase project whose credentials are in the local environment, then refresh the inbox.

**Forgot the password.** This version does not include a self-service password-reset screen. Use Supabase Dashboard → Authentication → Users to manage the account. Password-recovery email requires Auth email delivery to be configured separately.
