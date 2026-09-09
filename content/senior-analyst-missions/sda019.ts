import type { Mission } from "../missions/level001";

export const sda019: Mission = {
  id: "sda-ticket-019",
  world: "Northgate Bank",
  levelLabel: "Ticket SDA-019 // Priority: Medium",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "10:30 AM. Client: Northgate Bank. Priority: Medium.",
    "\"NULL audit — any customer missing a city. Compliance needs a location on file for everyone.\"",
  ],
  objective:
    "Select the name and risk tier of every customer whose city is missing.",
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
  expectedColumns: ["name", "risk_tier"],
  expectedRows: [
    ["Omar Farooq", "Medium"],
  ],
  requireRowOrder: false,
  hints: [
    "Missing means NULL, and NULL needs IS NULL — an equals comparison with NULL never matches anything.",
    "Try: SELECT name, risk_tier FROM customers WHERE city IS NULL;",
    "This is deliberately quick — real audits are checklists of many small queries exactly like this one.",
  ],
  xpAward: 200,
};
