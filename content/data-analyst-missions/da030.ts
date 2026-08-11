import type { Mission } from "../missions/level001";

export const da030: Mission = {
  id: "da-ticket-030",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-030 // Priority: Low",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "12:10 PM. Internal system. Priority: Low.",
    "\"Similar idea, different question — for each rep, what fraction of everyone (themselves included) sold the same amount or less?\"",
    "\"CUME_DIST answers exactly that — the cumulative distribution up to and including each row's own value.\"",
  ],
  objective:
    "Select every rep's name, sales, and cumulative distribution (rounded to 2 decimal places), sorted from lowest sales to highest.",
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
  expectedColumns: ["name", "quarter_sales", "cume_dist"],
  expectedRows: [
    ["Arjun Nair", 275000, 0.1],
    ["Neha Kulkarni", 350000, 0.2],
    ["Sana Malhotra", 390000, 0.3],
    ["Divya Shah", 445000, 0.4],
    ["Aditi Rao", 480000, 0.6],
    ["Meera Iyer", 480000, 0.6],
    ["Karan Bhatt", 520000, 0.8],
    ["Kabir Singh", 520000, 0.8],
    ["Rohan Verma", 610000, 1],
    ["Vikram Chopra", 610000, 1],
  ],
  requireRowOrder: true,
  hints: [
    "Notice both reps tied at 480,000 get the exact same value here — CUME_DIST treats tied rows as a single group, unlike PERCENT_RANK's per-row spread.",
    "Same shape as the last ticket, just a different function name.",
    "Try: SELECT name, quarter_sales, ROUND(CUME_DIST() OVER (ORDER BY quarter_sales), 2) AS cume_dist FROM sales_reps ORDER BY quarter_sales;",
  ],
  xpAward: 200,
};
