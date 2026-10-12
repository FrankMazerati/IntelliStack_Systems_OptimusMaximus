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
