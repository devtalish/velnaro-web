-- Replace reversible, unsalted IP hashes with a keyed HMAC fingerprint.
-- The API computes HMAC-SHA256 with the server-only Supabase service key and
-- sends only the 64-character hex digest to this function. Raw IPs are never
-- stored in contact_submissions.
truncate table public.contact_rate_limits;

drop function if exists public.consume_contact_rate_limit(text);

create function public.consume_contact_rate_limit(p_ip_hash text)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_count integer;
begin
  if p_ip_hash is null or p_ip_hash !~ '^[0-9a-f]{64}$' then
    raise exception 'A valid keyed IP fingerprint is required';
  end if;

  insert into public.contact_rate_limits(ip_hash, window_started_at, request_count)
  values (p_ip_hash, now(), 1)
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

  if random() < 0.01 then
    delete from public.contact_rate_limits
    where window_started_at < now() - interval '1 day';
  end if;

  return v_count <= 5;
end;
$$;

revoke all on function public.consume_contact_rate_limit(text) from public, anon, authenticated;
grant execute on function public.consume_contact_rate_limit(text) to service_role;

-- Remove raw addresses from historical contact records too.
update public.contact_submissions set ip_address = null where ip_address is not null;
