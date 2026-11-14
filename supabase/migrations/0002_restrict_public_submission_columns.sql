-- Public clients must not insert contact submissions directly. The validated
-- Next.js API route uses the server-only service role after applying request
-- validation and rate limiting. Internal delivery fields remain server-owned.
revoke insert on table public.contact_submissions from anon, authenticated;
revoke insert (name, email, budget, message, source, user_agent, ip_address)
  on table public.contact_submissions from anon, authenticated;
