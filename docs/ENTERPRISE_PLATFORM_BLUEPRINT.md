# IntelliStack Systems Enterprise Blueprint

## Product direction
Build IntelliStack Systems / Maximus Optimus Command Center as a configurable enterprise operating platform, not a collection of disconnected dashboard mockups. Preserve the established dark navy / cyan interface direction and the four-panel reference-grid visual language for future UI work. Images are design references; production deliverables are working application code and backend behavior.

## Primary system roles
These platform roles are distinct from department titles:
- Super Admin
- Help Desk Agent
- IT Administrator
- Governance & Compliance

Additional operational roles (such as Security Agent and Network Operations) can be configured as needed. Business roles such as CEO, CFO, HR Director, and Department Manager are separate business roles and must not automatically inherit Super Admin access.

## Department catalog
Departments are organization-configurable, enabled/disabled per tenant, reorderable, and may have parent-child relationships. Initial catalog:
1. Executive Leadership & Corporate Strategy
2. Finance, Accounting & Treasury
3. Human Resources & Workforce
4. Information Technology & Infrastructure
5. Cybersecurity, Risk & Compliance
6. Business Operations & Service Delivery
7. Sales, Marketing & Communications
8. Legal, Privacy & Corporate Affairs
9. Procurement, Vendors & Supply Chain
10. Product, Engineering & Innovation
11. Customer Experience & Customer Success
12. Facilities, Physical Security & Workplace
13. Project, Program & Portfolio Management
14. Data, Analytics & Business Intelligence
15. Learning, Development & Organizational Effectiveness
16. Manufacturing & Production
17. Logistics & Distribution
18. International & Regional Operations
19. Environmental Health & Safety
20. Investor Relations
21. Research & Laboratory Operations
22. Franchise & Partner Management

The department list is a starting catalog, not a hard-coded restriction. Organizations can create departments, divisions, regions, business units, subsidiaries, and teams.

## Navigation
Use a scrollable left sidebar with expandable groups and nested pages:
- Command Center
- Service Management
- People & Organization
- Infrastructure & Operations
- Security, Risk & Compliance
- Enterprise Departments (each department has its own submenu/categories)
- Integrations & Automation
- Communication & Collaboration
- Analytics & Reporting
- IntelliSphere Applications
- System Administration

Keep Maximus and Optimus as separate assistant launchers, available in authorized workspaces. Keep sidebar scroll independent from main content scroll. Preserve active page and expanded groups during navigation.

## IntelliSphere Applications
- IntelliStaff
- IntelliWork
- IntelliHire
- IntelliPay
- IntelliWord
- IntelliSheets (spreadsheet, formula, chart, and analysis workspace)
- IntelliSlides
- IntelliStudio
- Existing and future components such as IntelliTax, IntelliDrive, and IntelliForms may remain in the product registry if retained by product decisions.

## Optimus
Optimus is the intelligence and problem-solving partner:
- Universal search across authorized users, identities, devices, tickets, assets, knowledge articles, policies, documents, integrations, logs, and other connected sources.
- Incident summaries, system-activity explanations, evidence-linked investigation, and clear separation between facts and hypotheses.
- Draft ticket updates, reports, policies, communications, and IntelliSheets formulas.
- Recommend workflows and identify potential problems.
- Request permission and required approvals before consequential actions.
- Link to original records; never claim an action completed without confirmation from the underlying system.

A dedicated Optimus page/route should include assistant identity, universal search, conversation/investigation workspace, source citations, recent investigations, suggested prompts, and an action/approval history. The current React app already has an Optimus navigation item and assistant page path; evolve that page rather than adding another duplicate entry.

## Maximus
Maximus shares Optimus's core capabilities, with additional executive and command focus:
- CEO strategy, organizational health, major risks, and business continuity.
- CFO reporting, budgets, spending, licenses, vendor costs, and financial analysis using authorized data.
- Security risk prioritization and cross-system incident context.
- Network/service impact analysis.
- War Room coordination, incident timeline, owners, blockers, decisions, and executive situation reports.
- Same permission enforcement, evidence traceability, approval gates, and audit requirements as Optimus.

## Shared backend foundations
- Multi-tenant organization model.
- Configurable departments and parent-child organizational structure.
- Auth-linked user profiles and organization memberships.
- Role catalog, permission catalog, and membership-to-role mappings.
- Tickets with lifecycle, requester, assignee, department, priority, and timestamps.
- Assets with ownership and metadata.
- Knowledge articles with publication state and visibility.
- Audit events.
- AI action approval requests.
- Search services that always apply organization and record-level access controls.
- Server-side enforcement for writes; UI visibility is never the security boundary.

## Delivery sequence
1. Review current React app and identify existing mock/local state and routes.
2. Set up Supabase project configuration and environment variables without committing secrets.
3. Apply schema in a non-production Supabase project; test row-level security with automated fixtures.
4. Implement server-authorized membership/permission checks and write operations.
5. Replace local ticket, user, asset, and knowledge state with authenticated persistent data.
6. Add department administration and dynamic sidebar/submenus backed by department/module registry data.
7. Upgrade Optimus and Maximus pages on the shared intelligence/search/approval infrastructure.
8. Add connected enterprise department workflows and IntelliSphere capabilities incrementally.
9. Test authorization, tenant isolation, lifecycle transitions, auditability, accessibility, performance, backups, and recovery before production.

## Safety and production notes
The initial SQL is a foundation, not a complete production-ready RBAC implementation. Before live use, add and test narrowly scoped write policies or server-side functions, tenant-isolation tests, account provisioning flows, safe migrations, backups, monitoring, and recovery procedures. Never expose Supabase service-role credentials in client-side code. Do not present simulated monitoring or AI responses as live connected evidence.
