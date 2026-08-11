import type { Mission } from "../missions/level001";

export const da002: Mission = {
  id: "da-ticket-002",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-002 // Priority: High",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "09:40 AM. Internal system. Priority: High.",
    "\"Flip it around. Everyone under Ananya Iyer, at any level — not just her direct reports, everyone underneath them too. The whole org rolls up to her eventually.\"",
  ],
  objective:
    "Using a recursive CTE, select the name of every employee under Ananya Iyer at any level, not including Ananya herself.",
  schemaLabel: "employees_org",
  seedSql: `
    CREATE TABLE employees_org (
      id INTEGER PRIMARY KEY,
      name TEXT,
      manager_id INTEGER,
      tenure_months INTEGER
    );
    INSERT INTO employees_org (id, name, manager_id, tenure_months) VALUES
      (1, 'Ananya Iyer', NULL, 60),
      (2, 'Priya Nair', 1, 14),
      (3, 'Marcus Webb', 1, 8),
      (4, 'Sofia Reyes', 2, 10),
      (5, 'Arjun Kapoor', 2, 5),
      (6, 'Rohan Verma', 3, 12),
      (7, 'Meera Shah', 3, 6),
      (8, 'Kabir Oza', 4, 3),
      (9, 'Divya Rao', 6, 2);
  `,
  schemaPreview: [
    { table: "employees_org", columns: ["id", "name", "manager_id", "tenure_months"] },
  ],
  expectedColumns: ["name"],
  expectedRows: [
    ["Priya Nair"],
    ["Marcus Webb"],
    ["Sofia Reyes"],
    ["Arjun Kapoor"],
    ["Rohan Verma"],
    ["Meera Shah"],
    ["Kabir Oza"],
    ["Divya Rao"],
  ],
  requireRowOrder: false,
  hints: [
    "Same shape as last ticket, but the join direction flips — match each row's manager_id to the previous row's id, not the other way around.",
    "The anchor is Ananya's own row; exclude her by name in the final SELECT, not inside the recursive part.",
    "Try: WITH RECURSIVE reports AS (SELECT id, name, manager_id FROM employees_org WHERE name = 'Ananya Iyer' UNION ALL SELECT e.id, e.name, e.manager_id FROM employees_org e JOIN reports r ON e.manager_id = r.id) SELECT name FROM reports WHERE name != 'Ananya Iyer';",
  ],
  xpAward: 225,
};
