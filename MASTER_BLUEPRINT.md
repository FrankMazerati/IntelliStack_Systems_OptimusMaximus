# IntelliStack Systems — Master Product Blueprint
## Maximus Optimus Command Center
**Status:** Living product and implementation blueprint  
**Repository:** FrankMazerati/IntelliStack_Systems_OptimusMaximus  
**Working branch:** feature/super-admin-platform-builder  
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

