import type { Mission } from "../missions/level001";

export const da031: Mission = {
  id: "da-ticket-031",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-031 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "12:50 PM. Internal system. Priority: Medium.",
    "\"Flip Ticket DA-026 around — bottom quartile this time, the reps who need a coaching conversation.\"",
  ],
  objective:
    "Using a CTE with quartiles assigned, select the name and sales of every rep in the bottom quartile.",
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
  expectedColumns: ["name", "quarter_sales"],
  expectedRows: [
    ["Neha Kulkarni", 350000],
    ["Arjun Nair", 275000],
  ],
  requireRowOrder: false,
  hints: [
    "Exact same query as Ticket DA-026 — just change which quartile number you're filtering to.",
    "The lowest sales land in the highest quartile number, since the ordering runs highest-to-lowest.",
    "Try: WITH ranked AS (SELECT *, NTILE(4) OVER (ORDER BY quarter_sales DESC) AS quartile FROM sales_reps) SELECT name, quarter_sales FROM ranked WHERE quartile = 4;",
  ],
  xpAward: 175,
};
