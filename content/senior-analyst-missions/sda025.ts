import type { Mission } from "../missions/level001";

export const sda025: Mission = {
  id: "sda-ticket-025",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-025 // Priority: High",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "09:00 AM. Internal system. Priority: High.",
    "\"New module — ratios and shares, the language executives actually think in. Nobody asks 'what did Rohan sell', they ask 'what share of the company is Rohan'.\"",
    "\"A window with an empty OVER () spans the entire result — SUM(quarter_sales) OVER () puts the company grand total on every row, so each row can divide itself by it.\"",
  ],
  objective:
    "Select every rep's name, sales, and their percentage of total company sales (rounded to 1 decimal), sorted by sales descending then name.",
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
  expectedColumns: ["name", "quarter_sales", "pct_of_total"],
  expectedRows: [
    ["Rohan Verma", 610000, 13],
    ["Vikram Chopra", 610000, 13],
    ["Kabir Singh", 520000, 11.1],
    ["Karan Bhatt", 520000, 11.1],
    ["Aditi Rao", 480000, 10.3],
    ["Meera Iyer", 480000, 10.3],
    ["Divya Shah", 445000, 9.5],
    ["Sana Malhotra", 390000, 8.3],
    ["Neha Kulkarni", 350000, 7.5],
    ["Arjun Nair", 275000, 5.9],
  ],
  requireRowOrder: true,
  hints: [
    "OVER () with nothing inside means one window covering every row — no partition, no ordering, just the grand total repeated everywhere.",
    "100.0 with the decimal point keeps the division real instead of integer-floored, same as the pivot module.",
    "Try: SELECT name, quarter_sales, ROUND(100.0 * quarter_sales / SUM(quarter_sales) OVER (), 1) AS pct_of_total FROM sales_reps ORDER BY quarter_sales DESC, name;",
  ],
  xpAward: 250,
};
