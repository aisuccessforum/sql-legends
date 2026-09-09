import type { Mission } from "../missions/level001";

export const sda046: Mission = {
  id: "sda-ticket-046",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-046 // Final Assessment 2 of 6",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "10:00 AM. Internal system. Final Assessment.",
    "\"Full coverage matrix with share context — every region-product pair on the grid, its deal total, and that total as a share of all deals for that product across regions. The scaffold tells you what's missing; the share tells you what matters.\"",
  ],
  objective:
    "For every region-product combination, show the total deal amount and its percentage of all deals for that product (rounded to 1 decimal), sorted by product then region.",
  schemaLabel: "regions, products, deals",
  seedSql: `
    CREATE TABLE regions (region TEXT);
    INSERT INTO regions (region) VALUES ('East'), ('North'), ('South'), ('West');
    CREATE TABLE products (product TEXT);
    INSERT INTO products (product) VALUES ('Basic'), ('Enterprise'), ('Pro');
    CREATE TABLE deals (id INTEGER PRIMARY KEY, region TEXT, product TEXT, amount INTEGER);
    INSERT INTO deals (id, region, product, amount) VALUES
      (1, 'East', 'Basic', 12000), (2, 'East', 'Pro', 30000),
      (3, 'East', 'Basic', 8000),  (4, 'North', 'Enterprise', 95000),
      (5, 'North', 'Pro', 27000),  (6, 'South', 'Basic', 15000),
      (7, 'West', 'Pro', 33000),   (8, 'West', 'Enterprise', 88000),
      (9, 'West', 'Pro', 21000);
  `,
  schemaPreview: [
    { table: "regions", columns: ["region"] },
    { table: "products", columns: ["product"] },
    { table: "deals", columns: ["id", "region", "product", "amount"] },
  ],
  expectedColumns: ["region", "product", "total", "pct_of_product_total"],
  expectedRows: [
    ["East", "Basic", 20000, 57.1],
    ["North", "Basic", 0, 0],
    ["South", "Basic", 15000, 42.9],
    ["West", "Basic", 0, 0],
    ["East", "Enterprise", 0, 0],
    ["North", "Enterprise", 95000, 51.9],
    ["South", "Enterprise", 0, 0],
    ["West", "Enterprise", 88000, 48.1],
    ["East", "Pro", 30000, 27],
    ["North", "Pro", 27000, 24.3],
    ["South", "Pro", 0, 0],
    ["West", "Pro", 54000, 48.6],
  ],
  requireRowOrder: true,
  hints: [
    "Build the full grid with totals first — that's the scaffold module's complete pattern inside a CTE.",
    "Then a partitioned SUM OVER (PARTITION BY product) gives each product's total across all regions, letting each row divide itself by its product's grand total.",
    "Try: WITH grid AS (SELECT r.region, p.product, COALESCE(SUM(d.amount), 0) AS total FROM regions r CROSS JOIN products p LEFT JOIN deals d ON d.region = r.region AND d.product = p.product GROUP BY r.region, p.product) SELECT region, product, total, ROUND(100.0 * total / NULLIF(SUM(total) OVER (PARTITION BY product), 0), 1) AS pct_of_product_total FROM grid ORDER BY product, region;",
  ],
  xpAward: 300,
};
