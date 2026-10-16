PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS business_records (
  tenant_id TEXT NOT NULL,
  resource TEXT NOT NULL,
  id TEXT NOT NULL,
  payload TEXT NOT NULL CHECK (json_valid(payload)),
  created_by TEXT NOT NULL,
  updated_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  archived_at TEXT,
  PRIMARY KEY (tenant_id, resource, id)
);

CREATE INDEX IF NOT EXISTS idx_business_records_tenant_resource_updated
  ON business_records (tenant_id, resource, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_business_records_tenant_resource_archived
  ON business_records (tenant_id, resource, archived_at);

CREATE TABLE IF NOT EXISTS business_audit_events (
  event_id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  resource TEXT NOT NULL,
  record_id TEXT,
  action TEXT NOT NULL,
  occurred_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  request_id TEXT,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_business_audit_tenant_time
  ON business_audit_events (tenant_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_business_audit_record
  ON business_audit_events (tenant_id, resource, record_id, occurred_at DESC);

-- All business objects are tenant-scoped. The resource allowlist is enforced
-- by the Worker API. Payloads are JSON so modules can evolve without schema
-- churn; high-value domains can later graduate to normalized tables.
