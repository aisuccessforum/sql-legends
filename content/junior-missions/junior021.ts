import type { Mission } from "../missions/level001";

export const junior021: Mission = {
  id: "junior-ticket-021",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-021 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "11:15 AM. Internal system. Priority: Medium.",
    "\"Same regional breakdown, but with fair tie handling this time — West has two reps tied for the top spot, and ROW_NUMBER would arbitrarily pick one of them as '#1'. That's not accurate.\"",
  ],
  objective:
    "Select every rep's name, region, and quarterly sales, along with their rank within their own region (ties sharing a rank).",
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
  expectedColumns: ["name", "region", "quarter_sales", "region_rank"],
  expectedRows: [
    ["Karan Bhatt", "East", 520000, 1],
    ["Kabir Singh", "East", 520000, 1],
    ["Sana Malhotra", "East", 390000, 3],
    ["Rohan Verma", "North", 610000, 1],
    ["Arjun Nair", "North", 275000, 2],
    ["Vikram Chopra", "South", 610000, 1],
    ["Divya Shah", "South", 445000, 2],
    ["Aditi Rao", "West", 480000, 1],
    ["Meera Iyer", "West", 480000, 1],
    ["Neha Kulkarni", "West", 350000, 3],
  ],
  requireRowOrder: false,
  hints: [
    "Same PARTITION BY setup as last time, just swap ROW_NUMBER for RANK.",
    "Watch West specifically — both tied reps should now correctly show rank 1.",
    "Try: SELECT name, region, quarter_sales, RANK() OVER (PARTITION BY region ORDER BY quarter_sales DESC) AS region_rank FROM sales_reps;",
  ],
  xpAward: 175,
};
