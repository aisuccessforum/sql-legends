import type { Mission } from "../missions/level001";

export const bi030: Mission = {
  id: "bi-ticket-030",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-030 // Priority: Critical",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "12:20 PM. Internal system. Priority: Critical.",
    "\"Module capstone — full catalog refresh. Six SKUs come in from the vendor: updated prices across all five existing products plus one new SKU (PRD-006). INSERT OR REPLACE handles both updates and additions in one batch. Verify SKU count and average price afterward.\"",
  ],
  objective:
    "Refresh all five existing SKUs with new prices and add PRD-006 using INSERT OR REPLACE, then select the total SKU count and average price rounded to 2 decimals.",
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
  expectedColumns: ["skus", "avg_price"],
  expectedRows: [
    [6, 4500],
  ],
  requireRowOrder: false,
  hints: [
    "Six INSERT OR REPLACE statements — five update existing rows, one adds the new SKU. All must include every column.",
    "Average price of the six final prices: (4750+1450+8500+6800+2400+3100)/6 = 4500.",
    "Try: INSERT OR REPLACE INTO product_catalog VALUES ('PRD-001','DataVault Pro','Analytics',4750.00,12),('PRD-002','QueryMaster','Analytics',1450.00,45),('PRD-003','PipelineX','Data Engineering',8500.00,8),('PRD-004','StreamFlow','Data Engineering',6800.00,15),('PRD-005','ReportBuilder','Visualisation',2400.00,30),('PRD-006','DashKit','Visualisation',3100.00,22); SELECT COUNT(*) AS skus, ROUND(AVG(price),2) AS avg_price FROM product_catalog;",
  ],
  xpAward: 275,
};
