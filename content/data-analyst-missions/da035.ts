import type { Mission } from "../missions/level001";

export const da035: Mission = {
  id: "da-ticket-035",
  world: "Northgate Bank",
  levelLabel: "Ticket DA-035 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "10:10 AM. Client: Northgate Bank. Priority: Medium.",
    "\"Total active balance by risk tier, using the view. Risk team wants exposure numbers, not individual accounts.\"",
  ],
  objective:
    "Using active_accounts_view, select the total active balance for each risk tier.",
  schemaLabel: "customers, accounts, active_accounts_view",
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
    CREATE VIEW active_accounts_view AS
      SELECT a.id, a.customer_id, a.account_type, a.balance, a.status,
             c.name AS customer_name, c.risk_tier
      FROM accounts a JOIN customers c ON a.customer_id = c.id
      WHERE a.status = 'active';
  `,
  schemaPreview: [
    { table: "customers", columns: ["id", "name", "city", "risk_tier"] },
    {
      table: "accounts",
      columns: ["id", "customer_id", "account_type", "balance", "status"],
    },
    {
      table: "active_accounts_view",
      columns: [
        "id",
        "customer_id",
        "account_type",
        "balance",
        "status",
        "customer_name",
        "risk_tier",
      ],
    },
  ],
  expectedColumns: ["risk_tier", "total"],
  expectedRows: [
    ["High", 540000],
    ["Low", 8000],
    ["Medium", 42000],
  ],
  requireRowOrder: false,
  hints: [
    "GROUP BY and SUM work over a view exactly as they would over a real table — nothing about aggregation changes.",
    "The view already limits you to active accounts, so this total only reflects live exposure, not dormant or closed balances.",
    "Try: SELECT risk_tier, SUM(balance) AS total FROM active_accounts_view GROUP BY risk_tier;",
  ],
  xpAward: 175,
};
