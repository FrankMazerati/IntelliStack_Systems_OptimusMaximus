# IntelliStack Enterprise Readiness Scorecard

## Goal
Target 100/100 maturity in each category. A score is earned only from evidence: merged implementation, automated tests, operational proof, and documented ownership. A polished screen or a schema alone is not completion. This is a living engineering plan, not a certification or a claim that the current demo is production-ready.

## Current baseline
The repository README describes a React/Vite demo with synthetic records, browser-local ticket persistence, simulated remote support, and simulated connector/device states. The Supabase schema and role catalog migration are foundations only; their existence does not prove that they have been applied, tested, or connected to the UI. Treat production-readiness scores as provisional until CI and an environment audit provide evidence.

## Readiness rubric (each category is scored independently)
- **0–20 — Concept:** requirements and design only.
- **21–40 — Prototype:** visible workflows or partial implementation; synthetic/local data may be used.
- **41–60 — Implemented:** real service code exists but critical coverage, authorization, or operational evidence is missing.
- **61–80 — Verified:** automated tests cover critical paths; security and failure paths are exercised in a non-production environment.
- **81–95 — Production-proven:** monitored pilot, load and recovery tests, incident playbooks, backup/restore evidence, and operational ownership.
- **96–100 — Sustained excellence:** measurable SLOs and customer outcomes are met over time, independent security review findings are resolved, and continuous verification prevents regression. A 100 score is not a permanent state.

## Category gates

### 1. Product design and architecture direction
- [ ] Publish a source-of-truth product architecture, module registry, ownership map, and API/data contracts.
- [ ] Preserve the four primary roles: Super Admin, Help Desk Agent, IT Administrator, Governance & Compliance. Keep these distinct from seeded demo accounts, job titles, departments, and account types.
- [ ] Define tenant boundaries, data classification, retention, residency, export, and deletion policies.
- [ ] Define accessibility, responsive behavior, navigation conventions, design tokens, and user preference behavior.
- [ ] Architecture decision records document consequential choices and trade-offs.
- [ ] Review architecture for extensibility, least privilege, failure isolation, and cost.

### 2. Current implementation maturity
- [ ] Establish deterministic dependency installation with a committed lockfile.
- [ ] CI builds every pull request and protected branch; add lint, type/static checks, unit tests, integration tests, and end-to-end tests as they become available.
- [ ] Replace critical localStorage-only business data with authenticated server APIs and durable database persistence.
- [ ] Add loading, empty, error, retry, stale-data, and offline states to critical workflows.
- [ ] Add schema validation at API boundaries, idempotency for retried mutations, concurrency-safe identifiers, and pagination for large collections.
- [ ] Maintain a feature inventory marking each capability as demo, partial, integrated, tested, or production-verified.

### 3. Production security and reliability
- [ ] Enforce authorization on the server/database for every tenant-scoped read and write; UI hiding is never an authorization boundary.
- [ ] Test cross-tenant isolation and role/permission boundaries using automated negative tests.
- [ ] Remove freely selectable demo role switching from production builds; derive effective identity from authenticated server state.
- [ ] Validate RLS policies, privileged database functions, trigger behavior, and migrations in a disposable test project.
- [ ] Keep secrets server-side; use a managed secret store, rotation, least-privilege connector credentials, and redaction in logs.
- [ ] Add MFA/SSO options, session revocation, rate limits, abuse protections, secure headers, dependency scanning, and threat modeling.
- [ ] Add structured logs, metrics, traces, alert routing, health checks, SLOs, and an incident response runbook.
- [ ] Prove backups and restores, disaster recovery, data export/deletion, capacity limits, and rollback procedures.
- [ ] Complete independent penetration testing and remediate critical/high findings before general availability.

### 4. Migration and connector maturity
- [ ] Build a shared connector framework and separate Migration Center workflows using the same connector definitions.
- [ ] Deliver connector lifecycle states: discovered, configured, validating, connected, degraded, expired, disabled, and disconnected.
- [ ] Support least-privilege OAuth/service credentials, secret rotation, connection testing, scopes visibility, and audit trails.
- [ ] Implement source adapters for supported APIs, webhooks, directory sync, approved file imports, and agent-based connections where needed.
- [ ] Define versioned connector contracts, capability declarations, pagination, rate-limit handling, retries with backoff, checkpoints, and idempotency.
- [ ] Build migration jobs with source selection, field mapping, preview, dry run, validation, duplicate resolution, approval, staged execution, reconciliation, retry, cancellation, and rollback/compensation plans.
- [ ] Track job state durably; support resumable jobs and record-level success/failure without exposing sensitive source data.
- [ ] Prove tenant isolation, secret redaction, auditability, data minimization, and deletion/retention controls.
- [ ] Test connectors against vendor sandboxes and representative failure modes; label unsupported capabilities honestly.
- [ ] Do not claim device management from inventory import alone. Device actions require an actual supported endpoint-management integration and explicit authorization.

### 5. Enterprise operations and customer outcomes
- [ ] Pilot with at least one consenting organization and documented success criteria.
- [ ] Measure onboarding time, import accuracy, connector uptime, sync lag, ticket workflow success, and support burden.
- [ ] Publish support boundaries, service status, maintenance policy, incident communication process, and escalation path.
- [ ] Document deployment, migration, backup, restore, upgrade, and customer offboarding procedures.
- [ ] Review feedback and security incidents in a recurring improvement cycle.

## Delivery order
1. **Safety and build foundation:** deterministic installs, CI, build verification, test environment, secrets and authorization review.
2. **Backend truth:** authenticated APIs, tenant-safe persistence, server-enforced permission checks, audit events, and negative security tests.
3. **Connector framework:** connector registry, credentials, capability contracts, health checks, durable sync jobs, and observability.
4. **Migration Center:** source inventory, mappings, dry run, validation, approval, staged import, reconciliation, and recovery.
5. **Pilot hardening:** load, failure, recovery, security, accessibility, and usability testing with measurable acceptance criteria.
6. **Production operations:** SLOs, monitoring, backups, runbooks, support model, independent review, and continuous regression prevention.

## Release rule
No milestone is marked complete based solely on a UI, documentation, a database migration file, or a successful compile. Completion requires the relevant implementation, tests, recorded evidence, and an owner. Never apply unreviewed migrations directly to production.
