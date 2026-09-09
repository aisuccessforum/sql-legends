import type { Mission } from "../missions/level001";

export const bi001: Mission = {
  id: "bi-ticket-001",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-001 // Priority: High",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "09:00 AM. Internal system. Priority: High.",
    "\"BI Developer — welcome. I'm Krishna, VP of Analytics. At this level you don't write queries, you build the reports that go on the executive screen.\"",
    "\"First pattern: the reporting union. Executives want totals alongside detail, not just one or the other. Start simple — region totals, then add a grand total row at the bottom. UNION ALL, two SELECT blocks, one sorted result.\"",
  ],
  objective:
    "Select each region's total sales, then add a GRAND TOTAL row — sorted so regions come first alphabetically and the grand total appears last.",
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
  expectedColumns: ["region", "total", "row_type"],
  expectedRows: [
    ["East", 529000, "Region Total"],
    ["North", 420000, "Region Total"],
    ["South", 335000, "Region Total"],
    ["West", 668000, "Region Total"],
    ["GRAND TOTAL", 1952000, "Grand Total"],
  ],
  requireRowOrder: true,
  hints: [
    "Two SELECT blocks joined with UNION ALL: one GROUP BY region for the individual totals, one without GROUP BY for the grand total. Give each a literal label column.",
    "In a UNION ALL the ORDER BY sorts the combined result — reference the column position (ORDER BY 3 DESC, 1) so detail rows sort before the grand total.",
    "Try: SELECT region, SUM(amount) AS total, 'Region Total' AS row_type FROM sales GROUP BY region UNION ALL SELECT 'GRAND TOTAL', SUM(amount), 'Grand Total' FROM sales ORDER BY 3 DESC, 1;",
  ],
  xpAward: 225,
};
