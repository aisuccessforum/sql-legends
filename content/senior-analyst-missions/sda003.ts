import type { Mission } from "../missions/level001";

export const sda003: Mission = {
  id: "sda-ticket-003",
  world: "Northgate Bank",
  levelLabel: "Ticket SDA-003 // Priority: High",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "10:20 AM. Client: Northgate Bank. Priority: High.",
    "\"Now the real pivot — a full cross-tab. Risk tiers as rows, statuses as columns, account counts in the cells. This is the shape every executive matrix report takes.\"",
  ],
  objective:
    "For each risk tier, count active, dormant, and closed accounts as three separate columns, sorted by risk tier.",
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
  expectedColumns: ["risk_tier", "active_count", "dormant_count", "closed_count"],
  expectedRows: [
    ["High", 2, 1, 1],
    ["Low", 5, 1, 0],
    ["Medium", 1, 1, 0],
  ],
  requireRowOrder: true,
  hints: [
    "The GROUP BY makes the rows (risk tiers); the CASE-inside-COUNT expressions make the columns. Two dimensions, one query.",
    "You need a JOIN first — risk_tier lives on customers, status on accounts.",
    "Try: SELECT c.risk_tier, COUNT(CASE WHEN a.status = 'active' THEN 1 END) AS active_count, COUNT(CASE WHEN a.status = 'dormant' THEN 1 END) AS dormant_count, COUNT(CASE WHEN a.status = 'closed' THEN 1 END) AS closed_count FROM accounts a JOIN customers c ON a.customer_id = c.id GROUP BY c.risk_tier ORDER BY c.risk_tier;",
  ],
  xpAward: 250,
};
