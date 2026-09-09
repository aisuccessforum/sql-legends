import type { Mission } from "../missions/level001";

export const sda027: Mission = {
  id: "sda-ticket-027",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-027 // Priority: Medium",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "10:30 AM. Internal system. Priority: Medium.",
    "\"Zoom in — each rep's share of their own region, not the company. Same division, but the total in the denominator has to be the region's total, which means the window needs a partition.\"",
  ],
  objective:
    "Select every rep's name, region, and their percentage of their region's sales (rounded to 1 decimal), sorted by region, then percentage descending, then name.",
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
  expectedColumns: ["name", "region", "pct_of_region"],
  expectedRows: [
    ["Kabir Singh", "East", 36.4],
    ["Karan Bhatt", "East", 36.4],
    ["Sana Malhotra", "East", 27.3],
    ["Rohan Verma", "North", 68.9],
    ["Arjun Nair", "North", 31.1],
    ["Vikram Chopra", "South", 57.8],
    ["Divya Shah", "South", 42.2],
    ["Aditi Rao", "West", 36.6],
    ["Meera Iyer", "West", 36.6],
    ["Neha Kulkarni", "West", 26.7],
  ],
  requireRowOrder: true,
  hints: [
    "Swap the empty OVER () for OVER (PARTITION BY region) — now the sum resets per region instead of spanning the company.",
    "Each region's shares should add up to roughly 100 — a quick sanity check on your own output.",
    "Try: SELECT name, region, ROUND(100.0 * quarter_sales / SUM(quarter_sales) OVER (PARTITION BY region), 1) AS pct_of_region FROM sales_reps ORDER BY region, pct_of_region DESC, name;",
  ],
  xpAward: 250,
};
