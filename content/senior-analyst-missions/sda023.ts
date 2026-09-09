import type { Mission } from "../missions/level001";

export const sda023: Mission = {
  id: "sda-ticket-023",
  world: "Northgate Bank",
  levelLabel: "Ticket SDA-023 // Priority: High",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "01:30 PM. Client: Northgate Bank. Priority: High.",
    "\"Roll the whole audit into one dashboard row: duplicate names, orphan accounts, missing cities, and illegal negatives — four numbers, one query. This is the health check that runs every morning.\"",
  ],
  objective:
    "In a single row, count the duplicate names, orphaned accounts, customers with missing cities, and non-Loan negative-balance accounts.",
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
  expectedColumns: ["dup_names", "orphan_accounts", "null_cities", "bad_negatives"],
  expectedRows: [
    [1, 1, 1, 1],
  ],
  requireRowOrder: false,
  hints: [
    "Each audit you've already written can run as a scalar subquery — a parenthesized SELECT COUNT used as a column value.",
    "The duplicates count needs its GROUP BY wrapped one level deeper, counting the groups themselves rather than the rows.",
    "Try: SELECT (SELECT COUNT(*) FROM (SELECT name FROM customers GROUP BY name HAVING COUNT(*) > 1)) AS dup_names, (SELECT COUNT(*) FROM accounts a WHERE NOT EXISTS (SELECT 1 FROM customers c WHERE c.id = a.customer_id)) AS orphan_accounts, (SELECT COUNT(*) FROM customers WHERE city IS NULL) AS null_cities, (SELECT COUNT(*) FROM accounts WHERE balance < 0 AND account_type != 'Loan') AS bad_negatives;",
  ],
  xpAward: 275,
};
