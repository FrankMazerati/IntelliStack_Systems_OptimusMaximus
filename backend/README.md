# IntelliStack Business API (v1)

This API foundation is based on the Preview #39 source commit and is isolated on the
`feature/preview39-persistent-business-api` branch. It is not merged or deployed.

## Persistence model

Cloudflare D1 stores tenant-scoped records and audit events. Resource records are
JSON payloads keyed by tenant, resource name, and record ID. This permits modules to
share a consistent API contract while their domain schemas mature. Sensitive files
should be stored in controlled object storage, with metadata and permissions in D1;
never store payment-card numbers or CVVs here.

## Endpoint contract

All application routes are under `/api/v1` and require a signed bearer JWT.
The identity provider must issue tokens with `sub`, a tenant claim (`tenant_id`,
`org_id`, or `organization_id`), an audience matching `JWT_AUDIENCE`, and an issuer
matching `JWT_ISSUER`. The provider's JWKS URL is configured as `JWT_JWKS_URL`.
Requests fail closed when these settings are missing. The API is not ready for
production until authentication, tenant claims, role mapping, CORS, and D1 are
configured and tested.

| Method | Route | Purpose |
|---|---|---|
| GET | `/health` | Reports whether database/auth configuration is present |
| GET | `/api/v1` | Lists supported resource names |
| GET | `/api/v1/{resource}?limit=50&offset=0` | List records in the caller's tenant |
| POST | `/api/v1/{resource}` | Create a record and audit event |
| GET | `/api/v1/{resource}/{id}` | Retrieve a record |
| PATCH | `/api/v1/{resource}/{id}` | Update a record and audit event |
| DELETE | `/api/v1/{resource}/{id}` | Soft-archive a record and audit event |
| GET | `/api/v1/audit-events?limit=50` | Admin-only audit history |

## Initial resource catalog

Directory: users, groups, roles, permissions, directory-units, directory-policies.
Inventory: devices, assets.
Business/marketplace: companies, business-profiles, worker-profiles, opportunities,
requisitions, applications, interviews, offers, engagements.
Work operations: tickets, tasks, projects, documents, knowledge-articles.
TeleSphere: telesphere-rooms, telesphere-sessions, telesphere-messages.
Workspace: calendar-events, meetings, notifications, workspace-preferences, favorites,
layout-preferences, integrations, audit-events.

All records are tenant-scoped. Administrative resources require an administrator
role in the verified JWT. The current role mapping is intentionally conservative and
must be aligned with the chosen identity provider before production use.

## Deploy / activation checklist

1. Create the D1 database and apply `backend/d1/schema.sql`.
2. Replace the placeholder D1 database ID in `backend/worker/wrangler.toml`.
3. Configure `JWT_ISSUER`, `JWT_AUDIENCE`, `JWT_JWKS_URL`, and
   `ALLOWED_ORIGINS` using the actual identity provider and production origins.
4. Deploy the Worker using Wrangler or the Cloudflare dashboard.
5. Set the frontend API base URL to the deployed Worker URL and replace local-only
   saves module by module with the API contract above.
6. Run authenticated end-to-end tests for tenant isolation, role permissions, create,
   read, update, archive, audit trails, and cross-device persistence.

The API foundation does not make existing UI forms automatically persistent. Each UI
workflow must be connected to the API and tested. It does not claim live Microsoft
Active Directory, identity, payment, TeleSphere media, or marketplace provider
integrations until those connectors are configured and verified.
