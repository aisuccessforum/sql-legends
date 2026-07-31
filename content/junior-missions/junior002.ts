import type { Mission } from "../missions/level001";

export const junior002: Mission = {
  id: "junior-ticket-002",
  world: "Northgate Bank",
  levelLabel: "Ticket JDA-002 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "09:35 AM. Client: Northgate Bank. Priority: Medium.",
    "\"Same tool, the positive version this time. Find every customer who holds at least one Loan account — anyone appearing in accounts with account_type Loan, regardless of anything else about them.\"",
  ],
  objective:
    "Select the name of every customer whose id appears in the accounts table with account_type 'Loan'.",
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
  expectedColumns: ["name"],
  expectedRows: [["Tanya Kapoor"], ["Ishita Ghosh"]],
  requireRowOrder: false,
  hints: [
    "This time you want customers who DO show up — plain IN, not NOT IN.",
    "The inner query filters accounts down to just Loan-type rows first, then returns the customer_id column from what's left.",
    "Try: SELECT name FROM customers WHERE id IN (SELECT customer_id FROM accounts WHERE account_type = 'Loan');",
  ],
  xpAward: 150,
};
