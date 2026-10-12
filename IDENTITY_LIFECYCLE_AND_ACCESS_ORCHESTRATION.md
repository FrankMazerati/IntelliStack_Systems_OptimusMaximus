# Identity Lifecycle & Access Orchestration

## Purpose

IntelliStack Systems should replace disconnected onboarding tickets and manual handoffs with one coordinated, auditable workflow that makes an employee productive as quickly as safely possible. The target is hours or less for standard, preapproved cases when identity providers, licenses, devices, applications, and approvers are ready. This is a target, not a guarantee; external dependencies and exceptions can extend the timeline.

## Product capability

The feature is a reusable platform capability available to authorized IntelliStack customers, including managed service providers (MSPs), enterprise customers, and organizations such as restaurant, retail, hospitality, and other multi-site operators. Named companies are examples of potential customer types, not claimed customers or integrations.

Each customer gets its own isolated onboarding configuration, employee records, templates, approval chains, connectors, audit history, and reporting. An MSP may manage multiple client organizations only through explicitly granted, tenant-scoped permissions. Neither a platform operator nor an MSP should automatically receive unrestricted access to customer employee data or credentials.

## Unified onboarding workflow

1. **Request and validate:** An authorized HR user or manager submits the employee, manager, department, site/location, start date, employment type, and approved job role. Validate required fields and detect duplicate or conflicting identities.
2. **Plan and preview:** Resolve the approved role template into a dependency plan for identity, groups, applications, license/service plans, device assignment, endpoint enrollment, and required training or acknowledgments. Show unavailable licenses, blocked dependencies, risk, and approvals before execution.
3. **Approve by risk:** Automate preapproved, least-privilege tasks. Route sensitive or unusual access, privileged roles, segregation-of-duties conflicts, and policy exceptions to the right approver. Requesters cannot approve their own elevation.
4. **Provision through authorized connectors:** Where configured and consented, coordinate Microsoft Entra ID or Active Directory, Microsoft 365 licensing/service plans, ServiceNow user/group/role assignments, endpoint management, and other approved business applications. Start with read-only discovery, then add narrowly scoped writes with customer approval and integration-specific testing.
5. **Verify actual state:** Reconcile provider responses with authoritative system state. A queued request or successful API response alone is not proof that access works. Use explicit statuses such as Planned, Waiting for approval, Provisioning, Verified, Blocked, Failed, and Manual action required.
6. **Resolve exceptions:** Retry safe, idempotent operations; avoid duplicate accounts and assignments; identify the responsible team; show the precise blocker and next action; and preserve the full dependency trail.
7. **Confirm readiness:** Produce a per-employee readiness checklist and auditable summary of identity, MFA, application access, licenses, device posture, and outstanding actions. Do not declare complete while mandatory controls remain unverified.
8. **Maintain lifecycle:** Support role changes, transfers, leave, periodic access reviews, and offboarding. Revoke access promptly on termination, preserve legally required records, transfer ownership of business data through approved processes, and verify deprovisioning.

## Role templates and customer configuration

Provide editable, versioned templates for roles such as Help Desk Tier 1/Tier 2, IT Administrator, Security Analyst, Governance & Compliance, store/restaurant manager, hourly frontline employee, corporate employee, and contractor. These are starting points only. Each customer defines its approved apps, licenses, access bundles, locations, approval rules, and policy constraints.

Templates must follow least privilege, have an owner and review date, and support change history, impact preview, staged rollout, and rollback where providers permit. No universal role should silently grant global or cross-customer access.

## MSP and multi-company tenancy

- Enforce tenant boundaries server-side across database queries, APIs, jobs, logs, search, exports, AI features, and integration credentials.
- Bind every connector and provisioning action to the correct customer tenant and approved scopes; never reuse one customer's credentials for another.
- Let an MSP switch between authorized customer contexts while keeping the active tenant conspicuous and requiring explicit target confirmation for impactful actions.
- Support delegated administration, customer-owned approvals, configurable data retention, and customer-visible audit trails.
- Keep aggregate operational metrics separate from raw employee records; global oversight is aggregate by default.
- Prevent cross-tenant discovery through guessed IDs, altered requests, cached responses, or background jobs.
- Clearly identify which actions are simulated, connected, requested, completed, and independently verified.

## Security and reliability requirements

- Use server-side authorization and row-level security; UI visibility is not an authorization boundary.
- Store integration secrets in approved server-side secret storage, never in browser code or local storage.
- Use narrowly scoped, revocable credentials and customer consent; document permissions and provider limitations.
- Require step-up authentication and approval for privileged or broad-impact actions; use time-limited elevation and record grant, use, expiry, and revocation.
- Use idempotency keys, retry limits, backoff, dependency-aware orchestration, reconciliation, and compensating actions where safe.
- Protect personal information with data minimization, role-based visibility, retention rules, and audit access.
- Do not expose passwords, tokens, private keys, or recovery keys in dashboards, logs, tickets, or AI context.
- Treat external HR records and integration responses as untrusted input; validate schemas and reject unexpected operations.
- Keep a clear distinction between policy specification, prototype, simulated data, connected integration, and verified enforcement.

## Metrics

Track median and 90th-percentile time to productive access; time spent waiting for approval; percentage of steps automated; license and provisioning failures; duplicate-account prevention; access denied due to role/template errors; manual interventions; time to offboard; stale or excessive permissions; cross-tenant isolation test results; and percentage of mandatory readiness checks verified.

## Phased delivery

1. **Workflow prototype:** synthetic employees and visibly simulated connectors; demonstrate the complete dependency graph and exception queue.
2. **Tenant-safe foundation:** review schema and RLS; test tenant isolation for all read/write paths, jobs, exports, logs, and AI context.
3. **Read-only connectors:** verify identities, license inventory, app assignments, and device state with least privilege and source timestamps.
4. **Controlled provisioning:** enable one provider/action at a time with customer approval, idempotency, audit evidence, failure handling, and verified postconditions.
5. **MSP delegation:** add scoped multi-customer administration and prove that customer A cannot read or modify customer B.
6. **Production gate:** independent security review, recovery/rollback tests, privacy review, load testing, provider permission review, and explicit release approval.

## Acceptance tests

- A standard approved employee onboarding request coordinates all configured tasks from one workflow and exposes blockers without requiring the user to chase separate teams.
- A missing license or unavailable device is surfaced as a dependency, not misreported as success.
- Replaying a job does not create duplicate identities, licenses, or assignments.
- An unapproved privileged role is held for approval; a requester cannot approve their own elevation.
- An MSP operator cannot access another client without a specific, current grant.
- Attempts to change tenant IDs or call APIs directly do not bypass tenant isolation.
- Offboarding removes configured access and verifies provider state, while documenting failures that require human intervention.
- Audit records identify who requested, approved, executed, and verified each material change.
- The UI never describes simulated provisioning as a live action.
- No merge or production deployment occurs without explicit approval.

## Current status

This document defines intended product behavior and acceptance criteria. It does not prove that these workflows or provider integrations are implemented, connected, secure, or production-ready. Implement in the existing feature branch and keep live provisioning disabled until the corresponding security and integration gates pass.
