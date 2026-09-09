import type { Mission } from "../missions/level001";

export const sda048: Mission = {
  id: "sda-ticket-048",
  world: "Northgate Bank",
  levelLabel: "Ticket SDA-048 // Final Assessment 4 of 6",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "12:00 PM. Client: Northgate Bank. Final Assessment.",
    "\"Quick but non-trivial: the raw database still has Omar Farooq's city as NULL. Set it to 'Unknown', then verify with one row: null_cities should be 0, unknown_cities should be 1, total_customers stays at 10.\"",
  ],
  objective:
    "Update NULL cities to 'Unknown', then verify with a single summary row showing null_cities, unknown_cities, and total_customers.",
  schemaLabel: "customers, accounts",
  seedSql: `
    CREATE TABLE customers (
      id INTEGER PRIMARY KEY, name TEXT, city TEXT, risk_tier TEXT
    );
    CREATE TABLE accounts (
      id INTEGER PRIMARY KEY, customer_id INTEGER, account_type TEXT,
      balance INTEGER, status TEXT
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
    { table: "accounts", columns: ["id", "customer_id", "account_type", "balance", "status"] },
  ],
  expectedColumns: ["null_cities", "unknown_cities", "total_customers"],
  expectedRows: [
    [0, 1, 10],
  ],
  requireRowOrder: false,
  hints: [
    "One UPDATE, one verification SELECT — the modification module's exact pattern.",
    "The verification checks three things: the fix happened (0 NULLs), only the right rows were touched (1 Unknown), and no rows vanished (10 total).",
    "Try: UPDATE customers SET city = 'Unknown' WHERE city IS NULL; SELECT (SELECT COUNT(*) FROM customers WHERE city IS NULL) AS null_cities, (SELECT COUNT(*) FROM customers WHERE city = 'Unknown') AS unknown_cities, (SELECT COUNT(*) FROM customers) AS total_customers;",
  ],
  xpAward: 275,
};
