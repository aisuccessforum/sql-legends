import type { Mission } from "../missions/level001";

export const da028: Mission = {
  id: "da-ticket-028",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-028 // Priority: Critical",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "10:50 AM. Internal system. Priority: Critical.",
    "\"Now the bottom of each region — lowest seller, same idea as last ticket, opposite end.\"",
    "\"Careful with this one. LAST_VALUE has a trap almost everyone falls into at least once: by default, a window function's frame only extends from the start of the partition up through the CURRENT row — so 'last value so far' is usually just... the current row itself. You have to explicitly tell it to look all the way to the end of the partition, every time.\"",
  ],
  objective:
    "Select every rep's name, region, and sales, along with the name of the lowest seller in their own region.",
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
  expectedColumns: ["name", "region", "quarter_sales", "region_lowest_seller"],
  expectedRows: [
    ["Karan Bhatt", "East", 520000, "Sana Malhotra"],
    ["Kabir Singh", "East", 520000, "Sana Malhotra"],
    ["Sana Malhotra", "East", 390000, "Sana Malhotra"],
    ["Rohan Verma", "North", 610000, "Arjun Nair"],
    ["Arjun Nair", "North", 275000, "Arjun Nair"],
    ["Vikram Chopra", "South", 610000, "Divya Shah"],
    ["Divya Shah", "South", 445000, "Divya Shah"],
    ["Aditi Rao", "West", 480000, "Neha Kulkarni"],
    ["Meera Iyer", "West", 480000, "Neha Kulkarni"],
    ["Neha Kulkarni", "West", 350000, "Neha Kulkarni"],
  ],
  requireRowOrder: false,
  hints: [
    "If you just swap FIRST_VALUE for LAST_VALUE with no other change, every row will show itself (or something close to it) as the \"lowest\" seller — that's the trap. Run it that way once so you actually see the wrong output before fixing it.",
    "Add ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING inside the OVER clause, after the ORDER BY, to widen the frame all the way to the end of each partition.",
    "Try: SELECT name, region, quarter_sales, LAST_VALUE(name) OVER (PARTITION BY region ORDER BY quarter_sales DESC ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING) AS region_lowest_seller FROM sales_reps;",
  ],
  xpAward: 250,
};
