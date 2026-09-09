import type { Mission } from "../missions/level001";

export const sda007: Mission = {
  id: "sda-ticket-007",
  world: "Northgate Bank",
  levelLabel: "Ticket SDA-007 // Priority: High",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "01:15 PM. Client: Northgate Bank. Priority: High.",
    "\"Percentages now. For each risk tier: what share of its accounts are active? Conditional count divided by total count, as a percentage rounded to one decimal.\"",
    "\"Multiply by 100.0, not 100 — integer division would silently floor everything to zero.\"",
  ],
  objective:
    "For each risk tier, show the percentage of its accounts that are active, rounded to 1 decimal place, sorted by risk tier.",
  schemaLabel: "customers, accounts",
  seedSql: `
    CREATE TABLE customers (
      id INTEGER PRIMARY KEY,
      name TEXT,
      city TEXT,
      risk_tier TEXT
    );
    CREATE TABLE accounts (
      id INTEGER PRIMARY KEY,
      customer_id INTEGER,
      account_type TEXT,
      balance INTEGER,
      status TEXT
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
    {
      table: "accounts",
      columns: ["id", "customer_id", "account_type", "balance", "status"],
    },
  ],
  expectedColumns: ["risk_tier", "active_pct"],
  expectedRows: [
    ["High", 50],
    ["Low", 83.3],
    ["Medium", 50],
  ],
  requireRowOrder: true,
  hints: [
    "The numerator is the conditional count you've been writing all day; the denominator is a plain COUNT(*) of the same group.",
    "100.0 (with the decimal point) forces real division — 100 alone would do integer math and truncate.",
    "Try: SELECT c.risk_tier, ROUND(100.0 * COUNT(CASE WHEN a.status = 'active' THEN 1 END) / COUNT(*), 1) AS active_pct FROM accounts a JOIN customers c ON a.customer_id = c.id GROUP BY c.risk_tier ORDER BY c.risk_tier;",
  ],
  xpAward: 250,
};
