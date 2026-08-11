import type { Mission } from "../missions/level001";

export const da029: Mission = {
  id: "da-ticket-029",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-029 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "11:30 AM. Internal system. Priority: Medium.",
    "\"Percentile standing for every rep, lowest sales first — where each of them sits relative to everyone else, as a fraction between 0 and 1.\"",
    "\"PERCENT_RANK gives 0 to the very lowest row and approaches 1 for the highest, based on relative position. Round it to 2 decimal places so it's actually readable.\"",
  ],
  objective:
    "Select every rep's name, sales, and percent rank (rounded to 2 decimal places), sorted from lowest sales to highest.",
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
  expectedColumns: ["name", "quarter_sales", "pct_rank"],
  expectedRows: [
    ["Arjun Nair", 275000, 0],
    ["Neha Kulkarni", 350000, 0.11],
    ["Sana Malhotra", 390000, 0.22],
    ["Divya Shah", 445000, 0.33],
    ["Aditi Rao", 480000, 0.44],
    ["Meera Iyer", 480000, 0.44],
    ["Karan Bhatt", 520000, 0.67],
    ["Kabir Singh", 520000, 0.67],
    ["Rohan Verma", 610000, 0.89],
    ["Vikram Chopra", 610000, 0.89],
  ],
  requireRowOrder: true,
  hints: [
    "PERCENT_RANK() OVER (ORDER BY ...) — no arguments inside the parentheses, just the OVER clause deciding the ordering.",
    "Wrap the whole thing in ROUND(..., 2) to keep the output to two decimal places.",
    "Try: SELECT name, quarter_sales, ROUND(PERCENT_RANK() OVER (ORDER BY quarter_sales), 2) AS pct_rank FROM sales_reps ORDER BY quarter_sales;",
  ],
  xpAward: 225,
};
