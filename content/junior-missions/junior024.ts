import type { Mission } from "../missions/level001";

export const junior024: Mission = {
  id: "junior-ticket-024",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-024 // Priority: High",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "01:30 PM. Internal system. Priority: High.",
    "\"Company-wide this time, not per region. Give me everyone ranked in the top 3 — and if a tie means 4 people share those 3 spots, I want all 4, not an arbitrarily chosen 3.\"",
    "\"That's exactly why RANK belongs here instead of ROW_NUMBER — a plain LIMIT 3 would silently cut someone who deserved to be there.\"",
  ],
  objective:
    "Using a CTE with a company-wide rank, select every rep ranked in the top 3 (including ties), with their sales and rank.",
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
  expectedColumns: ["name", "quarter_sales", "rnk"],
  expectedRows: [
    ["Rohan Verma", 610000, 1],
    ["Vikram Chopra", 610000, 1],
    ["Karan Bhatt", 520000, 3],
    ["Kabir Singh", 520000, 3],
  ],
  requireRowOrder: false,
  hints: [
    "No PARTITION BY needed here — one ranking across the whole table, not split by region.",
    "Build the CTE with RANK() OVER (ORDER BY quarter_sales DESC), then filter the outer query to rnk <= 3.",
    "Try: WITH ranked AS (SELECT *, RANK() OVER (ORDER BY quarter_sales DESC) AS rnk FROM sales_reps) SELECT name, quarter_sales, rnk FROM ranked WHERE rnk <= 3;",
  ],
  xpAward: 175,
};
