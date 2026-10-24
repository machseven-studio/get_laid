-- Apply in Supabase SQL Editor after reviewing in a non-production project.
-- Stores onboarding answers in a dedicated profile row when a new auth user is created.
alter table public.profiles
  add column if not exists birth_date date,
  add column if not exists gender text,
  add column if not exists show_me text,
  add column if not exists city text,
  add column if not exists education text,
  add column if not exists work text,
  add column if not exists intent text,
  add column if not exists likes text[] not null default '{}',
  add column if not exists dislikes text[] not null default '{}',
  add column if not exists habits text[] not null default '{}';

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (
    id, display_name, bio, birth_date, gender, show_me, city,
    education, work, intent, likes, dislikes, habits
  ) values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'display_name',''), 'New member'),
    coalesce(new.raw_user_meta_data->>'bio',''),
    nullif(new.raw_user_meta_data->>'birth_date','')::date,
    new.raw_user_meta_data->>'gender',
    new.raw_user_meta_data->>'show_me',
    new.raw_user_meta_data->>'city',
    new.raw_user_meta_data->>'education',
    new.raw_user_meta_data->>'work',
    new.raw_user_meta_data->>'intent',
    coalesce(array(select jsonb_array_elements_text(coalesce(new.raw_user_meta_data->'likes','[]'::jsonb))), '{}'),
    coalesce(array(select jsonb_array_elements_text(coalesce(new.raw_user_meta_data->'dislikes','[]'::jsonb))), '{}'),
    coalesce(array(select jsonb_array_elements_text(coalesce(new.raw_user_meta_data->'habits','[]'::jsonb))), '{}')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Users may read and update only their own private profile row.
drop policy if exists "Authenticated users can read profiles" on public.profiles;
create policy "Users can read their own profile"
  on public.profiles for select to authenticated using (auth.uid() = id);
