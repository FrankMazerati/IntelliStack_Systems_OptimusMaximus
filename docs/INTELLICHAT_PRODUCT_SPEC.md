# IntelliStack In-House Communications — Product Specification

## Product goal
Build a first-party communications workspace inside IntelliStack Systems so employees and teams can communicate without depending on Microsoft Teams. It must be an independently useful in-house chat and messaging product, not merely a Teams link or connector. Working name: **IntelliChat** (provisional; product name can be changed).

## Product surface
Add a first-class **Communication & Collaboration** navigation group in the scrollable sidebar, with IntelliChat, Direct Messages, Group Chats, Department Channels, Project & Incident Rooms, Announcements, Meetings & Calls (later phase), Message Search, Saved Messages, and Notification Preferences.
The workspace should use an inbox/chat layout: conversation and channel list on the left, message thread in the center, and optional member/details panel on the right. Reuse the existing IntelliStack dark navy, cyan highlights, and role-aware shell. Support responsive desktop and mobile layouts.

## Core capabilities
### Phase 1: secure persistent text messaging
- One-to-one direct messages.
- Group conversations with explicit membership.
- Department and project channels, private or public within an organization.
- Persistent history, edits/deletes with clear metadata, replies/threads, reactions, attachments, read state, typing/presence indicators, unread counts, pins, and saved messages.
- In-app notifications, mute controls, mentions, and notification preferences.
- User search scoped to the active organization and permitted discoverability.
- Basic moderation/reporting and organization retention controls.

### Phase 2: enterprise collaboration
- Announcements with audience targeting and acknowledgement tracking.
- Incident/War Room channels linked to tickets and incident records.
- Message search that respects channel membership and document permissions.
- Links to tickets, devices, knowledge articles, workflows, and IntelliSphere documents.
- Message-to-ticket conversion and ticket activity notifications.
- Optional guest/external participant access only when explicitly enabled and permission-scoped.
- Optional calendar, meeting, and calling integrations later; core chat remains usable without Microsoft Teams.

### Phase 3: real-time and advanced features
- Real-time delivery and presence.
- Reliable attachment upload, scanning, and access control.
- Push/email notification preferences.
- Optional audio/video calls after secure messaging is stable.
- Mobile-friendly behavior and accessibility.

## Data model
Use organization-scoped records and enforce authorization server-side:
- conversations: organization, type (direct/group/channel/incident), name, visibility, creator, linked resource, timestamps.
- conversation_members: conversation, user, role (owner/moderator/member), join/leave timestamps, notification settings, last-read cursor.
- messages: conversation, sender, body, parent/thread message, created/updated/deleted timestamps, message type, metadata.
- message_reactions: message, user, reaction, timestamp.
- message_attachments: message, private storage object key, safe filename, MIME type, byte size, scan status, uploader, timestamp.
- message_pins and saved_messages.
- communication_notifications: recipient, message/conversation reference, type, read/dismissed timestamps.
- communication_audit_events: organization, actor, action, target, timestamp, metadata. Avoid logging private message bodies unless policy specifically requires it.
Use foreign keys, indexes for conversation history/unread queries, and retention-aware deletion. Never expose private channels or message content in global search unless the current user has access.

## Security, privacy, and compliance
- Tenant isolation and organization membership checks on every read/write.
- Private-conversation and channel membership authorization enforced by the backend; hiding a channel in the UI is not security.
- Use Supabase Row Level Security and/or carefully scoped server-side functions; test allowed and denied cases.
- Keep private attachments in private storage buckets with expiring signed URLs and access checks.
- Validate message size, safely render user-generated content, rate-limit abuse, and protect against spam.
- Support configurable retention, export, legal hold, and eDiscovery according to organizational policy and applicable law.
- Admins should not casually gain silent access to private conversations; any approved compliance access must be governed, scoped, and audited.
- Keep provider secrets out of client-side code.
- Make clear whether presence/read receipts are enabled and allow organization-level controls where appropriate.

## Assistant integration
- Optimus can summarize a channel or incident conversation only if the active user can read it, cite message links/timestamps, draft a reply, and propose converting discussion into a ticket or task.
- Maximus can create an executive incident summary from authorized War Room conversations, with source references and restricted disclosure.
- Neither assistant can silently send messages, add users, export history, or change retention settings without required permission and confirmation/approval.
- Assistant actions must be logged without unnecessarily duplicating sensitive message content.

## Recommended implementation sequence
1. Create schema and RLS policies for conversations, memberships, messages, reactions, and read cursors; test tenant and private-channel isolation.
2. Implement authenticated conversation list, direct/group conversation creation, channel creation, and persistent history.
3. Add sending/editing/deletion, threading, reactions, unread counts, and in-app notifications.
4. Add real-time delivery and presence, then private attachment storage and scanning.
5. Add announcements, ticket/incident links, and message search.
6. Add retention/admin tools and optional meeting/calling capabilities.
7. Add Optimus/Maximus integration with permission-filtered retrieval and explicit action confirmation.

## Acceptance criteria
- Two authorized users can exchange persistent messages; refresh/re-login retains history.
- A user cannot read another private conversation by changing an ID or API request.
- A user in one tenant cannot access another tenant's conversations or attachments.
- Channel membership changes take effect on subsequent reads and subscriptions.
- Search, notifications, exports, and assistant summaries all enforce the same authorization model.
- Automated tests cover positive and negative access cases.
- No feature is described as real-time, live, or production-ready until tested against the connected backend.