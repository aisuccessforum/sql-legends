import type { Mission } from "../missions/level001";

export const junior025: Mission = {
  id: "junior-ticket-025",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-025 // Priority: Critical",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "02:15 PM. Internal system. Priority: Critical.",
    "\"Go back to the regional-winner ticket from earlier — the one where you used ROW_NUMBER. It only surfaced Aditi Rao for West. But Meera Iyer had the exact same sales number. She earned that recognition too, and ROW_NUMBER quietly dropped her.\"",
    "\"Rebuild it properly this time — every rep tied for #1 in their region, using RANK instead. Don't let a real tie get silently discarded again.\"",
  ],
  objective:
    "Using a CTE with RANK partitioned by region, select every rep who is rank 1 in their region — including ties.",
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
    ["Vikram Chopra", "South", 610000],
    ["Aditi Rao", "West", 480000],
    ["Meera Iyer", "West", 480000],
  ],
  requireRowOrder: false,
  hints: [
    "Same PARTITION BY region shape as the ROW_NUMBER version — swap the function, not the structure.",
    "West should now correctly return two people. East, which also has a tie at the top, should too.",
    "Try: WITH ranked AS (SELECT *, RANK() OVER (PARTITION BY region ORDER BY quarter_sales DESC) AS rnk FROM sales_reps) SELECT name, region, quarter_sales FROM ranked WHERE rnk = 1;",
  ],
  xpAward: 175,
};
