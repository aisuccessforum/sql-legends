import type { Mission } from "../missions/level001";

export const sda036: Mission = {
  id: "sda-ticket-036",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-036 // Priority: Medium",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "11:15 AM. Internal system. Priority: Medium.",
    "\"Scaffolds aren't always tables that already exist — sometimes you generate them. Produce the six month labels 2026-01 through 2026-06 out of thin air, using recursion to count and printf to format.\"",
    "\"This is how you build a calendar spine for time-series reports where missing months must still appear.\"",
  ],
  objective:
    "Generate the month labels 2026-01 through 2026-06 as six rows, in order, using a recursive CTE.",
  schemaLabel: "regions, products, deals",
  seedSql: `
    CREATE TABLE regions (region TEXT);
    INSERT INTO regions (region) VALUES ('East'), ('North'), ('South'), ('West');
    CREATE TABLE products (product TEXT);
    INSERT INTO products (product) VALUES ('Basic'), ('Enterprise'), ('Pro');
    CREATE TABLE deals (
      id INTEGER PRIMARY KEY,
      region TEXT,
      product TEXT,
      amount INTEGER
    );
    INSERT INTO deals (id, region, product, amount) VALUES
      (1, 'East', 'Basic', 12000),
      (2, 'East', 'Pro', 30000),
      (3, 'East', 'Basic', 8000),
      (4, 'North', 'Enterprise', 95000),
      (5, 'North', 'Pro', 27000),
      (6, 'South', 'Basic', 15000),
      (7, 'West', 'Pro', 33000),
      (8, 'West', 'Enterprise', 88000),
      (9, 'West', 'Pro', 21000);
  `,
  schemaPreview: [
    { table: "regions", columns: ["region"] },
    { table: "products", columns: ["product"] },
    { table: "deals", columns: ["id", "region", "product", "amount"] },
  ],
  expectedColumns: ["month"],
  expectedRows: [
    ["2026-01"],
    ["2026-02"],
    ["2026-03"],
    ["2026-04"],
    ["2026-05"],
    ["2026-06"],
  ],
  requireRowOrder: true,
  hints: [
    "A recursive CTE can count: anchor at 1, add 1 each step, stop with WHERE n < 6 inside the recursive half.",
    "printf('2026-%02d', n) zero-pads the number into a proper month label.",
    "Try: WITH RECURSIVE months(n) AS (SELECT 1 UNION ALL SELECT n + 1 FROM months WHERE n < 6) SELECT printf('2026-%02d', n) AS month FROM months;",
  ],
  xpAward: 250,
};
