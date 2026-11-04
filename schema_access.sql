-- Run once:  npx wrangler d1 execute sql-legends-db --remote --file=schema_access.sql
CREATE TABLE IF NOT EXISTS access_codes (
  code        TEXT PRIMARY KEY,
  owner       TEXT NOT NULL,                 -- you or a referral partner
  max_uses    INTEGER NOT NULL DEFAULT 1,
  uses        INTEGER NOT NULL DEFAULT 0,
  expires_at  TEXT,                          -- NULL = never expires
  active      INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS enrollments (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     TEXT NOT NULL UNIQUE,
  email       TEXT,
  source      TEXT NOT NULL,                 -- 'code' | 'payment'
  code        TEXT,
  payment_id  TEXT,
  amount_inr  INTEGER,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_enroll_code ON enrollments(code);
