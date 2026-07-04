export interface Mission {
  id: string;
  world: string;
  levelLabel: string;
  npc: string;
  briefing: string[];
  objective: string;
  schemaLabel: string;
  seedSql: string;
  schemaPreview: { table: string; columns: string[] }[];
  expectedColumns: string[];
  expectedRows: unknown[][];
  requireRowOrder: boolean;
  hints: string[];
  xpAward: number;
}

export const level001: Mission = {
  id: "intern-world01-level001",
  world: "Data Academy",
  levelLabel: "Orientation // Level 1",
  npc: "DIRECTOR MALHOTRA",
  briefing: [
    "Your boarding pass gets you as far as the lobby. No further.",
    "A woman in a grey blazer is waiting by the turnstile. She doesn't introduce herself — the badge on her desk later will: DIRECTOR MALHOTRA, GLOBAL DATA ACADEMY.",
    "\"Every intern class loses people in the first hour,\" she says, \"not because the work is hard. Because they're afraid to just look at the data.\"",
    "She taps the terminal. A single table appears: INTERNS.",
    "\"Before you touch anything else in this building, you need to know who's actually here. Pull every intern whose status is active. Nothing else. That's the whole job.\"",
  ],
  objective: "Select the name of every intern whose status is 'active'.",
  schemaLabel: "interns",
  seedSql: `
    CREATE TABLE interns (
      id INTEGER PRIMARY KEY,
      name TEXT,
      division TEXT,
      status TEXT
    );
    INSERT INTO interns (id, name, division, status) VALUES
      (1, 'Priya Nair', 'Retail Kingdom', 'active'),
      (2, 'Marcus Webb', 'Banking District', 'on_leave'),
      (3, 'Sofia Reyes', 'Hospital Network', 'active'),
      (4, 'Arjun Kapoor', 'Airport Operations', 'terminated'),
      (5, 'Ananya Iyer', 'Cyber Security Center', 'active');
  `,
  schemaPreview: [
    { table: "interns", columns: ["id", "name", "division", "status"] },
  ],
  expectedColumns: ["name"],
  expectedRows: [["Priya Nair"], ["Sofia Reyes"], ["Ananya Iyer"]],
  requireRowOrder: false,
  hints: [
    "You only need one column back: name.",
    "Filter rows with WHERE — you're looking for status = 'active'.",
    "Try: SELECT name FROM interns WHERE status = 'active';",
  ],
  xpAward: 50,
};