import type { Mission } from "../missions/level001";

export const de038: Mission = {
  id: "de-ticket-038",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-038 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "09:00 AM. Internal system. Priority: High.",
    "\"New module — pipeline health monitoring. A silent failure is worse than a noisy one. You need queries that fire alerts before anyone notices wrong numbers. Start with freshness: days since last load.\"",
  ],
  objective:
    "For each table in daily_loads, show the latest load date and how many days ago that was relative to 2026-01-21.",
  schemaLabel: "daily_loads + order_stats",
  seedSql: `
    CREATE TABLE daily_loads (load_date TEXT, table_name TEXT, rows_loaded INTEGER, load_ts TEXT);
    CREATE TABLE order_stats (load_date TEXT, total_orders INTEGER, null_customer_count INTEGER, null_amount_count INTEGER, avg_amount REAL);
    INSERT INTO daily_loads VALUES ('2026-01-10','orders',120,'2026-01-10 01:00'),('2026-01-11','orders',95,'2026-01-11 01:05'),('2026-01-12','orders',110,'2026-01-12 01:02'),('2026-01-14','orders',0,'2026-01-14 00:00'),('2026-01-15','orders',132,'2026-01-15 01:01'),('2026-01-16','orders',88,'2026-01-16 01:08'),('2026-01-17','orders',115,'2026-01-17 01:03'),('2026-01-18','orders',420,'2026-01-18 01:00'),('2026-01-19','orders',98,'2026-01-19 01:04'),('2026-01-20','orders',105,'2026-01-20 01:02');
    INSERT INTO order_stats VALUES ('2026-01-10',120,2,0,4500.00),('2026-01-11',95,1,0,3800.00),('2026-01-12',110,0,0,4200.00),('2026-01-15',132,5,2,4100.00),('2026-01-16',88,1,0,3900.00),('2026-01-17',115,0,1,4300.00),('2026-01-18',420,8,3,4600.00),('2026-01-19',98,2,0,4000.00),('2026-01-20',105,1,0,4200.00);
  `,
  schemaPreview: [
    { table: "daily_loads", columns: ["load_date","table_name","rows_loaded","load_ts"] },
    { table: "order_stats", columns: ["load_date","total_orders","null_customer_count","null_amount_count","avg_amount"] },
  ],
  expectedColumns: ["table_name", "latest_load", "days_since_load"],
  expectedRows: [
    ["orders", "2026-01-20", 1],
  ],
  requireRowOrder: true,
  hints: [
    "MAX(load_date) per table_name. Days since = CAST(julianday('2026-01-21')-julianday(MAX(load_date)) AS INTEGER).",
    "Try: SELECT table_name, MAX(load_date) AS latest_load, CAST(julianday('2026-01-21')-julianday(MAX(load_date)) AS INTEGER) AS days_since_load FROM daily_loads GROUP BY table_name;",
  ],
  xpAward: 200,
};
