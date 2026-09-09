import type { Mission } from "../missions/level001";

export const sda045: Mission = {
  id: "sda-ticket-045",
  world: "Northgate Bank",
  levelLabel: "Ticket SDA-045 // Final Assessment 1 of 6",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "09:00 AM. Client: Northgate Bank. Final Assessment.",
    "Six tickets. No technique named, no module label — everything you need has been taught.",
    "\"Risk dashboard: for each risk tier, the count of active, dormant, and closed accounts as separate columns, and the percentage of that tier's accounts that are active. Pivot meets ratio, one row per tier.\"",
  ],
  objective:
    "For each risk tier, show active, dormant, and closed account counts plus active percentage (1 decimal), sorted by risk tier.",
  schemaLabel: "customers, accounts",
  seedSql: `
    CREATE TABLE customers (
      id INTEGER PRIMARY KEY, name TEXT, city TEXT, risk_tier TEXT
    );
    CREATE TABLE accounts (
      id INTEGER PRIMARY KEY, customer_id INTEGER, account_type TEXT,
      balance INTEGER, status TEXT
    );
    INSERT INTO customers (id, name, city, risk_tier) VALUES
      (1, 'Meera Chandrasekaran', 'Chennai', 'Low'),
      (2, 'Arvind Bose', 'Kolkata', 'Medium'),
      (3, 'Tanya Kapoor', 'Delhi', 'Low'),
      (4, 'Rajiv Menon', 'Mumbai', 'High'),
      (5, 'Sneha Pillai', 'Bangalore', 'Low'),
      (6, 'Farhan Qureshi', 'Hyderabad', 'Medium'),
      (7, 'Ishita Ghosh', 'Kolkata', 'High'),
      (8, 'Nikhil Deshmukh', 'Pune', 'Low');
    INSERT INTO accounts (id, customer_id, account_type, balance, status) VALUES
      (1, 1, 'Savings', 45000, 'active'),
      (2, 1, 'Current', 12000, 'active'),
      (3, 2, 'Savings', 8000, 'dormant'),
      (4, 3, 'Savings', 95000, 'active'),
      (5, 3, 'Loan', -150000, 'active'),
      (6, 4, 'Current', 230000, 'active'),
      (7, 4, 'Savings', 15000, 'closed'),
      (8, 5, 'Savings', 6000, 'active'),
      (9, 6, 'Current', 42000, 'active'),
      (10, 7, 'Savings', 310000, 'active'),
      (11, 7, 'Loan', -80000, 'dormant'),
      (12, 8, 'Savings', 0, 'dormant');
  `,
  schemaPreview: [
    { table: "customers", columns: ["id", "name", "city", "risk_tier"] },
    { table: "accounts", columns: ["id", "customer_id", "account_type", "balance", "status"] },
  ],
  expectedColumns: ["risk_tier", "active_count", "dormant_count", "closed_count", "active_pct"],
  expectedRows: [
    ["High", 2, 1, 1, 50],
    ["Low", 5, 1, 0, 83.3],
    ["Medium", 1, 1, 0, 50],
  ],
  requireRowOrder: true,
  hints: [
    "Conditional counts from the pivot module give the three columns; the ratio from the ratios module gives the percentage — both over the same JOIN and GROUP BY.",
    "The percentage denominator is COUNT(*) of the whole group, not just the active slice.",
    "Try: SELECT c.risk_tier, COUNT(CASE WHEN a.status = 'active' THEN 1 END) AS active_count, COUNT(CASE WHEN a.status = 'dormant' THEN 1 END) AS dormant_count, COUNT(CASE WHEN a.status = 'closed' THEN 1 END) AS closed_count, ROUND(100.0 * COUNT(CASE WHEN a.status = 'active' THEN 1 END) / COUNT(*), 1) AS active_pct FROM accounts a JOIN customers c ON a.customer_id = c.id GROUP BY c.risk_tier ORDER BY c.risk_tier;",
  ],
  xpAward: 300,
};
