# IntelliStack Security, Privileged Access, and Recovery Baseline

## Purpose

This document records the minimum security architecture required before IntelliStack Systems is opened to external organizations. The current React/Vite experience is a prototype. Browser-side role selection, localStorage, visual buttons, and sample audit events are not an authorization boundary.

## 1. Separate the control planes

Keep these permission systems separate and review them independently:

1. **Application Super Admin** — administers approved platform functions and organization-level settings.
2. **Security Response Operator** — may investigate alerts and request narrowly scoped response actions; approval and execution rights are separately granted.
3. **Source-code / CI administration** — GitHub repository write/admin access, branch protection, pull-request approvals, and release permissions.
4. **Cloud / database administration** — Supabase project ownership, production secrets, database migrations, backups, and restore permissions.
5. **Deployment administration** — production hosting, domains, environment variables, and rollback controls.

Being an application Super Admin must not automatically grant GitHub write access, source-code visibility, production secrets, or unrestricted database administration.

## 2. Founder and second-in-command model

- Keep the founder's daily account separate from a dedicated, strongly protected emergency administrator account.
- Give the second-in-command a named account with only the specific operational permissions required for continuity.
- Do not grant repository write/admin access, code browsing, production secret access, or unrestricted database changes unless separately approved for a defined task and time window.
- Use a time-limited elevation workflow for exceptional build or recovery work: named approver, scope, expiry, reason, recorded actions, and automatic removal.
- Use phishing-resistant MFA where available, separate non-privileged daily accounts, and tested account-recovery procedures.
- Never share passwords, API keys, recovery codes, or one administrator's session with another person. Do not create undocumented backdoors.

**Important:** The assistant is not a real Super Admin account and cannot serve as a human emergency administrator. A trusted human operator and documented recovery path must exist.

## 3. Authorization must be enforced server-side

- Authenticate every request; derive identity from the verified session, never from a browser-supplied role label.
- Enforce tenant boundaries and permission checks in trusted server code and database Row Level Security (RLS).
- Default to deny. Check authorization for reads as well as writes, including exports, search, AI retrieval, and connector actions.
- Never ship Supabase service-role keys or other privileged secrets to the browser.
- Require negative tests proving that Help Desk Agent, IT Administrator, Governance & Compliance, and tenant Super Admin accounts cannot perform actions outside their granted scope.
- UI hiding/disabled states improve usability only; they do not secure the underlying action.

## 4. Incident-response / War Room controls

The proposed security_response_actions table is a server-only action queue, not a connected kill switch. Before any action can run, implement a trusted backend adapter to a managed endpoint/security provider and verify the result.

- Provide targeted **isolate device** and **release isolation** actions, not an unscoped global network-disconnect button.
- Display the exact device/user/indicator, organization, alert, reason, impact, requested-by identity, approval, connector response, and action status.
- Require explicit confirmation and a reason for high-impact actions; use a second authorized approver for high-risk actions where operationally feasible. The requester cannot approve their own request.
- Use idempotency keys, bounded retries, expiry, rate limits, and clear pending/failed states.
- Preserve essential security-agent/management connectivity where the endpoint provider supports it; document the risks of isolating critical servers and network infrastructure.
- Release isolation only after investigation and remediation criteria are met, with a new audited action.
- Do not imply an endpoint is isolated until the provider confirms the action. Offline devices and connector failures must remain visibly pending/failed.

## 5. Monitoring and alerting

- Integrate actual identity, endpoint detection/response, cloud, application, and connector telemetry; label mock/demo data clearly until live.
- Use alert severity, asset criticality, confidence, blast radius, and business impact to prioritize response.
- Automate low-risk enrichment and recommendations first. Destructive, access-revoking, or availability-impacting actions need policy checks and appropriate human approval.
- Record actor, tenant, action, target, reason, approval, timestamps, result, denied attempts, and correlation ID.
- Export security logs to a separately controlled, tamper-resistant logging destination with retention and alerting for logging failure. The database append-only trigger is a guardrail, not a substitute for external immutable storage.

## 6. Backup and recovery

Before external onboarding, document and test:

- Automated database backups and point-in-time recovery where supported.
- Encrypted backup storage, separate administrative scope, retention, and restore access logging.
- Recovery of identity, tenant memberships, role/permission mappings, connector configuration, application data, and audit history.
- Recovery when the primary Super Admin is unavailable, credentials are lost, the identity provider is down, or a malicious administrator changes access.
- A clean-room restore drill, recovery time objective (RTO), recovery point objective (RPO), and named human owners.
- Rollback procedures for schema migrations and deployments, plus tested emergency access revocation.

## 7. Release gates — do not open external tenant access until these pass

- [ ] Production authentication and MFA policy verified.
- [ ] Server-side authorization and tenant-isolation tests pass, including negative tests.
- [ ] RLS policies reviewed; no browser-exposed privileged keys.
- [ ] GitHub branch protection, required CI checks, reviewed PRs, and limited repository permissions configured.
- [ ] Hosting, database, identity provider, and production secrets have separate least-privilege roles.
- [ ] Live endpoint/security connector is configured and tested in a sandbox; simulated actions are unmistakably labelled.
- [ ] Alert-to-containment, failed action, approval, release, and audit scenarios tested.
- [ ] Backups restored successfully in a non-production drill.
- [ ] Monitoring, incident runbooks, emergency contacts, and rollback steps validated.
- [ ] Independent security review / penetration test findings addressed before launch.

## Current implementation status

The repository currently describes itself as a React/Vite demo with synthetic identities, metrics, tickets, audit events, connector states, and device states. Ticket state is stored in browser localStorage. Remote Support is simulated, and the current UI is not connected to real remote devices. The migration added alongside this document creates server-only response-action and append-only event-log structures; it does **not** connect a provider, enforce a complete production RBAC model, configure infrastructure permissions, or make the product production-secure by itself.

## Reference guidance

- NIST SP 800-171 Rev. 3: least privilege and separation of duties.
- Microsoft Defender for Endpoint documentation: device isolation is a provider-backed response action with prerequisites, limitations, action status, and recovery considerations.
