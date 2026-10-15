-- IntelliStack Systems: extensible enterprise role and policy catalog
-- Apply after supabase/schema.sql in a non-production Supabase project first.
-- This migration seeds role definitions and permission keys; it does not grant access
-- to real users or replace server-side authorization checks.

create table if not exists public.access_groups (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  is_enabled boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, name)
);
create index if not exists access_groups_org_enabled_idx
  on public.access_groups(organization_id, is_enabled, name);

create table if not exists public.access_group_memberships (
  group_id uuid not null references public.access_groups(id) on delete cascade,
  membership_id uuid not null references public.organization_memberships(id) on delete cascade,
  assigned_by uuid references auth.users(id) on delete set null,
  assigned_at timestamptz not null default now(),
  primary key (group_id, membership_id)
);

create table if not exists public.access_policies (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  policy_type text not null check (policy_type in ('access','approval','device','session','data','automation')),
  effect text not null default 'allow' check (effect in ('allow','deny','require_approval')),
  subject jsonb not null default '{}'::jsonb,
  resource jsonb not null default '{}'::jsonb,
  conditions jsonb not null default '{}'::jsonb,
  is_enabled boolean not null default true,
  priority integer not null default 100,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, name)
);
create index if not exists access_policies_org_active_idx
  on public.access_policies(organization_id, is_enabled, priority);

alter table public.access_groups enable row level security;
alter table public.access_group_memberships enable row level security;
alter table public.access_policies enable row level security;

create policy "members can read organization access groups"
  on public.access_groups for select using (public.is_org_member(organization_id));
create policy "members can read access group membership"
  on public.access_group_memberships for select using (
    exists (
      select 1 from public.organization_memberships m
      where m.id = membership_id and public.is_org_member(m.organization_id)
    )
  );
create policy "members can read organization access policies"
  on public.access_policies for select using (public.is_org_member(organization_id));

-- Catalog of explicit capabilities. These are keys, not grants by themselves.
insert into public.permissions(permission_key, description) values
 ('identity.read','View identity and sign-in posture'),
 ('identity.manage','Manage identity settings and lifecycle'),
 ('identity.mfa.manage','Manage MFA enrollment and recovery for permitted users'),
 ('identity.sso.manage','Configure enterprise single sign-on'),
 ('groups.read','View access groups'),
 ('groups.manage','Create groups and manage group membership'),
 ('policies.read','View access and governance policies'),
 ('policies.manage','Create, edit, enable, and disable policies'),
 ('roles.read','View role definitions and assignments'),
 ('permissions.read','View permission catalog and effective access'),
 ('access.review','Perform access reviews and attestations'),
 ('security.alerts.read','View security alerts in permitted scope'),
 ('security.incidents.manage','Investigate and coordinate security incidents'),
 ('network.monitor','View network health and traffic telemetry'),
 ('network.manage','Manage approved network configuration'),
 ('devices.manage','Manage device configuration and lifecycle'),
 ('integrations.read','View connected systems and integration health'),
 ('integrations.manage','Configure integrations and credentials references'),
 ('workflows.read','View automation workflows and run history'),
 ('workflows.manage','Create and administer automation workflows'),
 ('reports.executive.read','View approved executive reports'),
 ('finance.read','View permitted finance records and reports'),
 ('hr.read','View permitted workforce records'),
 ('hr.manage','Manage permitted workforce records'),
 ('service_desk.manage','Manage service desk queues, assignments, and SLAs'),
 ('audit.export','Export permitted audit evidence'),
 ('knowledge.publish','Publish organization knowledge articles'),
 ('marketplace.manage','Manage marketplace listings and partner access')
on conflict (permission_key) do nothing;

-- System roles remain distinct from job titles, departments, and account types.
-- Organization-specific custom roles can be added by authorized administrators.
insert into public.roles (organization_id, name, description, is_system_role)
select null, seed.name, seed.description, true
from (values
 ('Super Admin','Platform-wide administration; use only for explicitly authorized platform operators.'),
 ('Help Desk Agent','Ticket intake, triage, assignment, and resolution within assigned queues.'),
 ('IT Administrator','Technical administration of permitted users, devices, infrastructure, and integrations.'),
 ('Governance & Compliance','Policy oversight, audit review, risk, and compliance evidence.'),
 ('IT Director / Systems Engineer','Scoped technical oversight and systems engineering.'),
 ('Network Administrator / Network Engineer','Network health, telemetry, and approved network configuration.'),
 ('Device Management Administrator','Endpoint inventory, device policies, and controlled update operations.'),
 ('Security Operations Analyst','Security alert triage, investigations, and incident coordination.'),
 ('Identity & Access Administrator','Identity lifecycle, MFA/SSO configuration, and access assignments.'),
 ('Integration Administrator','Connected applications, integration health, and secure configuration.'),
 ('Automation / Workflow Administrator','Workflow design, testing, publishing, and execution controls.'),
 ('Auditor / Compliance Reviewer','Read-only compliance review and permitted audit evidence access.'),
 ('Service Desk Manager','Service desk queues, escalations, and team performance.'),
 ('Asset / Inventory Manager','Asset inventory and lifecycle administration.'),
 ('Executive / CEO','Executive workspace and explicitly approved enterprise reports.'),
 ('Finance / CFO','Finance workspace and explicitly granted finance capabilities.'),
 ('HR Administrator','Workforce administration within HR data boundaries.'),
 ('Department Manager','Team workspace, requests, and delegated approvals within assigned scope.'),
 ('Standard Employee','Personal workspace and standard employee applications.'),
 ('Contractor / Temporary Worker','Time-bound access to assigned workspaces and resources.'),
 ('Vendor / Business Partner','Explicitly authorized external collaboration and resources.'),
 ('Customer / Marketplace User','Customer-facing or marketplace capabilities explicitly assigned.')
) as seed(name, description)
where not exists (
  select 1 from public.roles r
  where r.organization_id is null and r.name = seed.name
);

-- Conservative starter role grants. Super Admin is broad by design; production should
-- still require an authenticated platform-owner identity and should log privileged changes.
with grants(role_name, permission_key) as (
 values
 ('Super Admin','organization.read'),('Super Admin','organization.manage'),
 ('Super Admin','departments.read'),('Super Admin','departments.manage'),
 ('Super Admin','users.read'),('Super Admin','users.manage'),
 ('Super Admin','roles.manage'),('Super Admin','roles.read'),('Super Admin','permissions.read'),
 ('Super Admin','groups.read'),('Super Admin','groups.manage'),
 ('Super Admin','policies.read'),('Super Admin','policies.manage'),('Super Admin','access.review'),
 ('Super Admin','identity.read'),('Super Admin','identity.manage'),('Super Admin','identity.mfa.manage'),('Super Admin','identity.sso.manage'),
 ('Super Admin','tickets.read'),('Super Admin','tickets.create'),('Super Admin','tickets.update'),
 ('Super Admin','assets.read'),('Super Admin','assets.manage'),
 ('Super Admin','knowledge.read'),('Super Admin','knowledge.manage'),('Super Admin','knowledge.publish'),
 ('Super Admin','audit.read'),('Super Admin','audit.export'),
 ('Super Admin','security.alerts.read'),('Super Admin','security.incidents.manage'),
 ('Super Admin','network.monitor'),('Super Admin','network.manage'),
 ('Super Admin','integrations.read'),('Super Admin','integrations.manage'),
 ('Super Admin','workflows.read'),('Super Admin','workflows.manage'),
 ('Super Admin','ai.search'),('Super Admin','ai.action.request'),('Super Admin','ai.action.approve'),
 ('Help Desk Agent','tickets.read'),('Help Desk Agent','tickets.create'),('Help Desk Agent','tickets.update'),
 ('Help Desk Agent','knowledge.read'),('Help Desk Agent','ai.search'),
 ('IT Administrator','users.read'),('IT Administrator','departments.read'),
 ('IT Administrator','assets.read'),('IT Administrator','assets.manage'),
 ('IT Administrator','devices.manage'),('IT Administrator','network.monitor'),
 ('IT Administrator','integrations.read'),('IT Administrator','integrations.manage'),
 ('IT Administrator','tickets.read'),('IT Administrator','tickets.update'),
 ('IT Administrator','knowledge.read'),('IT Administrator','ai.search'),('IT Administrator','ai.action.request'),
 ('Governance & Compliance','organization.read'),('Governance & Compliance','departments.read'),
 ('Governance & Compliance','roles.read'),('Governance & Compliance','permissions.read'),
 ('Governance & Compliance','policies.read'),('Governance & Compliance','access.review'),
 ('Governance & Compliance','audit.read'),('Governance & Compliance','audit.export'),
 ('Governance & Compliance','knowledge.read'),
 ('IT Director / Systems Engineer','assets.read'),('IT Director / Systems Engineer','assets.manage'),
 ('IT Director / Systems Engineer','devices.manage'),('IT Director / Systems Engineer','network.monitor'),
 ('Network Administrator / Network Engineer','network.monitor'),('Network Administrator / Network Engineer','network.manage'),
 ('Device Management Administrator','assets.read'),('Device Management Administrator','assets.manage'),('Device Management Administrator','devices.manage'),
 ('Security Operations Analyst','security.alerts.read'),('Security Operations Analyst','security.incidents.manage'),('Security Operations Analyst','audit.read'),
 ('Identity & Access Administrator','users.read'),('Identity & Access Administrator','identity.read'),
 ('Identity & Access Administrator','identity.manage'),('Identity & Access Administrator','identity.mfa.manage'),
 ('Identity & Access Administrator','identity.sso.manage'),('Identity & Access Administrator','groups.read'),('Identity & Access Administrator','groups.manage'),
 ('Integration Administrator','integrations.read'),('Integration Administrator','integrations.manage'),
 ('Automation / Workflow Administrator','workflows.read'),('Automation / Workflow Administrator','workflows.manage'),
 ('Auditor / Compliance Reviewer','audit.read'),('Auditor / Compliance Reviewer','policies.read'),('Auditor / Compliance Reviewer','access.review'),
 ('Service Desk Manager','tickets.read'),('Service Desk Manager','tickets.create'),('Service Desk Manager','tickets.update'),('Service Desk Manager','service_desk.manage'),
 ('Asset / Inventory Manager','assets.read'),('Asset / Inventory Manager','assets.manage'),
 ('Executive / CEO','reports.executive.read'),
 ('Finance / CFO','finance.read'),
 ('HR Administrator','hr.read'),('HR Administrator','hr.manage'),
 ('Department Manager','tickets.read'),('Department Manager','tickets.create'),
 ('Standard Employee','tickets.create'),('Standard Employee','knowledge.read'),('Standard Employee','ai.search'),
 ('Contractor / Temporary Worker','tickets.create'),('Contractor / Temporary Worker','knowledge.read'),
 ('Vendor / Business Partner','knowledge.read'),
 ('Customer / Marketplace User','knowledge.read')
)
insert into public.role_permissions(role_id, permission_id)
select r.id, p.id
from grants g
join public.roles r on r.organization_id is null and r.name = g.role_name
join public.permissions p on p.permission_key = g.permission_key
on conflict (role_id, permission_id) do nothing;

-- Audit changes to role and permission mappings, including grant/revoke operations.
create or replace function public.audit_access_mapping_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_role_id uuid;
  target_org_id uuid;
  target_name text;
  action_name text;
begin
  target_role_id := coalesce(new.role_id, old.role_id);
  select r.organization_id, r.name into target_org_id, target_name
  from public.roles r where r.id = target_role_id;
  action_name := tg_table_name || '.' || lower(tg_op);
  if target_org_id is not null then
    insert into public.audit_events(organization_id, actor_user_id, action, resource_type, resource_id, outcome, metadata)
    values (target_org_id, auth.uid(), action_name, tg_table_name, target_role_id::text, 'success',
      jsonb_build_object('role_name', target_name, 'operation', tg_op));
  end if;
  return coalesce(new, old);
end;
$$;

drop trigger if exists audit_role_permissions_changes on public.role_permissions;
create trigger audit_role_permissions_changes
after insert or update or delete on public.role_permissions
for each row execute function public.audit_access_mapping_change();

drop trigger if exists audit_membership_roles_changes on public.membership_roles;
create trigger audit_membership_roles_changes
after insert or update or delete on public.membership_roles
for each row execute function public.audit_access_mapping_change();

-- IMPORTANT: the current starter schema intentionally has no broad client-side write
-- policies for these administrative tables. Add tightly scoped server-side RPCs or
-- policies that check roles.manage / groups.manage / policies.manage before enabling writes.
