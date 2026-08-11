import type { Mission } from "../missions/level001";

export const da042: Mission = {
  id: "da-ticket-042",
  world: "Northgate Bank",
  levelLabel: "Ticket DA-042 // Priority: Low",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "10:35 AM. Client: Northgate Bank. Priority: Low.",
    "\"Data governance wants a guarantee, not just a suggestion — no two customers should ever share the exact same name in this table. A regular index speeds things up, but doesn't enforce anything.\"",
  ],
  objective:
    "Create a unique index called idx_customers_name_unique on the name column of customers, then confirm it exists.",
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
  expectedColumns: ["name"],
  expectedRows: [["idx_customers_name_unique"]],
  requireRowOrder: false,
  hints: [
    "Add the word UNIQUE right before INDEX — everything else about the syntax stays the same.",
    "A unique index does two jobs at once: it speeds up lookups on that column, and it stops a second row from ever using the same value.",
    "Try: CREATE UNIQUE INDEX idx_customers_name_unique ON customers(name); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_customers_name_unique';",
  ],
  xpAward: 200,
};
