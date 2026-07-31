import type { Mission } from "../missions/level001";

export const junior023: Mission = {
  id: "junior-ticket-023",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-023 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "12:40 PM. Internal system. Priority: Medium.",
    "\"Same pattern, one number different — top 2 reps per region this time, not just the top 1.\"",
  ],
  objective:
    "Using a CTE with a row number partitioned by region, select the top 2 selling reps in each region.",
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
    ["Kabir Singh", "East", 520000],
    ["Rohan Verma", "North", 610000],
    ["Arjun Nair", "North", 275000],
    ["Vikram Chopra", "South", 610000],
    ["Divya Shah", "South", 445000],
    ["Aditi Rao", "West", 480000],
    ["Meera Iyer", "West", 480000],
  ],
  requireRowOrder: false,
  hints: [
    "Identical CTE to last ticket — only the filter number on the outer WHERE changes.",
    "rn <= 2 instead of rn = 1.",
    "Try: WITH ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY region ORDER BY quarter_sales DESC) AS rn FROM sales_reps) SELECT name, region, quarter_sales FROM ranked WHERE rn <= 2;",
  ],
  xpAward: 175,
};
