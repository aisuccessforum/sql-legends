import type { Mission } from "../missions/level001";

export const da039: Mission = {
  id: "da-ticket-039",
  world: "Northgate Bank",
  levelLabel: "Ticket DA-039 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "09:00 AM. Client: Northgate Bank. Priority: Medium.",
    "New module — performance. You won't own the production database, but you need to know when to flag a slow query and what to suggest.",
    "\"Reports keep filtering customers by city, and with a bigger table that gets slow — SQLite has to check every single row one by one. An index lets it jump straight to the matching rows instead.\"",
    "\"Create an index called idx_customers_city on the city column, then confirm it actually exists by checking SQLite's own internal catalog.\"",
  ],
  objective:
    "Create an index called idx_customers_city on the city column of customers, then confirm it exists by querying sqlite_master.",
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
  expectedRows: [["idx_customers_city"]],
  requireRowOrder: false,
  hints: [
    "CREATE INDEX index_name ON table_name(column_name) — a statement on its own, no SELECT involved in creating it.",
    "sqlite_master is a built-in table every SQLite database has, listing every table, view, and index that exists — query it like any other table.",
    "Try: CREATE INDEX idx_customers_city ON customers(city); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_customers_city';",
  ],
  xpAward: 200,
};
