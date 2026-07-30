import type { Mission } from "./level001";

export const level071: Mission = {
  id: "intern-ticket-071",
  world: "Northgate Bank",
  levelLabel: "Ticket INT-071 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "01:00 PM. Client: Northgate Bank. Priority: High.",
    "New client, and their data is split across two tables again — CUSTOMERS and ACCOUNTS, since one customer can hold more than one account.",
    "\"Relationship managers want each customer's total balance across everything they hold with us — savings, current, loans, all of it added together, one number per customer.\"",
  ],
  objective:
    "Select each customer's name along with the sum of their balance across all accounts.",
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
    "This needs data from both tables, connected the same way you connected doctors and appointments before.",
    "Once connected, group by customer and total up the balance column.",
    "Try: SELECT c.name, SUM(a.balance) AS total_balance FROM customers c JOIN accounts a ON c.id = a.customer_id GROUP BY c.name;",
  ],
  expectedColumns: ["name", "total_balance"],
  expectedRows: [
    ["Arvind Bose", 8000],
    ["Farhan Qureshi", 42000],
    ["Ishita Ghosh", 230000],
    ["Meera Chandrasekaran", 57000],
    ["Nikhil Deshmukh", 0],
    ["Rajiv Menon", 245000],
    ["Sneha Pillai", 6000],
    ["Tanya Kapoor", -55000],
  ],
  requireRowOrder: false,
  xpAward: 125,
};
