-- Cherry launch foundation: matching safety, profile fields and authorized actions.
-- Apply after reviewing in a staging Supabase project. Never expose service-role keys in the client.

create extension if not exists pgcrypto;

alter table public.profiles
  add column if not exists birth_date date,
  add column if not exists gender text,
  add column if not exists show_me text,
  add column if not exists city text,
  add column if not exists education text,
  add column if not exists work text,
  add column if not exists intent text,
  add column if not exists interests text[] not null default '{}',
  add column if not exists dislikes text[] not null default '{}',
  add column if not exists habits text[] not null default '{}',
  add column if not exists is_visible boolean not null default true,
  add column if not exists last_active_at timestamptz not null default now();

alter table public.profiles
  add constraint profiles_adult_check check (birth_date is null or birth_date <= (current_date - interval '18 years')::date);

create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references auth.users(id) on delete cascade,
  receiver_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint likes_no_self check (sender_id <> receiver_id),
  constraint likes_unique_pair unique (sender_id, receiver_id)
);

create table if not exists public.blocks (
  blocker_id uuid not null references auth.users(id) on delete cascade,
  blocked_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  constraint blocks_no_self check (blocker_id <> blocked_id)
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reported_id uuid not null references auth.users(id) on delete cascade,
  reason text not null check (reason in ('fake_profile','harassment','hate','sexual_content','spam','underage','other')),
  details text not null default '' check (char_length(details) <= 2000),
  status text not null default 'open' check (status in ('open','reviewing','resolved','dismissed')),
  created_at timestamptz not null default now(),
  constraint reports_no_self check (reporter_id <> reported_id)
);

create index if not exists likes_receiver_created_idx on public.likes(receiver_id, created_at desc);
create index if not exists blocks_blocked_idx on public.blocks(blocked_id, blocker_id);
create index if not exists reports_status_created_idx on public.reports(status, created_at);

alter table public.likes enable row level security;
alter table public.blocks enable row level security;
alter table public.reports enable row level security;

drop policy if exists "Users can read likes they sent or received" on public.likes;
create policy "Users can read likes they sent or received" on public.likes
  for select to authenticated using (auth.uid() = sender_id or auth.uid() = receiver_id);
drop policy if exists "Users can remove their own likes" on public.likes;
create policy "Users can remove their own likes" on public.likes
  for delete to authenticated using (auth.uid() = sender_id);

drop policy if exists "Users can read blocks they created" on public.blocks;
create policy "Users can read blocks they created" on public.blocks
  for select to authenticated using (auth.uid() = blocker_id);
drop policy if exists "Users can create their own blocks" on public.blocks;
create policy "Users can create their own blocks" on public.blocks
  for insert to authenticated with check (auth.uid() = blocker_id);
drop policy if exists "Users can remove their own blocks" on public.blocks;
create policy "Users can remove their own blocks" on public.blocks
  for delete to authenticated using (auth.uid() = blocker_id);

drop policy if exists "Users can create reports" on public.reports;
create policy "Users can create reports" on public.reports
  for insert to authenticated with check (auth.uid() = reporter_id);
drop policy if exists "Users can read their own reports" on public.reports;
create policy "Users can read their own reports" on public.reports
  for select to authenticated using (auth.uid() = reporter_id);

-- All consequential writes happen in a SECURITY DEFINER function with a fixed search_path.
create or replace function public.like_profile(target_user uuid)
returns table (matched boolean, match_id uuid)
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
  created_match_id uuid;
begin
  if current_user_id is null then raise exception 'Sign in required'; end if;
  if target_user is null or target_user = current_user_id then raise exception 'Invalid profile'; end if;
  if not exists (select 1 from public.profiles p where p.id = target_user and p.is_visible = true) then
    raise exception 'Profile unavailable';
  end if;
  if exists (select 1 from public.blocks b where (b.blocker_id = current_user_id and b.blocked_id = target_user)
      or (b.blocker_id = target_user and b.blocked_id = current_user_id)) then
    raise exception 'This profile is unavailable';
  end if;

  insert into public.likes(sender_id, receiver_id) values (current_user_id, target_user)
    on conflict (sender_id, receiver_id) do nothing;

  if exists (select 1 from public.likes l where l.sender_id = target_user and l.receiver_id = current_user_id) then
    insert into public.matches(user_a, user_b, status, expires_at)
      values (least(current_user_id, target_user), greatest(current_user_id, target_user), 'active', now() + interval '30 days')
      on conflict (user_a, user_b) do update set status = 'active'
      returning id into created_match_id;
    return query select true, created_match_id;
  else
    return query select false, null::uuid;
  end if;
end;
$$;

create or replace function public.send_match_message(target_match uuid, message_body text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
  created_message_id uuid;
begin
  if current_user_id is null then raise exception 'Sign in required'; end if;
  if message_body is null or char_length(trim(message_body)) not between 1 and 4000 then
    raise exception 'Message must be between 1 and 4000 characters';
  end if;
  if not exists (select 1 from public.matches m where m.id = target_match and m.status = 'active'
      and current_user_id in (m.user_a, m.user_b)) then
    raise exception 'Active match required';
  end if;
  if exists (select 1 from public.matches m join public.blocks b
      on (b.blocker_id = m.user_a and b.blocked_id = m.user_b)
      or (b.blocker_id = m.user_b and b.blocked_id = m.user_a)
      where m.id = target_match) then
    raise exception 'Conversation unavailable';
  end if;
  insert into public.messages(match_id, sender_id, body)
    values (target_match, current_user_id, trim(message_body))
    returning id into created_message_id;
  return created_message_id;
end;
$$;

revoke all on function public.like_profile(uuid) from public;
grant execute on function public.like_profile(uuid) to authenticated;
revoke all on function public.send_match_message(uuid, text) from public;
grant execute on function public.send_match_message(uuid, text) to authenticated;

-- Reports are intentionally not readable by the reported user. Moderation workflows
-- require a trusted server/admin role and are not exposed to ordinary clients.
