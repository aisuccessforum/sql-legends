import type { Mission } from "../missions/level001";

export const de040: Mission = {
  id: "de-ticket-040",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-040 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "10:30 AM. Internal system. Priority: High.",
    "\"Null rate monitoring — track percentage of NULLs in critical columns every day. A sudden jump in null_customer_pct signals an upstream schema change or ETL bug before it poisons dashboards.\"",
  ],
  objective:
    "For each day in order_stats, show total_orders, null customer count and percentage (1 decimal), null amount count and percentage (1 decimal) — sorted by load_date.",
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
  expectedColumns: ["load_date", "total_orders", "null_customer_count", "null_customer_pct", "null_amount_count", "null_amount_pct"],
  expectedRows: [
    ["2026-01-10", 120, 2, 1.7, 0, 0],
    ["2026-01-11", 95, 1, 1.1, 0, 0],
    ["2026-01-12", 110, 0, 0, 0, 0],
    ["2026-01-15", 132, 5, 3.8, 2, 1.5],
    ["2026-01-16", 88, 1, 1.1, 0, 0],
    ["2026-01-17", 115, 0, 0, 1, 0.9],
    ["2026-01-18", 420, 8, 1.9, 3, 0.7],
    ["2026-01-19", 98, 2, 2, 0, 0],
    ["2026-01-20", 105, 1, 1, 0, 0],
  ],
  requireRowOrder: true,
  hints: [
    "ROUND(100.0*null_customer_count/total_orders,1) for the customer null percentage. Same for amount.",
    "Try: SELECT load_date, total_orders, null_customer_count, ROUND(100.0*null_customer_count/total_orders,1) AS null_customer_pct, null_amount_count, ROUND(100.0*null_amount_count/total_orders,1) AS null_amount_pct FROM order_stats ORDER BY load_date;",
  ],
  xpAward: 225,
};
