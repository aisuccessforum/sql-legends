import type { Mission } from "../missions/level001";

export const de035: Mission = {
  id: "de-ticket-035",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-035 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "11:15 AM. Internal system. Priority: High.",
    "\"Load success rate per table — the load_log tracks every pipeline run. GROUP BY table_name to see which pipelines are reliable and which need attention.\"",
  ],
  objective:
    "For each table in load_log, show total loads, successful count, failure count, and success rate (1 decimal percentage) — sorted by table_name.",
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
  expectedColumns: ["table_name", "total_loads", "successful", "failed", "success_rate"],
  expectedRows: [
    ["customers", 5, 4, 1, 80],
    ["orders", 5, 3, 1, 60],
  ],
  requireRowOrder: true,
  hints: [
    "GROUP BY table_name. COUNT(CASE WHEN status='success' THEN 1 END) for successful, 'failure' for failed. Success rate = 100.0 * successful / total.",
    "Try: SELECT table_name, COUNT(*) AS total_loads, COUNT(CASE WHEN status='success' THEN 1 END) AS successful, COUNT(CASE WHEN status='failure' THEN 1 END) AS failed, ROUND(100.0*COUNT(CASE WHEN status='success' THEN 1 END)/COUNT(*),1) AS success_rate FROM load_log GROUP BY table_name ORDER BY table_name;",
  ],
  xpAward: 225,
};
