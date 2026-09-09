import type { Mission } from "../missions/level001";

export const sda024: Mission = {
  id: "sda-ticket-024",
  world: "Northgate Bank",
  levelLabel: "Ticket SDA-024 // Priority: Critical",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "02:15 PM. Client: Northgate Bank. Priority: Critical.",
    "\"Module capstone — fix what you found. Delete the orphaned accounts, delete the duplicate customer (id 9, the copy with no accounts), and set missing cities to 'Unknown'. Then re-run the health check: duplicates, orphans, and missing cities should all read zero, alongside the surviving customer count.\"",
  ],
  objective:
    "Fix the audit findings (delete orphan accounts, delete customer id 9, set NULL cities to 'Unknown'), then verify with one row: dup_names, orphan_accounts, null_cities, and total_customers.",
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
  expectedColumns: ["dup_names", "orphan_accounts", "null_cities", "total_customers"],
  expectedRows: [
    [0, 0, 0, 9],
  ],
  requireRowOrder: false,
  hints: [
    "Three fixes from the modification module — two DELETEs and an UPDATE — followed by the same health-check row you built last ticket, with a customer count added.",
    "Inside a DELETE's NOT EXISTS, refer to the table by its full name (accounts.customer_id) — DELETE doesn't take an alias the way SELECT does.",
    "Try: DELETE FROM accounts WHERE NOT EXISTS (SELECT 1 FROM customers c WHERE c.id = accounts.customer_id); DELETE FROM customers WHERE id = 9; UPDATE customers SET city = 'Unknown' WHERE city IS NULL; SELECT (SELECT COUNT(*) FROM (SELECT name FROM customers GROUP BY name HAVING COUNT(*) > 1)) AS dup_names, (SELECT COUNT(*) FROM accounts a WHERE NOT EXISTS (SELECT 1 FROM customers c WHERE c.id = a.customer_id)) AS orphan_accounts, (SELECT COUNT(*) FROM customers WHERE city IS NULL) AS null_cities, (SELECT COUNT(*) FROM customers) AS total_customers;",
  ],
  xpAward: 300,
};
