CREATE TABLE IF NOT EXISTS players (
  id TEXT PRIMARY KEY,              -- Google's stable user id (the `sub` claim)
  email TEXT NOT NULL,
  display_name TEXT,
  birth_date TEXT,                  -- ISO date, e.g. 2000-05-14
  country TEXT,
  state TEXT,
  city TEXT,

  rank TEXT NOT NULL DEFAULT 'Intern',
  xp INTEGER NOT NULL DEFAULT 0,
  coins INTEGER NOT NULL DEFAULT 0,

  completed_missions TEXT NOT NULL DEFAULT '[]',   -- JSON array
  inventory TEXT NOT NULL DEFAULT '[]',            -- JSON array — reserved for future use
  office TEXT NOT NULL DEFAULT '{}',               -- JSON object — reserved for future use
  equipment TEXT NOT NULL DEFAULT '[]',            -- JSON array — reserved for future use
  achievements TEXT NOT NULL DEFAULT '[]',         -- JSON array — reserved for future use
  certifications TEXT NOT NULL DEFAULT '[]',       -- JSON array — reserved for future use
  statistics TEXT NOT NULL DEFAULT '{}',           -- JSON object — reserved for future use
  career_history TEXT NOT NULL DEFAULT '[]',       -- JSON array — reserved for future use

  onboarding_complete INTEGER NOT NULL DEFAULT 0,  -- 0/1 boolean
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);