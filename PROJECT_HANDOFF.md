# IntelliStack Systems — Project Handoff & Current Status

**Last updated:** 2026-10-12  
**Repository:** [FrankMazerati/IntelliStack_Systems_OptimusMaximus](https://github.com/FrankMazerati/IntelliStack_Systems_OptimusMaximus)  
**Working branch:** `feature/network-operations-secure-shell`  
**Pull request:** [Draft PR #5 — Add Network Operations Center and command workspace](https://github.com/FrankMazerati/IntelliStack_Systems_OptimusMaximus/pull/5)  
**Release state:** PR is open as a draft. Nothing has been merged to production by this work.  
**Purpose:** This file is the continuity handoff for a new ChatGPT conversation, coding agent, or human contributor. Read it and the linked PR before making changes.

## Working rules

1. Treat GitHub as the source of truth. Inspect the current branch, latest commit, PR diff, and checks before editing; this document can become stale.
2. Work on `feature/network-operations-secure-shell` or a newly agreed feature branch. Do not push speculative work to the default branch.
3. Do not merge PRs, deploy production, or make destructive changes without explicit user approval.
4. Do not claim a build, test, deployment, live integration, or preview succeeded unless there is current evidence.
5. Preserve the existing app and branch history; do not create a replacement project unless the user explicitly requests it.
6. Keep prototype/simulated behavior clearly distinguished from real services, customer data, security enforcement, or infrastructure control.

## Current application baseline

- The repository's current project documentation identifies this as a React + Vite command-center prototype.
- Main application files include `app.jsx`, `styles.css`, `main.jsx`, `index.html`, `vite.config.js`, and `package.json` (confirm exact paths on the current branch before editing).
- Build scripts documented in the project: `npm install`, `npm run dev`, `npm run build`, and `npm run preview`.
- The README/blueprint describe synthetic/demo identities, tickets, metrics, connector statuses, and device states. Ticket state uses browser localStorage in the prototype, not shared production persistence.
- UI role switching and UI navigation are not a security boundary. Production needs server-side authentication/authorization, tenant isolation, durable database storage, validation, audit logging, secure secrets handling, and tested recovery.
- No claim is made here that the current app is production-ready or that a live VPN, OneDrive, firewall, monitoring, messaging, paging, or remote-support integration is connected.

## Work represented in draft PR #5

The current working branch has been used for the Network Operations Center and command-workspace work, plus the following additions. Verify each item against the latest branch before relying on it.

### Implemented as prototype UI / local simulation

- **Network Operations Center:** vendor cards for Wireshark, SolarWinds NPM, PRTG, Zabbix, ManageEngine OpManager, and Cisco Catalyst Center; integrations are shown as not connected. PCAP/PCAPNG review and incident handoff are workflow demonstrations.
- **Command Line & PowerShell:** safe example commands and preview behavior; commands are not executed on a real host. Role-policy controls are local preview state, not enforced access controls.
- **War Room scenario simulator:** scenarios include network outage/packet loss, VPN or identity authentication failure, high-risk executive ticket, suspected ransomware/endpoint compromise, cloud/business-critical service outage, and suspected data exposure/unauthorized access. It presents impact scope, severity, suggested owner, response targets, teams, and steps. Starting a scenario creates a local simulated room; it does not page responders or change systems.
- **Intelligence Briefing:** category filters and external source links for technology, cybersecurity, markets, and video sources. It is not a live ingested or verified news feed.
- Responsive styling and navigation shortcuts for these areas.

### Known limitations

- Automated build/test status has not been verified in the latest project handoff; prior workflow-run lookup returned no runs. Run checks against the current head before making claims.
- A working Vercel preview URL has not been verified.
- Prototype notifications, connector requests, metrics, role checks, and emergency behavior must not be described as live unless a real backend/provider is configured and tested.
- PR #5 is a draft and is based on existing branch history. Do not merge or retarget it without user approval.

## New requirements captured for the roadmap (not implemented just by being listed here)

### Secure connectivity and security operations
- Secure VPN tunnel with authenticated users/devices, MFA, least privilege, access revocation, connection monitoring, and auditable session events.
- Multiple isolated firewall simulators: network/packet filtering, next-generation firewall, web application firewall, cloud/network rules, and zero-trust/internal segmentation. Start with safe deterministic simulation, not a live firewall controller.
- Expand emergency response/War Room with authorized personnel, secure communications, escalation, and real integrations only after provider setup and testing.

### Business continuity and cloud files
- Backup and disaster recovery: scheduled/on-demand backups, retention, failure alerts, protected recovery points, restoration approvals, restore testing, and audit history.
- Microsoft OneDrive integration using supported Microsoft authentication/APIs, consent, scopes, tenant-aware permissions, and safe handling of credentials. Do not treat OneDrive alone as the application's database backup.

### Multi-organization / enterprise integration and M&A
- Hierarchical organizations: parent company, subsidiaries, departments/business units, and approved external partners.
- Secure organization-to-organization connectivity and governed resource sharing.
- Data transfer/consolidation workflows for mergers and acquisitions, with data mapping, duplicate/conflict detection, dry runs, approvals, backups, reconciliation, and audit logs.
- Distinguish three operations:
  1. **Connect Organization** — establish or disable a trusted technical connection.
  2. **Share / Stop Sharing** — grant or revoke access to specific resources.
  3. **Merge / Reverse Integration** — consolidate supported records and provide a carefully reviewed recovery/rollback workflow.
- Support **Stop Sharing**, **Disconnect Organization**, and **Reverse Integration**. Revocation cannot erase copies already downloaded by the other party. A completed merge may not be universally reversible; preserve mappings, snapshots, and transaction history.
- Tenant isolation and server-enforced authorization are foundational; a parent administrator must not automatically receive unrestricted access to every subsidiary's content.

## Broader product roadmap already described in MASTER_BLUEPRINT.md

Review the full blueprint for details. Major areas include:
- Super Admin and role-based workspaces; account management and MFA.
- Service Desk, ticket lifecycle, end-user directory, knowledge base, asset inventory, and remote support.
- Security & Compliance, Governance Center, Audit Log, Emergency War Room, and incident response.
- Integrations/connectors, system status, automation/workflows, corporate communications, mailbox/team chat.
- SharePoint/document management, Enterprise Migration Center, test/validation center.
- Workforce/field operations, reporting/analytics, configuration/environment management, and AI-assisted design-to-code delivery.
- Cross-organization sharing, migration, resource exchange, and M&A integration should be added to the detailed architecture/design plan before implementation.

## Suggested next steps

1. Open the PR and inspect its current diff and head commit.
2. Run `npm install` and `npm run build` in a clean checkout; record the actual result and fix failures before treating the preview as ready.
3. Verify mobile layouts and navigation for NOC, terminal, War Room simulator, and Intelligence Briefing.
4. Keep new brainstorming requirements in this handoff/blueprint until prioritized; do not silently imply they are implemented.
5. Before production-grade multi-organization work, define the tenant data model, identity boundaries, authorization matrix, audit events, backup/restore strategy, and integration threat model.
6. Request explicit user approval before merge or production deployment.

## How to resume in a new conversation

Tell the next assistant/agent:

> Continue IntelliStack Systems / Maximus Optimus from GitHub. First read `PROJECT_HANDOFF.md`, `README.md`, `MASTER_BLUEPRINT.md`, and draft PR #5. Verify the current branch/head/checks and inspect the diff before changing anything. Work on a feature branch, distinguish simulation from live integrations, update the handoff when status changes, and do not merge or deploy without my explicit approval.

This document is a living handoff, not proof that planned features have been implemented.


### Global executive command view and million-user scale target

- Add a separately branded acquired/partner-company tenant; its final company name is **TBD** and must not be invented as an actual customer.
- Give both organizations their own multi-tier hierarchy, memberships, roles, policies, systems, assets, tickets, incidents, and audit boundaries.
- Add a unified global executive view and a tenant switcher for explicitly authorized Super Admins. Keep the active tenant visible and enforce permissions server-side; one login is not unrestricted cross-tenant access.
- Cross-tenant content access requires least privilege, MFA/step-up controls where supported, approved purpose/scope, time limits, and detailed audit records. Provide a reviewed, time-limited break-glass path rather than a permanent bypass.
- Treat **1,000,000 global registered users** as an aspirational engineering target, not a provisioned user count or proven capacity. Define service objectives and test realistic concurrency, data distribution, audit volume, regional latency, and failure recovery before making scale claims.
- The detailed requirements and acceptance checks are in section 38 of MASTER_BLUEPRINT.md. These are roadmap requirements, not implemented features.


### Approved access model: global oversight with controlled access

- User confirmed this authority model for the Enterprise Integration & M&A Hub.
- Global command view may show only approved aggregates for explicitly authorized tenants. Access to raw/sensitive tenant content requires a separate resource-specific authorization check; global visibility is not blanket content access.
- Use a validated tenant context, server-side default-deny authorization, database isolation/RLS, explicit tenant membership/platform grants, and detailed audit events. A parent/subsidiary relationship alone grants no access.
- A single authenticated session may switch among authorized tenants, but every request must be authorized for the active tenant and target resource. Always display the active tenant and clear/refetch tenant-specific client state on switch.
- Before migrations or code changes, inspect existing Supabase schema, migration history, auth configuration, and policies. The current application is React + Vite; do not assume production server routes already exist.
- Implementation sequence: (0) inspect foundations and threat model; (1) tenant schema + server/database authorization + isolation tests; (2) tenant switcher and context safety; (3) global aggregate dashboard; (4) scoped, approved, expiring content-access grants; (5) load/reliability validation.
- Section 39 of MASTER_BLUEPRINT.md defines the proposed entities, phases, security acceptance tests, and release gates.
- The second organization's final name remains TBD. One million registered global users is a target, not verified capacity.
- Keep work on feature/network-operations-secure-shell. Do not merge or deploy production without explicit user approval.

