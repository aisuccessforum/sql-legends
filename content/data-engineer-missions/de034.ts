import type { Mission } from "../missions/level001";

export const de034: Mission = {
  id: "de-ticket-034",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-034 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "10:30 AM. Internal system. Priority: High.",
    "\"Amount mismatches — a record in both source and target can still have the wrong value. Inner join on order_id, filter WHERE amounts differ. These rows loaded but loaded incorrectly — they need an UPDATE.\"",
  ],
  objective:
    "Find orders where the amount in source_orders differs from target_orders — order_id, source amount, target amount, and delta.",
  schemaLabel: "source_orders + target_orders + load_log",
  seedSql: `
    CREATE TABLE source_orders (order_id TEXT, customer_id TEXT, amount REAL, created_at TEXT);
    CREATE TABLE target_orders (order_id TEXT, customer_id TEXT, amount REAL, loaded_at TEXT);
    CREATE TABLE load_log (load_id INTEGER PRIMARY KEY, table_name TEXT, load_ts TEXT, rows_extracted INTEGER, rows_loaded INTEGER, status TEXT);
    INSERT INTO source_orders VALUES ('ORD-001','C001',9000,'2026-01-10'),('ORD-002','C002',6000,'2026-01-15'),('ORD-003','C003',8000,'2026-01-22'),('ORD-004','C004',6600,'2026-02-03'),('ORD-005','C005',4500,'2026-02-14'),('ORD-006','C006',13000,'2026-02-20'),('ORD-007','C007',12400,'2026-03-05'),('ORD-008','C001',9600,'2026-03-12'),('ORD-009','C002',8000,'2026-03-18'),('ORD-010','C003',4400,'2026-04-02');
    INSERT INTO target_orders VALUES ('ORD-001','C001',9000,'2026-02-01'),('ORD-002','C002',6000,'2026-02-01'),('ORD-003','C003',8000,'2026-02-01'),('ORD-004','C004',6600,'2026-02-01'),('ORD-005','C005',4500,'2026-02-01'),('ORD-006','C006',13000,'2026-02-01'),('ORD-007','C007',12400,'2026-02-01'),('ORD-008','C001',9800,'2026-02-01');
    INSERT INTO load_log VALUES (1,'orders','2026-01-10 00:00',120,120,'success'),(2,'orders','2026-01-11 00:00',95,95,'success'),(3,'orders','2026-01-12 00:00',0,0,'failure'),(4,'orders','2026-01-13 00:00',110,108,'partial'),(5,'orders','2026-01-14 00:00',132,132,'success'),(6,'customers','2026-01-10 00:00',50,50,'success'),(7,'customers','2026-01-11 00:00',12,12,'success'),(8,'customers','2026-01-12 00:00',0,0,'failure'),(9,'customers','2026-01-13 00:00',8,8,'success'),(10,'customers','2026-01-14 00:00',15,15,'success');
  `,
  schemaPreview: [
    { table: "source_orders", columns: ["order_id","customer_id","amount","created_at"] },
    { table: "target_orders", columns: ["order_id","customer_id","amount","loaded_at"] },
    { table: "load_log",      columns: ["load_id","table_name","load_ts","rows_extracted","rows_loaded","status"] },
  ],
  expectedColumns: ["order_id", "source_amount", "target_amount", "delta"],
  expectedRows: [
    ["ORD-008", 9600, 9800, -200],
  ],
  requireRowOrder: true,
  hints: [
    "INNER JOIN on order_id (both must exist), WHERE s.amount<>t.amount. delta = s.amount - t.amount.",
    "Try: SELECT s.order_id, s.amount AS source_amount, t.amount AS target_amount, s.amount-t.amount AS delta FROM source_orders s JOIN target_orders t ON s.order_id=t.order_id WHERE s.amount<>t.amount ORDER BY s.order_id;",
  ],
  xpAward: 225,
};
