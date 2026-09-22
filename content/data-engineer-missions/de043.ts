import type { Mission } from "../missions/level001";

export const de043: Mission = {
  id: "de-ticket-043",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-043 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "12:45 PM. Internal system. Priority: High.",
    "\"Week-over-week consistency — compare each day's rows_loaded to the 7-day rolling average. The 366% spike on 2026-01-18 is almost certainly a backfill or upstream duplicates — not organic growth.\"",
  ],
  objective:
    "For each orders load day, show load_date, rows_loaded, rolling 7-day average (prior 6 days), and deviation from that average (1 decimal percentage) — sorted chronologically.",
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
  expectedColumns: ["load_date", "rows_loaded", "week_avg", "pct_vs_avg"],
  expectedRows: [
    ["2026-01-10", 120, null, null],
    ["2026-01-11", 95, 120, -20.8],
    ["2026-01-12", 110, 107.5, 2.3],
    ["2026-01-14", 0, 81.3, -100],
    ["2026-01-15", 132, 76.3, 73],
    ["2026-01-16", 88, 87.4, 0.7],
    ["2026-01-17", 115, 85, 35.3],
    ["2026-01-18", 420, 90, 366.7],
    ["2026-01-19", 98, 137.5, -28.7],
    ["2026-01-20", 105, 139.4, -24.7],
  ],
  requireRowOrder: true,
  hints: [
    "AVG(rows_loaded) OVER (ORDER BY load_date ROWS BETWEEN 6 PRECEDING AND 1 PRECEDING) for week_avg. pct = ROUND(100.0*(rows-avg)/NULLIF(avg,0),1).",
    "Try: WITH weekly_avg AS (SELECT load_date, rows_loaded, ROUND(AVG(rows_loaded) OVER (ORDER BY load_date ROWS BETWEEN 6 PRECEDING AND 1 PRECEDING),1) AS week_avg FROM daily_loads WHERE table_name='orders') SELECT load_date, rows_loaded, week_avg, ROUND(100.0*(rows_loaded-week_avg)/NULLIF(week_avg,0),1) AS pct_vs_avg FROM weekly_avg ORDER BY load_date;",
  ],
  xpAward: 250,
};
