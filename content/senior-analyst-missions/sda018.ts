import type { Mission } from "../missions/level001";

export const sda018: Mission = {
  id: "sda-ticket-018",
  world: "Northgate Bank",
  levelLabel: "Ticket SDA-018 // Priority: Critical",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "09:45 AM. Client: Northgate Bank. Priority: Critical.",
    "\"Orphan check. Every account's customer_id should point at a real customer — find any account whose customer doesn't exist. Money attached to nobody is an auditor's nightmare.\"",
  ],
  objective:
    "Select the id and customer_id of every account whose customer_id matches no customer.",
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
  expectedColumns: ["id", "customer_id"],
  expectedRows: [
    [13, 99],
  ],
  requireRowOrder: false,
  hints: [
    "This is existence-checking in reverse — you want accounts where NO matching customer row exists.",
    "NOT EXISTS with a correlated subquery is the cleanest tool for this, and you learned it back in the Junior joins module.",
    "Try: SELECT a.id, a.customer_id FROM accounts a WHERE NOT EXISTS (SELECT 1 FROM customers c WHERE c.id = a.customer_id);",
  ],
  xpAward: 250,
};
