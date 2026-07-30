import type { Mission } from "./level001";

export const level049: Mission = {
  id: "intern-ticket-049",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket INT-049 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "10:40 AM. Client: Nova Retail Pvt Ltd. Priority: High.",
    "\"New skill, and it matters here — some employees don't have a review score yet at all, not a low one, just missing. If you only check 'below 70' you'll mislabel every one of them as fine. That's wrong, and it's exactly the kind of mistake that makes clients stop trusting our reports.\"",
    "\"Label everyone: 'Not Yet Reviewed' if there's no score, 'Needs Improvement' if it's below 70, otherwise 'Satisfactory'. Handle the missing case first, or it'll quietly hide inside your other conditions.\"",
  ],
  objective:
    "For every employee, label their review status: 'Not Yet Reviewed' if the score is missing, 'Needs Improvement' if below 70, otherwise 'Satisfactory'.",
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
  expectedColumns: ["name", "review_status"],
  expectedRows: [
    ["Aisha Fernandes", "Satisfactory"],
    ["Rohit Iyer", "Needs Improvement"],
    ["Zara Sheikh", "Not Yet Reviewed"],
    ["Devansh Oak", "Satisfactory"],
    ["Kiara Menezes", "Needs Improvement"],
    ["Yusuf Ansari", "Not Yet Reviewed"],
    ["Prisha Kulkarni", "Satisfactory"],
    ["Aryan Bhosale", "Satisfactory"],
    ["Naomi D'Souza", "Not Yet Reviewed"],
    ["Kabir Chandra", "Needs Improvement"],
    ["Meher Kapadia", "Satisfactory"],
    ["Ishaan Ghosh", "Satisfactory"],
  ],
  requireRowOrder: false,
  hints: [
    "CASE can have more than two outcomes — just add another WHEN before ELSE.",
    "Check for the missing score first: a NULL score compared with < 70 doesn't behave the way you'd expect, so handle IS NULL as its own branch up front.",
    "Try: SELECT name, CASE WHEN last_review_score IS NULL THEN 'Not Yet Reviewed' WHEN last_review_score < 70 THEN 'Needs Improvement' ELSE 'Satisfactory' END AS review_status FROM employees;",
  ],
  xpAward: 100,
};
