# Role-Based Employee Onboarding Automation Script

## Goal

Implement an onboarding orchestration service that accepts one authorized employee onboarding request, determines the approved role and customer organization, and coordinates the required identity, access, licensing, application, and device setup. The intended outcome is to reduce routine onboarding from days to hours or less when approvals, licenses, providers, and devices are available. This is a target, not a guaranteed completion time.

This document specifies the script/workflow to build. It is not evidence that live provisioning has been implemented.

## Execution model

The script must not be a privileged, unguarded script running in a browser or a single all-powerful account. Implement it as a server-side workflow with typed provider adapters, a persistent job/task record, tenant-aware authorization, and a dry-run mode. The browser submits a request and displays progress; it never receives provider secrets or executes privileged operations itself.

### Request contract

A request should contain, at minimum:
- A unique onboarding request ID / idempotency key.
- The organization/tenant ID and, for MSP workflows, the explicitly selected customer tenant.
- Employee identifier and only the personal data required by configured systems.
- Manager/approver, department, location/site, start date, employment type, and role-template ID.
- Requested applications and device requirements.
- Requester identity, justification, and required approvals.
- A policy/template version and request timestamp.

Validate every field server-side. Do not trust a tenant ID, role, permission list, or approval flag supplied by the client without resolving it against authoritative membership and policy data.

## Workflow algorithm

1. Authenticate the requester and confirm they may initiate onboarding for the selected organization.
2. Resolve the tenant and load its active, approved role template and policy version.
3. Validate employee data, check for an existing identity, detect duplicate/re-hire cases, and reject ambiguous records for manual review.
4. Calculate the desired-state plan and dependencies without making changes.
5. Display a dry-run preview: identity changes, groups, apps, licenses, device actions, estimated blockers, risk, and approval requirements.
6. Obtain the required approvals. Requesters must not approve their own elevated access. High-privilege access must be a separate grant with scope, reason, approver, and expiry.
7. Execute independent, pre-approved, low-risk tasks in parallel only when their dependencies allow it.
8. Use a separate least-privilege adapter/credential for each provider and tenant. Never use one customer's credentials against another tenant.
9. Persist each task state and provider correlation ID before and after calls. Use idempotency keys to prevent duplicate accounts, group memberships, licenses, or tickets.
10. Retry only transient errors with bounded backoff. Do not retry permanent failures or approval denials as if they were transient.
11. Reconcile desired state against authoritative provider state after each write. An accepted request is not equivalent to a verified outcome.
12. Continue safe independent tasks when a task is blocked, while marking dependencies and final readiness accurately.
13. Send unresolved tasks to a named human queue with a useful error, evidence, and next action.
14. Produce a final readiness report showing verified, pending approval, blocked, failed, simulated, and manual-action-required tasks.
15. Audit who requested, approved, executed, and verified each action. Store no passwords, access tokens, secrets, or recovery keys in audit payloads.
16. Support cancellation and safe compensation where possible. Require human approval before any potentially destructive or disruptive rollback.
17. On completion, notify authorized stakeholders using approved channels and only the minimum necessary employee information.

## Role-template examples

Templates are tenant-configured, versioned, reviewed, and approved. They are not universal hard-coded permissions.

- **Help Desk Tier 1:** ticketing access, approved knowledge base, standard support tools, narrowly scoped directory lookup.
- **Help Desk Tier 2:** Tier 1 access plus specifically approved diagnostic and escalation capabilities.
- **Cybersecurity Analyst:** approved security consoles and read/triage permissions; sensitive response actions require separate capabilities.
- **IT Administrator:** only the specific administrative domains approved for the job; no automatic global-owner or tenant-crossing privileges.
- **Governance & Compliance:** evidence, policies, reports, and audit access scoped to the user's assigned organization and duties.
- **Store/restaurant manager:** approved scheduling, point-of-sale administration, workforce, and site-specific systems as configured by that customer.
- **Frontline employee:** minimum role-specific operational applications and training/acknowledgment tasks.
- **Contractor:** explicitly limited apps, end date, sponsor, and automatic expiry/review requirements.

## Provider adapter boundaries

Create a common adapter interface for supported operations, for example:
- `plan(request, tenantContext)`
- `validate(plan)`
- `readCurrentState(target)`
- `executeApprovedAction(action, approvalContext, idempotencyKey)`
- `verifyPostcondition(action)`
- `compensate(action)` only where a tested safe compensation exists

Adapters may later cover Microsoft Entra ID / Active Directory, Microsoft 365 license assignment, ServiceNow user/groups/roles, Intune/device management, and other approved applications. Begin with mock adapters and dry-run output; add read-only provider integration before enabling narrowly scoped write actions. Use each provider's supported APIs and documented permission scopes.

## Example pseudocode

```text
function onboard(request, actor):
    actor = authenticate(actor)
    tenant = authorizeTenantScope(actor, request.tenantId)
    template = loadApprovedTemplate(tenant, request.roleTemplateId)
    validateRequest(request, template, tenant)

    existing = findExistingIdentity(tenant, request.employeeIdentifier)
    if existing.isAmbiguous:
        return requireHumanReview("Possible duplicate or rehire")

    plan = buildDesiredStatePlan(request, template, tenant)
    validateDependenciesAndPolicy(plan)
    savePlanAndAudit(plan, actor)

    if plan.requiresApproval:
        return awaitApprovals(plan)  // no provisioning yet

    for taskGroup in topologicalDependencyGroups(plan):
        executeSafeIndependentTasksInParallel(taskGroup)
        reconcileProviderState(taskGroup)
        persistTaskOutcomesAndAudit(taskGroup)

    report = verifyRequiredPostconditions(plan)
    notifyAuthorizedStakeholders(report)
    return report
```

This pseudocode is conceptual. It must not be run as-is or treated as production-ready code.

## Security and privacy requirements

- Enforce tenant and role authorization server-side and in database row-level security.
- Use narrowly scoped, revocable credentials held in server-side secret storage.
- Never expose provider secrets, passwords, tokens, private keys, or recovery keys to the browser, logs, tickets, or AI context.
- Require approval for sensitive permissions and prevent self-approval.
- Require step-up authentication for privileged changes and time-bound emergency grants.
- Minimize employee data and define retention, correction, and deletion rules.
- Keep audit records tamper-resistant and redact secret/PII fields.
- Validate external API responses and imported HR data; treat them as untrusted input.
- Provide tenant-specific rate limits, safe retries, timeouts, cancellation, and provider outage handling.
- Label demo runs as Simulated and dry runs as Planned. Do not label a task Verified without an authoritative postcondition check.

## Acceptance tests

1. A valid standard request produces a dry-run plan without changing external systems.
2. A requester without tenant authority cannot start onboarding for that tenant.
3. An MSP operator cannot provision in an unassigned customer tenant.
4. A client cannot self-assign a privileged role or forge an approval flag.
5. Duplicate submissions do not create duplicate identities or licenses.
6. A missing license creates a blocker and never produces a false-ready status.
7. A provider timeout causes bounded retry and then a clear failure/hand-off.
8. A successful API response without verified resulting state does not mark a task complete.
9. Secrets and sensitive employee data do not appear in logs or browser payloads.
10. Offboarding/reversal tasks are separately approved where destructive or disruptive.
11. Every meaningful action records actor, approver, tenant, action, outcome, and correlation ID.
12. Cross-tenant ID manipulation and direct API calls cannot bypass isolation.

## Implementation stages

1. Inspect the current repository, Supabase schema/RLS, existing auth and role helpers, and current app structure.
2. Implement a tenant-aware request model, role-template schema, task-state model, audit trail, and dry-run orchestration using synthetic data.
3. Add a dashboard for plan preview, task progress, blockers, approvals, and final readiness.
4. Test tenant isolation, authorization, idempotency, retries, failure states, and audit redaction.
5. Add read-only connectors and verify source state.
6. Add one narrowly scoped provisioning action at a time after explicit approval and provider-specific tests.
7. Keep production writes disabled until independent review and release approval.

## Current status and guardrails

This is an architecture and implementation specification. Do not claim live provisioning, real tenant isolation, or verified integration until the code and tests prove it. Work on the existing feature branch. Do not merge or deploy to production without explicit approval.
