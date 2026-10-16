const RESOURCE_NAMES = new Set([
  "users", "groups", "roles", "permissions", "directory-units", "directory-policies",
  "devices", "assets", "companies", "business-profiles", "worker-profiles",
  "opportunities", "requisitions", "applications", "interviews", "offers", "engagements",
  "tickets", "tasks", "projects", "documents", "knowledge-articles",
  "telesphere-rooms", "telesphere-sessions", "telesphere-messages",
  "calendar-events", "meetings", "notifications", "workspace-preferences",
  "favorites", "layout-preferences", "integrations", "audit-events"
]);

const ADMIN_RESOURCES = new Set([
  "users", "groups", "roles", "permissions", "directory-units", "directory-policies",
  "devices", "assets", "companies", "integrations"
]);
const MAX_BODY_BYTES = 1024 * 1024;
const MAX_PAGE_SIZE = 100;
let jwksCache = { uri: "", expiresAt: 0, keys: [] };

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers }
  });
}
function responseError(status, code, message, requestId, headers = {}) {
  return json({ error: { code, message, requestId } }, status, headers);
}
function corsHeaders(origin, env) {
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map(x => x.trim()).filter(Boolean);
  if (!origin || !allowed.includes(origin)) return {};
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "access-control-allow-headers": "Authorization,Content-Type",
    "access-control-max-age": "86400",
    "vary": "Origin"
  };
}
function b64urlToBytes(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - value.length % 4) % 4);
  const raw = atob(padded);
  return Uint8Array.from(raw, c => c.charCodeAt(0));
}
function decodePart(value) {
  return JSON.parse(new TextDecoder().decode(b64urlToBytes(value)));
}
async function getJwks(uri) {
  if (jwksCache.uri === uri && jwksCache.expiresAt > Date.now()) return jwksCache.keys;
  const response = await fetch(uri, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error("Unable to retrieve identity provider signing keys");
  const body = await response.json();
  if (!Array.isArray(body.keys)) throw new Error("Identity provider did not return a JWKS key set");
  jwksCache = { uri, expiresAt: Date.now() + 5 * 60 * 1000, keys: body.keys };
  return body.keys;
}
async function verifyBearer(request, env) {
  if (!env.JWT_ISSUER || !env.JWT_AUDIENCE || !env.JWT_JWKS_URL) {
    throw Object.assign(new Error("Authentication is not configured for this API."), { status: 503, code: "AUTH_NOT_CONFIGURED" });
  }
  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const parts = token.split(".");
  if (parts.length !== 3) throw Object.assign(new Error("A valid bearer token is required."), { status: 401, code: "AUTH_REQUIRED" });
  let hdr, claims;
  try { hdr = decodePart(parts[0]); claims = decodePart(parts[1]); }
  catch { throw Object.assign(new Error("The access token is malformed."), { status: 401, code: "INVALID_TOKEN" }); }
  if (!["RS256", "ES256"].includes(hdr.alg) || !hdr.kid) {
    throw Object.assign(new Error("The access token uses an unsupported signing algorithm."), { status: 401, code: "INVALID_TOKEN" });
  }
  const keys = await getJwks(env.JWT_JWKS_URL);
  const jwk = keys.find(k => k.kid === hdr.kid && (!k.alg || k.alg === hdr.alg));
  if (!jwk) throw Object.assign(new Error("The token signing key was not found."), { status: 401, code: "INVALID_TOKEN" });
  const algorithm = hdr.alg === "RS256"
    ? { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }
    : { name: "ECDSA", namedCurve: "P-256", hash: "SHA-256" };
  const key = await crypto.subtle.importKey("jwk", jwk, algorithm, false, ["verify"]);
  const valid = await crypto.subtle.verify(
    hdr.alg === "RS256" ? "RSASSA-PKCS1-v1_5" : { name: "ECDSA", hash: "SHA-256" },
    key, b64urlToBytes(parts[2]), new TextEncoder().encode(parts[0] + "." + parts[1])
  );
  const now = Math.floor(Date.now() / 1000);
  const audiences = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  if (!valid || claims.iss !== env.JWT_ISSUER || !audiences.includes(env.JWT_AUDIENCE) ||
      !claims.sub || !claims.exp || claims.exp <= now || (claims.nbf && claims.nbf > now)) {
    throw Object.assign(new Error("The access token is invalid or expired."), { status: 401, code: "INVALID_TOKEN" });
  }
  const tenantId = claims.tenant_id || claims.org_id || claims.organization_id;
  if (!tenantId) throw Object.assign(new Error("The token is missing a tenant/organization claim."), { status: 403, code: "TENANT_REQUIRED" });
  return { actorId: String(claims.sub), tenantId: String(tenantId), roles: Array.isArray(claims.roles) ? claims.roles : [claims.role].filter(Boolean), claims };
}
function isAdmin(principal) {
  return principal.roles.some(role => ["Super Admin", "IT Administrator", "Organization Admin", "admin", "super_admin"].includes(role));
}
async function readBody(request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) throw Object.assign(new Error("Request body exceeds the 1 MB limit."), { status: 413, code: "BODY_TOO_LARGE" });
  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) throw Object.assign(new Error("Request body exceeds the 1 MB limit."), { status: 413, code: "BODY_TOO_LARGE" });
  let body;
  try { body = JSON.parse(raw); } catch { throw Object.assign(new Error("Request body must be valid JSON."), { status: 400, code: "INVALID_JSON" }); }
  if (!body || Array.isArray(body) || typeof body !== "object") throw Object.assign(new Error("Request body must be a JSON object."), { status: 400, code: "INVALID_BODY" });
  return body;
}
function newId() {
  return crypto.randomUUID();
}
async function audit(db, principal, resource, recordId, action, requestId, metadata = {}) {
  await db.prepare(
    "INSERT INTO business_audit_events (event_id, tenant_id, actor_id, resource, record_id, action, request_id, metadata) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(newId(), principal.tenantId, principal.actorId, resource, recordId || null, action, requestId, JSON.stringify(metadata)).run();
}
async function handleApi(request, env, principal, url, requestId) {
  if (!env.DB) return responseError(503, "DATABASE_NOT_CONFIGURED", "Persistent database binding DB is not configured.", requestId);
  const parts = url.pathname.replace(/^\/api\/v1\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
  if (!parts.length) return json({ name: "IntelliStack Business API", version: "v1", persistence: "Cloudflare D1", resources: [...RESOURCE_NAMES].sort() });
  const [resource, id, action] = parts;
  if (!RESOURCE_NAMES.has(resource)) return responseError(404, "RESOURCE_NOT_FOUND", "This API resource is not available.", requestId);
  if (resource === "audit-events" && !isAdmin(principal)) return responseError(403, "FORBIDDEN", "Audit records require administrator privileges.", requestId);
  if (ADMIN_RESOURCES.has(resource) && !isAdmin(principal)) return responseError(403, "FORBIDDEN", "This resource requires administrator privileges.", requestId);
  const db = env.DB;
  if (resource === "audit-events") {
    const limit = Math.min(Math.max(Number(url.searchParams.get("limit") || 50), 1), MAX_PAGE_SIZE);
    const result = await db.prepare("SELECT * FROM business_audit_events WHERE tenant_id = ? ORDER BY occurred_at DESC LIMIT ?").bind(principal.tenantId, limit).all();
    return json({ data: result.results || [], meta: { limit, source: "database" } });
  }
  if (request.method === "GET" && !id) {
    const limit = Math.min(Math.max(Number(url.searchParams.get("limit") || 50), 1), MAX_PAGE_SIZE);
    const offset = Math.max(Number(url.searchParams.get("offset") || 0), 0);
    const includeArchived = url.searchParams.get("includeArchived") === "true" && isAdmin(principal);
    const where = includeArchived ? "" : " AND archived_at IS NULL";
    const result = await db.prepare(`SELECT id, payload, created_by, updated_by, created_at, updated_at, archived_at FROM business_records WHERE tenant_id = ? AND resource = ?${where} ORDER BY updated_at DESC LIMIT ? OFFSET ?`)
      .bind(principal.tenantId, resource, limit, offset).all();
    return json({ data: (result.results || []).map(row => ({ id: row.id, ...JSON.parse(row.payload), _meta: { createdBy: row.created_by, updatedBy: row.updated_by, createdAt: row.created_at, updatedAt: row.updated_at, archivedAt: row.archived_at } })), meta: { limit, offset, source: "database" } });
  }
  if (request.method === "POST" && !id) {
    const payload = await readBody(request);
    const recordId = String(payload.id || newId());
    if (!/^[a-zA-Z0-9_-]{1,128}$/.test(recordId)) return responseError(400, "INVALID_ID", "Record id contains unsupported characters.", requestId);
    const exists = await db.prepare("SELECT id FROM business_records WHERE tenant_id = ? AND resource = ? AND id = ?").bind(principal.tenantId, resource, recordId).first();
    if (exists) return responseError(409, "RECORD_EXISTS", "A record with this id already exists.", requestId);
    delete payload._meta;
    payload.id = recordId;
    const now = new Date().toISOString();
    await db.prepare("INSERT INTO business_records (tenant_id, resource, id, payload, created_by, updated_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
      .bind(principal.tenantId, resource, recordId, JSON.stringify(payload), principal.actorId, principal.actorId, now, now).run();
    await audit(db, principal, resource, recordId, "created", requestId);
    return json({ data: { ...payload, _meta: { createdBy: principal.actorId, updatedBy: principal.actorId, createdAt: now, updatedAt: now, archivedAt: null } }, meta: { source: "database" } }, 201);
  }
  if (!id) return responseError(405, "METHOD_NOT_ALLOWED", "Use GET or POST for a resource collection.", requestId);
  const row = await db.prepare("SELECT * FROM business_records WHERE tenant_id = ? AND resource = ? AND id = ?").bind(principal.tenantId, resource, id).first();
  if (!row || (row.archived_at && url.searchParams.get("includeArchived") !== "true")) return responseError(404, "RECORD_NOT_FOUND", "The requested record was not found.", requestId);
  if (request.method === "GET" && !action) {
    return json({ data: { id: row.id, ...JSON.parse(row.payload), _meta: { createdBy: row.created_by, updatedBy: row.updated_by, createdAt: row.created_at, updatedAt: row.updated_at, archivedAt: row.archived_at } }, meta: { source: "database" } });
  }
  if (request.method === "PATCH" && !action) {
    const patch = await readBody(request);
    delete patch.id; delete patch._meta;
    const payload = { ...JSON.parse(row.payload), ...patch, id: row.id };
    const now = new Date().toISOString();
    await db.prepare("UPDATE business_records SET payload = ?, updated_by = ?, updated_at = ? WHERE tenant_id = ? AND resource = ? AND id = ?")
      .bind(JSON.stringify(payload), principal.actorId, now, principal.tenantId, resource, id).run();
    await audit(db, principal, resource, id, "updated", requestId, { fields: Object.keys(patch) });
    return json({ data: { ...payload, _meta: { createdBy: row.created_by, updatedBy: principal.actorId, createdAt: row.created_at, updatedAt: now, archivedAt: row.archived_at } }, meta: { source: "database" } });
  }
  if (request.method === "DELETE" && !action) {
    const now = new Date().toISOString();
    await db.prepare("UPDATE business_records SET archived_at = ?, updated_by = ?, updated_at = ? WHERE tenant_id = ? AND resource = ? AND id = ?")
      .bind(now, principal.actorId, now, principal.tenantId, resource, id).run();
    await audit(db, principal, resource, id, "archived", requestId);
    return json({ data: { id, archivedAt: now }, meta: { source: "database", softDelete: true } });
  }
  return responseError(405, "METHOD_NOT_ALLOWED", "The requested method is not supported for this record.", requestId);
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const requestId = request.headers.get("cf-ray") || crypto.randomUUID();
    const origin = request.headers.get("origin");
    const cors = corsHeaders(origin, env);
    if (origin && !cors["access-control-allow-origin"]) return responseError(403, "ORIGIN_NOT_ALLOWED", "This origin is not allowed.", requestId);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (url.pathname === "/health" && request.method === "GET") {
      return json({ status: "ok", service: "intellistack-business-api", persistenceConfigured: !!env.DB, authenticationConfigured: !!(env.JWT_ISSUER && env.JWT_AUDIENCE && env.JWT_JWKS_URL) }, 200, cors);
    }
    if (!(url.pathname === "/api/v1" || url.pathname.startsWith("/api/v1/"))) return responseError(404, "NOT_FOUND", "Endpoint not found.", requestId, cors);
    if (!["GET", "POST", "PATCH", "DELETE"].includes(request.method)) return responseError(405, "METHOD_NOT_ALLOWED", "HTTP method not allowed.", requestId);
    try {
      const principal = await verifyBearer(request, env);
      return await handleApi(request, env, principal, url, requestId).then(async response => {
        const headers = new Headers(response.headers);
        for (const [k, v] of Object.entries(cors)) headers.set(k, v);
        headers.set("x-request-id", requestId);
        return new Response(response.body, { status: response.status, headers });
      });
    } catch (error) {
      const status = error.status || 500;
      if (status >= 500) console.error("API request failed", requestId, error.message);
      return responseError(status, error.code || "INTERNAL_ERROR", status >= 500 && status !== 503 ? "The request could not be completed." : error.message, requestId, cors);
    }
  }
};
