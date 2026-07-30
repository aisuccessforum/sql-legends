import type { Mission } from "./level001";

export const level076: Mission = {
  id: "intern-ticket-076",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket INT-076 // Final Assessment 1 of 5",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "08:30 AM. Final Internship Assessment. Priority: Critical.",
    "Eight weeks in, and this is it — a week's worth of real client tickets, back to back, across everyone we've worked with. No hints about which technique to reach for. That part of the job is over.",
    "\"First up: Nova Retail. HR wants a live headcount of active employees per store — and don't drop anyone who hasn't been assigned a store yet. Group those under 'Unassigned' instead of leaving them out.\"",
  ],
  objective:
    "For active employees, select their store (showing 'Unassigned' where missing) along with a headcount per store.",
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
  hints: [
    "You're grouping by a value that needs a fallback for missing data — think about what handles that before the grouping happens.",
    "The status filter, the fallback, and the grouping all need to work together, not in isolation.",
    "Try: SELECT COALESCE(store_location, 'Unassigned') AS store, COUNT(*) AS active_headcount FROM employees WHERE status = 'active' GROUP BY COALESCE(store_location, 'Unassigned');",
  ],
  expectedColumns: ["store", "active_headcount"],
  expectedRows: [
    ["Andheri West", 3],
    ["Bandra", 3],
    ["Unassigned", 3],
  ],
  requireRowOrder: false,
  xpAward: 250,
};
