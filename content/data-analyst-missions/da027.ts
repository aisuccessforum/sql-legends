import type { Mission } from "../missions/level001";

export const da027: Mission = {
  id: "da-ticket-027",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-027 // Priority: High",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "10:10 AM. Internal system. Priority: High.",
    "\"For every rep, show who the top seller in their region is, right alongside their own numbers — a benchmark on every single row.\"",
    "\"FIRST_VALUE grabs a value from the first row of the window, based on however you ordered it, and repeats it on every row in that partition.\"",
  ],
  objective:
    "Select every rep's name, region, and sales, along with the name of the top seller in their own region.",
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
  expectedColumns: ["name", "region", "quarter_sales", "region_top_seller"],
  expectedRows: [
    ["Karan Bhatt", "East", 520000, "Karan Bhatt"],
    ["Kabir Singh", "East", 520000, "Karan Bhatt"],
    ["Sana Malhotra", "East", 390000, "Karan Bhatt"],
    ["Rohan Verma", "North", 610000, "Rohan Verma"],
    ["Arjun Nair", "North", 275000, "Rohan Verma"],
    ["Vikram Chopra", "South", 610000, "Vikram Chopra"],
    ["Divya Shah", "South", 445000, "Vikram Chopra"],
    ["Aditi Rao", "West", 480000, "Aditi Rao"],
    ["Meera Iyer", "West", 480000, "Aditi Rao"],
    ["Neha Kulkarni", "West", 350000, "Aditi Rao"],
  ],
  requireRowOrder: false,
  hints: [
    "PARTITION BY region keeps each region's window separate, exactly like it has for every other partitioned window function.",
    "ORDER BY quarter_sales DESC inside the OVER clause means the \"first\" row in each partition is the top seller.",
    "Try: SELECT name, region, quarter_sales, FIRST_VALUE(name) OVER (PARTITION BY region ORDER BY quarter_sales DESC) AS region_top_seller FROM sales_reps;",
  ],
  xpAward: 225,
};
