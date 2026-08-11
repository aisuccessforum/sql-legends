import type { Mission } from "../missions/level001";

export const da025: Mission = {
  id: "da-ticket-025",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-025 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "09:00 AM. Internal system. Priority: Medium.",
    "New module — window functions you haven't touched yet. Sales leadership wants reps split into performance quartiles.",
    "\"Split all ten reps into 4 groups by sales, as evenly as possible — top group is quartile 1, bottom is quartile 4.\"",
    "\"NTILE(n) divides the ordered rows into n roughly equal buckets and numbers each row with which bucket it landed in.\"",
  ],
  objective:
    "Select every rep's name and quarterly sales, along with which of 4 quartiles they fall into, highest sales first.",
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
  expectedColumns: ["name", "quarter_sales", "quartile"],
  expectedRows: [
    ["Rohan Verma", 610000, 1],
    ["Vikram Chopra", 610000, 1],
    ["Kabir Singh", 520000, 2],
    ["Karan Bhatt", 520000, 1],
    ["Aditi Rao", 480000, 2],
    ["Meera Iyer", 480000, 2],
    ["Divya Shah", 445000, 3],
    ["Sana Malhotra", 390000, 3],
    ["Neha Kulkarni", 350000, 4],
    ["Arjun Nair", 275000, 4],
  ],
  requireRowOrder: false,
  hints: [
    "Look closely at the two reps tied at 520,000 — one lands in quartile 1, the other in quartile 2. NTILE splits by row position to keep bucket sizes even, not by matching values the way RANK does. That's expected, not a bug.",
    "NTILE(4) OVER (ORDER BY ...) — same OVER shape you already know, just a new function.",
    "Try: SELECT name, quarter_sales, NTILE(4) OVER (ORDER BY quarter_sales DESC) AS quartile FROM sales_reps;",
  ],
  xpAward: 225,
};
