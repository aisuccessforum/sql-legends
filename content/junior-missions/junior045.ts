import type { Mission } from "../missions/level001";

export const junior045: Mission = {
  id: "junior-ticket-045",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket JDA-045 // Final Assessment 1 of 6",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "09:00 AM. Client: Nova Retail Pvt Ltd. Priority: Critical.",
    "Six tickets left. No hints naming a technique from here — you've learned everything you need across five modules. This is where it all gets used together, on your own judgment.",
    "\"Nova wants their top performer recognized at each store — highest review score, active employees only, and don't let missing data sneak in a false winner.\"",
  ],
  objective:
    "For active employees with a store assigned and a review score on record, select the top-scoring employee at each store.",
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
  expectedColumns: ["name", "store_location", "last_review_score"],
  expectedRows: [
    ["Prisha Kulkarni", "Andheri West", 91],
    ["Aryan Bhosale", "Bandra", 84],
  ],
  requireRowOrder: false,
  hints: [
    "Filter down to the clean, in-scope rows first — active, a real store, a real score. That eliminates the ambiguous cases up front.",
    "Then it's the same top-per-group shape you've built several times now, just on cleaner data.",
    "Try: WITH ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY store_location ORDER BY last_review_score DESC) AS rn FROM employees WHERE status = 'active' AND store_location IS NOT NULL AND last_review_score IS NOT NULL) SELECT name, store_location, last_review_score FROM ranked WHERE rn = 1;",
  ],
  xpAward: 250,
};
