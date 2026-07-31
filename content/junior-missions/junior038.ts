import type { Mission } from "../missions/level001";

export const junior038: Mission = {
  id: "junior-ticket-038",
  world: "Northgate Bank",
  levelLabel: "Ticket JDA-038 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "11:00 AM. Client: Northgate Bank. Priority: Medium.",
    "\"Total transaction volume per customer, across every account they hold. One number per person.\"",
  ],
  objective:
    "Select each customer's name along with the sum of their transaction amounts, across all their accounts.",
  schemaLabel: "customers, accounts, transactions",
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
    CREATE TABLE transactions (
      id INTEGER PRIMARY KEY,
      account_id INTEGER,
      amount INTEGER,
      transaction_date TEXT,
      type TEXT
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
    INSERT INTO transactions (id, account_id, amount, transaction_date, type) VALUES
      (1, 1, 5000, '2026-07-01', 'deposit'),
      (2, 1, -2000, '2026-07-03', 'withdrawal'),
      (3, 2, 3000, '2026-07-02', 'deposit'),
      (4, 4, 10000, '2026-07-01', 'deposit'),
      (5, 6, 50000, '2026-07-05', 'deposit'),
      (6, 6, -15000, '2026-07-10', 'withdrawal'),
      (7, 8, 2000, '2026-07-04', 'deposit'),
      (8, 10, 80000, '2026-07-06', 'deposit'),
      (9, 10, 20000, '2026-07-12', 'deposit');
  `,
  schemaPreview: [
    { table: "customers", columns: ["id", "name", "city", "risk_tier"] },
    {
      table: "accounts",
      columns: ["id", "customer_id", "account_type", "balance", "status"],
    },
    {
      table: "transactions",
      columns: ["id", "account_id", "amount", "transaction_date", "type"],
    },
  ],
  expectedColumns: ["name", "total_transacted"],
  expectedRows: [
    ["Ishita Ghosh", 100000],
    ["Meera Chandrasekaran", 6000],
    ["Rajiv Menon", 35000],
    ["Sneha Pillai", 2000],
    ["Tanya Kapoor", 10000],
  ],
  requireRowOrder: false,
  hints: [
    "Same three-table join as last ticket, with GROUP BY and SUM added on top — nothing about the join itself changes.",
    "Customers with zero transactions on record won't appear here at all, since an INNER JOIN drops unmatched rows.",
    "Try: SELECT c.name, SUM(t.amount) AS total_transacted FROM transactions t JOIN accounts a ON t.account_id = a.id JOIN customers c ON a.customer_id = c.id GROUP BY c.name;",
  ],
  xpAward: 200,
};
