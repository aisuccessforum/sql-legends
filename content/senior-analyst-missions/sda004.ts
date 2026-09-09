import type { Mission } from "../missions/level001";

export const sda004: Mission = {
  id: "sda-ticket-004",
  world: "Northgate Bank",
  levelLabel: "Ticket SDA-004 // Priority: High",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "11:00 AM. Client: Northgate Bank. Priority: High.",
    "\"Same matrix, but balances instead of counts — and only active accounts. Risk exposure by tier and product, one screen.\"",
  ],
  objective:
    "For each risk tier, show the total active balance in Savings, Current, and Loan accounts as three columns, sorted by risk tier.",
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
  expectedColumns: ["risk_tier", "savings_total", "current_total", "loan_total"],
  expectedRows: [
    ["High", 310000, 230000, 0],
    ["Low", 146000, 12000, -150000],
    ["Medium", 0, 42000, 0],
  ],
  requireRowOrder: true,
  hints: [
    "The active-only rule is a plain WHERE before any grouping happens — it applies to the whole matrix at once.",
    "SUM with ELSE 0 per account type, grouped by tier — the same two-dimensional shape as the last ticket.",
    "Try: SELECT c.risk_tier, SUM(CASE WHEN a.account_type = 'Savings' THEN a.balance ELSE 0 END) AS savings_total, SUM(CASE WHEN a.account_type = 'Current' THEN a.balance ELSE 0 END) AS current_total, SUM(CASE WHEN a.account_type = 'Loan' THEN a.balance ELSE 0 END) AS loan_total FROM accounts a JOIN customers c ON a.customer_id = c.id WHERE a.status = 'active' GROUP BY c.risk_tier ORDER BY c.risk_tier;",
  ],
  xpAward: 250,
};
