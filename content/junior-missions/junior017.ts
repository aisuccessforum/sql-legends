import type { Mission } from "../missions/level001";

export const junior017: Mission = {
  id: "junior-ticket-017",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-017 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "09:00 AM. Internal system. Priority: Medium.",
    "New module — window functions. Sales ops needs the quarterly leaderboard, numbered.",
    "\"A window function doesn't collapse rows the way GROUP BY does — every rep still gets their own row, but now each row also knows its position relative to the others. Number every rep 1 through 10, highest sales first.\"",
  ],
  objective:
    "Select every rep's name and quarterly sales, along with a sequential row number ordered by sales from highest to lowest.",
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
  expectedColumns: ["name", "quarter_sales", "row_num"],
  expectedRows: [
    ["Rohan Verma", 610000, 1],
    ["Vikram Chopra", 610000, 2],
    ["Karan Bhatt", 520000, 3],
    ["Kabir Singh", 520000, 4],
    ["Aditi Rao", 480000, 5],
    ["Meera Iyer", 480000, 6],
    ["Divya Shah", 445000, 7],
    ["Sana Malhotra", 390000, 8],
    ["Neha Kulkarni", 350000, 9],
    ["Arjun Nair", 275000, 10],
  ],
  requireRowOrder: true,
  hints: [
    "ROW_NUMBER() is a function, but it needs an OVER clause telling it how to order the rows before numbering them.",
    "The ordering inside OVER doesn't have to match any ORDER BY on the outer query — but adding one too keeps the output readable.",
    "Try: SELECT name, quarter_sales, ROW_NUMBER() OVER (ORDER BY quarter_sales DESC) AS row_num FROM sales_reps ORDER BY row_num;",
  ],
  xpAward: 175,
};
