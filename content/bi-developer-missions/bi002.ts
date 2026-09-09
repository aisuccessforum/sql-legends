import type { Mission } from "../missions/level001";

export const bi002: Mission = {
  id: "bi-ticket-002",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-002 // Priority: Medium",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "09:45 AM. Internal system. Priority: Medium.",
    "\"Three levels now — individual rows, region subtotals, and a grand total. Classic executive management report shape.\"",
    "\"The ORDER BY in a UNION ALL can reference column position — use that to sort the row_type correctly without naming it in a CASE.\"",
  ],
  objective:
    "Stack detail rows (region, quarter, amount), region subtotals (quarter = 'SUBTOTAL'), and a grand total — in that order, sorted by region within each level.",
  schemaLabel: "sales",
  seedSql: `
    CREATE TABLE sales (
      id INTEGER PRIMARY KEY, region TEXT, product_line TEXT,
      quarter TEXT, amount INTEGER
    );
    INSERT INTO sales (id, region, product_line, quarter, amount) VALUES
      (1,'East','Software','Q1',85000),(2,'East','Software','Q2',92000),
      (3,'East','Hardware','Q1',120000),(4,'East','Hardware','Q2',135000),
      (5,'East','Services','Q1',45000),(6,'East','Services','Q2',52000),
      (7,'North','Software','Q1',67000),(8,'North','Software','Q2',71000),
      (9,'North','Hardware','Q1',98000),(10,'North','Hardware','Q2',105000),
      (11,'North','Services','Q1',38000),(12,'North','Services','Q2',41000),
      (13,'South','Software','Q1',54000),(14,'South','Software','Q2',59000),
      (15,'South','Hardware','Q1',77000),(16,'South','Hardware','Q2',83000),
      (17,'South','Services','Q1',29000),(18,'South','Services','Q2',33000),
      (19,'West','Software','Q1',110000),(20,'West','Software','Q2',118000),
      (21,'West','Hardware','Q1',155000),(22,'West','Hardware','Q2',162000),
      (23,'West','Services','Q1',58000),(24,'West','Services','Q2',65000);
  `,
  schemaPreview: [{ table: "sales", columns: ["id","region","product_line","quarter","amount"] }],
  expectedColumns: ["region", "quarter", "amount", "row_type"],
  expectedRows: [
    ["East", "Q1", 250000, "Detail"],
    ["East", "Q2", 279000, "Detail"],
    ["East", "SUBTOTAL", 529000, "Subtotal"],
    ["North", "Q1", 203000, "Detail"],
    ["North", "Q2", 217000, "Detail"],
    ["North", "SUBTOTAL", 420000, "Subtotal"],
    ["South", "Q1", 160000, "Detail"],
    ["South", "Q2", 175000, "Detail"],
    ["South", "SUBTOTAL", 335000, "Subtotal"],
    ["West", "Q1", 323000, "Detail"],
    ["West", "Q2", 345000, "Detail"],
    ["West", "SUBTOTAL", 668000, "Subtotal"],
    ["GRAND TOTAL", null, 1952000, "Grand Total"],
  ],
  requireRowOrder: true,
  hints: [
    "Three SELECT blocks in one UNION ALL — detail (GROUP BY region, quarter), subtotals (GROUP BY region only), and grand total (no GROUP BY). Each gets a literal label.",
    "ORDER BY 4 DESC, 1, 2 sorts Grand Total last (alphabetically after Subtotal which is after Detail), then by region, then by quarter.",
    "Try: SELECT region, quarter, SUM(amount) AS amount, 'Detail' AS row_type FROM sales GROUP BY region, quarter UNION ALL SELECT region, 'SUBTOTAL', SUM(amount), 'Subtotal' FROM sales GROUP BY region UNION ALL SELECT 'GRAND TOTAL', NULL, SUM(amount), 'Grand Total' FROM sales ORDER BY 4 DESC, 1, 2;",
  ],
  xpAward: 250,
};
