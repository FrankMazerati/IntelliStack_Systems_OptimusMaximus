# Maximus Optimus — Master Product Blueprint
**Product:** IntelliStack Systems — Maximus Optimus IT Operations Console  
**Status:** Product specification / source of truth  
**Purpose:** Define the product architecture and requirements before implementation. This document describes intended capabilities; it does not claim they are already implemented.

## Product vision
Build a modular, responsive IT operations platform that combines command-center visibility, AI-assisted troubleshooting, IT service management, team collaboration, incident War Rooms, automation, infrastructure inventory, and extensible connectors. The interface must work well on Android tablets and phones as well as desktop.

## Core product principles
- One connected system: a change to a ticket, asset, incident, connector, or user should update every authorized view that depends on it.
- Supabase is the system of record for application data; use shared data access and Supabase Realtime where appropriate.
- Demo data must be clearly marked as simulated and must remain separate from live/production integrations.
- Modular architecture: feature modules and connector adapters should be registered through stable interfaces rather than hard-coded into every page.
- Security by default: server-side authorization, least privilege, audit logs, safe secret handling, and approval gates for risky operations.
- Responsive, accessible UI with clear loading, empty, success, and error states.
- Treat proposed capabilities as planned until they have been implemented and tested.

## Main navigation
1. Global Command
2. Optimus AI
3. Teams Chat
4. War Room
5. Service Desk
6. Infrastructure Intelligence
7. Automation Foundry
8. Script Arsenal
9. Knowledge Vault
10. Assets & CMDB
11. Change Management
12. Reports & Analytics
13. Connector Hub
14. Administration

## 1. Global Command dashboard
- Global operational overview: service health, open/high-priority/overdue tickets, active incidents, alerts, automation status, SLA indicators, and recent activity.
- Personalized views by role, team, region, office, or city.
- Quick actions: create ticket, open War Room, ask AI, launch approved workflow, find asset.
- Dashboard cards, charts, queues, and summaries must derive from persisted records, not hard-coded totals.
- Every mutation that affects a metric should refresh relevant views promptly without requiring a manual page reload.

## 2. Ticket and service desk lifecycle
Support creating, viewing, searching, editing, assigning, prioritizing, commenting on, resolving, closing, and reopening tickets.
- Fields include ticket ID, title, description, type/category, priority, impact, urgency, status, requester, assignee, team, location, related asset/service, created/updated timestamps, due date/SLA, resolution details, and tags.
- Maintain work notes, comments, attachments where supported, status history, and a timestamped audit trail.
- Validate status transitions and permissions. Suggested lifecycle: New/Open → Assigned → In Progress → Pending/On Hold → Resolved → Closed; allow reopening according to policy.
- Resolution should capture resolution summary/code and verification notes where appropriate.
- Ticket creation updates dashboard counters, recent activity, queues, assignee/team workload, SLA indicators, and reports.
- Assignment changes update technician/team workload and relevant notifications.
- Resolution/closure changes update open/resolved counts and operational reporting.
- Ticket changes associated with a War Room should appear in that incident's activity stream.
- Use optimistic UI only with reliable rollback/error handling; persisted server/database state is authoritative.
- Make updates consistent across open tabs/sessions with Supabase Realtime or equivalent subscriptions, plus revalidation/refetch for reliability.
- Avoid duplicate events and stale counts; derive aggregates from authoritative records or maintained, verified aggregates.

## 3. Teams Chat
- One-to-one direct messages and named group conversations.
- Create/edit groups, invite/remove members, manage membership, and set group details.
- Teams and channels for departments, projects, locations, and specialties.
- Message threads/replies, mentions, unread indicators, presence/availability, notifications, searchable history, and file attachments where safely supported.
- Link messages/conversations to tickets, assets, changes, workflows, and War Rooms.
- Enforce membership-based access to private conversations and attachments.
- Future extension points: voice/video meetings and screen sharing; do not imply these exist until implemented.

## 4. War Room / incident command
- Create a room for a major incident or complex investigation.
- Incident title, severity, status, affected service/location, impact, incident commander, responders, participating teams, and timestamps.
- Invite users or groups; manage membership and permissions.
- Dedicated chat/activity stream, timeline of events and decisions, task checklist with owners/status, linked tickets/assets/services/runbooks, status updates, evidence, and recovery actions.
- Connect relevant alerts, tickets, AI recommendations, workflow runs, and monitoring events where integrations exist.
- Close with recovery verification, post-incident review, lessons learned, and follow-up tasks.
- Preserve an auditable incident timeline; only authorized users may perform privileged incident actions.

## 5. Optimus AI assistant
- Natural-language technical help, log/output interpretation, troubleshooting plans, script explanations, incident/ticket summaries, handoff drafts, and knowledge search.
- AI may draft scripts/workflows and recommend changes; execution of impactful operations requires authorization and configurable approval.
- Clearly distinguish observed evidence, inference, and unverified suggestions.
- Use only data the signed-in user is authorized to access.
- Log relevant AI-assisted actions without unnecessarily retaining sensitive prompt contents.
- AI-generated output must not be treated as proof that a fix worked; verification is a separate step.

## 6. Infrastructure Intelligence
- Inventory and health views for networks, endpoints, servers, services, cloud resources, and security signals.
- Location-aware drill-down: global → region → country → city → office → department/team → asset/service.
- DNS/DHCP/connectivity and other diagnostics through approved integrations.
- Service dependencies and relationships between incidents, assets, and business services.
- Real-time status only when supported by a connected source; label simulated/stale data accurately.

## 7. Automation Foundry
- Visual workflow builder and reusable workflow templates.
- Triggers from schedules, webhooks, tickets, alerts, and approved events.
- Conditions, branching, retries, timeouts, error paths, notifications, approvals, execution history, and logs.
- Secure server-side credential references; never expose secrets in client bundles or logs.
- Permission checks before running a workflow; approval gates for sensitive actions.
- Test/dry-run mode where possible; rollback/recovery plans where supported.
- AI-assisted workflow drafting, followed by review and explicit approval.
- Integrate with n8n or other workflow engines through adapters where configured.

## 8. Script Arsenal
- Searchable PowerShell and other approved script library with description, parameters, prerequisites, expected output, risk level, owner, version, and changelog.
- Script validation/testing and execution records where an execution agent is configured.
- Restrict execution by role and environment; require approval for production-impacting scripts.
- Explain commands and show intended effects before execution.
- Store outputs and evidence with appropriate redaction of secrets/personal data.

## 9. Proof of Resolution
For each supported remediation, record:
1. Initial symptom and impact.
2. Diagnostic evidence.
3. Proposed action and approval.
4. Action actually executed.
5. Returned results.
6. Independent verification checks.
7. Final disposition, notes, and follow-up work.
Do not mark an issue resolved solely because a script or workflow exited successfully. Show whether verification passed, failed, or was not available.

## 10. Knowledge Vault
- Searchable runbooks, SOPs, technical documentation, known errors, and verified fixes.
- Versioning, ownership, access scopes, review dates, and links to tickets/assets/services/workflows.
- AI-assisted retrieval and summaries over documents the user is authorized to access.
- Mark draft/unverified knowledge distinctly from reviewed procedures.

## 11. Assets & CMDB
- Assets such as laptops, desktops, servers, network equipment, applications, cloud resources, and business services.
- Ownership, assigned user/team, location, lifecycle status, warranty/serial data where appropriate, and related tickets/incidents.
- Relationship/dependency records and import/export support.
- Demo assets must be visibly labeled as simulated.

## 12. Change Management
- Change requests, description, scope, risk/impact, implementation plan, approvers, maintenance window, test plan, rollback plan, and outcome.
- Link changes to affected assets/services and related tickets/incidents.
- Keep an auditable history of approvals and execution status.

## 13. Reports & Analytics
- Ticket volume, status/priority distribution, SLA performance, time-to-response/resolution, workload, incident trends, and workflow success/failure metrics.
- Filter by time, region, city, team, service, and assignee subject to permissions.
- Clearly identify demo reports and the date range/source of metrics.

## 14. Connector Hub and dynamic extensibility
Administrator-only area to register, configure, test, enable/disable, and monitor connectors and optional modules.
- Connector registry fields: stable ID, display name, category, version, description, status, supported capabilities, configuration schema, required permissions/scopes, health status, last check, and adapter identifier.
- Configuration UI generated from a validated schema; secrets are write-only/masked and stored in server-side secret storage or protected environment configuration.
- Connector health checks, test connection, safe disconnect, error/status logs, version/compatibility information, and enable/disable controls.
- Stable adapter contract for common operations such as health check, capability discovery, and supported resource synchronization/actions.
- Admin UI may register supported adapters dynamically. A new external service that requires new code must have a reviewed, compatible adapter/package deployed first; do not execute arbitrary uploaded code.
- New modules must declare navigation entries, permissions, settings, and event/data contracts. Unsupported capabilities must not be presented as working.
- Examples of planned connectors: Microsoft 365, Entra ID/Active Directory, Intune, SolarWinds, ServiceNow, Jira Service Management, HaloITSM, Zendesk, Supabase, and n8n. Availability depends on credentials, API access, scopes, and implementation.
- Admin may add custom service definitions (e.g. internal service catalogue entries) without code changes, separately from installing executable integrations.

## 15. Administrator and role management
- Platform owner/super-administrator (the product owner) has full administrative access.
- Role management UI to create, rename, edit, clone, disable, and assign custom roles.
- Prefer granular permission-based access control (RBAC with permission scopes) over hard-coded role-name checks.
- Permissions should cover modules and actions: view/create/edit/assign/resolve/close/reopen/delete/export/manage-members/configure-connectors/run-workflows/approve-actions/manage-users/view-audit.
- Support scopes such as organization-wide, region, city, office, team, and own records.
- Suggested starter roles: Super Administrator, Platform Administrator, IT Operations Manager, Incident Commander, Service Desk Manager, IT Technician, Network Engineer, Security Analyst, Automation Engineer, Auditor/Read Only, and Employee/Requester.
- Custom roles and scopes must be enforced server-side and reflected in the UI.
- Log role changes, permission changes, connector changes, and privileged actions in an audit log.
- Protect against removing the last active super administrator or granting privilege escalation accidentally.

## 16. IntelliStack simulated company and demo environment
Provide a believable fictional enterprise dataset for development and demonstrations.
- Fictional global workforce, regional organizations, countries, cities, offices, departments, teams, users, and on-call groups.
- Simulated employees/headcount by global region, country, city, office, and team.
- Simulated devices, servers, network equipment, services, locations, dependencies, tickets, incidents, alerts, changes, workflows, and activity history.
- Demo records should be relationally consistent: tickets reference real seeded users/assets/teams; city totals should roll up to regional/global totals.
- Seed deterministic, repeatable data; include a documented reset/reseed process.
- Mark all mock data as DEMO/SIMULATED and visually distinguish it from connected production data.
- Keep demo and live data isolated by environment/tenant or explicit data source boundaries; never merge fake records into live connected systems.
- Example figures in mockups are illustrative only, not claims about actual IntelliStack employee counts or infrastructure.

## 17. Real-time application behavior
- Database persistence is authoritative.
- Mutations should return clear success/error states and update dependent UI after confirmation.
- Use subscriptions/events for cross-view updates, with re-fetch/revalidation for missed or out-of-order events.
- Dashboard cards, ticket queues, workload, War Room timelines, notifications, and reports should share consistent definitions of statuses and counts.
- Ensure row-level security and server-side authorization for all protected data and mutations.
- Add tests for ticket create/update/assign/resolve/reopen, role enforcement, event propagation, and dashboard aggregate correctness.

## 18. Suggested data model (initial design; refine before migrations)
- organizations / tenants and environments
- regions, countries, cities, offices
- departments, teams, team_memberships
- profiles, roles, permissions, role_permissions, user_role_assignments, scoped_assignments
- tickets, ticket_comments, ticket_work_notes, ticket_events, ticket_attachments, sla_policies
- assets, services, asset_relationships, service_dependencies
- incidents, war_rooms, war_room_members, incident_timeline_events, incident_tasks
- conversations, conversation_members, messages, message_attachments, channels
- connectors, connector_configs, connector_capabilities, connector_health_events
- workflows, workflow_versions, workflow_runs, workflow_approvals, workflow_run_events
- scripts, script_versions, script_runs
- knowledge_articles, article_versions, article_links
- change_requests, change_approvals, change_events
- notifications, audit_logs
- demo_seed_metadata
Use appropriate foreign keys, indexes, row-level security policies, retention rules, and tenant/environment scoping. Avoid storing credentials as ordinary readable configuration values.

## 19. Recommended implementation sequence
1. Repository standards, app shell, responsive design system, environment configuration, and CI checks.
2. Authentication, organization/environment boundaries, profiles, custom roles, permissions, and audit logging.
3. Deterministic demo data with coherent organization/location/user/team/asset relationships.
4. Ticket lifecycle, history, dashboard aggregates, notifications, and real-time updates.
5. Teams Chat and group/channel membership.
6. War Rooms and incident timelines linked to tickets and chat.
7. Asset/service inventory, Knowledge Vault, and Script Arsenal.
8. Connector registry and first real connector adapter.
9. Automation workflows, approval gates, and proof of resolution.
10. AI assistant, reports, security hardening, end-to-end tests, and deployment.
Phases may be reprioritized, but security, data relationships, and shared event behavior should be established early.

## Acceptance criteria for the first usable release
- A user with permission can create a ticket and see it appear in ticket lists and dashboard metrics without manual refresh.
- Assigning, updating, resolving, closing, and reopening a ticket updates all relevant views and preserves an audit trail.
- A custom role can be created and its permissions are enforced on both the client and server.
- Demo global/city headcount totals roll up consistently from seeded records.
- Demo infrastructure can be browsed by region/city/office/team and linked assets/tickets can be opened.
- Authorized users can create a group conversation; unauthorized users cannot read it.
- An authorized incident commander can create a War Room, add responders, link tickets, and record an auditable timeline.
- An administrator can configure and test a registered connector, while secrets remain hidden from client-side code.
- The interface clearly distinguishes demo records from live integration data.
- Core workflows pass automated tests and have visible, useful error states.

## Delivery discipline
Keep this document current as features are implemented. Track each requirement as **Planned**, **Designed**, **In Progress**, **Implemented**, or **Tested**. Never label a feature complete until its behavior and permissions have been verified.
