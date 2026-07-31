import type { Mission } from "../missions/level001";

export const junior039: Mission = {
  id: "junior-ticket-039",
  world: "Northgate Bank",
  levelLabel: "Ticket JDA-039 // Priority: Critical",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "11:40 AM. Client: Northgate Bank. Priority: Critical.",
    "\"Compliance flag — deposits only, on Savings accounts specifically, and only for High risk-tier customers. Every condition matters here, don't drop one.\"",
  ],
  objective:
    "Select the customer name and amount for every deposit transaction on a Savings account belonging to a High risk-tier customer.",
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
  expectedColumns: ["name", "amount"],
  expectedRows: [
    ["Ishita Ghosh", 80000],
    ["Ishita Ghosh", 20000],
  ],
  requireRowOrder: false,
  hints: [
    "Three separate conditions, one from each table: t.type, a.account_type, and c.risk_tier. AND all three together.",
    "Rajiv Menon is also High risk but has no Savings deposits on record — his Current account activity doesn't qualify.",
    "Try: SELECT c.name, t.amount FROM transactions t JOIN accounts a ON t.account_id = a.id JOIN customers c ON a.customer_id = c.id WHERE t.type = 'deposit' AND c.risk_tier = 'High' AND a.account_type = 'Savings';",
  ],
  xpAward: 225,
};
