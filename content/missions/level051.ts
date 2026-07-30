import type { Mission } from "./level001";

export const level051: Mission = {
  id: "intern-ticket-051",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket INT-051 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "12:05 PM. Client: Nova Retail Pvt Ltd. Priority: Medium.",
    "\"Only care about people actually working right now. For active employees, tag Managers and Supervisors as 'Leadership', everyone else 'Staff'.\"",
  ],
  objective:
    "For active employees only, label their role tier: 'Leadership' if their position is Manager or Supervisor, otherwise 'Staff'.",
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
  expectedColumns: ["name", "role_tier"],
  expectedRows: [
    ["Aisha Fernandes", "Leadership"],
    ["Rohit Iyer", "Staff"],
    ["Zara Sheikh", "Staff"],
    ["Devansh Oak", "Leadership"],
    ["Yusuf Ansari", "Staff"],
    ["Prisha Kulkarni", "Staff"],
    ["Aryan Bhosale", "Leadership"],
    ["Kabir Chandra", "Staff"],
    ["Meher Kapadia", "Staff"],
  ],
  requireRowOrder: false,
  hints: [
    "WHERE filters which rows you're working with; CASE decides what each surviving row gets labeled.",
    "Use IN to check position against two values in the WHEN condition, same as you've done before.",
    "Try: SELECT name, CASE WHEN position IN ('Manager', 'Supervisor') THEN 'Leadership' ELSE 'Staff' END AS role_tier FROM employees WHERE status = 'active';",
  ],
  xpAward: 100,
};
