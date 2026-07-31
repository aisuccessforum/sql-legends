import type { Mission } from "../missions/level001";

export const junior019: Mission = {
  id: "junior-ticket-019",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-019 // Priority: Low",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "10:05 AM. Internal system. Priority: Low.",
    "\"Product team specifically doesn't want gaps in the rank numbers, even after a tie — they're using this to drive a 5-tier bonus structure, and a missing rank 2 breaks their logic.\"",
    "\"One more variant: DENSE_RANK. Ties still share a rank, but nothing gets skipped afterward.\"",
  ],
  objective:
    "Select every rep's name and quarterly sales, along with a dense rank (ties share a rank, no gaps afterward), highest sales first, sorted by rank and then name for ties.",
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
  expectedColumns: ["name", "quarter_sales", "sales_rank"],
  expectedRows: [
    ["Rohan Verma", 610000, 1],
    ["Vikram Chopra", 610000, 1],
    ["Kabir Singh", 520000, 2],
    ["Karan Bhatt", 520000, 2],
    ["Aditi Rao", 480000, 3],
    ["Meera Iyer", 480000, 3],
    ["Divya Shah", 445000, 4],
    ["Sana Malhotra", 390000, 5],
    ["Neha Kulkarni", 350000, 6],
    ["Arjun Nair", 275000, 7],
  ],
  requireRowOrder: true,
  hints: [
    "Compare this to the last ticket's output — same ties, but the numbers after each tie no longer skip.",
    "DENSE_RANK() OVER (ORDER BY ...) — same shape again, third function in the same family.",
    "Try: SELECT name, quarter_sales, DENSE_RANK() OVER (ORDER BY quarter_sales DESC) AS sales_rank FROM sales_reps ORDER BY sales_rank, name;",
  ],
  xpAward: 175,
};
