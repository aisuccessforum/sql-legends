import type { Mission } from "../missions/level001";

export const bi025: Mission = {
  id: "bi-ticket-025",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-025 // Priority: High",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "09:00 AM. Internal system. Priority: High.",
    "\"New module — keeping data fresh. BI dashboards are only as good as the data behind them. INSERT OR IGNORE is the safe way to load new records without crashing on duplicates.\"",
    "\"Try to add PRD-001 (already exists) and PRD-006 (new). Only the new one should land. Verify by selecting all SKUs.\"",
  ],
  objective:
    "Use INSERT OR IGNORE to attempt adding PRD-001 (duplicate) and PRD-006 (new DashKit), then select all SKUs to verify.",
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
  expectedColumns: ["sku", "product_name"],
  expectedRows: [
    ["PRD-001", "DataVault Pro"],
    ["PRD-002", "QueryMaster"],
    ["PRD-003", "PipelineX"],
    ["PRD-004", "StreamFlow"],
    ["PRD-005", "ReportBuilder"],
    ["PRD-006", "DashKit"],
  ],
  requireRowOrder: true,
  hints: [
    "INSERT OR IGNORE silently skips any row whose PRIMARY KEY already exists — it never errors, never overwrites.",
    "Two INSERT OR IGNORE statements (one per SKU), then a SELECT to prove PRD-001 was skipped and PRD-006 was added.",
    "Try: INSERT OR IGNORE INTO product_catalog VALUES ('PRD-001','DataVault Pro','Analytics',4500.00,12); INSERT OR IGNORE INTO product_catalog VALUES ('PRD-006','DashKit','Visualisation',3100.00,22); SELECT sku, product_name FROM product_catalog ORDER BY sku;",
  ],
  xpAward: 225,
};
