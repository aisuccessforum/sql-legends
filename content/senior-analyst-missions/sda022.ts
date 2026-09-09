import type { Mission } from "../missions/level001";

export const sda022: Mission = {
  id: "sda-ticket-022",
  world: "Northgate Bank",
  levelLabel: "Ticket SDA-022 // Priority: Medium",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "12:45 PM. Client: Northgate Bank. Priority: Medium.",
    "\"The mirror of the orphan check — customers with no accounts at all. One of these is the duplicate you found earlier; this query is how you prove which copy is safe to remove.\"",
  ],
  objective:
    "Select the id and name of every customer who has no accounts.",
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
  expectedColumns: ["id", "name"],
  expectedRows: [
    [9, "Tanya Kapoor"],
  ],
  requireRowOrder: false,
  hints: [
    "Same NOT EXISTS shape as the orphan-accounts ticket, with the tables swapping roles.",
    "The result should look familiar — it's the duplicate Tanya Kapoor row, which is exactly why it's the removable copy.",
    "Try: SELECT c.id, c.name FROM customers c WHERE NOT EXISTS (SELECT 1 FROM accounts a WHERE a.customer_id = c.id);",
  ],
  xpAward: 225,
};
