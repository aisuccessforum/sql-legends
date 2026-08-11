import type { Mission } from "../missions/level001";

export const da050: Mission = {
  id: "da-ticket-050",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-050 // Final Assessment 6 of 6",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "02:00 PM. Internal system. Priority: Critical.",
    "\"Final ticket of the rank. Leadership wants two facts on one summary — who sits at the very deepest level of our org chart, and who our top-selling rep is. If multiple people tie for either, every one of them appears. No one gets dropped by an arbitrary tiebreak. Ever.\"",
    "\"Recursion for one half, ranking for the other, combined into a single labeled result. Everything this rank taught you, in one query. After this, you're a Senior Data Analyst.\"",
  ],
  objective:
    "Select one combined result: every employee at the deepest org chart level (labeled 'Org - Deepest Level', value = their level) and every top-selling rep including ties (labeled 'Sales - Top Rep', value = their sales).",
  schemaLabel: "employees_org, sales_reps",
  seedSql: `
    CREATE TABLE employees_org (
      id INTEGER PRIMARY KEY,
      name TEXT,
      manager_id INTEGER,
      tenure_months INTEGER
    );
    INSERT INTO employees_org (id, name, manager_id, tenure_months) VALUES
      (1, 'Ananya Iyer', NULL, 60),
      (2, 'Priya Nair', 1, 14),
      (3, 'Marcus Webb', 1, 8),
      (4, 'Sofia Reyes', 2, 10),
      (5, 'Arjun Kapoor', 2, 5),
      (6, 'Rohan Verma', 3, 12),
      (7, 'Meera Shah', 3, 6),
      (8, 'Kabir Oza', 4, 3),
      (9, 'Divya Rao', 6, 2);
    CREATE TABLE sales_reps (
      id INTEGER PRIMARY KEY,
      name TEXT,
      region TEXT,
      quarter_sales INTEGER
    );
    INSERT INTO sales_reps (id, name, region, quarter_sales) VALUES
      (1, 'Aditi Rao', 'West', 480000),
      (2, 'Karan Bhatt', 'East', 520000),
      (3, 'Meera Iyer', 'West', 480000),
      (4, 'Rohan Verma', 'North', 610000),
      (5, 'Sana Malhotra', 'East', 390000),
      (6, 'Vikram Chopra', 'South', 610000),
      (7, 'Neha Kulkarni', 'West', 350000),
      (8, 'Arjun Nair', 'North', 275000),
      (9, 'Divya Shah', 'South', 445000),
      (10, 'Kabir Singh', 'East', 520000);
  `,
  schemaPreview: [
    { table: "employees_org", columns: ["id", "name", "manager_id", "tenure_months"] },
    { table: "sales_reps", columns: ["id", "name", "region", "quarter_sales"] },
  ],
  expectedColumns: ["name", "source", "value"],
  expectedRows: [
    ["Divya Rao", "Org - Deepest Level", 3],
    ["Kabir Oza", "Org - Deepest Level", 3],
    ["Rohan Verma", "Sales - Top Rep", 610000],
    ["Vikram Chopra", "Sales - Top Rep", 610000],
  ],
  requireRowOrder: false,
  hints: [
    "Two independent building blocks: the depth-tagged org walk you've built before, and a tie-safe ranking of reps. Neither needs to know the other exists.",
    "The deepest level isn't a hardcoded number — compare each row's level to the maximum level found in the same building block. The rep side needs the ranking function that keeps ties, filtered to rank 1.",
    "Try: WITH RECURSIVE chain AS (SELECT id, name, manager_id, 0 AS level FROM employees_org WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, e.manager_id, c.level + 1 FROM employees_org e JOIN chain c ON e.manager_id = c.id), top_rep AS (SELECT name, quarter_sales, RANK() OVER (ORDER BY quarter_sales DESC) AS rnk FROM sales_reps) SELECT name, 'Org - Deepest Level' AS source, level AS value FROM chain WHERE level = (SELECT MAX(level) FROM chain) UNION SELECT name, 'Sales - Top Rep' AS source, quarter_sales AS value FROM top_rep WHERE rnk = 1;",
  ],
  xpAward: 300,
};
