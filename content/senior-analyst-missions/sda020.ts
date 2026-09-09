import type { Mission } from "../missions/level001";

export const sda020: Mission = {
  id: "sda-ticket-020",
  world: "Northgate Bank",
  levelLabel: "Ticket SDA-020 // Priority: High",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "11:15 AM. Client: Northgate Bank. Priority: High.",
    "\"Average active balance per customer, for the first four customers by id. One of them has no active accounts at all — a naive division would crash or lie. NULLIF turns a zero denominator into NULL, and division by NULL yields NULL: the honest answer for 'no active accounts'.\"",
  ],
  objective:
    "For customers with id 1 through 4, show each name and their average active-account balance (total active balance divided by active account count, rounded to 2 places) — NULL when they have no active accounts. Sort by name.",
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
      (8, 'Nikhil Deshmukh', 'Pune', 'Low'),
      (9, 'Tanya Kapoor', 'Delhi', 'Low'),
      (10, 'Omar Farooq', NULL, 'Medium');
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
      (12, 8, 'Savings', 0, 'dormant'),
      (13, 99, 'Savings', 5000, 'active'),
      (14, 10, 'Current', 20000, 'active'),
      (15, 5, 'Savings', -2000, 'active');
  `,
  schemaPreview: [
    { table: "customers", columns: ["id", "name", "city", "risk_tier"] },
    {
      table: "accounts",
      columns: ["id", "customer_id", "account_type", "balance", "status"],
    },
  ],
  expectedColumns: ["name", "avg_active_balance"],
  expectedRows: [
    ["Arvind Bose", null],
    ["Meera Chandrasekaran", 28500],
    ["Rajiv Menon", 230000],
    ["Tanya Kapoor", -27500],
  ],
  requireRowOrder: true,
  hints: [
    "NULLIF(x, 0) returns NULL when x is 0, and dividing by NULL gives NULL instead of an error — that's the whole trick.",
    "Multiply by 1.0 before dividing so the average isn't silently floored by integer division. A LEFT JOIN keeps customers with no accounts in the result.",
    "Try: SELECT c.name, ROUND(SUM(CASE WHEN a.status = 'active' THEN a.balance ELSE 0 END) * 1.0 / NULLIF(COUNT(CASE WHEN a.status = 'active' THEN 1 END), 0), 2) AS avg_active_balance FROM customers c LEFT JOIN accounts a ON c.id = a.customer_id WHERE c.id <= 4 GROUP BY c.name ORDER BY c.name;",
  ],
  xpAward: 275,
};
