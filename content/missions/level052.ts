import type { Mission } from "./level001";

export const level052: Mission = {
  id: "intern-ticket-052",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket INT-052 // Priority: Low",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "12:50 PM. Client: Nova Retail Pvt Ltd. Priority: Low.",
    "\"Small thing, but it matters for the client-facing sheet — a blank store name looks like a spreadsheet error to them. Anywhere it's missing, show 'Unassigned' instead of nothing.\"",
    "\"There's a function that fills in a missing value with a default, right inside the SELECT — no CASE statement needed for something this simple.\"",
  ],
  objective:
    "Select every employee's name and store, showing 'Unassigned' wherever the store is missing.",
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
  expectedColumns: ["name", "store"],
  expectedRows: [
    ["Aisha Fernandes", "Andheri West"],
    ["Rohit Iyer", "Andheri West"],
    ["Zara Sheikh", "Unassigned"],
    ["Devansh Oak", "Bandra"],
    ["Kiara Menezes", "Bandra"],
    ["Yusuf Ansari", "Unassigned"],
    ["Prisha Kulkarni", "Andheri West"],
    ["Aryan Bhosale", "Bandra"],
    ["Naomi D'Souza", "Andheri West"],
    ["Kabir Chandra", "Bandra"],
    ["Meher Kapadia", "Unassigned"],
    ["Ishaan Ghosh", "Andheri West"],
  ],
  requireRowOrder: false,
  hints: [
    "You could write this with CASE, but there's a shorter tool built exactly for filling in missing values.",
    "COALESCE takes a column and a fallback value — it returns the column's value if it exists, otherwise the fallback.",
    "Try: SELECT name, COALESCE(store_location, 'Unassigned') AS store FROM employees;",
  ],
  xpAward: 100,
};
