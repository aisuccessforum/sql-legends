import type { Mission } from "../missions/level001";

export const junior018: Mission = {
  id: "junior-ticket-018",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-018 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "09:35 AM. Internal system. Priority: Medium.",
    "\"ROW_NUMBER gave every single rep a different number, even the two tied at the top. That's not how a real leaderboard works — tied reps should share the same rank, and whoever's next should skip ahead accordingly.\"",
    "\"Same query, different function. RANK does exactly that.\"",
  ],
  objective:
    "Select every rep's name and quarterly sales, along with their proper rank (ties sharing a rank, with a gap afterward), highest sales first, and sorted by rank and then name for ties.",
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
    ["Kabir Singh", 520000, 3],
    ["Karan Bhatt", 520000, 3],
    ["Aditi Rao", 480000, 5],
    ["Meera Iyer", 480000, 5],
    ["Divya Shah", 445000, 7],
    ["Sana Malhotra", 390000, 8],
    ["Neha Kulkarni", 350000, 9],
    ["Arjun Nair", 275000, 10],
  ],
  requireRowOrder: true,
  hints: [
    "Notice rank 2 never appears — after two reps tie for 1st, the next rep is 3rd, not 2nd. That gap is intentional.",
    "RANK() OVER (ORDER BY ...) works exactly like ROW_NUMBER syntactically — only the numbering behavior changes.",
    "Try: SELECT name, quarter_sales, RANK() OVER (ORDER BY quarter_sales DESC) AS sales_rank FROM sales_reps ORDER BY sales_rank, name;",
  ],
  xpAward: 175,
};
