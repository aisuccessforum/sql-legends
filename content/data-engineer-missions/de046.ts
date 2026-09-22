import type { Mission } from "../missions/level001";

export const de046: Mission = {
  id: "de-ticket-046",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-046 // Final Assessment 2 of 6",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "10:00 AM. Final Assessment.",
    "\"Dedup + reconciliation — count raw vs unique orders in source, then check what's missing or mismatched in target. Four numbers, one query.\"",
  ],
  objective:
    "In a single row: source row count, target row count, records missing from target, and records with mismatched amounts.",
  schemaLabel: "raw_events + dim_customer_scd2 + source_orders + target_orders",
  seedSql: `
    CREATE TABLE raw_events (event_id TEXT, user_id TEXT, event_type TEXT, revenue TEXT, event_ts TEXT, status TEXT);
    INSERT INTO raw_events (event_id, user_id, event_type, revenue, event_ts, status) VALUES ('E001','U001','purchase','4500.00','2026-01-10 09:15:22','COMPLETED'),('E002','U002','purchase','1200.00','2026-01-10 11:30:05','completed'),('E003','U003','refund','-800.00','2026-01-11 14:00:10','COMPLETED'),('E004','U001','signup',NULL,'2026-01-12 08:45:00','Completed'),('E005','U004','purchase','8000.00','2026-01-13 10:00:00','FAILED'),('E006','U002','purchase','6500.00','2026-01-14 13:20:00','completed'),('E007','U005','refund','-300.00','2026-01-15 16:00:00','COMPLETED'),('E008','U003','purchase','3100.00','2026-01-15 17:30:00','COMPLETED'),('E009','U001','purchase','2200.00','2026-01-16 09:00:00','completed'),('E010','U006','purchase','9000.00','2026-01-17 11:00:00','COMPLETED'),('E011','U004','signup',NULL,'2026-01-18 08:00:00','completed'),('E012','U002','purchase','1800.00','2026-01-19 14:30:00','FAILED');
  
    CREATE TABLE dim_customer_scd2 (sk INTEGER PRIMARY KEY, customer_id TEXT, customer_name TEXT, segment TEXT, region TEXT, effective_from TEXT, effective_to TEXT, is_current INTEGER);
    CREATE TABLE source_orders (order_id TEXT, customer_id TEXT, amount REAL, created_at TEXT);
    CREATE TABLE target_orders (order_id TEXT, customer_id TEXT, amount REAL, loaded_at TEXT);
    INSERT INTO dim_customer_scd2 VALUES (1,'C001','Apex Innovations','SMB','West','2026-01-01','2026-03-31',0),(2,'C001','Apex Innovations','Enterprise','West','2026-04-01','9999-12-31',1),(3,'C002','NovaSoft','SMB','East','2026-01-01','9999-12-31',1),(4,'C003','Quantum Corp','Enterprise','North','2026-01-01','9999-12-31',1),(5,'C004','Bright Ideas','SMB','South','2026-01-01','9999-12-31',1),(6,'C005','TechWave','Enterprise','West','2026-01-01','9999-12-31',1);
    INSERT INTO source_orders VALUES ('ORD-001','C001',9000,'2026-01-10'),('ORD-002','C002',6000,'2026-01-15'),('ORD-003','C003',8000,'2026-01-22'),('ORD-004','C004',6600,'2026-02-03'),('ORD-005','C005',4500,'2026-02-14'),('ORD-006','C006',13000,'2026-02-20'),('ORD-007','C007',12400,'2026-03-05'),('ORD-008','C001',9600,'2026-03-12'),('ORD-009','C002',8000,'2026-03-18'),('ORD-010','C003',4400,'2026-04-02');
    INSERT INTO target_orders VALUES ('ORD-001','C001',9000,'2026-02-01'),('ORD-002','C002',6000,'2026-02-01'),('ORD-003','C003',8000,'2026-02-01'),('ORD-004','C004',6600,'2026-02-01'),('ORD-005','C005',4500,'2026-02-01'),('ORD-006','C006',13000,'2026-02-01'),('ORD-007','C007',12400,'2026-02-01'),('ORD-008','C001',9800,'2026-02-01');
  `,
  schemaPreview: [
    { table: "raw_events",        columns: ["event_id","user_id","event_type","revenue","event_ts","status"] },
    { table: "dim_customer_scd2", columns: ["sk","customer_id","customer_name","segment","region","effective_from","effective_to","is_current"] },
    { table: "source_orders",     columns: ["order_id","customer_id","amount","created_at"] },
    { table: "target_orders",     columns: ["order_id","customer_id","amount","loaded_at"] },
  ],
  expectedColumns: ["source_rows", "target_rows", "missing", "mismatched"],
  expectedRows: [
    [10, 8, 2, 1],
  ],
  requireRowOrder: false,
  hints: [
    "Four scalar subqueries: COUNT(*) from each table, anti-join count for missing, inner-join filter count for mismatched.",
    "Try: SELECT (SELECT COUNT(*) FROM source_orders) AS source_rows, (SELECT COUNT(*) FROM target_orders) AS target_rows, (SELECT COUNT(*) FROM source_orders s LEFT JOIN target_orders t ON s.order_id=t.order_id WHERE t.order_id IS NULL) AS missing, (SELECT COUNT(*) FROM source_orders s JOIN target_orders t ON s.order_id=t.order_id WHERE s.amount<>t.amount) AS mismatched;",
  ],
  xpAward: 300,
};
