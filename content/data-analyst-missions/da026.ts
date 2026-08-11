import type { Mission } from "../missions/level001";

export const da026: Mission = {
  id: "da-ticket-026",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-026 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "09:35 AM. Internal system. Priority: Medium.",
    "\"Just the top quartile this time — the reps eligible for the leadership recognition program.\"",
  ],
  objective:
    "Using a CTE with quartiles assigned, select the name and sales of every rep in the top quartile.",
  schemaLabel: "sales_reps",
  seedSql: `
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
    { table: "sales_reps", columns: ["id", "name", "region", "quarter_sales"] },
  ],
  expectedColumns: ["name", "quarter_sales"],
  expectedRows: [
    ["Rohan Verma", 610000],
    ["Vikram Chopra", 610000],
    ["Karan Bhatt", 520000],
  ],
  requireRowOrder: false,
  hints: [
    "Same rule as every window function so far — you can't filter on NTILE's result directly in WHERE, it has to go through a CTE first.",
    "quartile = 1 is the filter, once the CTE has computed it.",
    "Try: WITH ranked AS (SELECT *, NTILE(4) OVER (ORDER BY quarter_sales DESC) AS quartile FROM sales_reps) SELECT name, quarter_sales FROM ranked WHERE quartile = 1;",
  ],
  xpAward: 200,
};
