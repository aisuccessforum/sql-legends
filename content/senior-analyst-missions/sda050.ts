import type { Mission } from "../missions/level001";

export const sda050: Mission = {
  id: "sda-ticket-050",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-050 // Final Assessment 6 of 6",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "02:00 PM. Internal system. Final Assessment.",
    "\"Last ticket of the rank. Regional rep scorecard: for every rep, their sales, their share of their region, whether they're the top rep in their region (ties both count), and how far above or below their regional average they sit. Everything this rank taught — ratios, shares, ranking, conditional labels — in one query.\"",
    "\"After this: BI Developer.\"",
  ],
  objective:
    "For every rep, show their name, region, sales, regional share (1 decimal), a 'Top Rep' or 'Below Top' status, and their sales versus the regional average, sorted by region then sales descending then name.",
  schemaLabel: "sales_reps",
  seedSql: `
    CREATE TABLE sales_reps (
      id INTEGER PRIMARY KEY, name TEXT, region TEXT, quarter_sales INTEGER
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
  expectedColumns: ["name", "region", "quarter_sales", "pct_of_region", "status", "vs_region_avg"],
  expectedRows: [
    ["Kabir Singh", "East", 520000, 36.4, "Top Rep", 43333],
    ["Karan Bhatt", "East", 520000, 36.4, "Top Rep", 43333],
    ["Sana Malhotra", "East", 390000, 27.3, "Below Top", -86667],
    ["Rohan Verma", "North", 610000, 68.9, "Top Rep", 167500],
    ["Arjun Nair", "North", 275000, 31.1, "Below Top", -167500],
    ["Vikram Chopra", "South", 610000, 57.8, "Top Rep", 82500],
    ["Divya Shah", "South", 445000, 42.2, "Below Top", -82500],
    ["Aditi Rao", "West", 480000, 36.6, "Top Rep", 43333],
    ["Meera Iyer", "West", 480000, 36.6, "Top Rep", 43333],
    ["Neha Kulkarni", "West", 350000, 26.7, "Below Top", -86667],
  ],
  requireRowOrder: true,
  hints: [
    "Two building blocks: region totals (for the share), and a CTE that computes the partitioned share, rank, and average per rep in one pass.",
    "RANK() keeps ties — both East reps at 520,000 are genuinely Top Rep. CASE on the rank gives the label; the average difference is just sales minus the windowed AVG.",
    "Try: WITH regional AS (SELECT region, SUM(quarter_sales) AS region_total FROM sales_reps GROUP BY region), rep_stats AS (SELECT s.name, s.region, s.quarter_sales, ROUND(100.0 * s.quarter_sales / r.region_total, 1) AS pct_of_region, RANK() OVER (PARTITION BY s.region ORDER BY s.quarter_sales DESC) AS region_rank, ROUND(AVG(s.quarter_sales) OVER (PARTITION BY s.region), 0) AS region_avg FROM sales_reps s JOIN regional r ON s.region = r.region) SELECT name, region, quarter_sales, pct_of_region, CASE WHEN region_rank = 1 THEN 'Top Rep' ELSE 'Below Top' END AS status, quarter_sales - region_avg AS vs_region_avg FROM rep_stats ORDER BY region, quarter_sales DESC, name;",
  ],
  xpAward: 300,
};
