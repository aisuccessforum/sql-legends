import type { Mission } from "../missions/level001";

export const junior020: Mission = {
  id: "junior-ticket-020",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-020 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "10:40 AM. Internal system. Priority: Medium.",
    "\"Regional managers don't care about the company-wide leaderboard — they want their own region's ranking, numbered starting from 1 in every region separately.\"",
    "\"PARTITION BY splits the window into separate groups before the ordering and numbering happen, one restart per group. It's the window-function version of GROUP BY, except every row still survives.\"",
  ],
  objective:
    "Select every rep's name, region, and quarterly sales, along with a row number restarting at 1 for each region, ordered by sales within each region.",
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
  expectedColumns: ["name", "region", "quarter_sales", "region_row_num"],
  expectedRows: [
    ["Karan Bhatt", "East", 520000, 1],
    ["Kabir Singh", "East", 520000, 2],
    ["Sana Malhotra", "East", 390000, 3],
    ["Rohan Verma", "North", 610000, 1],
    ["Arjun Nair", "North", 275000, 2],
    ["Vikram Chopra", "South", 610000, 1],
    ["Divya Shah", "South", 445000, 2],
    ["Aditi Rao", "West", 480000, 1],
    ["Meera Iyer", "West", 480000, 2],
    ["Neha Kulkarni", "West", 350000, 3],
  ],
  requireRowOrder: false,
  hints: [
    "Add PARTITION BY region right before ORDER BY, inside the same OVER clause.",
    "Every region now numbers independently — North's top rep is #1 in North, regardless of how they'd rank company-wide.",
    "Try: SELECT name, region, quarter_sales, ROW_NUMBER() OVER (PARTITION BY region ORDER BY quarter_sales DESC) AS region_row_num FROM sales_reps;",
  ],
  xpAward: 175,
};
