IntelliStack Systems — Optimus Maximus Command Center
A responsive React + Vite portfolio demo for a fictional enterprise IT command center. All identities, metrics, tickets, audit events, connector statuses, and device states are synthetic. No production systems or real remote devices are connected.
Included workspaces and screens
Super Admin
Command Center overview
User & Role Management
System Integrations / Connector Hub
Security & Compliance
Help Desk Agent
Service Desk with ticket creation, search, filtering, status changes, resolve/reopen actions, and activity history
End User Directory with fictional employee profiles, devices, and linked ticket history
Knowledge Vault
Maximus AI Assistant (scripted demo responses)
System Status
IT Administrator
Infrastructure inventory
Remote Support (simulated session state only; does not connect to an endpoint)
Automation Workflows
Governance & Compliance
Governance Center
Audit Log
Ticket behavior and persistence
The ticket queue starts with seeded examples. Newly created incident IDs increment from the highest numeric ticket suffix (for example, INC-7843 after INC-7842). Ticket status changes, newly created tickets, and ticket activity history are stored in the browser's localStorage, so they persist across refreshes in the same browser profile. This is local demo persistence, not a shared server database. Different browsers/devices do not share the data, and clearing site data resets it.
The code keeps UI state and sample data in React so the storage layer can later be replaced with API/database services. A production implementation should use a server-side database, authenticated API, validation, role-based authorization, audit logging, and concurrency-safe ticket-number generation. Never generate globally unique ticket numbers only in the browser for a multi-user production system.
Remote Support is a visual workflow demonstration only. A real deployment must integrate an approved remote-support/RMM provider, enforce authorization and end-user consent, and log sessions.
Run locally
Requirements: Node.js 18+.
npm install
npm run dev
Open the local URL printed by Vite. To create a production build:
npm run build
npm run preview
Publish on GitHub
Create a repository and upload the contents of this folder.
Vercel or Netlify can build with npm run build and publish the dist folder.
GitHub Pages also works after setting Vite's base to the repository subpath and adding a deployment workflow.
Project layout
intellistack-portfolio/
├── index.html
├── package.json
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    └── styles.css
About scale claims
User counts, availability figures, volumes, and operational KPIs are illustrative target-state portfolio values—not real customer counts or measured service levels. A production system intended for million-user scale requires architecture design, durable data services, identity integration, server-enforced authorization, observability, load testing, and security review. Role switching in this demo is for exploration only and is not an access-control boundary.


## Optimus Maximus naming and agent model

**Optimus Maximus Command Center** is the umbrella operations environment for IntelliStack Systems. **Optimus** and **Maximus** are two distinct, cooperating AI agents within that environment—not separate products that replace the command center.

- **Optimus — technical intelligence:** supports technical investigation, incident triage, service and infrastructure analysis, and troubleshooting guidance.
- **Maximus — strategic intelligence:** supports operational prioritization, business-impact framing, governance considerations, and executive decision support.
- **Together:** the agents connect technical findings to operational priorities while the command center remains the shared workspace and source of navigation.
- **Human control:** agent suggestions and any future tool actions must remain subject to the signed-in user's server-enforced permissions, policy checks, audit trails, and approval requirements. UI-only role controls are not a security boundary.

The current AI assistant behavior is a scripted prototype. This naming and responsibility model documents product direction; it does not claim that production AI services, live integrations, or privileged execution are connected.
