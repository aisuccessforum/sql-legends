import type { Mission } from "./level001";

export const level050: Mission = {
  id: "intern-ticket-050",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket INT-050 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "11:15 AM. Client: Nova Retail Pvt Ltd. Priority: Medium.",
    "\"Nova's HR team wants a tenure breakdown for their retention dashboard — 'New Hire' for anyone under a year, 'Established' for one to three years, 'Veteran' for anything beyond that.\"",
  ],
  objective:
    "For every employee, label their tenure tier: 'New Hire' if under 1 year, 'Established' if 1 to 3 years, otherwise 'Veteran'.",
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
  expectedColumns: ["name", "tenure_tier"],
  expectedRows: [
    ["Aisha Fernandes", "Veteran"],
    ["Rohit Iyer", "Established"],
    ["Zara Sheikh", "New Hire"],
    ["Devansh Oak", "Established"],
    ["Kiara Menezes", "Established"],
    ["Yusuf Ansari", "New Hire"],
    ["Prisha Kulkarni", "Established"],
    ["Aryan Bhosale", "Veteran"],
    ["Naomi D'Souza", "New Hire"],
    ["Kabir Chandra", "Established"],
    ["Meher Kapadia", "Established"],
    ["Ishaan Ghosh", "Veteran"],
  ],
  requireRowOrder: false,
  hints: [
    "Three tiers means two WHEN conditions, checked in order, plus a final ELSE.",
    "Order matters — check the smallest range first, then the next, letting ELSE catch everything above that.",
    "Try: SELECT name, CASE WHEN years_with_nova < 1 THEN 'New Hire' WHEN years_with_nova <= 3 THEN 'Established' ELSE 'Veteran' END AS tenure_tier FROM employees;",
  ],
  xpAward: 100,
};
