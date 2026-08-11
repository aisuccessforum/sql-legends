import type { Mission } from "../missions/level001";

export const da040: Mission = {
  id: "da-ticket-040",
  world: "Northgate Bank",
  levelLabel: "Ticket DA-040 // Priority: Low",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "09:30 AM. Client: Northgate Bank. Priority: Low.",
    "\"Every report we run joins accounts to customers on customer_id. That column deserves an index more than almost anything else in this database.\"",
  ],
  objective:
    "Create an index called idx_accounts_customer_id on the customer_id column of accounts, then confirm it exists.",
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
  expectedRows: [["idx_accounts_customer_id"]],
  requireRowOrder: false,
  hints: [
    "Same pattern as Ticket DA-039, different table and column.",
    "Columns used constantly in JOIN conditions are usually the best index candidates — this is exactly that kind of column.",
    "Try: CREATE INDEX idx_accounts_customer_id ON accounts(customer_id); SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_accounts_customer_id';",
  ],
  xpAward: 175,
};
