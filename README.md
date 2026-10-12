# IntelliStack Systems — Maximus Optimus Command Center

A responsive React + Vite prototype for an enterprise IT operations command center. This repository contains a product prototype and evolving architecture plan; it is **not yet a production-ready enterprise platform**.

## Continuity and project status

- **Start here when resuming work:** [PROJECT_HANDOFF.md](./PROJECT_HANDOFF.md) — current branch/PR context, implemented prototype features, known limitations, newly captured requirements, and resume instructions.
- **Product and architecture plan:** [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md).
- **Current working branch:** `feature/network-operations-secure-shell`.
- **Draft pull request:** [PR #5 — Add Network Operations Center and command workspace](https://github.com/FrankMazerati/IntelliStack_Systems_OptimusMaximus/pull/5).
- **Merge/deployment policy:** no merge to production or production deployment without explicit user approval.
- **Verification policy:** inspect the latest PR head and checks before claiming a build, test, preview, deployment, or integration is working.

## Prototype capabilities represented in the current feature branch

Confirm the current branch and PR diff before assuming a feature is present or unchanged.

- **Command Center and role-specific workspaces:** Super Admin, Help Desk Agent, IT Administrator, and Governance & Compliance views.
- **Service Desk:** seeded sample tickets, ticket creation/search/filtering, status changes, resolve/reopen actions, and activity history.
- **End User Directory, Knowledge Vault, System Status, integrations, governance/audit, and infrastructure/remote-support demonstration screens.**
- **Network Operations Center:** vendor reference cards for Wireshark, SolarWinds NPM, PRTG, Zabbix, ManageEngine OpManager, and Cisco Catalyst Center. These are not connected monitoring integrations unless explicitly configured and verified.
- **Command Line & PowerShell preview:** sample commands and safe preview behavior; commands do not run on the host.
- **War Room scenario simulator:** simulated network, authentication, executive-ticket, ransomware, cloud-outage, and data-exposure scenarios. It does not page real responders or change infrastructure.
- **Intelligence Briefing:** category-filtered external source links; not a live, ingested, or verified news feed.
- **Remote Support:** visual workflow only; it does not connect to real endpoints.

## Important data and security limitations

- Identities, metrics, tickets, audit events, connector statuses, and device states may be synthetic demonstration data.
- Ticket changes and activity history use browser `localStorage` in the prototype. This is not shared server-side persistence; separate browsers/devices do not share the data.
- UI role switching and navigation are not security boundaries. A production system requires authenticated server-side APIs, authorization on every protected operation, tenant isolation, validation, durable database storage, concurrency-safe identifiers, and audit logging.
- Do not store production credentials or secrets in browser code or `localStorage`.
- No real VPN, OneDrive, firewall, monitoring, SMS/email paging, or remote-support integration should be considered connected unless the integration is configured, tested, and its state is verified.
- Backup, recovery, and data-migration features must include tested restore/reconciliation procedures before being relied on for business continuity.

## Roadmap requirements captured but not implemented merely by documentation

The handoff and blueprint track planned work including:
- Secure VPN connectivity with MFA, least privilege, monitoring, and revocation.
- Backup and disaster recovery with protected recovery points, restore testing, and audit history.
- Microsoft OneDrive integration with explicit consent and tenant-aware permissions.
- Multi-organization hierarchy, controlled connections and resource sharing, data migration/merger workflows, **Stop Sharing**, **Disconnect Organization**, and carefully governed **Reverse Integration**.
- Multiple isolated firewall simulators, including packet filtering, next-generation firewalls, WAF, cloud rules, and zero-trust segmentation.
- Broader governance, incident-response, communications, migration, and workforce capabilities described in `MASTER_BLUEPRINT.md`.

## Run locally

Requirements: Node.js 18+.

```bash
npm install
npm run dev
```

To build and preview locally:

```bash
npm run build
npm run preview
```

Run these commands against the current branch and record the actual outcome before stating that checks pass. A successful local build does not by itself prove production security or live integrations.

## Project files

Inspect the current repository tree because paths can change between branches. The current prototype has included files such as `app.jsx`, `styles.css`, `main.jsx`, `index.html`, `vite.config.js`, and `package.json`, along with documentation and image assets.

## Scale and readiness claims

Any user counts, availability figures, operational KPIs, or scale targets shown in the prototype are illustrative unless backed by measured evidence. A large-scale production deployment requires threat modeling, identity and access design, server-enforced tenant isolation, reliable data services, observability, load testing, security review, backup/recovery drills, and documented operations.

## Contributing / continuing work

1. Read [PROJECT_HANDOFF.md](./PROJECT_HANDOFF.md) and [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md).
2. Inspect the latest PR diff, branch head, and CI status.
3. Work on a feature branch and submit reviewable changes.
4. Clearly label mock behavior; do not represent planned functionality as implemented.
5. Do not merge or deploy to production without explicit approval.

### Global Tenant Command (mock preview)

The Super Admin workspace includes a **Global Tenant Command** prototype using the fictional company **Northstar Harvest Foods**. It demonstrates a multi-organization portfolio, tenant-context switching, illustrative organizational hierarchy and metrics, and creation of additional mock tenants.

This is a local UI demonstration, not a production multi-tenant security implementation. Mock tenant definitions are stored in browser localStorage. Existing prototype tickets, users, devices, and integrations are not yet tenant-isolated. Platform-owner authority over mock tenants must not be treated as permission to access real company systems or devices; live access requires company-approved scopes and server-enforced authorization. The million-user figure is a scale target, not tested capacity.

See [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md) section 40 and [PROJECT_HANDOFF.md](./PROJECT_HANDOFF.md) for the architecture, security boundaries, and next implementation gates.


## Global Security Policy & Key Management

The company-only security-policy specification defines separate controls for AES-256-capable encryption layers, key lifecycle and custody, password/authentication policy, session and credential timers, server-side enforcement, verification, auditing, and recovery. It is a design specification, not proof that those controls are implemented or enforced. Start with [GLOBAL_SECURITY_POLICY_AND_KEY_MANAGEMENT.md](./GLOBAL_SECURITY_POLICY_AND_KEY_MANAGEMENT.md). Keep production key material and plaintext credentials out of the browser and logs. Multi-tenant enablement remains gated on authorization, isolation, and security testing.

## Identity Lifecycle & Access Orchestration

The unified onboarding specification defines a reusable, tenant-isolated employee lifecycle workflow for enterprise customers and MSPs: identity, MFA, approved role templates, licenses, ServiceNow and other application access, endpoint readiness, verification, exception handling, and offboarding. It is a design specification, not evidence that live provisioning is implemented. See [IDENTITY_LIFECYCLE_AND_ACCESS_ORCHESTRATION.md](./IDENTITY_LIFECYCLE_AND_ACCESS_ORCHESTRATION.md). Named companies in examples are potential customer types, not claimed customers.
