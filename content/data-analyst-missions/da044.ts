import type { Mission } from "../missions/level001";

export const da044: Mission = {
  id: "da-ticket-044",
  world: "Northgate Bank",
  levelLabel: "Ticket DA-044 // Priority: Critical",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "12:00 PM. Client: Northgate Bank. Priority: Critical.",
    "\"Last one on performance. This report runs every single day — total balance per Kolkata customer. Before you hand it off, add the index that would help it run fast at real scale, then run the actual report.\"",
    "\"In production this genuinely matters once a table has millions of rows. On this small a dataset you won't see a speed difference — the habit is what you're building, not a measurable result today.\"",
  ],
  objective:
    "Create an index on customers.city to support this report, then select the name and total balance of every Kolkata customer.",
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
  expectedColumns: ["name", "total_balance"],
  expectedRows: [
    ["Arvind Bose", 8000],
    ["Ishita Ghosh", 230000],
  ],
  requireRowOrder: false,
  hints: [
    "The CREATE INDEX statement doesn't change what the report itself looks like — you've already written this exact JOIN and WHERE and GROUP BY shape many times.",
    "The index name and exact definition aren't being checked here — only that the final report's numbers are correct.",
    "Try: CREATE INDEX idx_customers_city_report ON customers(city); SELECT c.name, SUM(a.balance) AS total_balance FROM customers c JOIN accounts a ON c.id = a.customer_id WHERE c.city = 'Kolkata' GROUP BY c.name;",
  ],
  xpAward: 250,
};
