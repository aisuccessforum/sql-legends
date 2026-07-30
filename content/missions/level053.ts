import type { Mission } from "./level001";

export const level053: Mission = {
  id: "intern-ticket-053",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket INT-053 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "01:40 PM. Client: Nova Retail Pvt Ltd. Priority: High.",
    "\"I want one row for the summary email — how many are missing an email, and how many have one, side by side. Not two separate queries, one.\"",
    "\"You can put a CASE statement inside SUM. Each row scores 1 or 0 depending on the condition, and SUM adds those up — it's a way of counting under a condition.\"",
  ],
  objective:
    "In one query, count how many employees are missing an email and how many have one, labeled missing_email and has_email.",
  schemaLabel: "employees",
  seedSql: `
    CREATE TABLE employees (
      id INTEGER PRIMARY KEY,
      name TEXT,
      store_location TEXT,
      position TEXT,
      status TEXT,
      email TEXT,
      last_review_score INTEGER,
      years_with_nova INTEGER
    );
    INSERT INTO employees (id, name, store_location, position, status, email, last_review_score, years_with_nova) VALUES
      (1, 'Aisha Fernandes', 'Andheri West', 'Manager', 'active', 'aisha.f@novaretail.in', 88, 4),
      (2, 'Rohit Iyer', 'Andheri West', 'Cashier', 'active', NULL, 62, 1),
      (3, 'Zara Sheikh', NULL, 'Stock Associate', 'active', 'zara.s@novaretail.in', NULL, 0),
      (4, 'Devansh Oak', 'Bandra', 'Supervisor', 'active', 'devansh.o@novaretail.in', 75, 2),
      (5, 'Kiara Menezes', 'Bandra', 'Cashier', 'inactive', 'kiara.m@novaretail.in', 55, 1),
      (6, 'Yusuf Ansari', NULL, 'Cashier', 'active', NULL, NULL, 0),
      (7, 'Prisha Kulkarni', 'Andheri West', 'Stock Associate', 'active', 'prisha.k@novaretail.in', 91, 3),
      (8, 'Aryan Bhosale', 'Bandra', 'Manager', 'active', 'aryan.b@novaretail.in', 84, 5),
      (9, 'Naomi D''Souza', 'Andheri West', 'Supervisor', 'pending_verification', 'naomi.d@novaretail.in', NULL, 0),
      (10, 'Kabir Chandra', 'Bandra', 'Stock Associate', 'active', NULL, 68, 2),
      (11, 'Meher Kapadia', NULL, 'Cashier', 'active', 'meher.k@novaretail.in', 73, 1),
      (12, 'Ishaan Ghosh', 'Andheri West', 'Manager', 'inactive', 'ishaan.g@novaretail.in', 80, 6);
  `,
  schemaPreview: [
    {
      table: "employees",
      columns: [
        "id",
        "name",
        "store_location",
        "position",
        "status",
        "email",
        "last_review_score",
        "years_with_nova",
      ],
    },
  ],
  expectedColumns: ["missing_email", "has_email"],
  expectedRows: [[3, 9]],
  requireRowOrder: false,
  hints: [
    "Think of it as scoring each row 1 or 0 for a condition, then adding up the scores — that's what SUM(CASE WHEN ...) does.",
    "Two separate SUM(CASE ...) expressions, one for each condition, each with its own alias.",
    "Try: SELECT SUM(CASE WHEN email IS NULL THEN 1 ELSE 0 END) AS missing_email, SUM(CASE WHEN email IS NOT NULL THEN 1 ELSE 0 END) AS has_email FROM employees;",
  ],
  xpAward: 100,
};
