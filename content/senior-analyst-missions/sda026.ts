import type { Mission } from "../missions/level001";

export const sda026: Mission = {
  id: "sda-ticket-026",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-026 // Priority: High",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "09:45 AM. Internal system. Priority: High.",
    "\"Now by region — each region's total and its share of the whole company, biggest region first. Grouping and a grand-total window can coexist: the window runs after the grouping, over the grouped rows.\"",
  ],
  objective:
    "Select each region's total sales and its percentage of company sales (rounded to 1 decimal), sorted by region total descending.",
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
  expectedColumns: ["region", "region_total", "pct_of_company"],
  expectedRows: [
    ["East", 1430000, 30.6],
    ["West", 1310000, 28],
    ["South", 1055000, 22.5],
    ["North", 885000, 18.9],
  ],
  requireRowOrder: true,
  hints: [
    "SUM(SUM(quarter_sales)) OVER () looks strange but reads inside-out: the inner SUM is the group's total, the outer windowed SUM adds those group totals into a grand total.",
    "The window function runs after GROUP BY has collapsed the rows — that's why it can wrap an aggregate.",
    "Try: SELECT region, SUM(quarter_sales) AS region_total, ROUND(100.0 * SUM(quarter_sales) / SUM(SUM(quarter_sales)) OVER (), 1) AS pct_of_company FROM sales_reps GROUP BY region ORDER BY region_total DESC;",
  ],
  xpAward: 275,
};
