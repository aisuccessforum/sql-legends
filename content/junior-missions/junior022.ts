import type { Mission } from "../missions/level001";

export const junior022: Mission = {
  id: "junior-ticket-022",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-022 // Priority: High",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "12:00 PM. Internal system. Priority: High.",
    "\"Here's the part that trips almost everyone up the first time. Give me just the single top performer in each region — one row per region, nothing else.\"",
    "\"Your instinct is going to be to slap a WHERE on region_row_num = 1 directly onto last ticket's query. It won't run — WHERE gets evaluated before window functions are calculated, so it has no idea region_row_num even exists yet. You have to compute it in a CTE first, then filter the CTE.\"",
  ],
  objective:
    "Using a CTE with a row number partitioned by region, select the single top-selling rep in each region.",
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
  expectedColumns: ["name", "region", "quarter_sales"],
  expectedRows: [
    ["Karan Bhatt", "East", 520000],
    ["Rohan Verma", "North", 610000],
    ["Vikram Chopra", "South", 610000],
    ["Aditi Rao", "West", 480000],
  ],
  requireRowOrder: false,
  hints: [
    "Build the CTE first with SELECT *, ROW_NUMBER() OVER (PARTITION BY region ORDER BY quarter_sales DESC) AS rn — grab every column plus the new one.",
    "Then the outer query is just SELECT ... FROM your_cte WHERE rn = 1, filtering on a column that now genuinely exists.",
    "Try: WITH ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY region ORDER BY quarter_sales DESC) AS rn FROM sales_reps) SELECT name, region, quarter_sales FROM ranked WHERE rn = 1;",
  ],
  xpAward: 200,
};
