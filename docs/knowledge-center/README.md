# IntelliStack Troubleshooting & Knowledge Center

**Purpose:** Give approved collaborators a consistent, self-service path to understand the platform, diagnose issues, make safe changes, and hand work back without interrupting the project owner.

## Start here

1. Read [Collaborator onboarding](COLLABORATOR-ONBOARDING.md).
2. Read the [System map and implementation status](SYSTEM-MAP.md) before assuming a capability is live.
3. Use the [Troubleshooting playbook](TROUBLESHOOTING-PLAYBOOK.md) to investigate problems.
4. Follow the [GitHub change and release workflow](CHANGE-AND-RELEASE-WORKFLOW.md) for code changes.
5. Use the [Handoff template](HANDOFF-TEMPLATE.md) when finishing work or escalating an issue.
6. Use the [Knowledge article template](ARTICLE-TEMPLATE.md) when documenting a newly solved problem.

## Knowledge-center rules

- **Verify before claiming.** Distinguish implemented and tested behavior from a prototype, planned feature, or unverified integration.
- **Protect production.** Never paste passwords, API keys, tokens, service-role keys, private candidate data, or personal records into issues, logs, screenshots, commits, or documentation.
- **Use least privilege.** Give collaborators only the repository, environment, and service access required for their assigned task.
- **Make changes reviewable.** Use a dedicated branch and pull request; describe risk, validation, rollback, and any remaining work.
- **Keep a trail.** Link the relevant issue/PR, record what was checked, and update this documentation when a procedure changes.
- **Escalate early.** Stop when a fix could expose data, change billing, alter identity/security policy, delete records, or affect production users.

## Current limitations

This repository's README describes a React + Vite demo. Ticket records have been documented as browser-local demo persistence, role switching is not an authorization boundary, remote support is simulated, and AI assistants are prototypes. See [System map](SYSTEM-MAP.md). Do not represent the demo as a production-connected platform until the relevant backend and controls have been implemented and independently validated.
