import type { Mission } from "../missions/level001";

export const de039: Mission = {
  id: "de-ticket-039",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-039 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "09:45 AM. Internal system. Priority: High.",
    "\"Volume anomaly detection — flag each day as 'No Load' (zero rows), 'Volume Spike' (more than 2.5× the 3-day rolling average), or 'Normal'. The 420-row spike on 2026-01-18 is three times the prior average.\"",
  ],
  objective:
    "For each daily orders load, show load_date, rows_loaded, rolling 3-day average (prior 3 days only), and a health_flag — sorted chronologically.",
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
  expectedColumns: ["load_date", "rows_loaded", "rolling_avg", "health_flag"],
  expectedRows: [
    ["2026-01-10", 120, null, "Normal"],
    ["2026-01-11", 95, 120, "Normal"],
    ["2026-01-12", 110, 107.5, "Normal"],
    ["2026-01-14", 0, 108.3, "No Load"],
    ["2026-01-15", 132, 68.3, "Normal"],
    ["2026-01-16", 88, 80.7, "Normal"],
    ["2026-01-17", 115, 73.3, "Normal"],
    ["2026-01-18", 420, 111.7, "Volume Spike"],
    ["2026-01-19", 98, 207.7, "Normal"],
    ["2026-01-20", 105, 211, "Normal"],
  ],
  requireRowOrder: true,
  hints: [
    "CTE: ROUND(AVG(rows_loaded) OVER (ORDER BY load_date ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING),1) — the frame excludes the current row for a true prior average.",
    "Try: WITH rolling AS (SELECT load_date, rows_loaded, ROUND(AVG(rows_loaded) OVER (ORDER BY load_date ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING),1) AS rolling_avg FROM daily_loads WHERE table_name='orders') SELECT load_date, rows_loaded, rolling_avg, CASE WHEN rows_loaded=0 THEN 'No Load' WHEN rolling_avg IS NOT NULL AND rows_loaded>rolling_avg*2.5 THEN 'Volume Spike' ELSE 'Normal' END AS health_flag FROM rolling ORDER BY load_date;",
  ],
  xpAward: 275,
};
