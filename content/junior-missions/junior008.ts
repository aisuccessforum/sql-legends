import type { Mission } from "../missions/level001";

export const junior008: Mission = {
  id: "junior-ticket-008",
  world: "Northgate Bank",
  levelLabel: "Ticket JDA-008 // Priority: Critical",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "02:30 PM. Client: Northgate Bank. Priority: Critical.",
    "\"Last one on subqueries — this is where all of it comes together. Find customers who hold a Loan account AND whose total balance across every account they have is below the average total balance of all customers.\"",
    "\"That's three subqueries doing three different jobs: one to find Loan holders, one to total up a single customer's balance, and one to work out the average of everyone's totals. None of them are complicated alone — the skill is knowing which kind to reach for, for each piece.\"",
  ],
  objective:
    "Select the name of every customer with a Loan account whose total balance across all their accounts is below the average total balance of all customers.",
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
  expectedRows: [["Tanya Kapoor"]],
  requireRowOrder: false,
  hints: [
    "Break it into pieces first: which customers hold a Loan (an IN subquery), each customer's own total balance (a correlated scalar subquery), and the average of everyone's totals (a scalar subquery over a derived table of per-customer totals).",
    "The average-of-totals piece needs its own derived table — SUM(balance) grouped by customer_id first, then AVG() over that result.",
    "Try: SELECT c.name FROM customers c WHERE c.id IN (SELECT customer_id FROM accounts WHERE account_type = 'Loan') AND (SELECT SUM(balance) FROM accounts a WHERE a.customer_id = c.id) < (SELECT AVG(total) FROM (SELECT SUM(balance) AS total FROM accounts GROUP BY customer_id));",
  ],
  xpAward: 200,
};
