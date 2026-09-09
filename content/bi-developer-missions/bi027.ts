import type { Mission } from "../missions/level001";

export const bi027: Mission = {
  id: "bi-ticket-027",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-027 // Priority: Medium",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "10:20 AM. Internal system. Priority: Medium.",
    "\"Batch load — three new SKUs arrive in the morning file, but one is a duplicate. INSERT OR IGNORE the whole batch, then verify the total SKU count.\"",
  ],
  objective:
    "Use INSERT OR IGNORE to try adding PRD-001 (duplicate), PRD-006 (DashKit), and PRD-007 (CloudSync), then select the total SKU count.",
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
  expectedColumns: ["total_skus"],
  expectedRows: [
    [7],
  ],
  requireRowOrder: false,
  hints: [
    "Three INSERT OR IGNORE statements — the duplicate PRD-001 is skipped, the two genuinely new SKUs are added.",
    "Expected count: 5 original + 2 new = 7.",
    "Try: INSERT OR IGNORE INTO product_catalog VALUES ('PRD-001','DUPLICATE','Analytics',0,0); INSERT OR IGNORE INTO product_catalog VALUES ('PRD-006','DashKit','Visualisation',3100.00,22); INSERT OR IGNORE INTO product_catalog VALUES ('PRD-007','CloudSync','Data Engineering',5500.00,10); SELECT COUNT(*) AS total_skus FROM product_catalog;",
  ],
  xpAward: 225,
};
