-- Run once in the D1 console (Cloudflare dashboard > D1 > sql-legends-db > Console)
CREATE TABLE IF NOT EXISTS payments (
  order_id     TEXT PRIMARY KEY,
  user_id      TEXT NOT NULL,
  email        TEXT,
  amount_inr   INTEGER NOT NULL,
  status       TEXT NOT NULL DEFAULT 'CREATED',   -- CREATED | PAID
  cf_order_id  TEXT,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  paid_at      TEXT
);
CREATE INDEX IF NOT EXISTS idx_pay_user ON payments(user_id);
