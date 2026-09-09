import type { Mission } from "../missions/level001";

export const sda002: Mission = {
  id: "sda-ticket-002",
  world: "Northgate Bank",
  levelLabel: "Ticket SDA-002 // Priority: Medium",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "09:40 AM. Client: Northgate Bank. Priority: Medium.",
    "\"Same trick with money instead of counts — total balance held in each account type, as three columns on one row. Use ELSE 0 this time: SUM over an empty set of matches should read as zero, not NULL.\"",
  ],
  objective:
    "In a single row, show the total balance per account type — savings_total, current_total, loan_total.",
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
  expectedColumns: ["savings_total", "current_total", "loan_total"],
  expectedRows: [
    [479000, 284000, -230000],
  ],
  requireRowOrder: false,
  hints: [
    "SUM(CASE WHEN account_type = 'Savings' THEN balance ELSE 0 END) — the ELSE 0 keeps non-matching rows contributing zero instead of NULL.",
    "Loans carry negative balances, so expect the loan column to come out negative — that's the data, not a bug.",
    "Try: SELECT SUM(CASE WHEN account_type = 'Savings' THEN balance ELSE 0 END) AS savings_total, SUM(CASE WHEN account_type = 'Current' THEN balance ELSE 0 END) AS current_total, SUM(CASE WHEN account_type = 'Loan' THEN balance ELSE 0 END) AS loan_total FROM accounts;",
  ],
  xpAward: 225,
};
