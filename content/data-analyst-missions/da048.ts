import type { Mission } from "../missions/level001";

export const da048: Mission = {
  id: "da-ticket-048",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-048 // Final Assessment 4 of 6",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "12:00 PM. Internal system. Priority: Critical.",
    "\"Recognition slide for the all-hands: top-quartile reps only, each shown as a single display label — name with region in parentheses — alongside their sales, best first.\"",
  ],
  objective:
    "Select every top-quartile rep as a single label of their name with region in parentheses, along with their sales, sorted by sales descending and then name.",
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
  expectedColumns: ["rep_label", "quarter_sales"],
  expectedRows: [
    ["Rohan Verma (North)", 610000],
    ["Vikram Chopra (South)", 610000],
    ["Karan Bhatt (East)", 520000],
  ],
  requireRowOrder: true,
  hints: [
    "The quartile split with a filter afterward is the same two-step shape you've used repeatedly — compute in a building block, filter outside it.",
    "The label is glued together from the name, a literal ' (', the region, and a ')'.",
    "Try: WITH ranked AS (SELECT *, NTILE(4) OVER (ORDER BY quarter_sales DESC) AS quartile FROM sales_reps) SELECT name || ' (' || region || ')' AS rep_label, quarter_sales FROM ranked WHERE quartile = 1 ORDER BY quarter_sales DESC, name;",
  ],
  xpAward: 275,
};
