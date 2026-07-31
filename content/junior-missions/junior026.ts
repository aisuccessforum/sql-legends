import type { Mission } from "../missions/level001";

export const junior026: Mission = {
  id: "junior-ticket-026",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-026 // Priority: Critical",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "03:00 PM. Internal system. Priority: Critical.",
    "\"Last one on this module. Full regional breakdown for the bonus tiers — every rep's dense rank within their own region, but only the top 2 tiers per region make the cut. No gaps in the numbering, sorted region by region, best first within each.\"",
    "\"Partition, dense rank, CTE filter, and a final sort — every piece from this whole module, together.\"",
  ],
  objective:
    "Using a CTE with dense rank partitioned by region, select every rep ranked 1st or 2nd in their region, sorted by region and then rank.",
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
  expectedColumns: ["name", "region", "quarter_sales", "drnk"],
  expectedRows: [
    ["Karan Bhatt", "East", 520000, 1],
    ["Kabir Singh", "East", 520000, 1],
    ["Sana Malhotra", "East", 390000, 2],
    ["Rohan Verma", "North", 610000, 1],
    ["Arjun Nair", "North", 275000, 2],
    ["Vikram Chopra", "South", 610000, 1],
    ["Divya Shah", "South", 445000, 2],
    ["Aditi Rao", "West", 480000, 1],
    ["Meera Iyer", "West", 480000, 1],
    ["Neha Kulkarni", "West", 350000, 2],
  ],
  requireRowOrder: true,
  hints: [
    "\"No gaps in the numbering\" is the giveaway for which of the three ranking functions this needs.",
    "Build the CTE with DENSE_RANK() OVER (PARTITION BY region ORDER BY quarter_sales DESC), filter to drnk <= 2, then sort the final result.",
    "Try: WITH ranked AS (SELECT *, DENSE_RANK() OVER (PARTITION BY region ORDER BY quarter_sales DESC) AS drnk FROM sales_reps) SELECT name, region, quarter_sales, drnk FROM ranked WHERE drnk <= 2 ORDER BY region, drnk;",
  ],
  xpAward: 225,
};
