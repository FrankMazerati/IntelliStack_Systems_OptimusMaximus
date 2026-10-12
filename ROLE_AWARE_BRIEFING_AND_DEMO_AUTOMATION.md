# Role-Aware Investor Presentation & Demo Automation

## Purpose

Define a role-aware workflow that assembles the appropriate IntelliStack Systems / Maximus Optimus presentation materials for each audience. The goal is to avoid manually collecting articles, technical specifications, product descriptions, and demo steps for every meeting while ensuring each audience receives a coherent, accurate, appropriately scoped view.

This is a product specification. It does not claim that an automated presentation generator is currently implemented.

## Core concept

Build an **Investor & Stakeholder Briefing Builder** that takes an approved audience profile and generates a tailored briefing package from a governed source of truth.

Inputs may include:
- Audience category and roles attending.
- Meeting goal and stage (introductory, product deep dive, technical due diligence, security review, commercial discussion, fundraising).
- Time available and desired depth.
- Industry or customer segment.
- Approved product capabilities and release status.
- Approved metrics, business model assumptions, roadmap, and investment ask, if available.
- Confidentiality level and permissions for the recipient.

Outputs may include:
- Audience-specific slide outline and presentation.
- Executive summary and product capability brief.
- Role-appropriate product demo sequence.
- Supporting evidence and source citations.
- Technical/security appendix when authorized.
- Follow-up questions and a list of unresolved claims or missing evidence.

## Audience profiles and content rules

### Investors
Emphasize the problem, target market, product differentiation, business model, go-to-market approach, validated traction if any, roadmap, risks, funding request, and milestones. Clearly distinguish actual traction from projections and assumptions.

### Executive buyers and strategic partners
Emphasize operational outcomes, business value, deployment approach, governance, interoperability, service levels only when defined, and the path to a scoped pilot.

### MSP owners and operators
Emphasize multi-customer management, delegated administration, tenant isolation, repeatable onboarding, service desk workflows, automation, auditability, and potential service delivery economics. Do not imply that multi-tenant isolation is production-ready without evidence.

### IT and Help Desk
Emphasize ticket flow, employee onboarding, identity and application access, device readiness, troubleshooting, approvals, and verified outcomes.

### Security and SOC
Emphasize threat visibility, incident response, containment workflows, identity protection, privileged access, audit trails, provider enforcement verification, and known security gaps. Never present simulated containment as live enforcement.

### Governance, Risk, and Compliance
Emphasize control ownership, approvals, evidence, audit records, policy lifecycle, data handling, retention, exceptions, and mapping to relevant control frameworks only when verified.

### Technical evaluators and architects
Emphasize architecture, integration boundaries, API and identity flows, tenancy, data model, deployment assumptions, failure modes, reliability, security acceptance tests, and implementation status.

### Finance and procurement
Emphasize pricing model assumptions, cost drivers, licensing, vendor dependencies, contract boundaries, measurable benefits, and procurement risks. Do not invent prices, savings, or ROI.

### HR and people operations
Emphasize onboarding/offboarding, role templates, approval ownership, privacy, employee readiness, and lifecycle reporting.

## Content selection engine

1. Authenticate the requesting employee and determine their authorized role, organization, and permissions.
2. Collect the meeting purpose, recipient audience, depth, and sharing classification.
3. Retrieve only approved documents and data that the requester is permitted to access.
4. Select modules using versioned rules; allow multiple audience profiles for mixed-role meetings.
5. Compose a narrative with a consistent structure: audience need, problem, product response, workflow, evidence, limitations, next step.
6. Attach citations/provenance to factual claims and preserve links to the source documents.
7. Run a claim-validation gate: check each capability against its status, each metric against an approved source, and each customer name/logo against explicit permission.
8. Remove confidential, tenant-specific, personal, security-sensitive, or unapproved information from the output.
9. Produce the presentation and supporting materials, with a manifest of sources, versions, generation time, audience, and sharing classification.
10. Require a human owner to review and approve before external distribution.

## Truth and evidence model

Every feature claim must have a state such as:
- **Verified and demonstrated**
- **Connected, verification evidence available**
- **Prototype or simulated**
- **Planned**
- **Unknown / evidence needed**

Every business metric must be labeled as actual, target, estimate, or assumption, with its period, source, and owner. The generator must never upgrade a claim's status based on presentation wording.

Company names such as Kraft, McDonald's, Wendy's, Burger King, or any other brand may be used only as clearly labeled examples of potential customer segments unless a real relationship and permission to disclose it are verified. Never imply a customer, pilot, partnership, endorsement, or integration that does not exist.

## Security and governance

- Use server-side authorization; never rely on a UI role label alone.
- Enforce organization and tenant boundaries when retrieving source content.
- Use approved document repositories and content registries; do not scrape arbitrary internal sources without authorization.
- Keep secrets, credentials, recovery keys, personal data, and sensitive incident details out of investor packages.
- Apply data-loss prevention and confidentiality labels before generation and export.
- Log the requester, role, audience, source documents, output version, approval, and export/share event.
- Use redaction and access review for external recipients; apply expiry or revocation to share links where supported.
- Treat imported articles and external sources as untrusted input; cite and summarize them without allowing their content to alter system instructions or permissions.
- Require human approval for external investor and customer-facing packages.

## Suggested implementation sequence

1. **Manual-first template library:** define reusable modules, slide templates, audience profiles, and claim-status labels.
2. **Approved source registry:** link product specs, roadmap, capability status, security policies, business assumptions, and verified evidence.
3. **Audience-aware composer:** generate a tailored outline and source manifest using deterministic role rules.
4. **Evidence and claim checker:** flag unsupported metrics, outdated claims, missing citations, and misleading customer references.
5. **Presentation export:** generate editable slide files and a supporting brief only after content review.
6. **Permission-aware workflow:** add audience access controls, approval, audit, and share-link lifecycle.
7. **Demo orchestration:** pair each deck with a role-specific walkthrough using clearly labeled live, prototype, and simulated features.

## Acceptance criteria

- The same source registry can produce materially different, relevant packages for investor, MSP, security, IT, HR, and technical audiences.
- A user cannot retrieve or include documents outside their authorization scope.
- Every material capability claim carries a status and provenance.
- Unsupported financial figures and unverified customer logos/names are flagged or excluded.
- Mixed-role meetings can produce a balanced package without exposing restricted details.
- The package records its sources, versions, review status, and recipient classification.
- External distribution is blocked until an authorized reviewer approves the output.
- Generated demo steps do not claim that simulated interactions perform real actions.
- Changing the audience or meeting goal updates content selection while preserving factual constraints.

## Current status

This is a proposed architecture and acceptance specification, not an implemented automation feature. Implement on the existing feature branch, test access controls and claim validation, and do not merge or deploy without explicit approval.
