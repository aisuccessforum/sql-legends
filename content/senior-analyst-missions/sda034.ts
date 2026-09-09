import type { Mission } from "../missions/level001";

export const sda034: Mission = {
  id: "sda-ticket-034",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-034 // Priority: High",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "09:45 AM. Internal system. Priority: High.",
    "\"Now hang the actual deal totals on that grid. LEFT JOIN the deals onto the full combination grid — combinations with no deals show 0, not vanish. That's the difference between a report and an honest report.\"",
  ],
  objective:
    "For every region-product combination, show the total deal amount (0 where no deals exist), sorted by region then product.",
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
  expectedColumns: ["region", "product", "total"],
  expectedRows: [
    ["East", "Basic", 20000],
    ["East", "Enterprise", 0],
    ["East", "Pro", 30000],
    ["North", "Basic", 0],
    ["North", "Enterprise", 95000],
    ["North", "Pro", 27000],
    ["South", "Basic", 15000],
    ["South", "Enterprise", 0],
    ["South", "Pro", 0],
    ["West", "Basic", 0],
    ["West", "Enterprise", 88000],
    ["West", "Pro", 54000],
  ],
  requireRowOrder: true,
  hints: [
    "The CROSS JOIN grid comes first, then a LEFT JOIN attaches deals matching on BOTH region and product.",
    "SUM over no matching rows is NULL — COALESCE(SUM(d.amount), 0) turns the honest gap into a readable zero.",
    "Try: SELECT r.region, p.product, COALESCE(SUM(d.amount), 0) AS total FROM regions r CROSS JOIN products p LEFT JOIN deals d ON d.region = r.region AND d.product = p.product GROUP BY r.region, p.product ORDER BY r.region, p.product;",
  ],
  xpAward: 275,
};
