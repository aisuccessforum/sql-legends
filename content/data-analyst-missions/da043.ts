import type { Mission } from "../missions/level001";

export const da043: Mission = {
  id: "da-ticket-043",
  world: "Northgate Bank",
  levelLabel: "Ticket DA-043 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "11:10 AM. Client: Northgate Bank. Priority: Medium.",
    "\"Two more, in the same batch — an index called idx_a on customers.risk_tier, and one called idx_b on accounts.status. Confirm both exist afterward, in one query.\"",
  ],
  objective:
    "Create an index called idx_a on customers.risk_tier and an index called idx_b on accounts.status, then confirm both exist, sorted by name.",
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
  expectedRows: [["idx_a"], ["idx_b"]],
  requireRowOrder: true,
  hints: [
    "Two separate CREATE INDEX statements, one after another, each ending in its own semicolon.",
    "The final SELECT can check for both names at once using IN, instead of writing two separate lookups.",
    "Try: CREATE INDEX idx_a ON customers(risk_tier); CREATE INDEX idx_b ON accounts(status); SELECT name FROM sqlite_master WHERE type = 'index' AND name IN ('idx_a', 'idx_b') ORDER BY name;",
  ],
  xpAward: 200,
};
