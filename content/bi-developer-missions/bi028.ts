import type { Mission } from "../missions/level001";

export const bi028: Mission = {
  id: "bi-ticket-028",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-028 // Priority: High",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "11:00 AM. Internal system. Priority: High.",
    "\"Quarterly price refresh — three products get new prices. One INSERT OR REPLACE per SKU, all in one batch. Verify all three new prices afterward.\"",
  ],
  objective:
    "Use INSERT OR REPLACE to refresh prices: PRD-001 to 4750, PRD-003 to 8500, PRD-005 to 2400. Then select their SKUs and new prices.",
  schemaLabel: "product_catalog",
  seedSql: `
    CREATE TABLE product_catalog (
      sku TEXT PRIMARY KEY, product_name TEXT, category TEXT, price REAL, stock INTEGER
    );
    INSERT INTO product_catalog (sku, product_name, category, price, stock) VALUES
      ('PRD-001','DataVault Pro','Analytics',4500.00,12),
      ('PRD-002','QueryMaster','Analytics',1200.00,45),
      ('PRD-003','PipelineX','Data Engineering',8000.00,8),
      ('PRD-004','StreamFlow','Data Engineering',6500.00,15),
      ('PRD-005','ReportBuilder','Visualisation',2200.00,30);
  `,
  schemaPreview: [{ table: "product_catalog", columns: ["sku","product_name","category","price","stock"] }],
  expectedColumns: ["sku", "price"],
  expectedRows: [
    ["PRD-001", 4750],
    ["PRD-003", 8500],
    ["PRD-005", 2400],
  ],
  requireRowOrder: true,
  hints: [
    "Three INSERT OR REPLACE statements, each supplying all five columns (remember stock doesn't change).",
    "Try: INSERT OR REPLACE INTO product_catalog VALUES ('PRD-001','DataVault Pro','Analytics',4750.00,12); INSERT OR REPLACE INTO product_catalog VALUES ('PRD-003','PipelineX','Data Engineering',8500.00,8); INSERT OR REPLACE INTO product_catalog VALUES ('PRD-005','ReportBuilder','Visualisation',2400.00,30); SELECT sku, price FROM product_catalog WHERE sku IN ('PRD-001','PRD-003','PRD-005') ORDER BY sku;",
  ],
  xpAward: 225,
};
