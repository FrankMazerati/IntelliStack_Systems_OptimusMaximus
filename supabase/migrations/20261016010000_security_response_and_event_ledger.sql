-- IntelliStack privileged response controls and append-only security event ledger.
-- This migration creates server-side data structures only. It does NOT execute
-- endpoint actions; connect a trusted server-side response service before use.
begin;

create table if not exists public.security_response_actions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  requested_by uuid not null references auth.users(id) on delete restrict,
  approved_by uuid references auth.users(id) on delete restrict,
  executed_by uuid references auth.users(id) on delete restrict,
  action_type text not null check (action_type in (
    'isolate_device',
    'release_device_isolation',
    'disable_user',
    'revoke_user_sessions',
    'force_password_reset',
    'block_indicator'
  )),
  target_type text not null check (target_type in ('device','user','ip_address','domain','file_hash')),
  target_id text not null,
  reason text not null check (length(trim(reason)) between 8 and 2000),
  severity text not null default 'high' check (severity in ('medium','high','critical')),
  status text not null default 'pending_approval' check (status in (
    'pending_approval','approved','rejected','queued','executing',
    'succeeded','failed','cancelled','expired'
  )),
  approval_required boolean not null default true,
  requested_at timestamptz not null default now(),
  decided_at timestamptz,
  executed_at timestamptz,
  expires_at timestamptz,
  idempotency_key text not null unique,
  connector_key text,
  result_summary text,
  result_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint response_action_approver_differs
    check (approved_by is null or approved_by <> requested_by),
  constraint response_action_decision_consistency
    check (
      (status not in ('approved','rejected') or (approved_by is not null and decided_at is not null))
    )
);

create index if not exists security_response_actions_org_status_idx
  on public.security_response_actions (organization_id, status, requested_at desc);
create index if not exists security_response_actions_target_idx
  on public.security_response_actions (target_type, target_id, requested_at desc);

create table if not exists public.security_event_log (
  id bigint generated always as identity primary key,
  organization_id uuid not null references public.organizations(id) on delete restrict,
  actor_user_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  outcome text not null default 'success' check (outcome in ('success','denied','failure','pending')),
  resource_type text,
  resource_id text,
  correlation_id uuid,
  details jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create index if not exists security_event_log_org_time_idx
  on public.security_event_log (organization_id, occurred_at desc);
create index if not exists security_event_log_correlation_idx
  on public.security_event_log (correlation_id);

alter table public.security_response_actions enable row level security;
alter table public.security_event_log enable row level security;

-- Intentionally no browser-facing policies. All writes and reads must pass through
-- trusted server-side code that authenticates, authorizes, and records each action.
revoke all on table public.security_response_actions from anon, authenticated;
revoke all on table public.security_event_log from anon, authenticated;
grant select, insert, update on table public.security_response_actions to service_role;
grant select, insert on table public.security_event_log to service_role;
grant usage, select on sequence public.security_event_log_id_seq to service_role;

create or replace function public.prevent_security_event_mutation()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  raise exception 'security_event_log is append-only';
end;
$$;

drop trigger if exists security_event_log_no_update on public.security_event_log;
create trigger security_event_log_no_update
before update or delete on public.security_event_log
for each row execute function public.prevent_security_event_mutation();

comment on table public.security_response_actions is
  'Privileged incident-response action queue. Server-only; does not itself execute endpoint actions.';
comment on table public.security_event_log is
  'Append-only security event ledger. Server-only; export to protected external logging for production tamper resistance.';

commit;
