# Optimus Maximus Cohesive Release Plan

## Product identity

- **Platform:** IntelliStack Systems
- **Operations environment:** Optimus Maximus Command Center
- **Optimus:** technical intelligence agent for investigation and troubleshooting guidance
- **Maximus:** strategic intelligence agent for business impact, prioritization, and governance context
- The agents are separate assistant experiences within one operations center, not separate replacement products.

## Core role model

Keep these four primary system roles distinct from any seeded demo/test accounts:

1. Super Admin
2. Help Desk Agent
3. IT Administrator
4. Governance & Compliance

Role and department labels are not, by themselves, authorization. Production permissions must be enforced server-side and follow least privilege.

## Cohesive UI scope represented by this branch

- IntelliStack login experience with clearly labeled preview-only access and no hardcoded authentication bypass.
- Command Center navigation, role-oriented workspaces, favorites, global clock, footer, and responsive layouts.
- Super Admin platform and user/role management views.
- Service desk ticket creation and local demo ticket workflow.
- Network Operations Center, endpoint operations lab, and remote-support simulation clearly labeled as non-live.
- Connector Hub/provider selection and migration/connector planning.
- IntelliChat and other planned workspace concepts marked as prototypes until services are actually connected.
- Browser Workspace launcher and browser favorites behavior as browser-local prototype features.
- Enterprise architecture, connector, product, and readiness documentation.

## Evidence and production boundary

This pull request consolidates product direction and UI work; it does not make the application production-ready by itself.

- Demo identities, tickets, metrics, audit events, and endpoint states are synthetic or browser-local.
- No live identity provider, production database, endpoint agent, remote-support channel, vendor API, or external AI service is asserted as connected unless independently verified.
- Production readiness requires a successful clean install/build, browser/device smoke tests, server-side authentication and authorization, shared persistence, audited integration adapters, secret management, monitoring, backups, and a verified deployment.

## Required release gates

1. `npm install` completes reliably on a clean CI runner.
2. `npm run build` passes.
3. Vercel preview for the intended project reaches READY with a usable source bundle.
4. Desktop and mobile smoke tests cover login preview, navigation, role views, ticket creation, and assistant launchers.
5. Failed checks are investigated from their logs; do not mark a release as successful based on a successful check from a different Vercel project.
6. No merge or production claim until required checks pass and the preview is verified.
