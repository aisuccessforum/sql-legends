import type { Mission } from "../missions/level001";

export const sda038: Mission = {
  id: "sda-ticket-038",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-038 // Priority: Critical",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "12:45 PM. Internal system. Priority: Critical.",
    "\"Module capstone — the full coverage matrix. Every combination, its total, and a Covered or Missing label. This one goes on the wall in the sales bullpen.\"",
  ],
  objective:
    "For every region-product combination, show the total (0 where none) and a label — 'Covered' if any deals exist, 'Missing' otherwise — sorted by region then product.",
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
  expectedColumns: ["region", "product", "total", "coverage"],
  expectedRows: [
    ["East", "Basic", 20000, "Covered"],
    ["East", "Enterprise", 0, "Missing"],
    ["East", "Pro", 30000, "Covered"],
    ["North", "Basic", 0, "Missing"],
    ["North", "Enterprise", 95000, "Covered"],
    ["North", "Pro", 27000, "Covered"],
    ["South", "Basic", 15000, "Covered"],
    ["South", "Enterprise", 0, "Missing"],
    ["South", "Pro", 0, "Missing"],
    ["West", "Basic", 0, "Missing"],
    ["West", "Enterprise", 88000, "Covered"],
    ["West", "Pro", 54000, "Covered"],
  ],
  requireRowOrder: true,
  hints: [
    "COUNT(d.id) counts only rows where the join actually matched — zero matches means the combination is Missing.",
    "A CASE on that count produces the label; COALESCE handles the total, same as before.",
    "Try: SELECT r.region, p.product, COALESCE(SUM(d.amount), 0) AS total, CASE WHEN COUNT(d.id) = 0 THEN 'Missing' ELSE 'Covered' END AS coverage FROM regions r CROSS JOIN products p LEFT JOIN deals d ON d.region = r.region AND d.product = p.product GROUP BY r.region, p.product ORDER BY r.region, p.product;",
  ],
  xpAward: 300,
};
