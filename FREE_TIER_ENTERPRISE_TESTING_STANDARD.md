# Free-First Enterprise Integration & Security Validation Standard

**Project:** IntelliStack Systems / Maximus Optimus Command Center  
**Status:** Required engineering standard; implementation is incremental and must be verified  
**Working branch:** `feature/network-operations-secure-shell`

## Objective

Build and validate enterprise-oriented capabilities using free tiers and local tools wherever practical, testing only systems, tenants, devices, accounts, and data that the project owner owns or is explicitly authorized to assess. The lab should demonstrate real security controls and repeatable evidence before the product is presented to another company or environment.

“Enterprise-ready” is an engineering goal, not a claim that a prototype is production-certified, compliant, penetration-tested, or suitable for regulated workloads.

## Free-first rules

1. Prefer free plans, open-source tools, local test environments, synthetic data, and isolated development/preview deployments.
2. Record free-tier limits, feature restrictions, retention limits, usage quotas, rate limits, and whether a payment method or trial is required. Never assume “free” means unlimited or includes enterprise features.
3. Do not upgrade, purchase, enable paid add-ons, incur billable usage, or connect a real customer tenant without the owner's explicit approval.
4. A paid feature must not be silently replaced with a misleading mock. Label each capability as **Live and verified**, **Live but limited**, **Simulated**, **Planned**, or **Blocked by plan/permission**.
5. Keep credentials and tokens server-side in a supported secret store or protected environment variables; never commit secrets, expose them to browser code, or save privileged secrets in localStorage.
6. Use synthetic identities, tickets, devices, incidents, and documents unless real data is strictly necessary and authorized. Do not put real recovery keys, passwords, access tokens, or sensitive customer records in logs, analytics, AI context, screenshots, or test reports.
7. Keep testing in local, development, or protected preview environments. Production deployment, destructive changes, real-device remediation, and customer-tenant changes require explicit approval.

## Enterprise integration contract

Every connector should be designed and tested for:

- Explicit tenant/organization and environment binding.
- Least-privilege OAuth/API permissions and a documented consent/authorization path.
- Server-side secret storage, rotation/revocation guidance, and redaction.
- Health checks that distinguish configured, authenticated, reachable, authorized, degraded, and disconnected states.
- Timeouts, rate limits, retries with backoff where appropriate, idempotency, and safe failure behavior.
- Audit events for connection, consent, scope changes, test runs, access, and disconnection.
- Tenant-scoped reads and writes, default-deny authorization, and protection against cross-tenant ID manipulation.
- Data minimization, retention/deletion rules, and an explanation of what data is stored.
- A disconnect/revoke path and clear handling of already-copied or externally retained data.
- Automated tests and a documented manual verification checklist.

A connector card or successful configuration test is not proof of live integration. Claims must be supported by a real authorized test and captured evidence.

## Free-first security validation toolkit

Use available free capabilities where practical; verify current plan terms and limits before relying on them.

- **Application/build:** repeatable dependency installation, production build, lint/type checks where configured, and automated tests.
- **Code and dependency checks:** GitHub repository security features available on the current plan, dependency/advisory review, secret scanning where available, and a local static-analysis tool such as Semgrep Community Edition.
- **Web application testing:** OWASP ZAP baseline/passive scanning against a local or authorized preview instance first. Active scans only against explicitly authorized targets and with a scoped test plan.
- **Database and authorization:** Supabase security/performance advisors, review of every RLS policy, and tests using separate test identities for allowed and denied actions.
- **Identity and tenant isolation:** test Super Admin, Help Desk Agent, IT Administrator, and Governance & Compliance permissions independently; test direct API access, object-ID tampering, revoked membership, stale sessions, and cross-tenant reads/writes.
- **Cloud and deployment:** verify HTTPS, environment separation, preview protection, logs, deployment identity, secret configuration, and rollback instructions. Cloudflare/Vercel/Supabase free plans may have restrictions and are not a substitute for application authorization.
- **Endpoint security:** begin with synthetic BitLocker posture. Add a real Microsoft Intune / Microsoft Graph connection only after confirming the actual Microsoft tenant, supported licensing, delegated/application permission model, admin consent, and available read-only device-encryption signals.

Do not represent this as an exhaustive list or certification. Tool results need human triage; a clean scan does not prove security.

## Required validation evidence

For each release candidate, retain a dated report with:

- Commit/branch and environment tested.
- Exact commands, tools and versions, and configuration relevant to reproducibility.
- Build/test/scan results, including failures, warnings, and exclusions.
- Role-by-role positive and negative authorization tests.
- Tenant-isolation tests for APIs, database queries, exports, background tasks, and integrations.
- Connector permission scopes and proof of the real test performed, with tokens and sensitive values redacted.
- Known risks, plan limitations, unresolved findings, owner, and remediation status.
- Manual test results for mobile/responsive UX and critical workflows.
- Explicit statement of what is live, simulated, planned, or unverified.

Never claim that a test passed unless it was actually run and the result was observed.

## Minimum release gates before an external demonstration

1. Build and relevant automated tests pass on the intended commit.
2. No known exposed secrets; secret scanning and dependency review completed to the extent available.
3. Authentication and server/database authorization—not merely UI role switching—enforce access.
4. Cross-tenant denial tests pass for sensitive records; any known broad policies are reviewed and fixed before claiming isolation.
5. Audit logs capture security-relevant administrative changes without storing secrets.
6. Integrations clearly label real vs simulated states and fail closed on missing authorization.
7. No production/customer data is used without explicit authorization.
8. Remaining findings, limitations, free-tier constraints, and unverified controls are disclosed in the demo materials.
9. No merge or production deployment occurs without explicit user approval.

## BitLocker / Intune-specific gate

The initial BitLocker panel is a simulation only. Before calling it a live integration:

1. Confirm the actual endpoint-management provider and the Microsoft tenant under the owner's control.
2. Verify licensing, supported Graph endpoints, and the minimum required read-only permissions in current Microsoft documentation.
3. Obtain required admin consent through the authorized tenant administrator; do not ask the user to paste secrets or recovery keys into chat.
4. Keep app credentials server-side; scope data retrieval to authorized tenants and expose only approved aggregates in global views.
5. Test encrypted/protected, noncompliant, unknown, stale, exception, permission-denied, and provider-outage states.
6. Confirm recovery-key material never appears in general dashboards, logs, exports, notifications, or AI context.
7. Do not enable/disable BitLocker or trigger other device actions during read-only validation.

## Ownership and change control

Continue on the agreed feature branch and update the project handoff when meaningful status changes occur. Inspect the current branch, file contents, and checks before each implementation step. Do not merge the open pull request, change production data/schema, purchase services, or deploy to production without explicit user approval.
