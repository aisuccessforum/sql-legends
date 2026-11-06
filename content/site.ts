// ── Edit these values; they feed the landing page, legal pages and paywall. ──
export const SITE = {
  product: "SQL Legends",
  brand: "AstraMind Analytics",
  domain: "sql.aisuccessforum.online",
  seller: "AI Success Forum",          // TODO: confirm legal seller name
  sellerAddress: "C2-101 Sanghvi Valley, Parsik Nagar, Thane, Maharashtra, India", // TODO: full registered address
  phone: "+91 99201 45556",                  // TODO: real phone (Cashfree KYC needs a valid number)
  supportEmail: "support@aisuccessforum.online", // TODO: confirm
  priceInr: 999,                             // bundle for all paid ranks, no GST
  updated: "3 November 2026",
};

export const PAID_RANK_COUNT = 8;

export const CURRICULUM = [
  { rank: "Intern", tickets: 80, free: true, focus: "SELECT · WHERE · GROUP BY · JOINs · Subqueries" },
  { rank: "Junior Data Analyst", tickets: 50, focus: "DISTINCT · CASE WHEN · Correlated subqueries · NULLs" },
  { rank: "Data Analyst", tickets: 50, focus: "Window functions · PARTITION BY · LAG · Running totals" },
  { rank: "Senior Data Analyst", tickets: 50, focus: "CTEs · UNION · Self-joins · Pivot · EXISTS" },
  { rank: "BI Developer", tickets: 50, focus: "ROLLUP · Time intelligence · Star schema · UPSERTs" },
  { rank: "Analytics Engineer", tickets: 50, focus: "CTE models · Idempotency · Tests · Incremental logic" },
  { rank: "Data Engineer", tickets: 50, focus: "ETL · Deduplication · SCD Types 1 & 2 · Pipeline health" },
  { rank: "Staff Analyst", tickets: 50, focus: "Statistics · A/B testing · Regression · Outlier detection" },
  { rank: "Principal Analyst", tickets: 50, focus: "Cohorts · Funnels · Attribution · Forecasting · Experiments" },
];
