import type { Mission } from "../missions/level001";

export const da005: Mission = {
  id: "da-ticket-005",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-005 // Priority: Low",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "12:00 PM. Internal system. Priority: Low.",
    "\"Quick one. Who does Kabir Oza ultimately answer to, at the very top of the chain — not his direct manager, the person with no manager above them at all?\"",
  ],
  objective:
    "Using a recursive CTE, find the name of the top-level manager (no manager above them) that Kabir Oza's chain of command eventually leads to.",
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
  expectedRows: [["Ananya Iyer"]],
  requireRowOrder: false,
  hints: [
    "This is Ticket DA-001's exact chain-up query, with one more filter on the final result.",
    "The top of the chain is whichever row has no manager_id at all.",
    "Try: WITH RECURSIVE chain AS (SELECT id, name, manager_id FROM employees_org WHERE name = 'Kabir Oza' UNION ALL SELECT e.id, e.name, e.manager_id FROM employees_org e JOIN chain c ON e.id = c.manager_id) SELECT name FROM chain WHERE manager_id IS NULL;",
  ],
  xpAward: 200,
};
