# Enterprise Migration & Connector Center — Product and Engineering Specification

## Product intent
Provide one governed experience for connecting a company's existing systems, migrating selected data into IntelliStack, and maintaining supported integrations afterward. The Connector Center manages connections; the Migration Center orchestrates data movement; IntelliLink provides shared integration capabilities to authorized IntelliStack modules.

A connector is not considered functional merely because it appears in the catalog. Its supported capabilities must be declared and its connection must be tested.

## Information architecture

### Connector Center
- Connector catalog with search, categories, vendor, deployment model, and capability filters.
- Connection setup wizard and secure credential authorization.
- Scope/permission review before saving credentials.
- Connection test, health status, last successful operation, sync lag, and error summary.
- Configuration, credential rotation, disable/disconnect, and deletion workflows.
- Sync schedules, event/webhook subscriptions, run history, and retry controls.
- Per-tenant configuration and capability availability.

### Migration Center
- Migration projects and named source systems.
- Source discovery and selectable data domains.
- Field mapping, transformation preview, validation rules, and duplicate matching.
- Dry-run report with create/update/skip/reject counts.
- Approval gates for sensitive data or destructive changes.
- Staged migration jobs with progress, checkpoints, resumability, and record-level errors.
- Reconciliation report comparing source and destination counts/checksums where appropriate.
- Retry failed records, cancel jobs safely, and document compensating/rollback actions.
- Final cutover checklist, owner sign-off, and immutable migration history.

### Integration Operations
- Unified view of connection health, sync jobs, queue depth, recent failures, and vendor/API limits.
- Alerts for credential expiry, repeated failures, schema changes, rate limits, and prolonged sync lag.
- Links from a connector to all dependent workflows/modules so operators can assess impact before disabling it.

## Initial connector domains
Prioritize by customer demand and feasibility, not by the length of the catalog:
1. Identity and directory: SSO/identity provider and directory imports.
2. Workforce: HR system exports/APIs.
3. Endpoint and assets: device-management and asset inventory systems.
4. Service management: ticketing/ITSM imports and synchronization.
5. Security: SIEM/EDR alert ingestion and incident context.
6. Cloud and infrastructure inventory.
7. Email, calendar, and collaboration.
8. Business systems such as CRM/ERP/finance where there is a supported API and a clear business case.

Each vendor connector needs an explicit support matrix: authentication methods, readable/writable entities, event support, rate limits, pagination, data residency constraints, sandbox availability, and known limitations.

## Connector contract
Every adapter should expose a versioned contract with:
- Stable connector ID, vendor, display name, adapter version, and configuration schema.
- Declared capabilities: discover, read, create, update, disable, subscribe to events, or perform approved actions.
- Required permission scopes and credential type.
- Connection validation and health-check operations.
- Pagination and incremental-sync/checkpoint behavior where supported.
- Normalized errors (authentication, permission, rate limit, timeout, schema change, unsupported operation).
- Retry guidance and idempotency behavior.
- Data classification and field-level sensitivity metadata.
- Audit events for connection changes and consequential actions.

No generic write-access toggle should silently grant every capability. Request only the scopes needed for the selected use case. Store secrets in a server-side managed secret store, never browser localStorage or client-visible configuration.

## Migration job lifecycle
Draft -> Configured -> Validating -> Ready for approval -> Approved -> Running -> Reconciling -> Completed

Additional exception states: Failed, Cancelled, Needs attention, and Rolled back (only when compensation is verified). State transitions must be validated server-side.

Each job should persist:
- Organization/tenant ID and creator/approver identities.
- Source connector and destination scope.
- Entity types and selected fields.
- Mapping/transform version.
- Dry-run and validation results.
- Idempotency key, checkpoints, counters, timestamps, and sanitized errors.
- Approval decisions, audit correlation ID, and reconciliation outcome.

Do not store source passwords, raw access tokens, or unnecessary sensitive payloads in job logs. Encrypt sensitive data in transit and at rest. Retention and deletion must be configurable and auditable.

## Migration safeguards
- Default to read-only discovery and dry-run.
- Require an explicit approval before large or destructive changes.
- Never auto-assign elevated roles based only on job title, department, or imported source group names.
- Map source identities to stable identifiers and preserve a source-to-destination crosswalk.
- Detect duplicates before writes; define conflict policy per entity type.
- Use staged batches, resumable checkpoints, idempotent writes, rate-limit-aware backoff, and bounded concurrency.
- Verify destination counts and required-field integrity before cutover.
- Keep rollback plans honest: many external operations cannot be perfectly reversed. Prefer compensating actions and restore points over a blanket rollback promise.
- Inventory import is not device enrollment. Remote actions require a supported management adapter, scoped authorization, approvals where configured, and auditable results.

## Security and tenant isolation
- All connector records, jobs, mappings, logs, and results are tenant-scoped.
- Enforce tenant and permission checks on the server for every request and worker operation.
- Separate configuration access, credential access, data read, data write, and destructive-action permissions.
- Workers use short-lived, least-privilege credentials where possible.
- Redact tokens, secrets, and sensitive payloads from logs and user-facing errors.
- Validate webhook signatures, replay protection, request size, and event origin.
- Record who connected/disconnected systems, changed scopes/mappings, approved jobs, retried jobs, and performed actions.
- Provide secure offboarding: disable connection, revoke credentials, cancel jobs, remove stored secrets, and apply retention/deletion policy.

## Acceptance criteria for a first production connector
- Runs against a vendor sandbox or approved test tenant.
- Connection test reports accurate pass/fail diagnostics without leaking secrets.
- Least-privilege scopes are documented and reviewed.
- Pagination, rate limits, timeouts, expired credentials, partial failure, and vendor schema changes are tested.
- Retries do not duplicate records or actions.
- Tenant-isolation and permission-denial tests pass.
- Audit trail is complete for connection and data-changing actions.
- Operational health metrics and alerts exist.
- Documentation states exactly which entities and actions are supported.
- A named owner and support runbook exist.

## First migration release
Keep the first release narrow: CSV-based users/departments/assets import plus one real identity or device source connector chosen from pilot-customer demand. Deliver field mapping, dry run, validation, duplicate handling, staged execution, reconciliation, and audit history before adding broad write-back or remote device actions.

## Explicit non-goals for the initial release
- Claiming universal compatibility with any backend.
- Importing passwords or silently taking over identities.
- Automatically granting administrator roles from source data.
- Performing remote device actions through inventory-only records.
- Promising perfect rollback of irreversible third-party changes.
- Running unreviewed migrations directly against production.


## Additional planned connector requirements: OneDrive and CrowdStrike

### Microsoft OneDrive
- Treat OneDrive as a planned file migration/source connector, distinct from a backup product.
- Support a documented, tested subset of Microsoft Graph/OneDrive capabilities; define tenant and drive scope, folder/file metadata, version-history behavior, permission/ACL handling, shared links, duplicate policy, large-file handling, throttling, and incremental sync.
- Start with read-only discovery and dry run. Preserve source data until destination reconciliation and owner sign-off.
- A separate backup feature requires retention, protected copies, recovery points, monitoring, and tested restore drills. File migration or ordinary synchronization alone does not satisfy backup requirements.

### CrowdStrike Falcon
- Support only API capabilities available under the customer's Falcon subscription, region, scopes, and the implemented adapter.
- Begin with approved read-only endpoint inventory and detection/incident context where available. Normalize and deduplicate events before opening tickets.
- Endpoint containment or other disruptive response actions are a separate privileged capability requiring explicit authorization, policy gates, audit records, and tested recovery.
- Test expired credentials, insufficient scopes, rate limits, duplicate events, partial outages, and tenant isolation. Do not imply active EDR monitoring from a catalog entry.

### Remote Support verification
- Current app navigation describes Remote Support as simulated; inspect and validate the existing page before extending it.
- Real sessions require an integrated provider/agent, authenticated technician identity, target-device and tenant authorization, user awareness/consent as required, short-lived session grants, encryption, timeout/revocation, controlled privilege/file transfer, and auditable session lifecycle events.
- Release acceptance requires a real test session on an approved test device, proof that denied access is denied, and proof that session termination revokes access.
