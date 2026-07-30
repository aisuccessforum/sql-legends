import type { Mission } from "./level001";

export const level048: Mission = {
  id: "intern-ticket-048",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket INT-048 // Priority: Low",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "09:55 AM. Client: Nova Retail Pvt Ltd. Priority: Low.",
    "\"Flip that list — I want to see who we CAN already reach, so we know the comms rollout isn't starting from zero.\"",
  ],
  objective: "Select the name of every employee who has an email address on file.",
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
  expectedColumns: ["name"],
  expectedRows: [
    ["Aisha Fernandes"],
    ["Zara Sheikh"],
    ["Devansh Oak"],
    ["Kiara Menezes"],
    ["Prisha Kulkarni"],
    ["Aryan Bhosale"],
    ["Naomi D'Souza"],
    ["Meher Kapadia"],
    ["Ishaan Ghosh"],
  ],
  requireRowOrder: false,
  hints: [
    "Same check as last time, opposite direction.",
    "IS NOT NULL is the reverse of IS NULL — same keywords, one extra word.",
    "Try: SELECT name FROM employees WHERE email IS NOT NULL;",
  ],
  xpAward: 100,
};
