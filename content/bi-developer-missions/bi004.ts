import type { Mission } from "../missions/level001";

export const bi004: Mission = {
  id: "bi-ticket-004",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-004 // Priority: High",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "11:15 AM. Internal system. Priority: High.",
    "\"Cross-tab time — the product_line × quarter matrix. One row per region, one column per product line, plus a row total. This is the core shape every BI pivot table takes.\"",
  ],
  objective:
    "For each region, show Hardware, Services, and Software totals as separate columns plus a row total, sorted by region.",
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
  expectedColumns: ["region", "hardware", "services", "software", "row_total"],
  expectedRows: [
    ["East", 255000, 97000, 177000, 529000],
    ["North", 203000, 79000, 138000, 420000],
    ["South", 160000, 62000, 113000, 335000],
    ["West", 317000, 123000, 228000, 668000],
  ],
  requireRowOrder: true,
  hints: [
    "Conditional SUM per column from the pivot module — CASE inside SUM picks only matching rows.",
    "The row_total column is just a plain SUM(amount) with no CASE filter.",
    "Try: SELECT region, SUM(CASE WHEN product_line='Hardware' THEN amount ELSE 0 END) AS hardware, SUM(CASE WHEN product_line='Services' THEN amount ELSE 0 END) AS services, SUM(CASE WHEN product_line='Software' THEN amount ELSE 0 END) AS software, SUM(amount) AS row_total FROM sales GROUP BY region ORDER BY region;",
  ],
  xpAward: 250,
};
