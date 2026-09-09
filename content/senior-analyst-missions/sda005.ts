import type { Mission } from "../missions/level001";

export const sda005: Mission = {
  id: "sda-ticket-005",
  world: "Northgate Bank",
  levelLabel: "Ticket SDA-005 // Priority: Medium",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "11:45 AM. Client: Northgate Bank. Priority: Medium.",
    "\"Averages pivot too — average active Savings balance next to average active Current balance. One subtlety: do NOT use ELSE 0 here. A zero would get averaged in as if it were a real account. Let non-matches stay NULL so AVG skips them entirely.\"",
  ],
  objective:
    "In a single row, show the average balance of active Savings accounts and active Current accounts, each rounded to 2 decimal places.",
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
  expectedColumns: ["avg_savings", "avg_current"],
  expectedRows: [
    [114000, 94666.67],
  ],
  requireRowOrder: false,
  hints: [
    "This is the opposite of the SUM tickets: with AVG, ELSE 0 would poison the average. Leave the CASE without an ELSE so non-matching rows become NULL and get skipped.",
    "Wrap each AVG in ROUND(..., 2).",
    "Try: SELECT ROUND(AVG(CASE WHEN account_type = 'Savings' THEN balance END), 2) AS avg_savings, ROUND(AVG(CASE WHEN account_type = 'Current' THEN balance END), 2) AS avg_current FROM accounts WHERE status = 'active';",
  ],
  xpAward: 250,
};
