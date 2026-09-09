import type { Mission } from "../missions/level001";

export const bi026: Mission = {
  id: "bi-ticket-026",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-026 // Priority: Medium",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "09:40 AM. Internal system. Priority: Medium.",
    "\"Price change — QueryMaster is moving from 1,200 to 1,450. INSERT OR REPLACE writes the new row, deleting the old one first if the key exists. Verify the new price.\"",
  ],
  objective:
    "Use INSERT OR REPLACE to update PRD-002's price to 1450.00, then select its SKU and price to verify.",
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
    ["PRD-002", 1450],
  ],
  requireRowOrder: false,
  hints: [
    "INSERT OR REPLACE works by deleting the existing row with the same primary key and inserting the new one. You must supply ALL columns — any you omit get their default values (usually NULL), not the old values.",
    "Try: INSERT OR REPLACE INTO product_catalog VALUES ('PRD-002','QueryMaster','Analytics',1450.00,45); SELECT sku, price FROM product_catalog WHERE sku='PRD-002';",
  ],
  xpAward: 225,
};
