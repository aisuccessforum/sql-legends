import type { Mission } from "./level001";

export const level055: Mission = {
  id: "intern-ticket-055",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket INT-055 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "03:10 PM. Client: Nova Retail Pvt Ltd. Priority: High.",
    "\"Last one on this file. Break it down by position — for each role, how many people are missing a review score? I want to know if this is a company-wide gap or specific to one role.\"",
    "\"Conditional counting, grouped. You've done every piece of this separately — put it together and this file is done.\"",
  ],
  objective:
    "For each position, count how many employees are missing a review score, labeled missing_scores.",
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
  expectedColumns: ["position", "missing_scores"],
  expectedRows: [
    ["Cashier", 1],
    ["Manager", 0],
    ["Stock Associate", 1],
    ["Supervisor", 1],
  ],
  requireRowOrder: false,
  hints: [
    "This is conditional counting again, but now split by group instead of one total.",
    "GROUP BY position, then use the same SUM(CASE WHEN ... IS NULL THEN 1 ELSE 0 END) pattern inside each group.",
    "Try: SELECT position, SUM(CASE WHEN last_review_score IS NULL THEN 1 ELSE 0 END) AS missing_scores FROM employees GROUP BY position;",
  ],
  xpAward: 100,
};
