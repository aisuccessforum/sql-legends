import type { Mission } from "../missions/level001";

export const bi029: Mission = {
  id: "bi-ticket-029",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-029 // Priority: Medium",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "11:40 AM. Internal system. Priority: Medium.",
    "\"Stock adjustment — a sale went through for 3 units of PRD-001. Decrement the stock only if there are enough units to cover the order; don't go negative.\"",
  ],
  objective:
    "Update PRD-001's stock by subtracting 3, only if current stock is at least 3. Then select its SKU and new stock.",
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
  expectedColumns: ["sku", "stock"],
  expectedRows: [
    ["PRD-001", 9],
  ],
  requireRowOrder: false,
  hints: [
    "UPDATE ... SET stock = stock - 3 WHERE sku = 'PRD-001' AND stock >= 3 — the second condition is the safety guard.",
    "Start stock is 12, so 12 - 3 = 9. If stock were 2, the WHERE would prevent the update entirely.",
    "Try: UPDATE product_catalog SET stock = stock - 3 WHERE sku='PRD-001' AND stock >= 3; SELECT sku, stock FROM product_catalog WHERE sku='PRD-001';",
  ],
  xpAward: 225,
};
