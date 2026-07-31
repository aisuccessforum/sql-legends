import type { Mission } from "../missions/level001";

export const junior012: Mission = {
  id: "junior-ticket-012",
  world: "Northgate Bank",
  levelLabel: "Ticket JDA-012 // Priority: High",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "10:55 AM. Client: Northgate Bank. Priority: High.",
    "\"You've solved this exact problem before with nested subqueries — customers below the average total balance. This time build it with two separate CTEs instead: one for everyone's totals, one for the overall average. Cleaner to read when someone else has to maintain it later.\"",
    "\"WITH can define more than one CTE at once — just separate them with a comma. Each one can be used in the final query, or even inside the CTE that comes after it.\"",
  ],
  objective:
    "Using two CTEs — one for each customer's total balance, one for the overall average total — select every customer whose total balance is below the overall average.",
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
    ["Meera Chandrasekaran", 57000],
    ["Arvind Bose", 8000],
    ["Tanya Kapoor", -55000],
    ["Sneha Pillai", 6000],
    ["Farhan Qureshi", 42000],
    ["Nikhil Deshmukh", 0],
  ],
  requireRowOrder: false,
  hints: [
    "Define customer_totals first, then a comma, then overall_avg built from customer_totals — the second CTE can reference the first.",
    "The final query needs customer_totals, customers, and overall_avg all listed after FROM (or joined), even though overall_avg only ever has one row.",
    "Try: WITH customer_totals AS (SELECT customer_id, SUM(balance) AS total_balance FROM accounts GROUP BY customer_id), overall_avg AS (SELECT AVG(total_balance) AS avg_total FROM customer_totals) SELECT c.name, ct.total_balance FROM customer_totals ct JOIN customers c ON c.id = ct.customer_id, overall_avg WHERE ct.total_balance < overall_avg.avg_total;",
  ],
  xpAward: 175,
};
