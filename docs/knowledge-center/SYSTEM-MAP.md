# System map and implementation status

This is an operational orientation map, not a promise that every named product or integration is already connected. Check code, environment configuration, tests, and live service health before reporting a capability as operational.

## Repository and delivery

| Area | Current known position | What to verify |
|---|---|---|
| Frontend | React + Vite application | Build, route rendering, accessibility, responsive behavior |
| Ticket workflow | Seeded demo tickets; ticket changes/activity have been described as localStorage persistence | Browser-local vs shared persistence; concurrency; API and authorization |
| Identity and roles | Role-oriented UI/workspaces | Real authentication, server-enforced role/tenant authorization, session handling |
| Database | README describes demo UI state and a future database-backed design | Actual schema, migrations, access policies, backups, and audit history |
| AI assistants | Maximus/Optimus are documented as prototype/scripted behavior | Model connection, tool permissions, guardrails, audit, and failure handling |
| Remote support | Simulated session state | Approved provider integration, consent, access checks, session audit |
| Integrations | UI/watchlist may describe intended connectors | Real credentials, health checks, error handling, data flow, and owner |
| Deployment | GitHub Actions build check; Vercel/GitHub Pages have been discussed | Exact commit, workflow result, deployment URL, timestamp, and production smoke test |

## Product areas to document

### Core Command Center
- Super Admin: system overview, user/role management, integrations/connectors, security and compliance.
- Help Desk Agent: service desk, tickets, end-user directory, knowledge base, system status.
- IT Administrator: infrastructure inventory, support workflows, automation.
- Governance & Compliance: governance center, audit log, evidence and policy workflows.

The four primary roles are Super Admin, Help Desk Agent, IT Administrator, and Governance & Compliance. These roles are not the same thing as any seeded demo/test accounts. A role shown in the UI is not proof of server-side authorization.

### Planned or separately scoped connected products
- **Rapid Workforce:** candidate/employer accounts, job postings, matching, applications, hiring workflow, daily job recommendations and notifications.
- **IntelliChat:** private messaging and, when implemented with an approved real-time media service, voice/video interview rooms with explicit browser permissions.
- **IntelliPay:** payroll and payment workflows through verified integrations.
- **IntelliTax:** tax documentation, calculations/filings status, and reconciliation through verified services.
- **Troubleshooting & Knowledge Center:** collaborator onboarding, runbooks, system map, incident/handoff records, and searchable articles.

These product descriptions capture the intended architecture. They do not establish that job matching, push/SMS/email delivery, live video, payroll processing, tax filing, or production persistence are live.

## Required status vocabulary

Use one of these labels in tickets, UI, and handoffs:

- **Implemented and tested** — code exists and the stated validation passed.
- **Implemented; not verified** — code appears present, but the required validation was not completed.
- **Prototype/demo** — simulated, seeded, scripted, or browser-local behavior.
- **Backend pending** — UI or workflow exists but server-side persistence/integration is not complete.
- **Planned** — documented intent without an implementation.
- **Blocked** — dependency, decision, permission, or failure prevents progress.

Never mark an integration “Connected” solely because a button or settings screen exists.

## Data and security boundaries

- Use synthetic data in development and screenshots.
- Treat résumé, candidate, employee, payroll, tax, identity, audit, and message data as sensitive.
- Enforce tenant, role, and record-level access on the server, not only in React.
- Keep secrets in approved secret storage; never commit keys or include them in documentation.
- Log security-relevant actions with actor, action, timestamp, result, and correlation ID, without logging credentials or unnecessary sensitive content.
