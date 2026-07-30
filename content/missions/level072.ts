import type { Mission } from "./level001";

export const level072: Mission = {
  id: "intern-ticket-072",
  world: "Northgate Bank",
  levelLabel: "Ticket INT-072 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "01:45 PM. Client: Northgate Bank. Priority: Medium.",
    "\"Narrow that list down for the premium banking outreach — only customers whose combined balance is over ₹100,000.\"",
  ],
  objective:
    "Select each customer's name and total balance, but only for customers whose total exceeds 100000.",
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
  hints: [
    "Same query as last ticket, with one more piece added on at the end.",
    "The threshold applies to the summed total, not to any single account — that tells you which clause it belongs in.",
    "Try: SELECT c.name, SUM(a.balance) AS total_balance FROM customers c JOIN accounts a ON c.id = a.customer_id GROUP BY c.name HAVING SUM(a.balance) > 100000;",
  ],
  expectedColumns: ["name", "total_balance"],
  expectedRows: [
    ["Ishita Ghosh", 230000],
    ["Rajiv Menon", 245000],
  ],
  requireRowOrder: false,
  xpAward: 125,
};
