import type { Mission } from "../missions/level001";

export const de042: Mission = {
  id: "de-ticket-042",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-042 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "12:00 PM. Internal system. Priority: High.",
    "\"Gap detection — a missing date in daily_loads means the pipeline didn't run. LEAD() on the sorted date list: if the next date is more than one calendar day ahead, there's a gap. The pipeline was skipped on 2026-01-13.\"",
  ],
  objective:
    "Find dates where the next daily_loads entry for 'orders' is more than one day away — showing the last date before the gap, the next date after it, and how many days are missing.",
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
  expectedColumns: ["last_load_before_gap", "next_load_after_gap", "missing_days"],
  expectedRows: [
    ["2026-01-12", "2026-01-14", 1],
  ],
  requireRowOrder: false,
  hints: [
    "CTE with LEAD(load_date) OVER (ORDER BY load_date). Filter WHERE julianday(next_date)-julianday(load_date) > 1. missing_days = difference minus 1.",
    "Try: WITH dates AS (SELECT DISTINCT load_date FROM daily_loads WHERE table_name='orders'), with_next AS (SELECT load_date, LEAD(load_date) OVER (ORDER BY load_date) AS next_date FROM dates) SELECT load_date AS last_load_before_gap, next_date AS next_load_after_gap, CAST(julianday(next_date)-julianday(load_date) AS INTEGER)-1 AS missing_days FROM with_next WHERE CAST(julianday(next_date)-julianday(load_date) AS INTEGER) > 1;",
  ],
  xpAward: 250,
};
