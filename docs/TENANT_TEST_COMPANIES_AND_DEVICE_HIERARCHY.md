# IntelliStack Systems — Access Control, Synthetic Tenants & Device Hierarchy Baseline

**Status:** Proposed design and test-data specification; not evidence of deployed permissions or provisioned users.  
**Build group:** IS-B03 — Platform Identity & Workspace  
**Related module IDs:** IS-001, IS-002, IS-008, IS-020, IS-022, IS-035, IS-038, IS-040, IS-043, IS-044, IS-045, IS-046, IS-048, IS-049, IS-050.  
**Repository baseline inspected:** `main` at commit `90828ed8702870be2992855e6bbb4b6ce37fb4ec` (2026-10-16).

## 1. Policy decisions approved as the proposed baseline

1. **Multi-tenant model:** five synthetic customer companies, each with strict tenant data isolation.
2. **Access approvals:** department managers approve routine, in-scope requests; Super Admin approves privileged/platform-wide access. High-risk access may require two-person approval.
3. **Restricted controls:** show discoverable features as disabled/grayed out with the label “Need more access” and a working “Request access” action. Hide controls whose visibility itself would expose sensitive capabilities or information.
4. **Duration:** temporary access by default. Permanent access must be explicitly requested and approved. Temporary grants require expiry and revocation.
5. **Least privilege:** role, tenant membership, room membership, resource scope, device assignment, and action permission are separate checks. A room membership must not silently elevate a user's role.
6. **Auditing:** record access requests, approvals/denials, grant/revoke events, privileged actions, tenant/device scope changes, and relevant troubleshooting access.

## 2. Permanent module mapping

| Module ID | Module | Responsibility |
|---|---|---|
| IS-001 | IntelliStack Identity & Access | Authentication identity, sign-in and identity lifecycle |
| IS-002 | Role & Permission Manager | Role definitions, permission grants and scoped authorization |
| IS-008 | User Profile & Preferences | Personal profile and preferences |
| IS-020 | IT Administrator Workroom | Authorized technical operations |
| IS-022 | Governance & Compliance Workroom | Compliance work and authorized oversight |
| IS-035 | IntelliStack Chat & Collaboration | Direct, department-room and breakout-room communication |
| IS-038 | Connector Hub | Approved external service connections |
| IS-040 | IntelliSync | Device association and cross-device synchronization |
| IS-043 | Security & System Health Center | Security posture and service health |
| IS-044 | Audit Trail & Activity History | Immutable-style event history and audit views |
| IS-045 | Governance, Policy & Compliance Manager | Policies, controls and compliance workflows |
| IS-046 | Reporting & Analytics Center | Tenant-scoped and platform-authorized reporting |
| IS-048 | User, Team & Organization Manager | Tenants, users, departments, room membership and org structure |
| IS-049 | Module Registry & Configuration Manager | Module availability and feature configuration |
| IS-050 | Integration & Deployment Health | Deployment, integration and environment status |

Module IDs are permanent identifiers. Names, navigation positions and build groups may change without changing IDs. Proposed build group: **IS-B03 Platform Identity & Workspace**; cross-cutting security/audit components may be implemented with IS-B07, but authorization contracts must be designed before dependent features are released.

## 3. Synthetic tenant directory

All entries below are fictional demonstration data. The street addresses are clearly designated demo addresses and must not be treated as verified business locations. Email addresses use the reserved `example.com` domain, which is for documentation/testing and is not an actual mailbox. Phone numbers use the North American fictional 555-01xx range. No real contact details are intended.

| Tenant ID | Synthetic company | Demo address | Main phone (fictional) | Test contact email | Simulated users |
|---|---|---|---|---|---:|
| TEN-DEMO-001 | Northstar Harbor Technologies, Inc. | 1000 Demo Harbor Way, Suite 400, Chicago, IL 60601, USA | +1-312-555-0101 | it-ops@northstarharbor.example.com | 400,000 |
| TEN-DEMO-002 | BluePeak Medical Systems, LLC | 2000 Sample Lake Avenue, Suite 210, Minneapolis, MN 55401, USA | +1-612-555-0102 | service-desk@bluepeakmedical.example.com | 400,000 |
| TEN-DEMO-003 | Meridian Forge Manufacturing Group | 3000 Test Foundry Road, Building B, Detroit, MI 48226, USA | +1-313-555-0103 | support@meridianforge.example.com | 400,000 |
| TEN-DEMO-004 | Cedarline Financial Cooperative | 4000 Example Exchange Plaza, Floor 8, Columbus, OH 43215, USA | +1-614-555-0104 | compliance@cedarlinefinancial.example.com | 400,000 |
| TEN-DEMO-005 | Sunfield Atlas Logistics Corporation | 5000 Mock Gateway Boulevard, Suite 120, Dallas, TX 75201, USA | +1-214-555-0105 | operations@sunfieldatlas.example.com | 400,000 |

**Scale target:** 400,000 simulated user records per tenant; 2,000,000 across all five tenants. Do not create two million real authentication identities just to populate the demo. Use deterministic synthetic profile records or a load-test generator, and create only the small number of real test identities needed for interactive authentication. Performance/load data should be seeded in batches and should be removable/resettable.

**Email delivery note:** the listed addresses are intentionally non-deliverable mock contacts. Test message composition, recipient routing, templates, and delivery events with a sandbox provider (for example, Mailtrap or another configured test SMTP/API provider). Do not treat the `example.com` addresses as mailboxes and do not send production mail to them.

## 4. Interactive seed personas per tenant

Create five **test personas per tenant** (25 personas total), one for each key company-side function. These are planned records/personas, not claims that accounts have already been provisioned. Generate unique, tenant-specific email aliases under `example.com`; never reuse credentials between tenants.

| Persona | Example alias pattern | Default role | Room membership |
|---|---|---|---|
| Company Administrator | `tenant-admin+TEN-DEMO-001@example.com` | Tenant Admin (custom tenant-scoped role; not global Super Admin) | Company Admin Room |
| Help Desk Agent | `helpdesk+TEN-DEMO-001@example.com` | Help Desk Agent | Help Desk Room |
| IT Administrator | `it-admin+TEN-DEMO-001@example.com` | IT Administrator | IT Administration Room |
| Governance & Compliance | `governance+TEN-DEMO-001@example.com` | Governance & Compliance | Governance & Compliance Room |
| Employee / Requester | `employee+TEN-DEMO-001@example.com` | Employee / Requester | General Employee Room |

Replace the tenant suffix for each tenant. If the identity provider does not accept plus-addressing, use unique local parts such as `ten-demo-001-helpdesk@example.com`. Do not commit passwords, API keys, recovery codes, or other secrets. Seed credentials, if required, must be injected through local/CI secrets and must be test-only.

Frank Maserati's **Super Admin** identity is a platform operator identity and is not a tenant employee persona. Platform-wide access must be explicitly distinguished from tenant-local administration.

## 5. Department and room template

Each synthetic tenant should receive the same initial organization template, customizable by that tenant:

- Executive & Company Administration
- Help Desk / Service Desk
- IT Administration & Network Operations
- Governance & Compliance
- General Employees / Requesters
- Optional project, incident, audit, and other breakout rooms

Room membership grants access only to that room's authorized conversations, files and resources. A person may belong to multiple rooms. Breakout rooms can be created by authorized users and should support owner, members, purpose, sensitivity, retention, and expiry/archive settings.

## 6. Proposed default access model

| Capability | Platform Super Admin | Tenant Admin | Help Desk Agent | IT Administrator | Governance & Compliance | Employee / Requester |
|---|---|---|---|---|---|---|
| Own profile/preferences | Manage own | Own | Own | Own | Own | Own |
| View own tenant's home/workspace | Platform view | Tenant view | Standard | Standard | Standard | Standard |
| Manage tenant users and rooms | Platform oversight; scoped actions audited | Within own tenant | Request | Delegated scope only | Review/limited | No |
| View/handle service tickets | Authorized support scope | Tenant scope | Assigned/authorized queues | Technical queues | Audit/compliance scope | Own requests |
| Manage technical infrastructure | Platform scope where explicitly granted | No by default | No | Tenant technical scope | No by default | No |
| Governance policies and evidence | Platform oversight | Tenant settings as delegated | No by default | Technical control evidence only | Assigned compliance scope | No |
| Audit events | Platform-authorized and audited | Own tenant | Own/relevant ticket events only | Relevant technical events | Authorized compliance evidence | Own activity where appropriate |
| Change roles/privileges | Privileged action with strong audit controls | Tenant-local, limited role set | No | No by default | No by default | No |
| Approve routine access | Privileged policy/exception review | Delegated manager scope | No by default | Delegated only if explicitly assigned | Delegated only if explicitly assigned | No |
| Approve privileged access | Yes, subject to policy and audit | No | No | No | No | No |
| View device diagnostics | Only for authorized scope; support access audited | Tenant-scoped overview | Assigned support cases | Authorized tenant/device scope | Evidence/oversight scope | Own registered devices only |
| Cross-tenant data | Only explicit platform support scope; audited and justified | Never | Never | Never by default | Never by default | Never |

The Super Admin must not use an ordinary tenant role to bypass tenant isolation. Exceptional cross-tenant support access should be time-bound, reason-coded, narrowly scoped, visible in the audit log, and subject to the platform's privileged-access policy.

## 7. Request and approval workflow

Every access request should include requester, tenant ID, target user, module ID, permission/action, requested resource scope, business justification, requested duration, approver, decision, decision reason, and timestamps.

- Routine request: route to the designated department manager for the relevant tenant and scope.
- Privileged request: route to Super Admin; high-risk operations can require an independent second approval.
- Temporary grant: default expiry is required; show expiry to requester and approver and automatically revoke at expiry.
- Permanent grant: require an explicit permanent-access option, justification, and approval. Periodically recertify high-risk permanent grants.
- Denied/restricted UI: show “Need more access” and a functional “Request access” action when discovery is safe. Never rely on disabled buttons alone for security.
- Enforcement: backend APIs and database policies must independently reject unauthorized requests, regardless of what the UI displays.

## 8. Global-to-device management hierarchy

The Super Admin management view should support drill-down without mixing scope:

1. **Global Platform** — platform health, deployment/environment status, aggregate tenant counts, cross-platform alerts and approved operational metrics.
2. **Customer Tenant** — tenant identity, subscription/configuration status, synthetic user population, tenant health and scoped support status.
3. **Organization / Department** — teams, department rooms, room owners, workload and department-specific service indicators.
4. **Room / Project / Incident** — authorized members, related tickets, conversations, documents, alerts and audit activity.
5. **User** — profile, role assignments, room memberships, access requests, active sessions and assigned devices, according to permission.
6. **Device** — device ID, owner, tenant, enrollment/management state, OS/platform, last check-in, sync health, agent/app version, network/connection diagnostics, patch/security posture, and related incidents.
7. **Diagnostic / Event** — timestamped events, correlation/request IDs, error codes, sanitized logs, relevant health checks, actions taken and resolution status.

Every level must retain a visible breadcrumb and scope badge, such as `Global Platform > TEN-DEMO-003 > IT Administration > Incident Room > User > Device`. The user must always know which tenant and device they are inspecting.

Device troubleshooting must be consented/authorized and purpose-bound. Collect only necessary diagnostics; redact secrets and sensitive content from logs. Remote actions require explicit permission, audit records and appropriate confirmation. Cross-tenant support access should be time-limited and independently visible.

Related modules: IS-043 Security & System Health Center, IS-044 Audit Trail & Activity History, IS-048 User/Team/Organization Manager, IS-040 IntelliSync, IS-050 Integration & Deployment Health.

## 9. Architecture and isolation requirements

Repository inspection found an existing Supabase schema with tables for `organizations`, `departments`, `profiles`, `organization_memberships`, `roles`, `permissions`, `role_permissions`, `membership_roles`, `tickets`, `assets`, `knowledge_articles`, `audit_events`, and `ai_action_approvals`. The schema enables row-level security (RLS) on those tables and has membership-scoped read policies. It does **not** prove that the complete production tenant architecture is implemented or validated.

Before calling the tenant architecture production-ready, implement and test:

- Tenant ID on every tenant-owned record, with referential integrity and indexes.
- RLS policies for both reads and writes; writes should use validated permission checks or narrowly scoped server-side functions.
- No client-supplied tenant ID trusted without checking authenticated membership and permission.
- Automated negative tests proving Tenant A cannot enumerate/read/update/delete Tenant B's records through UI, API, direct database access, exports, search, analytics, file storage, logs, or background jobs.
- Tenant-scoped room memberships, access requests, device inventory, device telemetry, and troubleshooting events.
- Clear distinction between platform-global roles and tenant-local roles.
- Explicit access request and time-bound grant data model, including expiry/revocation.
- Safe synthetic data generation and cleanup; avoid storing 2M full user objects if a deterministic virtual dataset or load generator meets the test need.
- Pagination, indexes, background batching and load tests at 400,000 simulated users per tenant.
- Audit coverage for privilege changes, cross-tenant support access, device diagnostics and export/download.
- Migration rollback and CI validation.

## 10. Acceptance tests

- [ ] Five tenant records exist in a non-production/test environment with unique stable IDs.
- [ ] Each tenant's display population is 400,000 synthetic users (or clearly labeled load-test target until generated).
- [ ] Five interactive test personas are defined per tenant; account provisioning status is tracked separately.
- [ ] No tenant can read another tenant's users, rooms, tickets, assets, documents, audit records, device data, or access requests.
- [ ] Room membership does not elevate role permissions.
- [ ] Restricted discoverable controls show “Need more access” and open an access request form.
- [ ] Routine requests route to the authorized department manager.
- [ ] Privileged requests route to Super Admin.
- [ ] Temporary grants expire and stop working at expiry, including at backend/API level.
- [ ] Permanent access requires an explicit choice and approval.
- [ ] Global-to-device breadcrumbs retain tenant scope throughout drill-down.
- [ ] Diagnostic access and remote actions are permission-checked and audited.
- [ ] Sandbox email tests do not send to real customer mailboxes.
- [ ] Build, migration, policy tests and tenant-isolation tests pass before deployment.

## 11. Current implementation status

This document records the proposed baseline. Repository inspection at the stated `main` commit confirmed an existing Supabase organization/membership/role/permission schema and RLS-enabled tables. It did not establish that five tenants have been seeded, that 2,000,000 synthetic users exist, that device-level drill-down is wired end-to-end, or that all access-request and expiry workflows are implemented. Those items remain implementation and verification work until backed by code, migrations, test results and environment checks.
