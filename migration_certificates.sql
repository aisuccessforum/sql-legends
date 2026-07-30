ALTER TABLE players ADD COLUMN certificate_number TEXT;
ALTER TABLE players ADD COLUMN certified_at INTEGER;

CREATE UNIQUE INDEX IF NOT EXISTS idx_players_certificate_number
  ON players(certificate_number);