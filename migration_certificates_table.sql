-- Supports multiple certificates per player over their career (one per
-- rank achieved), instead of the single certificate_number column on
-- players which could only ever hold one.

CREATE TABLE IF NOT EXISTS certificates (
  certificate_number TEXT PRIMARY KEY,
  player_id TEXT NOT NULL,
  rank_name TEXT NOT NULL,
  issued_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_certificates_player_id
  ON certificates(player_id);

-- Prevents the same player from ever getting two certificates for the
-- same rank, even if the promotion check somehow ran twice.
CREATE UNIQUE INDEX IF NOT EXISTS idx_certificates_player_rank
  ON certificates(player_id, rank_name);
