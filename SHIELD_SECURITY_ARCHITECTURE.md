# SHIELD Security Architecture & Global Incident Response

**Project:** IntelliStack Systems / Maximus Optimus Command Center  
**Status:** Architecture requirements and phased implementation plan; live enforcement is not implied  
**Working branch:** `feature/network-operations-secure-shell`

## Mission

Build a security-first command environment that correlates threat intelligence with the organization's real application, identity, device, network, and tenant inventory, then supports scoped, verifiable defensive action. The objective is to reduce blast radius and accelerate containment—not to promise that compromise is impossible.

## SHIELD doctrine

- **S — Secure by design:** deny by default, threat-model trust boundaries, protect recovery paths.
- **H — Hardened access:** least privilege, phishing-resistant MFA where available, step-up authentication, just-in-time/time-bound privilege.
- **I — Intelligence and inspection:** validated threat sources, asset/dependency correlation, evidence-backed risk assessment.
- **E — Enforced boundaries:** enforce tenant, company, department, application, device, and network boundaries in the underlying control planes.
- **L — Logged accountability:** tamper-resistant audit events, attribution, approvals, outcomes, and evidence.
- **D — Defense and recovery:** tested containment, rollback, recovery, and independent emergency access.

The IS shield is the consistent IntelliStack Systems security identity. It represents enforceable controls and verifiable outcomes, not a claim of invulnerability.

## Product workspaces

1. **Global Threat Intelligence & Response:** source/advisory feed, confidence, timestamps, severity, affected products, evidence, incident queue.
2. **Application & Integration Registry:** application owner, tenant and department scope, identity method, granted permissions, service accounts, dependencies, available response actions, health and verification status.
3. **Exposure & Dependency Map:** relationships among organizations, departments, users, groups, applications, credentials, devices, cloud resources, and network boundaries.
4. **Department Isolation Mode:** preview impact; initiate authorized, scoped containment; verify enforcement; monitor; and manage controlled recovery.
5. **Tenant Isolation & Oversight:** global aggregate visibility while raw tenant data remains denied by default absent a scoped, justified, authorized grant.
6. **Microsoft Cloud Administration:** Microsoft Entra ID identity and access, Microsoft Intune device management, and Microsoft 365 / Office 365 license inventory and assignments via least-privilege Microsoft Graph permissions.
7. **Network Operations:** inventory, firewall/port policy, routing and BGP visibility/configuration through authorized integrations, change validation, approvals, audit, and rollback.
8. **Incident War Room:** incident timeline, responder roster, role-scoped chat/communications, escalation, task tracking, and auditable decisions.

## Threat-to-action workflow

1. Ingest a threat advisory from a named source; preserve source URL, observed/published timestamps, affected versions/products, confidence, and ingestion timestamp.
2. Normalize and validate the advisory. Distinguish confirmed compromise, vendor-reported incident, exploitation-in-the-wild, unverified report, and general vulnerability. Avoid treating an external report as proof that our tenant is compromised.
3. Correlate affected services to the registered application inventory and dependencies. Identify tenant, company, department, users, service identities, devices, tokens, integrations, and reachable systems where data is available.
4. Produce an exposure assessment with evidence, uncertainty, impact, and recommended actions. Clearly distinguish observed facts from inferred relationships.
5. Run a dry-run/preflight and display blast radius, business dependencies, possible lockout, reversibility, and recovery path.
6. Enforce only supported actions using a verified integration adapter and server-side authorization. Require approval/step-up controls according to risk policy.
7. Verify actual provider/device/network state after execution. Record requested, accepted, completed, failed, and independently verified as distinct statuses.
8. Monitor containment, preserve evidence, remediate root cause, and restore access only after documented checks.

## Department Isolation Mode

A department is a logical administrative scope, not a sufficient security boundary by itself. Real containment must be enforced in applicable underlying systems: identity provider, endpoint management, network controls, SaaS application, cloud platform, and service-to-service authorization.

Expected controls:
- Select tenant/company/department/application/device scope, with a visible preview of the exact affected entities and connections.
- Show dependencies and business impact, including identity providers, finance systems, emergency communications, and management/control-plane dependencies.
- Offer dry-run first and a policy-driven containment plan. Default to narrow scope; expand only when evidence warrants.
- Supported actions may include revoke sessions/tokens, disable a compromised account or service principal, restrict an OAuth grant, suspend an integration, quarantine a managed endpoint, or apply network isolation—only where the provider supports the action and the operator is authorized.
- Provide explicit exclusions and protected break-glass/recovery paths. Do not allow an incident response action to silently disable independent logging, recovery, or all administrator access.
- Confirm actual enforcement from the authoritative provider. If there is no integration or confirmation, show **simulation**, **manual action required**, or **unverified**—never “contained.”
- Recovery requires documented validation, credential rotation where appropriate, re-enrollment/re-attestation where applicable, approval for high-impact reconnection, and an audit record.

## Sandboxing is not just a UI toggle

Sandboxing may require separate cloud accounts/subscriptions, isolated virtual networks, strict egress controls, separate identities/secrets, clean images, restricted data access, and monitoring. Moving a user into a UI group or disabling an app shortcut does not create a sandbox. Preserve evidence and follow business/legal retention requirements before destructive remediation. Never copy potentially compromised workloads into a trusted environment without validation.

## Tenant and privilege boundaries

- Enforce tenant-scoped authorization server-side on every query, mutation, background job, webhook, and integration action.
- Tenant membership, job title, and broad “IT staff” status do not by themselves authorize security response or cross-tenant raw-data access.
- Platform Super Admin global oversight is separate from tenant content access. Use a purpose-bound, time-bound, scoped grant with approval for exceptional raw-data access.
- Separate application roles from provider/device/network privileges. An app-level role does not automatically confer Microsoft, SaaS, cloud, or router privileges.
- Use short-lived delegated credentials or workload identities where supported; store secrets in a server-side secret manager, never browser code, Git, logs, or ordinary database rows.
- Require phishing-resistant MFA where available, step-up authentication for high-risk actions, just-in-time elevation, and independent approvals for global/high-impact changes.
- Protect audit events against unauthorized alteration and alert on attempts to alter or disable audit collection.
- Design and test a separate recovery path for compromise of the command center itself.

## Microsoft cloud requirements

Use Microsoft Entra ID (formerly Azure Active Directory) for identity, Microsoft Intune for managed endpoints, and Microsoft Graph for supported directory/device/license operations.
- Begin with read-only tenant inventory and license/service-plan reporting.
- Distinguish Microsoft 365 E3 from Office 365 E3; confirm purchased SKUs, service plans, tenant capabilities, and licensing terms before displaying feature availability.
- Request minimum Graph permissions; prefer delegated access or narrowly scoped application permissions where feasible. Document each permission, reason, data read, action enabled, and consent owner.
- Treat license assignment and device actions as privileged mutations with preflight, approval policy, audit, and post-action verification.
- Never retrieve or display BitLocker recovery keys in a general dashboard. Restrict recovery workflows to a separately authorized, audited path.
- Label demo data and simulated state explicitly. A configured connector is not “live” until authentication and a read/verification call succeed.

## Network and BGP safety requirements

- Read-only inventory and telemetry first; no arbitrary shell, unrestricted CLI, or generic command execution from the browser.
- Port/firewall actions must identify device/resource, direction, protocol, port, source/destination, scope, exposure impact, duration, and rollback.
- BGP changes require policy validation, explicit peer/prefix scope, route-filter checks, max-prefix limits where supported, RPKI/route-origin validation where available, impact preview, and independent approval according to risk.
- Validate resulting state through authoritative device telemetry. Never claim a port is closed or a route is safe from UI state alone.
- Keep out-of-band management and emergency recovery paths independent of the network changes being applied.

## Implementation phases and acceptance criteria

### Phase 0 — Baseline and threat model
- Inspect current branch, app routes/components, database schema, Supabase RLS policies, secrets/configuration, existing tests, and PR checks.
- Record assets, data classification, actors, tenant boundaries, trust relationships, and abuse cases.
- Fix broad tenant data exposure before using real tenant data. Existing policies that allow all authenticated users to read tenant-sensitive tables must be reviewed and replaced with organization-scoped policies and tests.

### Phase 1 — UI and synthetic simulation
- Build threat feed, application registry, dependency map, incident details, isolation preview, approval queue, and audit timeline using clearly labeled synthetic data.
- Simulate containment transitions only; never imply live enforcement.
- Include keyboard-accessible confirmation dialogs, visible affected scope, cancellation, and test scenarios.

### Phase 2 — Read-only verified integrations
- Integrate one provider at a time, starting with the smallest useful read-only scope.
- Verify authentication, pagination, rate limits, errors, data freshness, and tenant mapping.
- Mark integration health and last successful verification time.

### Phase 3 — Narrow controlled actions
- Enable one documented action per provider, with least-privilege permissions, dry-run, risk-based approval, idempotency, timeout handling, result verification, and rollback/manual recovery.
- Test success, partial failure, provider outage, stale inventory, duplicate events, revoked permissions, and compromised-admin scenarios in a non-production tenant.

### Phase 4 — Multi-layer containment and resilience
- Add endpoint/network enforcement only after dedicated adapters and lab validation.
- Test tenant escape attempts, privilege escalation, service-account abuse, audit tampering, recovery independence, and safe restoration.
- Commission independent security review before production claims.

## Required event/audit fields

Record immutable event ID; UTC timestamp; actor and authentication context; tenant/company/department scope; incident ID; source evidence; action and parameters (excluding secrets); policy decision; approver(s); integration/provider; correlation/idempotency ID; requested status; provider response reference; verification result and timestamp; failure reason; rollback/recovery reference. Redact credentials, access tokens, recovery keys, and unnecessary personal data.

## Threat scenarios to test

- A third-party vendor breach affects only one department's SaaS use.
- A stolen SaaS token attempts access to another application or tenant.
- One tenant administrator attempts cross-tenant queries.
- A compromised global administrator attempts to disable logs or recovery.
- A department depends on shared identity, DNS, networking, or finance systems; isolation must show dependencies and not falsely report complete separation.
- Provider API outage or rate limiting occurs during an incident.
- A containment command is accepted but not enforced.
- An advisory is false, outdated, or does not affect the deployed product/version.
- Restoration is attempted before compromised credentials and persistence are addressed.

## Truth-in-status requirements

Use explicit labels: **Planned**, **Prototype**, **Simulated**, **Connected**, **Action requested**, **Action completed**, **Containment verified**, **Failed**, and **Manual action required** as appropriate. Do not equate a design document, mock UI, successful API request, or vendor alert with verified security.

## Definition of done for a live response action

A feature is not live until its provider integration is authenticated, server-side authorization is tested, minimum permissions are documented, positive and negative tests pass, audit evidence is retained, actual post-action state is verified, failure/recovery behavior is tested, and the user-facing status accurately reflects the result.
