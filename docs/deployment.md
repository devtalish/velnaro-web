# Local setup and deployment

The first release uses Supabase for contact submissions and the private admin inbox. It does not require Resend, a custom domain, or an email mailbox. Hosting and domain setup are deliberately separate from local testing.

## 1. Prepare the Supabase project

1. Open the correct project at [Supabase](https://supabase.com/dashboard).
2. In **SQL Editor**, run migrations `0001`, `0002`, `0003`, and `0004` in numerical order. Do not skip `0004`; it replaces the old rate-limit fingerprint and clears stored raw IP values.
3. Create your administrator under **Authentication → Users → Add user**.
4. In SQL Editor, grant admin access using the same email:

   ```sql
   select public.grant_admin('your-own-email@example.com');
   ```

5. Under **Authentication → Providers → Email**, disable public sign-ups.
6. Under **Project Settings → API**, copy the Project URL, anon/publishable key, and service-role/secret key.

Never paste the service-role key into chat, commit it, or expose it through a `NEXT_PUBLIC_` variable.

## 2. Connect the local project

In the project folder, copy `.env.example` to `.env.local`. Fill in:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_ONLY_SERVICE_ROLE_KEY
```

Save the file, then restart the development server:

```bash
npm run dev
```

The contact form uses the server-only service-role client after validating the request and applying the database rate limit. The browser never receives that key. Public users cannot insert directly into the table.

## 3. Verify the admin inbox

1. Open <http://localhost:3000/admin/login>.
2. Sign in with the Auth user you created and granted as an admin.
3. Open <http://localhost:3000/admin>.
4. Submit a test enquiry through the public contact form.
5. Refresh the inbox and confirm that the test enquiry appears.
6. Delete the test enquiry from the inbox when finished.

If the inbox reports that the user is not an admin, check that the exact email is present in `public.admin_users`:

```sql
select email, created_at from public.admin_users;
```

If the contact form reports that it cannot connect, verify the three Supabase variables in `.env.local`, confirm migrations `0001`–`0004` have run, and restart the server. Do not send secrets in screenshots or chat.

## 4. Email notifications are a later optional phase

The current contact form saves enquiries in Supabase; it does not send email. After purchasing `velnaro.agency` and setting up a real mailbox, you can add owner notifications and visitor acknowledgements using a verified email provider or the Supabase `notify-contact` Edge Function.

Buying a domain alone does not create a mailbox. Mail hosting or forwarding must be configured separately. Do not configure a fake `hello@velnaro.agency` sender before you control the domain.

## 5. Production launch — only after local approval

Do not deploy until the owner has approved the local site and completed the checks below.

- [ ] Local desktop, tablet and mobile browser QA completed.
- [ ] Contact submission successfully stored in the intended Supabase project.
- [ ] Admin login, inbox access, deletion and unauthorized-access checks passed.
- [ ] Migrations `0001`–`0004` confirmed on the production project.
- [ ] Production environment variables set only in the hosting provider's secure settings.
- [ ] Hosting provider selected and Next.js runtime compatibility confirmed.
- [ ] Domain purchased and DNS/HTTPS configured, if using the custom domain.
- [ ] Mailbox configured separately, if email notifications are required.
- [ ] Legal business identity, jurisdiction, data-retention and privacy wording reviewed.
- [ ] `npm run lint`, `npm run typecheck`, and `npm run build` pass.

A successful build does not prove that Supabase, authentication, DNS, email or the visual design works in production.

## 6. Other hosts

Use a host that explicitly supports the installed Next.js version and its server routes. Confirm runtime, environment-variable and deployment compatibility before selecting a provider. Hosting selection is intentionally postponed until local QA is approved.
