# IntelliStack Systems — Master Product Blueprint
## Maximus Optimus Command Center
**Status:** Living product and implementation blueprint  
**Repository:** FrankMazerati/IntelliStack_Systems_OptimusMaximus  
**Working branch:** feature/network-operations-secure-shell  
**Current delivery principle:** Improve the existing application and its open pull request; do not create a separate replacement website.

## 1. Product vision
IntelliStack is envisioned as a unified enterprise operations command center connecting IT service management, identity and access, devices and infrastructure, integrations, automation, governance, security operations, communications, workforce dispatch, and enterprise migration. The differentiator is the cohesion of these workflows, not a claim that each individual capability is unique.

The current application is a synthetic prototype. Features described as planned or simulated must not be presented as live production integrations, real customer data, or completed functionality.

## 2. Brand and user experience
- Retain IntelliStack Systems branding and the Maximus Optimus Command Center identity.
- Visual direction: dark navy command-center surfaces, translucent panels, thin electric-blue borders and restrained glow; Maximus uses blue/cyan and Optimus uses pink/purple.
- Maintain legible text, responsive layouts, and touch-friendly controls.
- The mobile hamburger drawer must keep the complete brand, title, and close X inside its header and provide a visible Log out action.
- Main navigation shortcuts such as Service Desk/Tickets, Users, Devices, and Connectors must look like intentional, clearly labeled controls rather than unstyled text.
- Maximus AI and Optimus AI are separate assistant experiences with persistent floating launchers across dashboards. They are distinct from ordinary team chat. Prototype responses are currently scripted and must be labeled accordingly.
- Prefer direct navigation to a working screen over decorative controls or dead-end placeholders. Every visible control needs a defined behavior.

## 3. Primary roles and permission principles
The four primary roles are distinct: **Super Admin**, **Help Desk Agent**, **IT Administrator**, and **Governance & Compliance**. Do not confuse these roles with any seeded demonstration accounts.

Separate permission to use an operational tool from permission to administer the platform:
- Authorized users across roles should be able to use everyday communications and the knowledge base.
- Permissions still apply to confidential messages, tickets, records, attachments, and customer/tenant data.
- Platform-wide configuration, connectors, role assignment, security policy changes, and destructive operations remain restricted to authorized administrators.
- Use least privilege, auditable changes, confirmation for consequential actions, and server-enforced authorization in production.
- Role switching in the demo is for exploration only and is not a production security boundary.

## 4. Core command center and navigation
The intended product includes these connected areas. The current code has only a subset fully implemented; see the delivery status section.

1. Command Center Dashboard and operational metrics
2. Platform Builder / module registry
3. User, role, account, access request, and MFA administration
4. Users, Devices, and Asset Inventory
5. Service Desk and Ticket Management
6. End User Directory
7. Knowledge Base
8. System Integrations / Connector Management
9. Security & Compliance
10. Security Operations Center and Emergency War Room
11. Maximus AI (frontline support and ticket triage)
12. Optimus AI (security engineering, incident coordination, escalation)
13. System Status and Monitoring
14. Infrastructure and Remote Support
15. Automation and Workflows
16. Governance Center and Audit Log
17. Corporate Communications: mailbox, team chat, direct messages, notifications, ticket discussions
18. SharePoint and Enterprise Document Management
19. Enterprise Migration Center
20. Test & Validation Center
21. Workforce & Field Operations
22. Optional Technician Marketplace
23. Analytics, Reporting, and Configuration / Environment Management

Navigation should be grouped by user task and role; universal areas such as Knowledge Base and authorized communications should not disappear merely because a person is not a Super Admin. Avoid making the top bar the only place to find a critical module.

## 5. Service Desk and ticket lifecycle
Required behaviors:
- Create, search, filter, sort, refresh, and open tickets; provide queue views such as My Tickets and team queues.
- Edit title/subject, description, requester, category, priority, assigned team, assignee, and other supported fields.
- Assign and reassign tickets; update status; resolve and reopen; record internal work notes separately from customer-facing comments.
- Support handoff between at least two help desk agents and preserve the complete history.
- Keep the original intake/triage snapshot immutable. Every subsequent change records actor, timestamp, changed field, and previous/new values.
- Provide ticket history, linked user/device records, and related knowledge articles.
- Do not let ordinary agents permanently erase tickets. Use controlled cancellation/retirement and audited administrative retention/deletion procedures where policy allows.
- Ticket state and activity currently use browser localStorage in this prototype; this is not shared server persistence. Production requires an authenticated API, durable database, validation, concurrency-safe IDs, and server-side authorization.

## 6. Knowledge Base
Knowledge Base is a first-class workspace, not just a hidden capability inside Maximus or a placeholder screen.
- Search articles by title, content, category, tags, and keywords.
- Provide categories such as account/access, networking/VPN, devices, applications, security, onboarding, and field operations.
- Each article includes a title, summary, symptoms or purpose, step-by-step resolution, related tickets or services, owner, review date, and status.
- Support article creation/editing, draft/review/publish lifecycle, version history, feedback, and usage metrics subject to role permissions.
- Help Desk agents can use articles while working tickets; authorized employees can view published self-service articles.
- Maximus can suggest relevant articles; suggestions should link to the actual article. AI-generated guidance must not silently replace approved procedures.
- Seed the prototype with clearly synthetic sample articles. Mark any non-persisted or local-only behavior honestly.

## 7. Users, roles, identity, and access
- Search and manage users, role assignments, account status, access requests, MFA posture, and review tasks.
- Show profile, department, employment/contractor classification where relevant, assigned devices, and ticket history according to permissions.
- Every visible create/edit/save/assign/status action must have meaningful validation and feedback.
- Production requires real identity-provider integration, secure authentication/session handling, server-side permission enforcement, tenant isolation, audit logging, and secure credential management. Do not treat the prototype role selector as security.

## 8. Devices, assets, and infrastructure
- Inventory laptops, desktops, workstations, mobile devices, servers, network equipment, printers, peripherals, and other managed assets.
- Track asset ID, type, serial number, owner, department, location, IP where applicable, lifecycle state, warranty/purchase details, assignment, last-seen/health, and maintenance history.
- Support acquisition/purchase intake, receiving, assigning, transferring, repair, retirement, and removal with audit trail.
- Distinguish removing an item from active inventory from deleting its history.
- Connect device records to users, tickets, remote support, security alerts, and field work orders.
- Remote support remains simulated until a vetted RMM/remote-support provider is integrated, with authorization, user consent, and session logging.

## 9. Connector and integration management
Seed a mock inventory including Microsoft 365, Microsoft Entra ID, ServiceNow, Jira Service Management, Slack/Microsoft Teams, Power BI, Endpoint RMM, SharePoint, email service, and Supabase. Clearly label these as sample configurations unless a real connection is verified.
Required actions:
- Add, view, modify, save, validate, test, enable, disable, and delete/retire a connector with confirmation.
- Configure name, provider/type, endpoint, owner, purpose, environment, auth method, status, and non-secret settings.
- Search/filter by name, type, owner, and status; show details, health, last test, errors, and activity history.
- Simulated tests must perform a meaningful local validation and report passed checks, failures, warnings, and next steps.
- Never store real secrets in browser localStorage or expose credentials in the client. Production secrets belong in a secure backend/secret store.

## 10. Enterprise Migration Center
A dedicated Super Admin module for organizations migrating from platforms such as ServiceNow or other supported systems. It is not buried inside connector settings.
Workflow:
1. Create migration project and define owner, source, destination, scope, and window.
2. Configure and test authorized source/destination connectors.
3. Discover supported objects and estimate counts.
4. Map fields, categories, priorities, statuses, users, groups, relationships, attachments, and supported history.
5. Flag unsupported fields, missing mappings, and data-quality issues.
6. Run a dry run against synthetic data in the prototype.
7. Produce a readiness report with counts, warnings, and failures.
8. Require approval before production execution.
9. Track progress, retries, skipped/failed records, and detailed logs.
10. Reconcile source and destination, validate relationships, plan cutover, and document rollback/recovery.
Prototype actions must simulate jobs and generate real reports from mock datasets, not merely show a success toast. Production migration requires supported APIs, rate-limit handling, secure credentials, backups, reconciliation, and tested recovery procedures.

## 11. Corporate mailbox and communications
- Provide a configurable corporate mailbox identity and support shared departmental mailboxes such as Support, Security, and IT Operations.
- Support incoming/outgoing mail configuration, message list, compose/reply/forward, message search, folders, notification templates, delivery state, and audit history according to permissions.
- Email-to-ticket flows should create or update a ticket, associate replies, and preserve the communication history.
- Provide team chat, direct messages, ticket discussions, notifications, and authorized attachments, separate from Maximus/Optimus assistant chats.
- General mailbox/chat availability is not the same as access to every mailbox or confidential conversation; enforce membership and data permissions.
- Prototype email/SMS must be labeled simulated and must not imply a message was actually sent. Production delivery requires a backend service and authorized provider.

## 12. SharePoint and enterprise document management
- Configure and test authorized SharePoint connections.
- Show sites, libraries, folders, approved documents, version information, and sync health within the connection's actual permission scope.
- Link authorized documents to tickets, knowledge articles, policies, projects, and migration records.
- Support search, access checks, synchronization status, failure logs, and permission validation.
- Prototype sites and documents are synthetic; live access requires authorized Microsoft integration and appropriate consent/scopes.

## 13. Test & Validation Center
A central place to validate connector configuration, email flow, SharePoint access, user-role permissions, workflows, migrations, and notification routes.
- Each test produces a timestamped run with passed/failed/warning checks, details, and recommended remediation.
- Include mock failure scenarios and retry behavior.
- Keep test history and exportable reports.
- Production tests must distinguish safe read-only validation from changes that could affect live systems.

## 14. Security Operations and Emergency Response Mode
Optimus coordinates security incidents; Maximus supports frontline service desk work. Emergency response is a first-class workflow.
- Trigger from authorized users or configured critical alerts; classify severity and record trigger actor/source.
- Present a high-visibility emergency overlay with accessible visual alerts and configurable audible alarm.
- Route responders to an Emergency War Room while preserving unsaved work where possible.
- Identify the incident commander, SOC analyst, security engineer, and infrastructure/IT responder, or the assigned incident-specific roster.
- Track notification sent, delivery where provider-supported, acknowledgment, joining, assigned tasks, and completion as distinct states.
- Provide secure incident chat, conference entry, evidence links, timeline, decision log, task list, and audit trail.
- Escalate to backups when response deadlines expire. An alert being delivered does not mean it was acknowledged or that the responder joined.
- Support an authorized containment workflow with appropriate approvals and audit records.
- Prototype sirens, flashing states, calls, and escalations are simulated; do not contact real people or change production systems unless explicitly configured in a real deployment.
- Sound may be silenced without dismissing the incident; provide accessible visual/text alternatives and controlled acknowledgment.

## 15. On-call schedules, SMS/email, and shift handoff
- Configure primary responders, backups, shifts, and the next person due to relieve an on-duty responder.
- For critical incidents, notify the current team and the scheduled backup/relief contact using configured channels, including email and SMS, even when they are not logged into the website.
- Track queued/sent/delivered/failed where supported, acknowledged, joined, accepted responsibility, and handoff completion separately.
- Retry or escalate on failure and lack of acknowledgment; never infer acceptance from message delivery.
- External messages should contain minimal sensitive details; require authentication to access incident evidence.
- Prototype delivery is simulated. Real delivery requires a backend notification worker, authorized provider, validated contact information, retry policies, and monitoring.

## 16. Workforce & Field Operations
A core product pillar linking employers, employees, contractors, dispatchers, field technicians, and service desk work.
Employer/dispatcher capabilities:
- Maintain worker/provider profiles, skills, certifications, service areas, availability, schedules, and approved classifications.
- Create/publish work orders, match or invite qualified technicians, assign/reassign jobs, set deadlines, requirements, and compensation terms.
- Track acceptance, appointment, check-in/out, status, evidence, checklist, time, expenses, review, approval, and completion.
Worker workspace:
- Profile, available jobs, assigned work, schedule, instructions, site details, communications, check-in/out, checklists, evidence upload, timesheets, invoices, payment status, and permitted feedback.
- Distinguish employee payroll/timesheet workflows from independent contractor invoice workflows.
- Link work orders to service tickets, devices, sites, and security incidents.
- Respect worker privacy and consent; location tracking should be limited to legitimate active work and organizational policy.
Optional Technician Marketplace:
- Organizations may post work orders for approved external providers to accept.
- Include eligibility, skills/certification matching, geography, offers, terms, reassignment, completion verification, disputes, ratings, and quality metrics.
- Make marketplace enablement optional for organizations that only manage their own workforce.
- Simulate payments and marketplace transactions until real providers and legal/compliance requirements are implemented.

## 17. Automation, analytics, governance, and reporting
- Workflow builder with triggers, conditions, actions, schedules, test runs, failure handling, and run history.
- Audit history for ticket edits, access changes, connector changes, migrations, emergency activation, notifications, work orders, approvals, and administrative operations.
- Reports for ticket performance, service levels, asset lifecycle, connector health, migration reconciliation, incident response, workforce utilization, job completion, and costs.
- Clearly distinguish synthetic illustrative metrics from measured live production data.
- Support exportable reports, policy evidence, retention controls, and compliance review.

## 18. Persistence, testing, and implementation standards
- Prototype state should persist across refreshes where appropriate and clearly indicate whether it is local-only or server-backed.
- Every visible control must perform its described behavior, validate inputs, and show useful success/error outcomes. Avoid placeholder buttons.
- Simulations should execute meaningful state transitions and create logs/reports from sample data.
- Add automated tests for important user flows and build validation before calling a feature complete.
- Production architecture requires secure backend APIs, durable storage, tenant isolation, server-side authorization, secret management, observability, backups, concurrency-safe operations, and security review.
- Do not claim real connector health, delivery, AI, migration, or remote access unless verified.

## 19. Current implementation status observed in the repository
Verified from the existing branch during this blueprint update:
- Existing React application and styling are in app.jsx and styles.css.
- Current UI includes Dashboard, Platform Builder, User & Role Management, Users & Devices, System Integrations, Security & Compliance, Service Desk, End User Directory, Knowledge Vault, Maximus, Optimus, System Status, Infrastructure, Remote Support, Automation Workflows, Governance Center, and Audit Log navigation definitions.
- The Knowledge Vault navigation item currently falls through to a generic “not implemented in this build yet” screen; it is not a functional knowledge base. It should be promoted to a functional Knowledge Base and made discoverable to all authorized roles.
- Topbar has quick actions labeled Ticket, Users, Devices, and Connect; their appearance and labels should be polished so they read as intentional, consistent command-center controls.
- Maximus and Optimus floating launchers exist; their chat responses are explicitly prototype/scripted.
- Service desk has seeded ticket examples and existing workflow work; confirm each ticket action against the requirements above before claiming completion.
- Connector screen currently starts with an empty connector list and uses simulated local behavior; add a realistic sample inventory and complete add/edit/test/enable/disable/delete workflows.
- PR #1 is open and in draft state. It adds the Platform Builder registry; it is not merged.
- Existing demo has local/browser persistence in some areas, not shared production persistence. The UI's role switch is not a security boundary.
- Workforce operations, migration center, SharePoint, corporate mailbox, test center, emergency War Room, on-call SMS/email, and many other requested areas are blueprint requirements, not evidence of implemented production features.

## 20. Recommended delivery sequence
1. **Polish the current command-center shell:** responsive header actions, branding, drawer, visible logout, and clear navigation.
2. **Make Knowledge Base real and accessible:** searchable seeded articles, article details, categories, related ticket workflow, and local demo persistence.
3. **Complete the Service Desk:** editable ticket fields, immutable original triage snapshot, notes/comments, assignment/handoff, history, filters, and reliable local persistence.
4. **Complete User & Role and Device/Asset workflows:** add/edit/status/lifecycle actions with audit history and transparent simulation labels.
5. **Finish Connector Management:** seed examples and wire every management action with local persistence and simulated tests.
6. **Build the communications workspace:** mailbox, chat, notifications, and email-to-ticket simulation.
7. **Implement Test & Validation Center and Enterprise Migration Center** with real mock-data processing and reports.
8. **Build Security Operations/War Room and on-call escalation simulation.**
9. **Build Workforce & Field Operations and optional Technician Marketplace.**
10. **Connect real services only after backend architecture, authentication, permissions, tenant isolation, secrets, monitoring, and recovery are designed and tested.**

## 21. Acceptance rule
A module is not considered complete merely because it appears in navigation or has a polished screen. It is complete for the prototype only when its primary workflow can be exercised end-to-end, validations and error states are meaningful, the resulting state/history is visible and persists as specified, and any simulated behavior is clearly labeled. Production readiness is a separate bar requiring real integrations, backend enforcement, security testing, and operational validation.


## 22. Fine-grained security feature access (explicit requirement)
Security & Compliance must use feature-level authorization, not one broad permission that unlocks the entire page.
- Separate **Security Posture** (high-level, potentially read-only summary), **MFA Enrollment** (identity enrollment detail), **Open Findings** (finding-level detail), and **Policy Compliance** (policy/evidence detail) as distinct destinations or permission-controlled panels.
- The Super Admin can select a specific user, grant or revoke one or more feature permissions, choose an access level such as No access, Summary/read-only, or Detailed/read-only, and where appropriate Manage/Respond. Grants should be scoped to the individual feature and must not silently unlock neighboring features.
- Example: a Help Desk Agent may be permitted to view the overall Security Posture summary while MFA Enrollment, Open Findings, and Policy Compliance remain locked. Another Help Desk Agent may receive Open Findings access but not MFA details. A designated user could be granted MFA Enrollment only.
- Show locked features visibly and explain that access is restricted; do not expose sensitive counts, names, evidence, or record details behind a lock. If a feature's summary is allowed, render only the approved summary.
- Add an access-management interface for Super Admin: choose user → choose feature → choose permission level → grant/revoke → confirm and save. Display current grants, grantor, timestamp, optional expiration/reason, and audit history. Prevent self-lockout or unsafe changes to critical administrator access.
- Evaluate permissions for every page, route, panel, API request, and record. Hiding a button is not security. Production authorization must be enforced server-side; browser-only demo grants are illustrative and not a security boundary.
- Test access combinations for all four primary roles, including denied direct navigation and attempts to open a restricted feature URL. Keep Security Posture, MFA Enrollment, Open Findings, and Policy Compliance independent in both navigation and permission checks.


## 23. Knowledge Base ↔ SharePoint governance, ticket-to-knowledge workflow, and provenance
Knowledge management is a first-class shared workspace, integrated with ticket handling and SharePoint—not a static list of articles.
- **Knowledge access controls:** grant users or groups feature-specific No Access, Read Only, or Read & Write privileges; optionally allow article authoring while reserving review/publish rights for designated approvers. Support access by role and explicit per-user/group exceptions. Display effective permissions and audit grants/revocations.
- **SharePoint integration:** provide a dedicated SharePoint workspace with connection health, authorized sites, libraries, folders, documents, sync state, version information, owners, and permission inspection. Allow administrators to inspect authorized users, groups, and devices associated with managed content/access where the Microsoft integration actually exposes that information. Respect Microsoft permissions and consent scopes; never imply access to data outside the connected account's authorization.
- **Provenance and accountability:** for each article, document, ticket, and synchronization event, show who created it, who last modified it, timestamps, source system, owner, version, and relevant history. Preserve source attribution and SharePoint links/IDs where available. Keep a searchable audit trail for create, edit, publish, permission change, sync, and archive operations.
- **Ticket-to-knowledge capture:** when a ticket is resolved, offer an automatic knowledge-capture workflow. Based on configurable rules, the system can create a knowledge draft from the problem, verified resolution, category, and sanitized work notes; link the draft to the originating ticket; and route it to the correct category/reviewer. If a policy explicitly enables auto-drafting, the draft may be created automatically on resolution, but it must not silently publish unreviewed or expose internal notes, personal data, credentials, or sensitive incident details.
- **Organize and improve:** suggest category/tags, identify duplicate articles, associate similar tickets, and let authorized users correct the suggestions. Maintain article versions, review dates, feedback, and links to related services/devices.
- **SharePoint-backed content model:** decide per knowledge collection whether SharePoint is the source of truth, the application database is the source of truth, or content is linked/read-only. Prevent accidental conflicting edits and show sync conflicts/failures. A prototype can simulate SharePoint content and sync, but must label it simulated until a real, permission-scoped integration is connected.
- **Required end-to-end test:** resolve a synthetic ticket → automatically create a linked knowledge draft → assign category and reviewer → approve/publish → find it through Knowledge Base search → verify the source ticket and full author/version history → verify a read-only user can read but cannot edit → verify a user without access cannot open it directly.


## 24. Human Resources (HR) department and controlled employee lifecycle
Add HR as a first-class department/workspace in IntelliStack, with a dedicated role and narrowly scoped permissions. HR is an organizational department/role area, not a replacement for the four primary platform roles (Super Admin, Help Desk Agent, IT Administrator, Governance & Compliance).
- **HR workspace:** employee directory and employment status; department, manager, job title, work location, and start/end dates; HR-owned documents and policy acknowledgements; onboarding/offboarding checklists; approved requests and task handoffs. Add optional modules such as leave or benefits only when the organization defines the workflows and legal/privacy requirements.
- **Privacy by default:** HR records are confidential. Grant access by role and individual, with explicit No Access, Read Only, and Read & Write levels where appropriate. Separate sensitive categories (for example, compensation, performance/disciplinary records, and identity documents) into separately permission-controlled areas; do not expose these to general IT, Help Desk, or ordinary employee-directory viewers. Log access to sensitive records and all edits, exports, permission changes, and lifecycle actions.
- **HR ↔ IT lifecycle workflow:** HR can initiate a joiner/mover/leaver request; authorized IT staff receive the minimum necessary task data to provision, change, or disable accounts, assign/recover devices, and adjust application access. Require approvals for sensitive actions, preserve a timestamped audit trail, and avoid exposing confidential HR case notes to IT. Offboarding should create a tracked checklist for account access, sessions/tokens where supported, devices, badges and application entitlements; do not perform destructive actions without the configured authorization and confirmation.
- **Employee self-service (optional):** employees may view their own permitted profile information, submit defined requests, and acknowledge policies. Users must not see other employees' confidential information.
- **Integrations and simulation clarity:** later integrations may connect to an HRIS, identity provider, directory, and device inventory. Until connected, demo records and workflow outcomes must be clearly labeled simulated; do not imply that real employment records or account provisioning are live.
- **Acceptance tests:** verify HR staff can access only authorized HR records; Help Desk/IT see only the minimum fields needed for assigned tasks; an employee cannot open another employee's restricted record by direct URL; a mover request updates the right access-review tasks; an offboarding request records approvals and task completion; all sensitive access and changes are auditable.


## 25. Executive leadership and extensible department framework
IntelliStack should support an executive/C-suite layer and a configurable set of business departments, rather than assuming the organization is IT-only. This is a product/organization structure, distinct from the four primary platform roles (Super Admin, Help Desk Agent, IT Administrator, Governance & Compliance). A person may hold an organizational title and separately receive platform permissions; titles alone never grant access.

### Executive leadership
- **CEO / Executive Office:** organization-wide high-level dashboards, strategic goals, major risks, cross-department status, approved executive reports, and decisions requiring executive approval.
- **CFO / Finance leadership:** financial dashboards and reports, budgets, cost centers, technology spend, procurement/payment approval workflows, and financial controls. Restrict payroll, bank/payment data, and individual compensation to specifically authorized people.
- **C-suite workspace:** configurable executive roles such as COO, CTO, CIO, CISO, and other leadership positions when needed. Each role gets a purpose-built dashboard and least-privilege access; don't assume every executive should see all confidential data.
- **Super Admin remains the platform administrator:** administrative authority over platform configuration and access does not automatically imply access to every confidential HR or financial record. Sensitive business-data access should be separately granted and audited.

### Standard departments
Provide configurable workspaces, with these suggested starting departments:
- **IT & Infrastructure:** identities and access, users, devices/assets, integrations, infrastructure, service desk coordination, change management, and recovery.
- **Human Resources (HR):** employee lifecycle, onboarding/offboarding, policy acknowledgements, HR-owned documents, and separately restricted personnel records.
- **Finance & Accounting:** budgets, cost centers, expense/procurement workflows, invoices, payment status, and financial reporting, with separation of duties for approvals.
- **Sales & Revenue:** leads, accounts, opportunities, pipeline, customer handoffs, proposals, and approved sales reports. Integrate with a CRM only when connected and authorized.
- **Operations / COO:** cross-functional processes, service performance, workforce/field operations, work orders, and operational KPIs.
- **Security & Governance / Compliance:** policies, risk, audit evidence, security incidents, control owners, and compliance status.
- **Legal & Privacy (optional):** contract/legal request tracking, privacy reviews, retention obligations, and legal holds; confidential legal materials require dedicated access restrictions.
- **Customer Success / Support (optional):** customer onboarding, escalations, service health, and customer outcomes, with customer-data boundaries.
- **Procurement & Vendor Management (optional):** vendor directory, contracts, renewals, purchase requests, risk reviews, and approval trails.
- **Marketing (optional):** campaigns, content approvals, events, and performance reporting, without access to restricted customer or employee records by default.
- **Project / Product Management (optional):** initiatives, roadmaps, dependencies, milestones, and release/change coordination.
- **Facilities & Field Operations (optional):** sites, access/badge requests, equipment, dispatch, and work orders, subject to physical-security permissions.
- **Department templates:** Super Admin can enable/disable departments, rename them, define owners/managers, configure navigation and dashboards, add custom departments, and map workflows without changing the four primary platform roles.

### Cross-department workflows and access
- Define permission levels per module and record: No Access, Read Only/Summary, Read & Write, and separately authorized actions such as Approve, Publish, Manage, or Export. Avoid using a single broad department flag as permission to everything.
- Provide configurable approval chains for finance spend, HR lifecycle changes, access grants, procurement, publishing, and security response. Support separation of duties so a requester cannot approve their own sensitive request where policy forbids it.
- Share only the minimum necessary data between departments. For example, IT receives the technical tasks needed for onboarding/offboarding, not confidential HR notes; executives receive approved aggregate reports unless record-level access is specifically granted.
- Show a unified organization directory and department ownership, but protect confidential fields and records. Every grant, revocation, approval, export, and sensitive change should have actor, timestamp, reason, and outcome in the audit trail.
- Use clearly marked synthetic data and simulated workflows in the prototype. Do not imply that payroll, CRM, accounting, HRIS, or other external systems are live before an authorized integration is configured.

### Acceptance tests
- A CEO can see approved executive summaries but cannot automatically open restricted payroll, HR case, or security evidence records.
- A CFO can review authorized budget and finance data but cannot access HR personnel files without a separate grant.
- Sales users cannot access confidential finance or HR modules by direct navigation.
- HR and IT exchange the minimum necessary onboarding/offboarding tasks without exposing HR case notes.
- Super Admin can create a custom department and assign a department owner without changing the four primary platform roles.
- Read-only users cannot modify records through UI actions or direct routes; every sensitive approval and permission change is auditable.


## 26. Super Admin endpoint management, policy groups, updates/rollback, and live network monitoring
Expand the Super Admin workspace with endpoint/mobile-device management and network observability. These are distinct capabilities, with simulations clearly labeled until approved agents, APIs, and network data sources are connected.

### Device groups and group policy
- Create, rename, describe, and archive dynamic or manually managed device groups; search/filter membership and view membership history.
- Assign policy sets to groups of computers and supported mobile devices/phones. Support device types, operating systems, ownership, location, department, and compliance posture as grouping criteria where available.
- Policy areas may include approved configuration baselines, update rings/windows, encryption and screen-lock requirements, firewall settings, application allow/block lists, certificates, Wi-Fi/VPN profiles, and compliance checks. Only show controls supported by the connected management platform and target OS.
- Show policy assignment, effective policy, conflicts, compliance state, last check-in, policy version, and per-device rollout status. Support staged deployment (pilot → small group → broad rollout), maintenance windows, exclusions, approval gates, and audit records.
- Separate policy authoring from assignment and execution permissions. Require validation and explicit confirmation for disruptive changes. Never suggest a browser-only prototype can enforce endpoint policy.

### Software and operating-system updates, rollback, and recovery
- Provide an update center for managed computers and supported phones: available/approved/deferred updates, device eligibility, maintenance windows, rings, deployment progress, failures, restart requirements, and compliance reporting.
- Support staged push/deploy, pause, retry, cancel where safe, and rollback/recovery actions only when the operating system, package, management agent, and vendor API genuinely support them.
- Before execution, show scope, expected impact, prerequisites, backups/recovery point, affected devices, approval requirements, and a clear confirmation. Track actor, package/policy version, timestamps, result, errors, and rollback outcome.
- Distinguish uninstalling an update, reverting an application/package, restoring a configuration snapshot, and rolling back an OS version; these are different capabilities and not universally supported. Never promise a universal one-click rollback.
- In prototype mode, simulate deployment and rollback against synthetic devices and show a visible **Simulated** label. Do not send commands to real devices until an authorized connector/agent and explicit deployment approval exist.

### Real-time network monitoring and traffic analysis
- Add a Network Operations / Live Traffic workspace for authorized Super Admin and network operators. Display monitored sites, networks, interfaces, links, device availability, utilization, latency, packet loss, errors, alerts, and recent events when supported by actual telemetry.
- Include a traffic-analysis view with time range, source/destination, protocol, ports, volume, and filter/search controls, plus trends and alert drill-down. Packet capture and payload inspection are separate sensitive capabilities; default to metadata/flow telemetry, minimize collection, mask sensitive payloads, and require explicit authorization for packet capture.
- Integrate through approved sources such as SNMP polling/traps, flow telemetry (NetFlow/IPFIX/sFlow), syslog, streaming telemetry, monitoring-platform APIs, or a managed packet sensor. Show source, collection time, freshness, gaps, and monitoring health so stale data is not mistaken for live traffic.
- Provide alert rules, severity, acknowledgements, ownership, escalation, maintenance/suppression windows, and incident/ticket creation. Correlate network alerts with relevant devices, sites, incidents, and service-desk tickets where authorized.
- Show synthetic/demo traffic only in simulation mode; never label fabricated values as live. Respect network authorization, retention policy, privacy requirements, and role-based access. Avoid collecting credentials or unrelated personal content.

### Tool/product references and integration boundaries
- The user recalls a network monitoring tool pronounced “solo lands,” which may be **SolarWinds**; confirm the exact product before designing a specific connector. **Wireshark** is another likely tool for packet-level traffic analysis. **Cisco Packet Tracer** is primarily a network simulation/learning environment, not a production live network monitor; **Kali Linux** is a security testing distribution, not itself a network-monitoring platform.
- Treat SolarWinds, Wireshark, Cisco tooling, endpoint management, and mobile device management as possible integrations, not assumed connected systems. Each connector needs health/status, supported features, permission scope, credentials kept server-side, test connection, sync/telemetry timestamps, and audit history.

### Acceptance tests
- Create a device group and assign a policy; verify only eligible devices receive the assignment and each reports the expected result.
- Stage a software update to a pilot group, observe success/failure, pause a rollout, and verify an eligible rollback/recovery action is guarded by prerequisites and approval.
- Confirm unsupported devices/actions are clearly marked unavailable rather than falsely reported successful.
- Verify network dashboards distinguish live telemetry from simulated data and display collection timestamps/source health.
- Confirm users without monitoring or endpoint-management permission cannot access restricted device/network detail through direct navigation or APIs.
- Verify sensitive actions and changes record actor, scope, approval, time, result, and recovery outcome.

## 31. Multi-tenant SaaS, enterprise onboarding, and owner revenue dashboard

### Product direction
- Build IntelliStack as a multi-tenant SaaS platform that can host multiple independent customer companies while the platform owner operates a separate, tightly controlled provider-level Super Admin console.
- Each customer company receives a dedicated tenant workspace with its own users, employees, sites, devices/assets, policies, integrations, tickets, audit records, enabled modules, and configuration. Tenant data must remain isolated by default.
- The provider-level Super Admin console is for operating the SaaS service: tenant provisioning, service health, subscription/plan administration, aggregate usage and revenue metrics, support escalation under approved access procedures, and platform-wide security/infrastructure monitoring. It must not become an unrestricted back door into customer content.
- Design for the owner to operate the service remotely, but do not imply that a dashboard alone replaces on-call coverage, incident response, legal agreements, or operational controls.

### Company onboarding and tenant administration
- Provide a guided **Add Company / Provision Tenant** workflow with company name, verified organization owner, tenant identifier, subscription plan, enabled modules, user/employee count, device/asset count, sites, region/data residency where supported, identity provider, and initial administrators.
- Allow authorized tenant admins to invite and deactivate their own users, manage groups and permissions, register/import devices, and view their own usage and service status.
- Show licensed/registered counts separately from observed counts. Employee and device limits should be plan-aware and clearly indicate approaching or exceeded limits.
- Support tenant lifecycle states such as setup, active, suspended, offboarding, and deleted, with explicit confirmation and an auditable retention/export/deletion policy. Never silently erase tenant data on suspension or cancellation.
- Provide onboarding validation, progress, connector readiness, migration/import status, and clear errors. Sample tenants and counts must be labeled as demo data until backed by persistent services.

### Tenant isolation and privileged access
- Enforce tenant identity and authorization server-side for every API, query, file, search result, job, event, integration, and background task. Do not rely on UI hiding, client-side tenant IDs, or role selection as security boundaries.
- Include automated cross-tenant isolation tests for users, devices, tickets, files, audit logs, search, exports, and integrations.
- Keep provider administration and customer tenant administration as distinct scopes. A platform operator may see service health and approved aggregate metrics without automatically seeing customer content.
- Any exceptional support access into a tenant must be time-limited, purpose-bound, explicitly authorized, logged, and visible to the tenant where appropriate. Use least privilege, strong authentication, session controls, and audited break-glass procedures.
- Design for secure secrets handling, encryption in transit and at rest, backups, disaster recovery, vulnerability management, and incident notification. Exact compliance commitments must wait for actual controls and independent validation.

### Subscription, usage, and revenue analytics
- Give the platform owner a provider-level business dashboard with per-company subscription plan/status, recurring revenue metrics where applicable, billing period, seats/users, registered devices, enabled modules, usage trends, failed payments, upcoming renewals, and account health.
- Distinguish contracted price, invoiced amount, cash collected, refunds/credits, taxes, payment-processing fees, and estimated net revenue. Label metrics with their definitions, currency, period, and data freshness; do not treat projected or unpaid amounts as collected revenue.
- Provide company-level drill-down and export only for data the owner is authorized to access. Customer-facing tenant dashboards show that tenant's own usage and billing, not other companies' data.
- Connect billing and payment providers only after configuration and verification. Until then, use visibly simulated sample figures and never claim a real charge, subscription, or payout occurred.
- Include pricing/plan configuration, trial and renewal status, upgrade/downgrade workflow, usage limits, invoices, and cancellation/offboarding handling. Billing changes require explicit authorization and an audit trail.

### Remote operations and infrastructure visibility
- Provide a provider operations view for service availability, tenant provisioning health, API and job failures, connector status, latency, capacity, security alerts, backup/recovery status, and incident history, using actual telemetry when connected.
- Separate aggregate service metrics from tenant-specific operational details. Drill-down must respect support authorization and tenant boundaries.
- Support alert ownership, escalation, maintenance windows, incident records, and documented recovery procedures. Mark synthetic telemetry as simulated rather than live.

### Acceptance tests
- Provision two test companies and verify their users cannot access each other's devices, tickets, files, search results, exports, or audit records.
- Verify a tenant administrator cannot change provider-level plans, access another tenant, or grant platform-wide roles.
- Verify the provider dashboard reports tenant counts and revenue using explicit definitions, periods, currency, and freshness; unpaid invoices are not counted as cash collected.
- Verify support access requires the defined approval, scope, duration, and audit trail.
- Verify tenant suspension, cancellation, export, and deletion follow documented lifecycle and retention rules.
- Verify demo metrics are clearly labeled and cannot be mistaken for connected billing or live infrastructure data.

## 32. Homepage entry screen: company employees vs. contractors and hiring organizations

### Required first-screen layout
- Replace the current single generic role-selector login concept with two prominent, clearly separated entry cards on the first screen.
- **Employee / IntelliStack Company Access — blue theme:** the primary path for IntelliStack/Maximus Optimus company employees and authorized enterprise users. Offer the appropriate employee sign-in choices and route authenticated users to the workspace permitted by their assigned account.
- **Contractor & Hiring Organization Access — purple theme:** a separate, equally discoverable path for contractors/field workers and the employers or organizations that hire and dispatch them. From this path, users choose the appropriate Contractor / Field Worker or Employer / Organization sign-in experience.
- Use the established premium command-center visual language: dark navy foundation, polished cards, clear icons and descriptions, blue/cyan accents for employee access, purple/pink accents for contractor and employer access, accessible contrast, and responsive touch-friendly controls.
- Make the distinction obvious before a user enters credentials. Do not bury contractor/employer access in a dropdown or a secondary page.
- Both entry cards must provide a clear route to the correct sign-in form, with a way back to the entry screen. The design should be cohesive rather than looking like two unrelated products.

### Sign-in and assistance requirements
- The applicable sign-in form must include account email, password, show/hide password, Sign In, Forgot Password, and Need Help.
- Provide Maximus and Optimus chat assistance as optional guidance. Where supported, users may speak their question and hear the response, with typed input and visible instructions always available as alternatives. Do not claim speech access is active until speech recognition and synthesis are configured and tested.
- Chat guidance must not bypass authentication, reset credentials without the approved identity workflow, or reveal account existence or private company data.
- Show clear loading, validation, recovery, microphone-permission, speech-unavailable, and error states. Preserve keyboard navigation, screen-reader labels, sufficient contrast, and large touch targets.
- Authentication and authorization must be enforced by the identity provider/backend. A front-end card, selected role, email field, or route is not a security boundary.

### Required acceptance checks
- The first screen visibly presents both the blue employee entry and purple contractor/employer entry.
- The contractor/employer route lets the user distinguish field-worker/contractor access from hiring-organization access.
- Each route reaches its intended sign-in experience without granting permissions based on the route selected.
- Email/password, Forgot Password, Need Help, and optional Maximus/Optimus guidance are present as designed; unavailable integrations are labeled honestly.
- The page is responsive and accessible, and the existing single role dropdown is not the only way to choose an entry path.
- Verify the implementation in the running application; a blueprint entry alone does not mean the screen has been implemented.

## 33. Active Directory and Microsoft Entra directory workspace

### Goal and presentation
- Add an **Active Directory** workspace to IntelliStack that presents real directory information in a familiar, administrator-oriented layout: domain/tenant overview, organizational units, users, groups, computers/devices, group membership, account status, directory attributes, and recent directory/synchronization events where the connected source exposes them.
- Use a searchable, filterable directory tree and detail panels with familiar directory concepts; do not claim to reproduce Microsoft's exact proprietary UI. Provide a cohesive IntelliStack design and clearly label the connected directory source.
- Support a read-only discovery/monitoring mode first, with controlled write operations added only after the connector and permissions are implemented and tested.

### Supported directory types
- **On-premises Active Directory Domain Services (AD DS):** integrate through a secure, appropriately networked connector using supported directory protocols and least-privilege service permissions.
- **Microsoft Entra ID:** integrate through Microsoft identity authentication and Microsoft Graph permissions appropriate to the features enabled.
- **Hybrid environments:** show the relationship between on-premises and cloud identities where the organization has configured synchronization. Do not assume that every user or device is synchronized.
- During setup, ask the authorized administrator which source is in use, validate prerequisites, and show connection, permissions, last-sync, and error status. Official Microsoft guidance distinguishes AD DS, Entra ID, and Entra Domain Services because their capabilities differ. Reference: https://learn.microsoft.com/en-us/entra/identity/domain-services/compare-identity-solutions

### Directory capabilities
- Search and filter users, groups, computers/devices, and organizational units, with useful attributes such as display name, sign-in identifier, enabled/disabled state, department, group membership, and last synchronization time when available.
- Show user and group detail views, membership relationships, device/domain status where exposed, and directory change or sync history where available.
- Support controlled import/synchronization of approved directory objects into IntelliStack's asset and identity views, preserving source identifiers and indicating the authoritative source.
- Make synchronization scope configurable and preview additions, updates, and removals before applying changes. Provide conflict handling, error reporting, retry, audit history, and a safe rollback/recovery plan where technically supported.
- Any account enable/disable, group membership change, password reset, OU move, or other write operation must be separately permissioned, confirmed, logged, and executed through the connected identity system's supported APIs/protocols. Never store or display directory passwords.

### Multi-tenant security and acceptance tests
- Bind each directory connection to exactly one authorized customer tenant and enforce tenant isolation server-side.
- Store connector secrets in a proper secrets manager; use encrypted transport, least-privilege credentials/permissions, rotation, and audited administrative access.
- Test that one tenant cannot search, inspect, export, or modify another tenant's directory objects.
- Test read-only mode, missing permissions, expired credentials, unavailable domain controller/API, sync conflicts, disabled accounts, and partial failures.
- Label mock directory records as sample data. Do not show a green/live connection status or claim successful sync until a real connection test confirms it.
- Start with read-only visibility and synchronization; only enable directory writes after a security review and end-to-end testing.

## 34. Central ticket system, audit ledger, and operational history

### One authoritative ticketing workspace
- All ticket-producing modules—including help desk actions, automated monitoring, directory synchronization, integrations, endpoint/security alerts, workflow failures, and approved AI-assisted triage—must create or update records in the same central Service Desk system rather than leaving separate, unreviewable ticket lists inside each module.
- Provide a unified ticket queue with search, filters, sorting, ownership, priority, category, source system, status, timestamps, linked company/tenant, affected users/devices/services, related incidents, and automation/AI origin.
- The Super Admin and other authorized reviewers can open a ticket to inspect its history, edit permitted fields, reassign it, add internal notes, request more information, approve or reject proposed changes, resolve, reopen, or escalate it. Permissions must limit which fields/actions each role can use.
- When multiple tickets are resolved, show them in the main queue and reporting views with a consistent lifecycle and resolution record. Bulk actions may be offered only with a clear preview of selected tickets, affected fields, permission checks, confirmation for consequential changes, and per-ticket outcomes.
- Preserve the original event/triage snapshot and append later edits as new history entries. A ticket's current state can change, but the historical record of who did what and when must not be silently rewritten.
- Automations and AI may propose classifications, summaries, assignments, or resolution steps; identify automated actions and their rule/model source. Require human review for configured sensitive actions and never allow AI to grant itself permissions or bypass approvals.

### Platform-wide audit ledger
- Build one searchable, centralized audit workspace covering ticket creation/resolution/edits, user and role changes, permission grants/revocations, directory sync, device lifecycle, integrations, exports, workflow executions, security response, tenant administration, and billing/admin operations.
- Each event should capture, where applicable: event ID; timestamp in a consistent server-controlled time standard; actor identity and effective role; tenant/company scope; action and target object; previous and new values or a privacy-safe change summary; reason or ticket/change reference; source (user, API, scheduled job, automation, or AI); approval; outcome; and correlation/request ID.
- Keep audit events append-only for normal application administrators. Corrections should be represented by a new event, not by overwriting the old event. Restrict audit configuration and deletion/retention controls to separately authorized roles, and record any access to or export of audit data.
- Enforce permissions and tenant isolation for audit search, record details, downloads, and reports. Provider-level operators can see service-wide metadata and permitted aggregate views, not automatically every tenant's confidential content.
- Provide filters, event timelines, ticket/user/device/company pivots, export controls, and retention/legal-hold policies. Protect logs from secrets and unnecessary personal data; redact credentials, tokens, and sensitive payloads.
- Use durable server-side storage and synchronized server timestamps in production. Browser localStorage or in-memory React state is only prototype/demo persistence and is not an authoritative audit system. Define backup, integrity monitoring, retention, and recovery procedures.

### Long-term operational memory and knowledge
- Maintain searchable, permission-aware operational history across tickets, incidents, changes, decisions, runbooks, approved knowledge articles, recurring problems, and system events. Preserve links between records so an operator can reconstruct what happened and why.
- Distinguish immutable audit evidence from editable operational notes and approved knowledge. Memory/search results must respect tenant and record permissions and must not expose private content merely because it is indexed.
- When a ticket is resolved, record the verified resolution and offer a linked knowledge draft or recurring-issue insight, with sanitization and review before publication. Retain provenance to the originating ticket and versions of the article.
- Define retention by record category and legal requirements; support authorized export and deletion workflows without silently deleting records under audit hold or other retention obligations.

### Acceptance tests and implementation status
- Resolve several test tickets from different modules and verify they all appear in the central Service Desk with consistent IDs, ownership, source, status, and history.
- Edit and reassign a ticket and verify the original triage record remains intact while new audit events identify the actor, time, changed fields, reason, and outcome.
- Verify unauthorized users cannot change restricted fields, bulk-resolve tickets, inspect sensitive audit details, or access another tenant's records by direct URL or API.
- Verify automated and AI-originated actions are labeled, linked to the initiating rule/run, and subject to configured approvals.
- Verify audit events persist across sessions and server restarts in the production architecture, and that tampering or unauthorized deletion is prevented or detected.
- Existing blueprint requirements already call for ticket history, audit logging, and governance reporting; this section makes the shared ticketing and platform-wide audit/memory model explicit. These requirements are not proof that a production-grade audit backend is currently implemented.

## 35. AI-assisted design-to-code delivery pipeline

### Goal
- Reduce manual handoffs by coordinating specialist stages for design, implementation, and independent inspection while keeping GitHub as the source of truth for code and review history.
- Treat this as an orchestrated pipeline with explicit inputs, outputs, timeouts, retries, and approval gates—not as three agents editing the same working tree simultaneously.

### Proposed stages
1. **Specification / planning agent:** reads the approved requirement, identifies affected screens/components, writes acceptance criteria, accessibility checks, and a bounded implementation plan.
2. **Design agent:** creates or updates editable Figma frames/components and exports required image assets. Each deliverable includes frame links, dimensions, asset names, and notes about intended behavior. Avoid baking UI text into images when it should be editable HTML.
3. **Implementation agent:** after the design handoff is complete, works on a dedicated Git branch, implements the approved design in the application, and commits changes with a summary and traceability to the requirement.
4. **Independent inspector agent:** reviews the diff and requirement, runs lint/type/build/unit tests and accessibility checks, inspects screenshots where browser automation is available, flags security or responsive regressions, and produces a findings report. It should not silently approve its own implementation.
5. **Human approval / merge gate:** present changed files, preview screenshots, test results, known limitations, and rollback instructions. Merge only after required checks and authorized review pass.

### Orchestration and integrations
- **GitHub:** source of truth for requirements/issues, branches, commits, pull requests, review comments, and CI checks. Use branch protections and least-privilege tokens.
- **Figma:** design collaboration, reusable components, screen handoff, and editable design artifacts.
- **Airtable (optional):** structured product backlog, screen inventory, feature status, design links, acceptance criteria, and agent-run tracking. Do not use Airtable as the authoritative code store or as a substitute for secure production databases.
- **CI/build and deployment:** use GitHub Actions or an equivalent CI runner for repeatable builds and tests; use a deployment host such as Vercel only after environment variables, preview deployments, and access controls are configured.
- **Backend/data:** select a real application database and authenticated API before production. A vector store is optional for semantic search over approved documentation and tickets; it is not required to build screens. If a vector database is used, enforce tenant and record permissions before retrieval and filter results server-side.
- **Orchestrator:** use a workflow runner (for example, a configured automation platform or CI workflow) to trigger stages from completed outputs and successful checks. A two-minute pause can be a scheduling preference, but stage completion and verified artifacts—not elapsed time—must determine whether the next stage begins.

### Safety and quality controls
- Pin each run to a requirement ID, design version, branch, commit SHA, and test report so every artifact is traceable.
- Give each agent a narrow role and scoped credentials. Do not share production secrets with design/review agents or let an agent expand its own permissions.
- Prevent overlapping writes to the same branch/files. Use separate branches or isolated worktrees and let Git resolve reviewed changes through pull requests.
- Stop the pipeline on failing tests, missing design assets, unexpected file changes, security findings, or unclear requirements; request a human decision rather than guessing.
- Store run status, timings, token/cost estimates where available, failures, retries, approvals, and final outcomes in an auditable run log.
- Keep generated imagery and source code as separate artifacts when the UI needs editable text, responsive layout, semantic markup, or working interactions. Image generation alone is not a substitute for accessible, functioning UI code.

### Initial pilot and acceptance checks
- Pilot one bounded task, such as the two-path login homepage, before automating broad application changes.
- Verify design assets are delivered before implementation starts; implementation starts only from the approved design/spec handoff; inspection runs against the exact resulting commit.
- Verify CI results are attached to the pull request and the inspector reports pass/fail with evidence.
- Verify no agent can merge or deploy without the configured approval and branch-protection rules.
- Verify a failed stage can be retried without duplicating commits or corrupting another run, and every run has a clear audit trail.
- This section specifies the intended workflow; it does not claim these agents or integrations are already connected or running.

## 36. Unified collaboration rooms, five-item delivery batches, and scale-readiness roadmap

### One connected workspace
- Treat Rooms as a shared collaboration layer connected to the central ticket system, identity/permissions, audit ledger, notifications, workflows, and knowledge base—not as isolated chat pages.
- Provide room templates for War Room / Incident Response, Help Desk, Sales / Customer Success, IT Operations, Security & Compliance, Project / Change Management, and company-specific department rooms.
- Support public-to-company, private, and invite-only rooms; direct messages and group chats; membership management; room owners/moderators; pinned decisions; file and evidence links; searchable history; and retention controls.
- Link discussions to tickets, incidents, changes, assets, customers, and approved knowledge records. Allow a message or decision to create a ticket or action item with explicit confirmation and traceability.
- Support in-app notifications first, with configurable email, SMS/text, and mobile/web push channels as integrations are implemented. Users must control notification preferences; sensitive content should not be sent in notification previews by default.
- Show delivery status, failures, retries, consent/opt-out status where applicable, and an audit trail for outbound notifications. SMS and email delivery must not be represented as live until providers are connected and tested.
- Enforce tenant and room permissions on every read, search, attachment, notification, export, and API request. Private-room content must not leak through global search, AI summaries, or notifications.

### Room-specific capabilities
- **War Room:** incident timeline, severity, affected services/tenants, incident commander, assignments, live status updates, runbooks, evidence, decisions, communications templates, post-incident review, and links to central tickets.
- **Help Desk Room:** requester conversations, ticket-linked private or group collaboration, escalation, knowledge suggestions, response templates, and service-level tracking.
- **Sales / Customer Success Room:** prospect/customer account notes, onboarding milestones, demos, service health summaries, renewals, follow-up tasks, and handoff to support. Restrict commercial records by role and tenant.
- **IT Operations Room:** changes, maintenance windows, device/network health, rollout progress, dependencies, approvals, and rollback plans.
- **Security & Compliance Room:** restricted incident collaboration, evidence chain-of-custody, approvals, audit references, and carefully scoped access.
- **Project / Change Room:** milestones, design decisions, code/pull-request links, deployment status, risks, owners, and acceptance criteria.

### Five-item visual-to-code batch loop
- Let the owner select a bounded batch of up to five related changes at a time—for example, five room enhancements or five UI components—and give each item its own requirement ID, design reference, acceptance criteria, owner, and status.
- Pipeline states: Backlog -> Spec Approved -> Design Ready -> Implementation -> Automated Checks -> Independent Inspection -> Human Review -> Merged -> Preview Verified -> Approved Deployment.
- Design handoff must include editable frames/components, assets, responsive states, interaction notes, and accessibility expectations. Keep text and functional controls in application code rather than flattening them into pictures.
- Each implementation runs on an isolated branch or worktree. Do not have agents concurrently overwrite the same files. Changes are grouped into a batch for planning, but each item remains independently traceable and revertible.
- The inspector evaluates each item and the combined batch for build/test failures, visual regressions, keyboard/accessibility issues, permission mistakes, tenant leaks, and unexpected file changes. A failed item blocks the relevant merge or deployment until fixed or explicitly waived by an authorized reviewer.
- Use completion signals and successful checks to advance stages. A target delay (such as two minutes between stages) may be configured, but elapsed time alone never means a stage is complete.
- Show a batch dashboard with progress, current agent/stage, commit and pull-request links, screenshots/previews, test evidence, blockers, estimated costs when available, and explicit approve/reject/retry/rollback controls.
- Begin with a small pilot on the split login homepage, then rooms, then central ticketing/audit foundations. Expand batch size only after quality and failure recovery are proven.

### Enterprise readiness and sustainable scale
- Prioritize tenant isolation, identity and access management, durable server-side storage, centralized audit, backup/recovery, observability, secure secrets, rate limits, abuse prevention, and incident response before promising large-scale customer deployments.
- Design for horizontal scaling and queues where appropriate; test realistic concurrent users, message volume, notification delivery, search, and background jobs. Millions of users is an aspirational scale target, not a verified capacity claim.
- Separate provider-level platform operations from customer tenant administration and customer content. Support access to tenant data must be approved, scoped, time-limited, and audited.
- Provide documented service tiers, usage limits, support expectations, data processing terms, retention/export/deletion procedures, and customer onboarding/offboarding.
- Measure actual value with customer-visible usage, incident response time, ticket resolution time, automation success/failure, service availability, and verified cost savings. Avoid marketing claims about savings until supported by measured customer outcomes.

### Intellectual property and product differentiation
- Keep private source code in access-controlled repositories, require MFA and least-privilege access, protect secrets, review dependencies, scan for leaked credentials, and use branch protections and audited release permissions.
- Keep sensitive business logic and privileged operations on authenticated server-side services rather than shipping secrets or critical authorization logic to the browser.
- Use appropriate contracts, contributor/IP assignment terms, customer licensing terms, trademark protection, and legal advice for patent/copyright/trade-secret questions as applicable. Maintain provenance for generated assets and third-party dependencies and comply with their licenses.
- Do not promise that software can be made impossible to duplicate. Focus on reducing source exposure and building defensible differentiation through service quality, integrations, workflows, operational data governance, customer trust, and execution.

### Career and operating-model milestones
- Use the next 6–12 months as a measurable development plan, not a guaranteed outcome: deliver a secure, demonstrable MVP; document architecture and threat model; establish CI and test coverage; ship a working login and room workflow; prove tenant isolation; build an audit-backed demo; and produce a portfolio of design decisions, pull requests, test reports, and deployment runbooks.
- Track monthly milestones, risks, shipped capabilities, technical debt, and evidence of outcomes so the platform work can support future remote engineering, platform operations, and technical leadership opportunities.

### Acceptance checks
- Verify private room messages and attachments cannot be retrieved by unauthorized users, global search, direct URLs, AI summaries, or notifications.
- Verify a room discussion can create a central ticket with links to the originating room and audit events.
- Verify email, SMS, and push channels accurately show connected/unavailable status and respect user preferences and required consent.
- Verify a batch of up to five items has separate traceability, isolated code changes, independent inspection, and a clear human approval gate.
- Verify failed tests or inspection findings stop the pipeline and that approved rollback/retry procedures work.
- Verify claims about performance, security, and cost savings are supported by test results or measured production evidence.



## 37. Multi-organization connectivity, resource sharing, and M&A integration

### Product goal
Support parent companies, subsidiaries, business units, and approved external partners under a governed organizational umbrella. Organizations may remain operationally separate while connecting systems, sharing approved resources, or gradually consolidating data during mergers and acquisitions.

### Required operations must remain distinct
- **Connect Organization:** establish or disable an approved technical trust or network connection. Connections may include private/VPN connectivity, identity federation, or service/API links; each must have its own scope, lifecycle, and audit history.
- **Share / Stop Sharing:** grant or revoke access to selected files, datasets, services, infrastructure resources, or workflows without transferring ownership. Revocation should be enforced across active sessions and supported integrations as quickly as technically possible. Report residual access and copies that cannot be remotely recalled.
- **Merge / Reverse Integration:** migrate or consolidate selected records and organizational structures. A merge is a data-changing operation, not merely a connection toggle. Support a reviewed reversal/recovery workflow for operations that can be safely undone; never promise universal one-click reversal after records have been edited, combined, or independently copied.

### Merger/acquisition workflow
1. Establish an authorized integration project and verify authority to access each organization.
2. Inventory users, assets, systems, data sources, applications, contracts/licenses where applicable, policies, and security posture.
3. Compare schemas and identify duplicate identities/records, conflicts, unsupported fields, and access-policy differences.
4. Define source-to-destination mappings, resource-sharing scope, cutover plan, retention obligations, and owners.
5. Back up relevant data and verify that restoration is possible; run a dry-run against a bounded scope.
6. Show a preflight report with record counts, conflict handling, permission changes, risks, and expected effects.
7. Require approvals appropriate to each organization's authority and the sensitivity of the data.
8. Execute in controlled batches with idempotency, retries, progress tracking, and detailed per-record outcomes.
9. Reconcile source and destination, validate relationships and effective permissions, and record exceptions.
10. Retain mappings, transaction history, snapshots, and recovery instructions for supported reversal. Keep each step auditable.

### Multi-tenant security requirements
- Model a durable organization/tenant ID and explicit relationships between parent, subsidiary, and partner organizations.
- Enforce tenant and resource authorization server-side for every API, search, export, file, audit event, integration, and background job.
- Parent-level administration does not automatically grant unrestricted access to subsidiary content. Use explicit delegated scopes, purpose, approval, and time limits for privileged access.
- Keep credentials and connector secrets in a secure backend/secrets manager; use least privilege, MFA where supported, rotation, and revocation.
- Record who connected organizations, granted/revoked sharing, approved/transferred/changed records, and initiated or completed reversal.
- Test cross-tenant isolation, direct-object access, search leakage, stale sessions, partial failures, duplicate imports, retry behavior, and rollback recovery.
- Preserve legal holds, retention policies, data residency obligations, and contractual restrictions. Obtain appropriate authorization before moving or combining another organization's data.

### Acceptance checks
- Company A cannot access Company B's resources until an explicit share/connection and permission allow it.
- Stop Sharing revokes supported access and reports any external copies or permissions that remain.
- Disconnect Organization stops configured trust/sync paths without deleting either organization's own records.
- Dry-run reports deterministic counts and conflicts without mutating production data.
- Merge operations preserve source references, mappings, audit history, and verifiable reconciliation results.
- A supported reversal restores only the scoped changes it can safely reverse and identifies conflicts requiring human resolution.
- A parent administrator cannot bypass tenant permissions simply because the organizations share a hierarchy.

### Status
These are roadmap requirements. They do not indicate that production multi-tenancy, VPN connectivity, cross-organization sharing, OneDrive integration, backups, or merger/migration execution is already implemented.

## 38. Global executive command view, cross-tenant administration, and scale target

### Product goal
Allow an authorized platform owner / Super Admin to oversee multiple legally and operationally distinct organizations from one authenticated command-center experience. The first demonstration case is IntelliStack Systems alongside a separately branded acquired or partner company. The second company's final brand/name remains **TBD**; do not present it as a real customer or completed acquisition.

### Tenant structure and organizational hierarchy
- Create a separate top-level tenant for the second company, independent from the IntelliStack tenant.
- Support a multi-tier organization tree within each tenant: parent organization, subsidiaries or legal entities, business units, departments, regions/countries, sites/locations, teams, and users, where applicable.
- Each tenant maintains its own user directory/memberships, roles, identity configuration, connected systems, assets, tickets, incidents, policies, retention settings, and audit scope unless a specific, approved sharing relationship is configured.
- Support organization-specific branding and configuration without confusing company identity or implying that the organizations have merged legally.
- A target of **up to 1,000,000 registered users globally across the platform** is a scale objective for architecture and validation, not a claim that one million users have been provisioned, licensed, or tested. Tenant-level user counts and enabled/active accounts must be separately reported.

### Unified Super Admin experience
- Provide a tenant/org switcher after a single authenticated login for platform administrators who are explicitly authorized for multiple tenants.
- Show the current tenant prominently at all times; use clear tenant-specific visual identity and context in headers, records, search, exports, audit events, and confirmation dialogs.
- Offer a global executive overview of authorized tenants, regions, departments, sites, connected systems, connector freshness/health, incidents, risk, compliance evidence, and service availability.
- Global rollups must state coverage, last update, source, and known blind spots. Do not imply visibility into systems or data that are not connected and authorized.
- Opening a tenant workspace must apply that tenant's effective authorization on the server. Switching context is not an authorization bypass and must not silently elevate the administrator's privileges.
- Keep global platform operations (service health, tenant provisioning, platform configuration) separate from access to customer/tenant content.

### Cross-tenant privilege and audit controls
- Use least privilege, MFA, and step-up authentication for sensitive cross-tenant actions where supported.
- For support access to tenant content, require a specific purpose, approved scope, limited duration, and auditable start/end events; support customer-approved access workflows where appropriate.
- Log administrator identity, active tenant, target tenant/resource, purpose or ticket, approvals, action, timestamp, outcome, and relevant request/session correlation IDs.
- Provide tenant-specific roles and delegated administrators; parent-company hierarchy alone does not grant unrestricted access to subsidiary or partner data.
- Prevent cross-tenant leakage through APIs, database queries/RLS, global search, AI context, reports, exports, attachments, notifications, caches, background jobs, and direct-object URLs.
- Provide emergency/break-glass access only through a separate, narrowly scoped, time-limited, justified and audited workflow with post-event review; it must not be a hidden permanent bypass.
- When a user switches tenant, invalidate or re-evaluate tenant-scoped caches, selections, queries, and sessions. Never show stale data from the previous tenant.

### Million-user global-scale engineering target
- Design for horizontal scaling, indexed and tenant-aware data access, background job queues, rate limits, connection pooling, resilient notification delivery, observability, and graceful degradation.
- Define explicit service objectives for authentication, tenant switching, dashboard freshness, search, incident creation, audit-event durability, and recovery.
- Plan for regional latency, data residency, tenant-configurable retention, disaster recovery, and regional failure scenarios. Do not replicate restricted data across regions without approved policy.
- Support bulk provisioning/deprovisioning and identity lifecycle integration (for example, supported SSO/SCIM where implemented), pagination, asynchronous imports/exports, and rate-limited APIs.
- Validate capacity with a documented test plan covering realistic tenant distribution, concurrent active users, read/write patterns, burst traffic, incidents, audit volume, and regional latency. Record the tested scale and bottlenecks; never label a million-user target as proven until measured.
- Start with architecture and load-test planning; do not create one million fake accounts as a substitute for performance testing or seed synthetic users into production.

### Acceptance checks
- An authorized Super Admin can sign in once and switch between the IntelliStack tenant and a separately named Company B tenant without re-authenticating at every navigation step, subject to session and policy requirements.
- The active tenant is always visible, and switching tenants changes the data and permissions available to the UI and server APIs.
- A user who belongs to only one tenant cannot access another tenant by changing an ID, URL, request payload, search query, export, or AI prompt.
- Cross-tenant support access is blocked until required authorization, purpose, scope, and duration are satisfied, and every action is audited.
- Global dashboards aggregate only explicitly authorized, available sources and display data freshness and coverage gaps.
- Automated tests cover tenant isolation, role matrices, stale sessions/caches, exports, background jobs, attachments, audit access, and break-glass expiration.
- Load tests and architecture evidence substantiate any published concurrency/user capacity claims.

### Status
This is a roadmap and scale target only. It does not mean that a second company tenant, global tenant switcher, cross-tenant executive dashboard, production authorization controls, or million-user capacity is implemented or load-tested.

## 39. Controlled cross-tenant access architecture and implementation plan

### Confirmed authority model
**Global Oversight with Controlled Access** is the approved product decision.
- A Super Admin may see an aggregated global overview only for tenants explicitly within their authorized oversight scope.
- Global summaries should contain operational metadata and risk/health aggregates by default, not unrestricted raw tickets, messages, documents, user details, or evidence.
- Opening sensitive tenant content requires a separate authorization check for the specific tenant, resource/action, purpose, and policy. Global visibility does not imply tenant-content access.
- The selected model does not grant blanket content access, permanent impersonation, or a hidden authorization bypass.
- One authenticated session can support smooth tenant switching when policy permits; every request is still authorized against the selected tenant and requested resource on the server.
- The second company's legal name, brand, and actual onboarding are TBD. Do not invent a customer or claim an acquisition has occurred.

### Logical architecture
1. **Identity/session layer:** use the configured identity provider; require MFA for privileged roles where supported; bind the authenticated subject to explicit platform grants and tenant memberships. Do not rely on a client-side role selector.
2. **Tenant context resolver:** derive the active tenant from a validated request/context and verify that the authenticated user has a valid membership or specific platform-level grant for the requested operation. Never trust a client-supplied tenant ID on its own.
3. **Authorization policy layer:** centralize policy checks for global summary, tenant workspace access, resource read/write, administration, exports, connector secrets, support access, and emergency access. Default to deny.
4. **Data layer:** persist tenant-owned business records with tenant identity and enforce isolation in server-side queries and database policies. If Supabase/Postgres is used, use RLS policies tied to authenticated identities and membership/grant tables; privileged service credentials must remain server-side and must not bypass authorization accidentally.
5. **Global oversight API:** return only explicitly approved aggregates from authorized tenants, with tenant coverage, source, freshness timestamp, and unavailable/stale indicators. Do not implement the overview as a client-side union of unrestricted tenant queries.
6. **Privileged access workflow:** require purpose/reason, requested scope, target tenant/resource, expiry, and appropriate approval for sensitive support access. Enforce expiration server-side and log both grant and revocation/use. Avoid persistent impersonation.
7. **Audit and monitoring:** record authentication and tenant switching, denied cross-tenant attempts, grant creation/approval/use/revocation, exports, policy changes, and sensitive reads/writes. Audit records should include actor, active tenant, target tenant, action, purpose/ticket, timestamp, outcome, correlation ID, and grant/approval reference where applicable.
8. **UI layer:** always show the active tenant name/brand and environment; use tenant context in navigation, breadcrumbs, search, forms, dialogs, and exports. Clear tenant-specific local state and refetch data on switching. UI indicators are helpful but never substitute for server authorization.

### Initial data model proposal
Confirm the existing database schema and migration history before implementing migrations. Proposed logical entities:
- organizations / tenants: tenant ID, canonical name, brand/configuration, lifecycle status, region and policy references.
- organization_units: tenant ID, parent unit ID, type (legal entity, business unit, department, region, site, team), name and status.
- tenant_memberships: tenant ID, user/identity subject, role, status, provisioning source and timestamps.
- platform_admin_grants: identity subject, permitted global operations, allowed tenant scope, status, approver, expiry and reason. Keep platform operations distinct from tenant-content access.
- tenant_relationships: source and target tenant IDs, relationship type (parent/subsidiary/partner/acquisition project), status, effective dates and approvals. A relationship alone must not confer data access.
- cross_tenant_access_grants: actor, target tenant, resource/action scope, purpose or ticket, approver(s), valid-from/expiry, status and revocation metadata.
- audit_events: actor, active/target tenant, action/resource, purpose, decision/outcome, timestamp, correlation ID, and associated grant/approval references.
- Tenant-owned records (tickets, incidents, assets, connector metadata, evidence, communications, etc.) must carry or resolve to a tenant ID and have an explicit ownership/sharing rule.
- Optional global aggregate views/RPCs must be narrowly scoped, reviewed, and incapable of returning unrestricted raw tenant content.

### Implementation sequence and gates
**Phase 0 — Verify current foundations**
- Inspect current branch/PR, package stack, Supabase schema/migrations, authentication setup, RLS policies, and existing data before coding.
- The repository currently contains a React + Vite prototype. Do not assume it has Next.js server routes or a production backend. Confirm available server-side execution before selecting API placement.
- Write a tenant/resource/action authorization matrix and a short threat model covering tenant ID tampering, direct-object access, search/export leakage, stale sessions/caches, background jobs, AI context, and privileged support access.
- Gate: architecture and existing schema reviewed; no production data changes.

**Phase 1 — Tenant data and authorization foundation**
- Create reviewed, version-controlled database migrations for tenant/organization units, memberships, platform grants, relationship metadata, cross-tenant access grants, and audit events as needed after schema inspection.
- Implement server-side authorization helpers and database RLS policies; avoid broad service-role access from client code.
- Add tests proving default-deny behavior and that changing a tenant ID cannot cross boundaries.
- Gate: isolation tests pass before global overview or tenant-switch UI can read tenant-owned records.

**Phase 2 — Tenant switcher and context safety**
- Add a tenant switcher that lists only authorized tenant contexts and clearly identifies the active tenant.
- Re-resolve permissions for every API/resource request; reset/refetch client data, clear tenant-specific selections, and handle revoked access or expired sessions.
- Add visible context in page headers and confirmations for destructive or sensitive operations.
- Gate: tenant switching and direct URL/request tampering tests pass.

**Phase 3 — Global executive overview**
- Add a server-side aggregation endpoint/view for approved metrics: tenant and site inventory, incident counts/severity, connector status/freshness, service health, risk trends, and coverage gaps.
- Return only fields approved for global oversight. Link into tenant workspaces without silently expanding privileges.
- Mark every value as live, stale, simulated, unavailable, or unmonitored as applicable.
- Gate: aggregate responses are tested for both authorized scope and prohibited sensitive fields.

**Phase 4 — Controlled content access and review**
- Add request/approval/expiry/revocation workflows for specific sensitive records where business requirements justify access.
- Require purpose, scope, expiry, approval, and audit trail; support a review report for privileged access.
- Gate: expired/revoked grants stop access server-side and produce auditable outcomes.

**Phase 5 — Scale and reliability**
- Establish SLOs, observability, rate limiting, queueing, backup/recovery, regional/data-residency requirements, and load-test scenarios.
- Test representative tenant distribution and concurrency before claiming any capacity. One million registered users remains an aspirational target until measured evidence supports a precise claim.
- Gate: publish only the scale and performance actually validated.

### Security acceptance tests
- A user with membership in Tenant A only cannot read, mutate, search, export, or infer Tenant B records, even by changing URL parameters, request bodies, record IDs, filters, attachment URLs, or AI prompts.
- A platform administrator with global summary permission sees only approved aggregates, not arbitrary raw records.
- A cross-tenant grant is constrained by tenant, resource/action, purpose, approval, and expiry; revocation and expiration take effect server-side.
- Tenant switching never reuses cached records from the previous tenant; permission revocation and session expiry are handled safely.
- Background jobs, notifications, exports, search, AI tools, connector callbacks, and audit readers enforce the same tenant policy as interactive APIs.
- Denied attempts are logged without leaking the existence or contents of protected resources to unauthorized callers.
- No privileged database secret is shipped to the browser; production changes require migration review, backup/recovery planning, and explicit release approval.

### Delivery status and release guardrails
This section is an approved architecture/implementation plan, not evidence of implemented controls. Do not represent tenant isolation, a global dashboard, tenant switching, or cross-tenant grants as operational until code, database policies, and automated tests verify them. Work stays on the agreed feature branch. Do not merge the PR or deploy production without the user's explicit approval.

## 40. Mock tenant portfolio and platform-owner demo authority

### Approved mock-company example
- Use **Northstar Harvest Foods** as a fictional food manufacturing and distribution company for demonstrations. Clearly label it as a mock organization and do not imply that it is an actual customer or acquired company.
- Seed example organizational dimensions such as corporate headquarters, regions, manufacturing plants, warehouses, distribution centers, departments, and teams. All headcounts, incident totals, locations, and connected-system counts shown in the UI are illustrative demo values.
- The mock tenant registry may be used to create additional fictional companies for demonstrations. Do not create real users, external connections, or production records when adding a mock tenant.

### Platform-owner authority in the demonstration environment
- A designated platform-owner identity can have full administrative authority over explicitly designated mock tenants in the isolated demo environment, including the mock organization tree and mock tenant configuration.
- The global command view can show the portfolio and allow switching between those mock tenant contexts.
- This demo authority must be an explicit environment-scoped capability, not inferred solely from a UI role dropdown, a company relationship, or a user-controlled tenant ID.
- The demonstration interface must clearly label its authority as simulated until server-side identity, grants, database policy, and tenant-isolation tests enforce it.

### Boundary for actual connected systems and devices
- Access to real company systems, devices, endpoints, SaaS applications, network equipment, telemetry, and sensitive records is limited to the specific integration scopes and permissions approved by that company.
- A platform owner may manage tenant registration and view approved global aggregates without automatically receiving raw tenant-content or device-level access.
- A company-approved connection or grant must specify scope, permitted actions, owner/approver, expiry/revocation, and audit requirements. Connection health does not mean permission to read or control every resource in that system.
- Mock-tenant full access must never be reused as a default grant for a real tenant or live connector.

### Current prototype UI behavior
- Add a Super Admin navigation page called **Global Tenant Command**.
- Show an active-tenant selector, organization portfolio cards, illustrative global metrics, a sample multi-tier hierarchy, and a create-mock-tenant workflow.
- Persist mock tenant definitions in browser localStorage for the local demonstration only; this is not shared or authoritative server-side tenant storage.
- Display an explicit notice that existing prototype tickets, devices, users, and integrations are not yet tenant-isolated. The mock selector is a demonstration context and must not imply that existing records or connected systems have been safely partitioned.
- Label seeded counts and system states as illustrative/simulated; one million users remains a target, not a tested capacity claim.

### Production gates
- Before treating the feature as production-capable, implement authenticated server-side tenant context, explicit platform-owner grants, per-tenant membership and role checks, database RLS, tenant-scoped records, secure global aggregate APIs, scoped system/device authorization, and tamper-resistant audit events.
- Add automated negative tests for tenant ID tampering, direct-object access, search/export leakage, background tasks, stale client state, and attempted use of demo grants against real tenants.
- Do not merge or deploy production without explicit user approval.

