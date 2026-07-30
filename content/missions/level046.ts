import type { Mission } from "./level001";

export const level046: Mission = {
  id: "intern-ticket-046",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket INT-046 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "08:45 AM. Client: Nova Retail Pvt Ltd. Priority: High.",
    "\"Good morning. Nova Retail just signed with us, and their first file landed overnight — their store employee database.\"",
    "\"Before our AI pipeline touches a single row of this, someone has to look at it by hand. Never trust incoming client data. Verify it yourself.\"",
    "\"Start simple. Show me every active employee they've got. It's the same skill you've had since day one — just a new client, and this data isn't as clean as ours.\"",
  ],
  objective: "Select the name of every employee whose status is 'active'.",
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
    ["Rohit Iyer"],
    ["Zara Sheikh"],
    ["Devansh Oak"],
    ["Yusuf Ansari"],
    ["Prisha Kulkarni"],
    ["Aryan Bhosale"],
    ["Kabir Chandra"],
    ["Meher Kapadia"],
  ],
  requireRowOrder: false,
  hints: [
    "This is a query you've written many times already — don't overthink the new client.",
    "One column, one condition: name where status equals active.",
    "Try: SELECT name FROM employees WHERE status = 'active';",
  ],
  xpAward: 100,
};
