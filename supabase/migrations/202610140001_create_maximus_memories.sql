-- Maximus Optimus: first persistent memory table.
-- Each signed-in user can access only their own memories.
create table if not exists public.maximus_memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default '',
  content text not null,
  memory_type text not null default 'note'
    check (memory_type in ('note', 'conversation', 'decision', 'project', 'document')),
  source text not null default 'manual',
  metadata jsonb not null default '{}'::jsonb,
  search_vector tsvector generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'B')
  ) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists maximus_memories_user_created_idx
  on public.maximus_memories (user_id, created_at desc);
create index if not exists maximus_memories_search_idx
  on public.maximus_memories using gin (search_vector);

alter table public.maximus_memories enable row level security;
revoke all on table public.maximus_memories from anon;
grant select, insert, update, delete on table public.maximus_memories to authenticated;

drop policy if exists "Users can read their own Maximus memories" on public.maximus_memories;
create policy "Users can read their own Maximus memories"
  on public.maximus_memories for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can add their own Maximus memories" on public.maximus_memories;
create policy "Users can add their own Maximus memories"
  on public.maximus_memories for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own Maximus memories" on public.maximus_memories;
create policy "Users can update their own Maximus memories"
  on public.maximus_memories for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own Maximus memories" on public.maximus_memories;
create policy "Users can delete their own Maximus memories"
  on public.maximus_memories for delete to authenticated
  using ((select auth.uid()) = user_id);
