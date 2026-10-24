-- Spark & Vouch initial database scaffold.
-- Test in a disposable Supabase project before use. This is not production-ready.
-- Matching, message creation, storage policies, and reveal progression need server-side
-- RPCs with explicit authorization checks and automated tests before launch.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 80),
  bio text not null default '' check (char_length(bio) <= 500),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vouches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  audio_path text not null,
  duration_seconds integer check (duration_seconds between 1 and 180),
  created_at timestamptz not null default now(),
  unique (user_id, audio_path)
);

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  user_a uuid not null references auth.users(id) on delete cascade,
  user_b uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'active', 'expired', 'blocked')),
  created_at timestamptz not null default now(),
  expires_at timestamptz,
  check (user_a <> user_b),
  check (user_a < user_b),
  unique (user_a, user_b)
);

create table if not exists public.match_interests (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (match_id, user_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now()
);

create index if not exists messages_match_created_idx on public.messages (match_id, created_at);
create index if not exists matches_users_status_idx on public.matches (user_a, user_b, status);
create index if not exists interests_match_user_idx on public.match_interests (match_id, user_id);

alter table public.profiles enable row level security;
alter table public.vouches enable row level security;
alter table public.matches enable row level security;
alter table public.match_interests enable row level security;
alter table public.messages enable row level security;

create policy "Authenticated users can read profiles" on public.profiles for select to authenticated using (true);
create policy "Users can insert their own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "Authenticated users can read vouch metadata" on public.vouches for select to authenticated using (true);
create policy "Users can create their own vouches" on public.vouches for insert to authenticated with check (auth.uid() = user_id);
create policy "Users can delete their own vouches" on public.vouches for delete to authenticated using (auth.uid() = user_id);

create policy "Participants can read matches" on public.matches for select to authenticated using (auth.uid() = user_a or auth.uid() = user_b);
create policy "Participants can read interests" on public.match_interests for select to authenticated using (exists (select 1 from public.matches m where m.id = match_id and auth.uid() in (m.user_a, m.user_b)));
create policy "Participants can read active match messages" on public.messages for select to authenticated using (exists (select 1 from public.matches m where m.id = match_id and m.status = 'active' and auth.uid() in (m.user_a, m.user_b)));

-- Intentionally no direct client insert/update policies for matches, interests, or messages.
-- Add audited server-side RPCs before allowing users to create matches or send messages.
