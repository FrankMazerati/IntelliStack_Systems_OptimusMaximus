# Chrome and Edge Integration Plan

## Purpose

Make the IntelliStack Systems Command Center the centralized entry point for web access on desktop and mobile while using supported, maintained browser products rather than attempting to recreate a browser engine inside the React app.

## Current implementation (prototype)

The React app includes a **Browser Workspace** reachable from the main dashboard and the workspace navigation. Its first implementation provides:

- An address field that opens an HTTP or HTTPS destination in a new browser tab.
- Links to official Chrome and Microsoft Edge product/download information.
- Existing local bookmark import, preview, favorites matching, and HTML export.
- Plain-language disclosure that the web app cannot force a particular installed browser, embed the full Chrome/Edge engine, or verify which browser was used.

The website launcher uses the browser/device's normal link-opening behavior. It does not guarantee Chrome rather than Edge (or vice versa), and behavior can differ across desktop, Android, iOS, in-app browsers, pop-up policies, and managed-device settings. This is not an embedded browser and is not a secure-browser isolation feature.

## Target experience

1. **Browser Workspace** — common launch point, favorites, approved web applications, status/health visibility, and clear browser choice.
2. **Launch button** — launch a website through the OS/browser default handler; offer Chrome and Edge information/setup links without claiming to control the installed app.
3. **Browser Management** — administrative view for supported enterprise browser management integrations, policy assignment, enrollment/connection health, version compliance, extension controls, and audit events.
4. **Desktop and mobile** — responsive workspace plus platform-appropriate browser launching; do not assume desktop browser protocols work on mobile.
5. **Identity and governance** — connect browser policy visibility to IntelliStack ID, device management, role-based permissions, approvals, and audit logging.

## Recommended implementation sequence

### Phase 1 — dashboard entry point (partially implemented)

- [x] Add Browser Workspace to the main dashboard launchpad.
- [x] Rename the navigation item to Browser Workspace.
- [x] Add a URL field and open-in-new-tab action restricted to HTTP/HTTPS.
- [x] Add official Chrome and Edge product-information links.
- [x] Keep bookmark import/export as a separate local prototype capability.
- [x] Disclose that opening uses the device's browser settings and does not enforce policy.
- [ ] Run the production build and verify the workspace on desktop and mobile browsers.

### Phase 2 — user and device profile

- Persist favorites and approved web apps in authenticated server-side user profiles.
- Add cross-device sync with tenant isolation, user consent, retention, and audit events.
- Model preferred browser separately from default OS handler; do not expose unsupported browser launch assumptions.
- Add device/browser compatibility and managed/unmanaged state only when based on verified telemetry.

### Phase 3 — enterprise management connectors

- Evaluate supported Google Chrome Enterprise management and Microsoft Edge for Business management options for the customer’s tenant, licenses, device enrollment, and administration model.
- Use vendor-supported APIs and enrollment mechanisms. Keep OAuth tokens and secrets server-side in a managed secret store.
- Begin with read-only enrollment/policy/compliance visibility; require explicit permission and approval for changes.
- Implement connection tests, health status, least-privilege scopes, credential rotation, rate-limit handling, audit trails, and negative authorization tests.
- Keep Chrome and Edge as separate providers with shared normalized status where practical.

### Phase 4 — policy operations

- Scoped policies for extensions, safe browsing/threat protection, downloads, sign-in, updates, data handling, and approved web apps, according to vendor capabilities and licensing.
- Assignment by organization, group, user, and managed device.
- Change review, staged rollout, rollback where supported, drift detection, and evidence export.
- Report “Connected” only after a real successful connection test and “Managed” only when a policy is demonstrably applied.

## Security and product boundaries

- A React page cannot become a full Chrome/Edge browser engine simply by embedding a URL. Many websites block iframe embedding, and cross-origin security restrictions prevent a web page from controlling the browser's tabs, extensions, credentials, or system settings.
- Never collect browser passwords, cookies, active sessions, or raw authentication tokens in the web workspace.
- Do not claim that a website opened in Chrome specifically unless the OS/app integration provides reliable evidence.
- Do not claim policy enforcement from a visual toggle or a documentation page.
- Browser administration must be enforced by authenticated backend authorization and the provider's actual administrative controls, not the client-side role selector.
- The current demo's localStorage bookmark handling is local to that browser profile and is not secure cross-device profile synchronization.

## Acceptance criteria

- Browser Workspace is visible on the main dashboard and opens from the workspace navigation for authorized roles.
- HTTPS and HTTP destinations can be opened from a user gesture; invalid or non-web protocols are rejected.
- UI clearly states that the device/default browser chooses which browser opens.
- Tested on supported desktop and mobile devices, including pop-up blocking and app-switching behavior.
- No credentials or session data are collected by the workspace.
- Vendor integration is not labeled Connected or Managed until an actual test and evidence exist.
- Build, automated tests, authorization tests, and documented manual checks pass before production release.
