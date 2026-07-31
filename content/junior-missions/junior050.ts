import type { Mission } from "../missions/level001";

export const junior050: Mission = {
  id: "junior-ticket-050",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-050 // Final Assessment 6 of 6",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "02:00 PM. Internal system. Priority: Critical.",
    "\"Last ticket. Leadership wants one summary line for each of two client engagements — Northgate Bank's single largest transaction overall, and City Hospital's busiest doctor by completed appointments. Two completely unrelated questions, one combined answer.\"",
    "\"Rank each dataset on its own terms first, then bring just the winners together. Every piece of this — the ranking, the joins, the combination — you've already built separately, more than once. This is just the last time you'll need to be told that.\"",
  ],
  objective:
    "Select one row for Northgate Bank's single largest transaction (customer name, source label, amount) and one row for City Hospital's busiest doctor by completed appointments (doctor name, source label, count), combined into one result.",
  schemaLabel: "customers, accounts, transactions, doctors, appointments",
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
    CREATE TABLE transactions (
      id INTEGER PRIMARY KEY,
      account_id INTEGER,
      amount INTEGER,
      transaction_date TEXT,
      type TEXT
    );
    CREATE TABLE doctors (
      id INTEGER PRIMARY KEY,
      name TEXT,
      department TEXT,
      years_experience INTEGER
    );
    CREATE TABLE appointments (
      id INTEGER PRIMARY KEY,
      patient_name TEXT,
      doctor_id INTEGER,
      appointment_date TEXT,
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
    INSERT INTO transactions (id, account_id, amount, transaction_date, type) VALUES
      (1, 1, 5000, '2026-07-01', 'deposit'),
      (2, 1, -2000, '2026-07-03', 'withdrawal'),
      (3, 2, 3000, '2026-07-02', 'deposit'),
      (4, 4, 10000, '2026-07-01', 'deposit'),
      (5, 6, 50000, '2026-07-05', 'deposit'),
      (6, 6, -15000, '2026-07-10', 'withdrawal'),
      (7, 8, 2000, '2026-07-04', 'deposit'),
      (8, 10, 80000, '2026-07-06', 'deposit'),
      (9, 10, 20000, '2026-07-12', 'deposit');
    INSERT INTO doctors (id, name, department, years_experience) VALUES
      (1, 'Dr. Ananya Rao', 'Cardiology', 12),
      (2, 'Dr. Vikram Sinha', 'Orthopedics', 8),
      (3, 'Dr. Fatima Sheikh', 'Pediatrics', 15),
      (4, 'Dr. Rajesh Kulkarni', 'Cardiology', 5),
      (5, 'Dr. Meenal Joshi', 'Neurology', 20),
      (6, 'Dr. Arjun Reddy', 'Orthopedics', 3);
    INSERT INTO appointments (id, patient_name, doctor_id, appointment_date, status) VALUES
      (1, 'Ravi Patel', 1, '2026-06-01', 'completed'),
      (2, 'Sunita Devi', 2, '2026-06-02', 'completed'),
      (3, 'Amit Shah', 1, '2026-06-03', 'cancelled'),
      (4, 'Kavya Nair', 3, '2026-06-03', 'completed'),
      (5, 'Rohan Mehta', 1, '2026-06-04', 'completed'),
      (6, 'Priya Iyer', 4, '2026-06-05', 'no_show'),
      (7, 'Sanjay Gupta', 2, '2026-06-05', 'scheduled'),
      (8, 'Neha Verma', 5, '2026-06-06', 'completed'),
      (9, 'Karan Malhotra', 1, '2026-06-07', 'completed'),
      (10, 'Divya Kapoor', 3, '2026-06-08', 'completed'),
      (11, 'Suresh Rao', 5, '2026-06-09', 'completed'),
      (12, 'Anjali Desai', 2, '2026-06-10', 'cancelled');
  `,
  schemaPreview: [
    { table: "customers", columns: ["id", "name", "city", "risk_tier"] },
    {
      table: "accounts",
      columns: ["id", "customer_id", "account_type", "balance", "status"],
    },
    {
      table: "transactions",
      columns: ["id", "account_id", "amount", "transaction_date", "type"],
    },
    { table: "doctors", columns: ["id", "name", "department", "years_experience"] },
    {
      table: "appointments",
      columns: ["id", "patient_name", "doctor_id", "appointment_date", "status"],
    },
  ],
  expectedColumns: ["name", "source", "value"],
  expectedRows: [
    ["Ishita Ghosh", "Northgate Bank - Top Transaction", 80000],
    ["Dr. Ananya Rao", "City Hospital - Most Appointments", 3],
  ],
  requireRowOrder: false,
  hints: [
    "Two independent CTEs, one per client, each ranking its own dataset with a window function — they never need to reference each other.",
    "Both final SELECT statements need exactly three columns in the same order — a name, a fixed text label, and a number — for the combination to work.",
    "Try: WITH ranked_txn AS (SELECT c.name, t.amount, RANK() OVER (ORDER BY t.amount DESC) AS rnk FROM transactions t JOIN accounts a ON t.account_id = a.id JOIN customers c ON a.customer_id = c.id), doc_ranked AS (SELECT d.name, COUNT(*) AS cnt, RANK() OVER (ORDER BY COUNT(*) DESC) AS rnk FROM appointments a JOIN doctors d ON a.doctor_id = d.id WHERE a.status = 'completed' GROUP BY d.name) SELECT name, 'Northgate Bank - Top Transaction' AS source, amount AS value FROM ranked_txn WHERE rnk = 1 UNION SELECT name, 'City Hospital - Most Appointments' AS source, cnt AS value FROM doc_ranked WHERE rnk = 1;",
  ],
  xpAward: 300,
};
