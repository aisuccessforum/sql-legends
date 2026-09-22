import type { Mission } from "../missions/level001";

export const de044: Mission = {
  id: "de-ticket-044",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-044 // Priority: Critical",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "01:30 PM. Internal system. Priority: Critical.",
    "\"Module capstone — full pipeline health dashboard. Six KPIs in one row: latest load, days since load, zero-load days, average rows, peak rows, overall null rate. This is the top-of-page health card on every pipeline dashboard.\"",
  ],
  objective:
    "In a single row, show latest load date, days since load (vs 2026-01-21), zero-load day count, average rows per non-zero load (0 decimals), peak rows, and overall null customer percentage (2 decimals).",
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
  expectedColumns: ["latest_load", "days_since_load", "zero_load_days", "avg_rows_per_load", "peak_rows", "overall_null_pct"],
  expectedRows: [
    ["2026-01-20", 1, 1, 143, 420, 1.56],
  ],
  requireRowOrder: false,
  hints: [
    "Six scalar subqueries: latest/days use julianday arithmetic; zero_load_days is COUNT(*) WHERE rows_loaded=0; avg uses WHERE rows_loaded>0; overall_null = SUM(null_count)/SUM(total) from order_stats.",
    "Try: SELECT (SELECT MAX(load_date) FROM daily_loads WHERE table_name='orders') AS latest_load, (SELECT CAST(julianday('2026-01-21')-julianday(MAX(load_date)) AS INTEGER) FROM daily_loads WHERE table_name='orders') AS days_since_load, (SELECT COUNT(*) FROM daily_loads WHERE table_name='orders' AND rows_loaded=0) AS zero_load_days, (SELECT ROUND(AVG(rows_loaded),0) FROM daily_loads WHERE table_name='orders' AND rows_loaded>0) AS avg_rows_per_load, (SELECT MAX(rows_loaded) FROM daily_loads WHERE table_name='orders') AS peak_rows, (SELECT ROUND(100.0*SUM(null_customer_count)/SUM(total_orders),2) FROM order_stats) AS overall_null_pct;",
  ],
  xpAward: 300,
};
