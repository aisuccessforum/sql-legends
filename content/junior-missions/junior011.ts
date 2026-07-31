import type { Mission } from "../missions/level001";

export const junior011: Mission = {
  id: "junior-ticket-011",
  world: "Northgate Bank",
  levelLabel: "Ticket JDA-011 // Priority: High",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "10:15 AM. Client: Northgate Bank. Priority: High.",
    "\"Risk team needs anyone whose combined balance across every account is actually negative — not close to zero, genuinely underwater.\"",
  ],
  objective:
    "Using a CTE of each customer's total balance, select the name and total balance of every customer whose total is negative.",
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
  expectedColumns: ["name", "total_balance"],
  expectedRows: [["Tanya Kapoor", -55000]],
  requireRowOrder: false,
  hints: [
    "The CTE gives you customer_id and total_balance, one row per customer — but customer_id isn't a name yet.",
    "JOIN the CTE back to the real customers table to get the name, same as joining any two tables.",
    "Try: WITH customer_totals AS (SELECT customer_id, SUM(balance) AS total_balance FROM accounts GROUP BY customer_id) SELECT c.name, ct.total_balance FROM customer_totals ct JOIN customers c ON c.id = ct.customer_id WHERE ct.total_balance < 0;",
  ],
  xpAward: 150,
};
