-- Server-only contact intake and atomic abuse throttling.
-- The public anon key must never be able to create rows or alter internal
-- delivery metadata directly. All inserts go through the validated API route.
revoke insert (name, email, budget, message, source, user_agent, ip_address) on table public.contact_submissions from anon, authenticated;
revoke insert on table public.contact_submissions from anon, authenticated;
revoke all on table public.contact_submissions from anon, authenticated;
drop policy if exists "Anyone can submit the contact form" on public.contact_submissions;
grant select, delete on table public.contact_submissions to authenticated;
grant insert, select, update on table public.contact_submissions to service_role;

-- Remove the legacy public-insert RLS policy as well as its table privileges.
create table if not exists public.contact_rate_limits (
  ip_hash text primary key,
  window_started_at timestamptz not null,
  request_count integer not null default 0,
  constraint contact_rate_limits_count_positive check (request_count >= 0)
);
alter table public.contact_rate_limits enable row level security;
revoke all on table public.contact_rate_limits from public, anon, authenticated;

create or replace function public.consume_contact_rate_limit(p_ip text)
returns boolean
language plpgsql
security definer
set search_path = public, extensions, pg_temp
as $$
declare
  v_hash text;
  v_count integer;
begin
  if p_ip is null or length(p_ip) = 0 then
    p_ip := 'unknown';
  end if;

  v_hash := encode(digest(p_ip, 'sha256'), 'hex');

  insert into public.contact_rate_limits(ip_hash, window_started_at, request_count)
  values (v_hash, now(), 1)
  on conflict (ip_hash) do update
    set window_started_at = case
          when public.contact_rate_limits.window_started_at < now() - interval '10 minutes'
          then now()
          else public.contact_rate_limits.window_started_at
        end,
        request_count = case
          when public.contact_rate_limits.window_started_at < now() - interval '10 minutes'
          then 1
          else public.contact_rate_limits.request_count + 1
        end
  returning request_count into v_count;

  -- Opportunistic bounded cleanup; the table stores hashes, never raw IPs.
  if random() < 0.01 then
    delete from public.contact_rate_limits
    where window_started_at < now() - interval '1 day';
  end if;

  return v_count <= 5;
end;
$$;

revoke all on function public.consume_contact_rate_limit(text) from public, anon, authenticated;
grant execute on function public.consume_contact_rate_limit(text) to service_role;

-- Separate delivery outcomes. email_sent remains the owner's notification
-- status for backwards compatibility with the existing admin inbox.
alter table public.contact_submissions
  add column if not exists owner_email_sent boolean,
  add column if not exists owner_email_error text,
  add column if not exists acknowledgement_email_sent boolean,
  add column if not exists acknowledgement_email_error text;

update public.contact_submissions
set owner_email_sent = email_sent,
    owner_email_error = case when email_sent = false then email_error else null end
where owner_email_sent is null;

-- Prevent duplicate email sends when a database webhook is retried. Partial
-- failures release the claim for retry; fully delivered notifications stay done.
alter table public.contact_submissions
  add column if not exists notification_claimed_at timestamptz,
  add column if not exists notification_completed_at timestamptz;

create or replace function public.claim_contact_notification(p_submission_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  claimed_id uuid;
begin
  update public.contact_submissions
  set notification_claimed_at = now()
  where id = p_submission_id
    and notification_completed_at is null
    and (
      notification_claimed_at is null
      or notification_claimed_at < now() - interval '15 minutes'
    )
  returning id into claimed_id;

  return claimed_id is not null;
end;
$$;

revoke all on function public.claim_contact_notification(uuid) from public, anon, authenticated;
grant execute on function public.claim_contact_notification(uuid) to service_role;

create or replace function public.finish_contact_notification(
  p_submission_id uuid,
  p_completed boolean
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  update public.contact_submissions
  set notification_completed_at = case when p_completed then now() else null end,
      notification_claimed_at = case
        when p_completed then notification_claimed_at
        else now() - interval '16 minutes'
      end
  where id = p_submission_id;
end;
$$;

revoke all on function public.finish_contact_notification(uuid, boolean) from public, anon, authenticated;
grant execute on function public.finish_contact_notification(uuid, boolean) to service_role;
