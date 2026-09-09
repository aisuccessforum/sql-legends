import type { Mission } from "../missions/level001";

export const sda008: Mission = {
  id: "sda-ticket-008",
  world: "Northgate Bank",
  levelLabel: "Ticket SDA-008 // Priority: Critical",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "02:00 PM. Client: Northgate Bank. Priority: Critical.",
    "\"Module capstone. The full portfolio matrix: statuses as rows, account types as columns, counts in every cell, plus a row total on the right. This exact report goes to the board.\"",
  ],
  objective:
    "For each status, count Savings, Current, and Loan accounts as columns, plus a total column, sorted by status.",
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
  expectedColumns: ["status", "savings_count", "current_count", "loan_count", "total"],
  expectedRows: [
    ["active", 4, 3, 1, 8],
    ["closed", 1, 0, 0, 1],
    ["dormant", 2, 0, 1, 3],
  ],
  requireRowOrder: true,
  hints: [
    "Three conditional counts plus one unconditional COUNT(*) — the total column doesn't need a CASE at all.",
    "GROUP BY status makes the rows this time; the types make the columns.",
    "Try: SELECT status, COUNT(CASE WHEN account_type = 'Savings' THEN 1 END) AS savings_count, COUNT(CASE WHEN account_type = 'Current' THEN 1 END) AS current_count, COUNT(CASE WHEN account_type = 'Loan' THEN 1 END) AS loan_count, COUNT(*) AS total FROM accounts GROUP BY status ORDER BY status;",
  ],
  xpAward: 275,
};
