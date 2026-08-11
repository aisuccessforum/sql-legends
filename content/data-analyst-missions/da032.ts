import type { Mission } from "../missions/level001";

export const da032: Mission = {
  id: "da-ticket-032",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-032 // Priority: Critical",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "01:40 PM. Internal system. Priority: Critical.",
    "\"Last one on advanced windows. Top-quartile reps only, but this time show their region's lowest seller alongside them too — even the top performers should know who's struggling on their own team.\"",
    "\"Two different window functions computed together, then filtered through the same CTE.\"",
  ],
  objective:
    "Using a CTE, select the name, region, sales, and quartile of every rep in the top quartile, along with the name of the lowest seller in their region, sorted by sales descending.",
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
  expectedColumns: ["name", "region", "quarter_sales", "quartile", "region_lowest"],
  expectedRows: [
    ["Rohan Verma", "North", 610000, 1, "Arjun Nair"],
    ["Vikram Chopra", "South", 610000, 1, "Divya Shah"],
    ["Karan Bhatt", "East", 520000, 1, "Sana Malhotra"],
  ],
  requireRowOrder: true,
  hints: [
    "Both NTILE(4) OVER (ORDER BY ...) and the framed LAST_VALUE from Ticket DA-028 can live in the same CTE — they don't need to know about each other, they're just two separate columns.",
    "Filter to quartile 1 in the outer query, same as Ticket DA-026, then sort by sales.",
    "Try: WITH ranked AS (SELECT *, NTILE(4) OVER (ORDER BY quarter_sales DESC) AS quartile, LAST_VALUE(name) OVER (PARTITION BY region ORDER BY quarter_sales DESC ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING) AS region_lowest FROM sales_reps) SELECT name, region, quarter_sales, quartile, region_lowest FROM ranked WHERE quartile = 1 ORDER BY quarter_sales DESC;",
  ],
  xpAward: 275,
};
