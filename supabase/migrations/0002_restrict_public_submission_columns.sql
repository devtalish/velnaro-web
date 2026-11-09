-- Tighten public contact-submission writes without changing the admin inbox.
-- Public callers may submit only visitor-provided fields; internal delivery
-- state, IDs and timestamps remain database-controlled.
revoke insert on table public.contact_submissions from anon, authenticated;
grant insert (name, email, budget, message, source, user_agent, ip_address)
  on table public.contact_submissions to anon, authenticated;
