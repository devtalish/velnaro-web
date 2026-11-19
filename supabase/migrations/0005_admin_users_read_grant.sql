-- Restore the minimum authenticated privileges required by the admin inbox.
-- Row-level security still limits admin_users rows to verified admins through
-- the SECURITY DEFINER public.is_admin() function.
grant select on table public.admin_users to authenticated;
grant execute on function public.is_admin() to authenticated;

alter table public.admin_users enable row level security;

drop policy if exists "Admins can read the admin list" on public.admin_users;
create policy "Admins can read the admin list"
  on public.admin_users
  for select
  to authenticated
  using (public.is_admin());
