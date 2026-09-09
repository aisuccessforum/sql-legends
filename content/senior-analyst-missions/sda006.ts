import type { Mission } from "../missions/level001";

export const sda006: Mission = {
  id: "sda-ticket-006",
  world: "Northgate Bank",
  levelLabel: "Ticket SDA-006 // Priority: Medium",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "12:30 PM. Client: Northgate Bank. Priority: Medium.",
    "\"Customer-level pivot — but only customers holding two or more accounts. One row per customer: their Savings, Current, and Loan totals side by side.\"",
  ],
  objective:
    "For each customer with at least 2 accounts, show their total Savings, Current, and Loan balances as three columns (named savings, current_bal, loan), sorted by name.",
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
  expectedColumns: ["name", "savings", "current_bal", "loan"],
  expectedRows: [
    ["Ishita Ghosh", 310000, 0, -80000],
    ["Meera Chandrasekaran", 45000, 12000, 0],
    ["Rajiv Menon", 15000, 230000, 0],
    ["Tanya Kapoor", 95000, 0, -150000],
  ],
  requireRowOrder: true,
  hints: [
    "The at-least-2-accounts rule is a condition on each GROUP — that's HAVING territory, not WHERE.",
    "current is close to a reserved word — alias that column current_bal to stay safe.",
    "Try: SELECT c.name, SUM(CASE WHEN a.account_type = 'Savings' THEN a.balance ELSE 0 END) AS savings, SUM(CASE WHEN a.account_type = 'Current' THEN a.balance ELSE 0 END) AS current_bal, SUM(CASE WHEN a.account_type = 'Loan' THEN a.balance ELSE 0 END) AS loan FROM customers c JOIN accounts a ON c.id = a.customer_id GROUP BY c.name HAVING COUNT(*) >= 2 ORDER BY c.name;",
  ],
  xpAward: 250,
};
