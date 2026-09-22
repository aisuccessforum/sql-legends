import type { Mission } from "../missions/level001";

export const de041: Mission = {
  id: "de-ticket-041",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-041 // Priority: Medium",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "11:15 AM. Internal system. Priority: Medium.",
    "\"Threshold breach alert — filter to only the days where null_customer_pct exceeded 3%. In production these rows fire an alert. One bad batch on 2026-01-15: 5 nulls in 132 rows = 3.8%.\"",
  ],
  objective:
    "Return only days where null customer percentage exceeded 3.0%, showing load_date, total_orders, null_customer_count, and null_pct.",
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
  expectedColumns: ["load_date", "total_orders", "null_customer_count", "null_pct"],
  expectedRows: [
    ["2026-01-15", 132, 5, 3.8],
  ],
  requireRowOrder: false,
  hints: [
    "WHERE ROUND(100.0*null_customer_count/total_orders,1) > 3.0.",
    "Try: SELECT load_date, total_orders, null_customer_count, ROUND(100.0*null_customer_count/total_orders,1) AS null_pct FROM order_stats WHERE ROUND(100.0*null_customer_count/total_orders,1) > 3.0 ORDER BY load_date;",
  ],
  xpAward: 200,
};
