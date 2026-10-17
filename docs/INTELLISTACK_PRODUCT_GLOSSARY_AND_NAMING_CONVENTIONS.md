# IntelliStack Systems — Workflow Companion & Product Tools Glossary

*Naming conventions, definitions, relationships, and implementation-status guidance*

## Purpose

This document establishes a shared vocabulary for IntelliStack Systems / Maximus Optimus Command Center. It distinguishes the primary assistants from workflow capabilities, productivity tools, and proposed concepts.

**Status note:** These are product definitions and planning names. Their inclusion here does not mean every capability is implemented, integrated, or deployed. Confirm implementation status in the module registry and repository before describing a capability as operational.

## 1. Core platform and assistants

### Maximus Optimus Command Center
The unified workspace where users access dashboards, tools, communications, workflows, and administrative functions.

### Maximus
**Strategic intelligence.** Helps users interpret priorities, objectives, decisions, risks, and the broader business picture.

### Optimus
**Technical intelligence.** Focuses on system behavior, diagnostics, dependencies, configuration, and operational problem-solving.

### IntelliStack Workflow Companion
A task-guidance assistant that helps a user move through a task from start to finish. It explains next steps, helps locate the appropriate tool, tracks progress, surfaces blockers, and supports handoffs.

**Example:** guiding Tony through onboarding Frank and identifying which onboarding steps remain incomplete.

**Relationship shorthand:** Maximus helps clarify what matters; Optimus helps explain the technical system; Workflow Companion helps the user progress through the work.

## 2. Workflow and productivity tools

### IntelliStack Momentum
**Proposed capability:** helps users maintain progress on priorities and work in progress.

### Workflow Lifecycle & Help Buddy
**Proposed/working name:** tracks workflow stages, completion states, blockers, exceptions, approvals, and follow-up actions. Keep its scope distinct from the Workflow Companion: the Companion guides the person; Lifecycle & Help Buddy tracks workflow state and support needs.

### IntelliStack QuickSheets
Reusable task-specific guides, forms, checklists, and instructions that help users complete work consistently.

### Pinned Quick Links
Shortcuts to frequently used tools, records, workflows, or destinations.

### IntelliSync
Coordinates supported context, handoffs, and workspace synchronization across desktop, laptop, and mobile experiences.

### IntelliStack Attention Engine
Brings relevant signals from areas such as tickets, email, calendars, and security events together to help users determine what needs attention.

### IntelliSearch
Searches authorized system resources and connected sources for relevant information.

### IntelliAction Center
Centralizes actionable items such as approvals, tasks, recommendations, and required follow-ups.

### IntelliStack Automation & Rules Engine
Executes configured rules, triggers, and approved automated workflows.

### Intelisphere
Working name for the workspace, knowledge, and collaboration environment. Confirm whether this is a distinct product name or a descriptive umbrella before locking it into the registry.

### My Work Library
A personal area for saving and reopening work, documents, resources, and reusable materials.

## 3. Additional proposed concepts

### IntelliStack Insight
**Proposed:** situational awareness and context that help users understand what is happening.

### SkillBridge
**Proposed:** learning guidance and role-specific skill development.

### ThreadKeeper
**Proposed:** preserves task context so users can resume interrupted work.

### TeamPulse
**Proposed:** team coordination and visibility into shared work.

### KnowledgeLoop
**Proposed:** captures and organizes reusable organizational knowledge and lessons learned.

### ClearPath
**Proposed:** explains recommendations, decisions, and next steps in a user-understandable way.

## 4. How the capabilities fit together

The Command Center is the primary workspace. Maximus provides strategic perspective; Optimus provides technical perspective. The Workflow Companion guides the user through a task. Supporting tools supply checklists (QuickSheets), workflow-state and blocker tracking (Lifecycle & Help Buddy), action queues (IntelliAction Center), search (IntelliSearch), attention prioritization (Attention Engine), automation (Automation & Rules Engine), and cross-device continuity (IntelliSync).

This is the intended conceptual relationship, not a claim that every integration is implemented.

## 5. Naming conventions

- **Company/brand:** IntelliStack Systems
- **Primary workspace:** Maximus Optimus Command Center
- **Strategic assistant:** Maximus
- **Technical assistant:** Optimus
- **Task-guidance assistant:** IntelliStack Workflow Companion
- **Workflow-state/support capability:** Workflow Lifecycle & Help Buddy
- **Cross-device synchronization:** IntelliSync
- **Knowledge/collaboration environment:** Intelisphere (working name; confirm before standardizing)

Use readable Title Case for user-facing product names. Use lower camelCase for code identifiers (for example, `workflowCompanion`). Use lowercase kebab-case for documentation filenames (for example, `workflow-companion`). Keep product display names, code identifiers, module IDs, workflow names, and user roles separate.

Workflow definitions should be descriptive and action-oriented. Define uncommon abbreviations in the central glossary. Check the module registry before assigning or changing any module ID.

## 6. Suggested code and documentation identifiers

- **Product display name:** IntelliStack Workflow Companion
- **Module ID:** assign only after checking the official module registry; do not invent an ID.
- **Code identifier:** `workflowCompanion`
- **Documentation filename:** `docs/INTELLISTACK_PRODUCT_GLOSSARY_AND_NAMING_CONVENTIONS.md`
- **Related workflow names:** “Guide Employee Onboarding,” “Track Onboarding Completion,” or “Escalate Blocked Approval.”

## 7. Required registry fields

For each named capability, track:
- Canonical display name
- Stable module ID
- Code identifier
- Short definition
- Owner
- Dependencies
- User roles
- Data permissions
- Lifecycle status: proposed, designed, in development, implemented, verified, or deprecated
- Acceptance criteria
- Tests/evidence
- Last-reviewed date

Do not label a capability implemented or verified without repository and test/deployment evidence. Keep proposed names visibly marked as proposed until approved.

## Recommended next action

Link this file from the documentation index. Before merging, reconcile all names and status labels against the current module registry and source code.
