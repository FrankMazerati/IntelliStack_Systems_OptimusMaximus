# IntelliStack Systems — Global Security Policy & Key Management

**Status:** Planned specification; not evidence of implemented or enforced controls.  
**Scope:** First-party IntelliStack Systems environment before multi-tenant rollout.  
**Branch:** `feature/network-operations-secure-shell`

## Objective

Provide the company's authorized global administrators with a central, audited place to configure cryptographic policy, password/authentication rules, session timers, and credential lifecycle controls. The interface must never imply that a setting is live unless the backend/provider confirms enforcement.

## Separate control domains

### 1. Encryption and key management

- Support AES-256 for applicable data-at-rest encryption and approved TLS configurations for data in transit; document which layer and provider enforce each control.
- Generate cryptographic keys with a vetted cryptographically secure random generator or managed KMS/HSM. Never generate production keys in browser JavaScript.
- Keep key material out of application tables, logs, analytics, URLs, client bundles, and ordinary admin screens. Store secrets only in an approved secret manager/KMS.
- Expose key metadata, owner/purpose, algorithm, version, creation time, rotation due date, state, and last verified use—not raw secret key material.
- Support policy-controlled creation, rotation, disable/revoke, recovery, and retirement, with tested rollback and recovery procedures.
- Restrict sensitive key operations with MFA/step-up authentication, least privilege, separation of duties where feasible, approval for high-impact actions, and immutable audit events.
- Treat password hashing as a separate control: use a modern password-hashing algorithm with unique salts and appropriate work factors, not reversible encryption.

### 2. Password policy

Provide configurable and validated fields for:
- Minimum and maximum accepted password length, subject to identity-provider limits.
- Blocklisted/common/known-compromised passwords and password-strength feedback.
- MFA requirements by role and action.
- Password reset and recovery policy, administrator step-up, and throttling/temporary lockout.
- Password-change policy for compromise, recovery, or other defined risk events.

Use current authoritative identity-security guidance rather than assuming frequent mandatory password changes always improve security. Prefer long passwords/passphrases, compromised-password blocking, MFA, rate limiting, and risk-triggered changes. Never store or log plaintext passwords.

### 3. Timers and credential lifecycle

Configure separate controls for:
- Session inactivity timeout and absolute session lifetime.
- Temporary password or recovery-code expiry.
- API keys, service credentials, certificates, and integration-secret expiry/rotation.
- Risk-triggered revocation after suspected compromise.
- Emergency-access credential controls and periodic verification.

Do not apply one timer indiscriminately to all credential types. Service identities and machine credentials need ownership, scope, rotation, expiry alerts, and safe dependency-aware rollover.

## Policy administration workflow

1. Draft a versioned policy.
2. Validate ranges, provider limitations, dependencies, and recovery readiness.
3. Preview impact on administrators, employees, service identities, sessions, and integrations.
4. Require step-up authentication; require independent approval for high-impact changes.
5. Publish through the server-side enforcement adapter or identity/KMS provider.
6. Verify the effective state from authoritative provider telemetry—not merely a successful UI response.
7. Record actor, approver, reason, before/after policy version, timestamps, provider result, verification status, and rollback reference.
8. Provide a tested rollback or recovery path that does not depend solely on the primary administrator session.

## Company-only first phase

- Use a single explicitly configured IntelliStack Systems organization and clearly label all unconnected controls as **Planned**, **Prototype**, or **Simulated**.
- Keep multi-tenant mode off until tenant boundaries, authorization, audit coverage, and cross-tenant negative tests pass.
- Start with read-only provider-state inspection where possible; add narrowly scoped write operations only after review.
- Do not expose arbitrary key material, password values, recovery secrets, or provider credentials to the frontend.
- Keep an independently protected emergency-recovery path and alert on changes to global security policy.


## Privileged access model: owner-controlled, capability-scoped access

IntelliStack Systems must distinguish the company owner / designated primary global authority from users who hold a generic global-administrator title. A title alone must never confer access to cryptographic key operations, authentication policy, secret stores, recovery material, or every critical security feature.

### Primary owner / root security authority
- The designated owner account can authorize and administer the global security policy, subject to strong phishing-resistant MFA, step-up authentication, audit, and safe recovery controls.
- Protect this authority with a dedicated privileged identity, not routine email/browsing use. Do not make the system dependent on one active browser session or one device.
- Maintain a separately secured emergency recovery mechanism. Any emergency use must be time-limited, alerted, audited, and reviewed after the event.
- High-risk actions may require a second independent approver even when initiated by the owner, according to a configurable risk policy. This reduces accidental lockout and compromised-session risk.

### Other global administrators
- Global administration is a collection of explicitly granted capabilities, not an automatic superuser bypass.
- Default-deny access to key material, key lifecycle operations, authentication-policy changes, secret stores, global recovery controls, and privilege escalation.
- Grant only the named administrative capabilities needed for the person's duties. Separate viewing metadata, proposing a change, approving a change, executing it, and verifying enforcement where practical.
- No administrator may grant themselves new privileges or bypass approval rules simply because their role is global.

### Cybersecurity specialist grants
Authorized specialists may receive one of three broad grant patterns, then narrowed by resource and action:
1. **Full security operations access:** manage the approved security operations domains, such as threat triage, incident response, security findings, and specified containment workflows. This does not automatically include raw cryptographic keys, identity-root controls, secret-store access, or authority to alter their own privileges.
2. **Limited security access:** view and investigate approved findings, manage assigned incidents, or propose remediation, without permission to execute high-impact changes.
3. **Single-feature / single-resource access:** access only a specified feature, integration, policy, environment, device group, or action, for a stated purpose and time window.

Every grant must record the subject, grantor, justification, exact capabilities, resource/environment scope, start and expiry, approval requirements, and revocation state. Prefer just-in-time and time-bound grants for elevated actions. Expiry and revocation must be enforced server-side.

### Permission model
Use explicit capabilities and policy checks rather than a single broad role flag. Illustrative capabilities include:
- `security.findings.read`
- `security.incidents.manage`
- `security.containment.propose`
- `security.containment.execute`
- `security.policy.read`
- `security.policy.propose`
- `security.policy.approve`
- `security.policy.publish`
- `crypto.key_metadata.read`
- `crypto.key.create`
- `crypto.key.rotate`
- `crypto.key.disable`
- `crypto.key.revoke`
- `identity.authentication_policy.manage`
- `secrets.metadata.read`
- `privileged_access.grant`
- `audit.security.read`

These names are examples for design, not proof that the current application implements them. Raw key export should be disabled by default and allowed only when a documented cryptographic use case, approved custody process, and provider capability justify it.

### Enforcement requirements
- Resolve identity, role, capabilities, scope, grant expiry, and approval state on the server for every sensitive request. Never trust UI visibility, client-side role values, or a browser-supplied `isGlobalAdmin` flag.
- Enforce the same authorization in API handlers, Supabase policies/RLS where applicable, and the downstream provider adapter. Database service-role credentials and KMS credentials stay server-side.
- Require step-up authentication for sensitive operations and explicit, separately recorded approval for high-impact operations. An executor must not be able to silently approve their own high-risk change when policy requires separation of duties.
- Audit allow and deny decisions, grant/revoke events, policy versions, approvals, provider execution results, and independently verified outcomes. Do not put passwords, access tokens, raw key material, or recovery secrets in audit records.
- Add negative tests proving that a second global admin cannot access ungranted key features, that a specialist cannot escape their feature/resource scope, that expired grants fail closed, and that privilege-escalation attempts are denied.
- Keep global tenant oversight distinct from permission to inspect or operate on tenant-specific raw data. Tenant-scoped access must be separately authorized and audited before multi-tenancy is enabled.


## Noble Admin Center: real-time permission control and emergency elevation

The Noble Admin Center should provide authorized administrators with immediate controls to grant, deny, modify, suspend, and revoke permissions for MSP operations. “Instantaneous” means the authorization change is committed by the authoritative backend and enforced on the next authorization check; the UI must not claim success until the backend confirms the change. External providers may have propagation delays, so their effective state must be verified separately.

### Permission action controls

For each user, group, role, integration, device, and protected resource, show:
- Current effective permissions and their source (role, direct grant, group, policy, or temporary elevation).
- **Grant**, **Deny**, **Modify**, **Suspend**, **Revoke**, and **Request approval** actions, only where the operator is authorized.
- Resource and tenant/environment scope, permitted actions, reason/ticket/incident ID, grantor, approver, creation time, expiry, and enforcement/verification state.
- A preflight preview of exactly what will change and which access will remain denied.
- Confirmation and step-up authentication for sensitive changes; bulk or high-impact changes require stronger approval.

### Emergency just-in-time access workflow

Example: a CEO's managed Windows device has a BitLocker recovery problem shortly before a meeting, and the usual cybersecurity team is occupied.

1. The help desk agent opens the authorized CEO support case in the Noble Admin Center and selects **Request emergency access**.
2. The agent selects the exact target user/device and task, such as viewing a recovery-key record for that device or performing an approved recovery workflow. The system checks the agent's identity, training/eligibility, current role, device ownership, incident context, and policy.
3. The authorized grantor (for example, the company owner or an explicitly delegated emergency-access approver) reviews a concise impact summary and grants only the minimum capability needed. If policy permits pre-authorized low-risk emergency grants, the grant can be issued immediately within those boundaries; otherwise it waits for approval.
4. The backend creates a time-bound, device-specific, purpose-bound grant. Example duration might be 10–15 minutes, configurable by policy, with no ability to reuse the grant on another user/device or escalate privileges.
5. The support agent performs the approved action through a server-side integration with the authoritative endpoint-management provider. The system must not reveal BitLocker recovery keys in general dashboards, logs, chat transcripts, browser analytics, or screenshots. Where the provider supports it, use a protected, audited recovery workflow and display secrets only to the authorized operator in a restricted context.
6. The service records the request, grant decision, operator, target device, reason/ticket, approvals, provider action, and result—never the recovery secret itself. It verifies the actual provider/device state where possible.
7. The temporary grant expires automatically, is revoked immediately after completion where safe, and triggers a post-event review/notification for sensitive access.

Emergency access must not mean bypassing identity verification, device ownership checks, tenant boundaries, or provider permissions. If the authoritative provider is unavailable or does not support the requested operation, show **Manual action required** rather than pretending the fix occurred.

### Deny and revoke behavior

- A deny rule must be explicit, scoped, auditable, and evaluated by the server. Define precedence carefully so a direct deny cannot be silently overridden by a broad role grant.
- Revocation blocks future authorization checks immediately at the application/backend layer. Revoke or invalidate active sessions, tokens, and provider-side grants when supported; do not promise that already-issued external tokens or provider permissions disappear instantaneously without verification.
- Show separate states for **Requested**, **Granted**, **Enforcement confirmed**, **Revocation requested**, **Revoked**, **Provider pending**, and **Failed**.
- Avoid a single-button global lockout without a preflight, independent recovery path, and additional safeguards against operator error or compromised accounts.

### Abuse prevention and operational reliability

- Require strong MFA and recent step-up authentication for granting privileged or sensitive access.
- Do not allow an operator to approve their own request when separation of duties is required.
- Use policy-defined maximum durations, resource allowlists, rate limits, alerts, and reason/ticket capture.
- Maintain append-only, tamper-resistant audit events and alert on unusual elevation, repeated denials, access to executive devices, and attempts to access unrelated resources.
- Make the authorization decision and grant creation atomic where possible; use idempotency keys to prevent duplicate grants and handle retries safely.
- Test provider outages, partial failures, delayed revocation, stale sessions, expired grants, clock skew, and simultaneous grant/revoke requests.

### Acceptance tests

- An authorized grant is enforced on the next backend authorization check and the UI reflects the backend-confirmed state.
- An unauthorized operator cannot grant permissions or target resources outside their scope.
- Emergency access expires at the configured deadline and cannot be reused for a different target.
- A BitLocker recovery secret never appears in ordinary dashboards, logs, analytics, or chat history.
- Revocation blocks subsequent app access and reports any provider-side propagation still pending.
- A failed provider action is reported honestly and does not show “fixed” or “completed.”
- All grant, deny, modify, approval, execution, expiry, and revoke events are attributable and auditable.
- Tenant-scoped resources remain protected independently of global administrative visibility.

## Minimum acceptance tests

- Non-admin roles cannot view or change global security policies or invoke key-management operations.
- Unauthorized users cannot read secret key material or plaintext credentials; logs contain no secrets.
- Password policy rejects invalid settings and applies consistently at the authoritative authentication layer.
- Session expiry and credential expiry are enforced server-side, not just displayed in the UI.
- Key rotation preserves availability, verifies new-key use, handles failures, and retains a documented recovery/retirement path.
- Failed or partially applied changes are visible, audited, and recoverable.
- Cross-tenant access tests fail closed before multi-tenant enablement.
- UI labels distinguish configured, action requested, provider-confirmed, enforcement-verified, failed, and manual-action-required states.

## Delivery sequence

1. Inspect the current application, Supabase schema/RLS, authentication provider, and secret-management capabilities.
2. Build the company-only policy UI using synthetic values and no production secrets.
3. Implement server-side validation, authorization, audit logging, and provider adapters.
4. Verify effective state against the identity provider/KMS and add failure/rollback tests.
5. Conduct independent security review before enabling production write actions or multi-tenancy.

**Important:** Selecting “256-bit” in a UI does not prove that all data is encrypted with AES-256. Document and verify encryption separately at the database, object/file storage, backup, transport, and application-secret layers as applicable.
