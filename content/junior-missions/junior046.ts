import type { Mission } from "../missions/level001";

export const junior046: Mission = {
  id: "junior-ticket-046",
  world: "City Hospital",
  levelLabel: "Ticket JDA-046 // Final Assessment 2 of 6",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "10:00 AM. Client: City Hospital. Priority: Critical.",
    "\"For each department, I need the busiest doctor — most completed appointments, one per department. Departments with no completed activity at all just don't show up.\"",
  ],
  objective:
    "Select the doctor with the most completed appointments in each department.",
  schemaLabel: "doctors, appointments",
  seedSql: `
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
    { table: "doctors", columns: ["id", "name", "department", "years_experience"] },
    {
      table: "appointments",
      columns: ["id", "patient_name", "doctor_id", "appointment_date", "status"],
    },
  ],
  expectedColumns: ["department", "name", "cnt"],
  expectedRows: [
    ["Cardiology", "Dr. Ananya Rao", 3],
    ["Neurology", "Dr. Meenal Joshi", 2],
    ["Orthopedics", "Dr. Vikram Sinha", 1],
    ["Pediatrics", "Dr. Fatima Sheikh", 2],
  ],
  requireRowOrder: false,
  hints: [
    "Build the per-doctor completed count first, joined and grouped — you've done exactly this before.",
    "Layer a per-department ranking on top of that result, then keep only the top row in each department.",
    "Try: WITH doc_counts AS (SELECT d.department, d.name, COUNT(*) AS cnt FROM appointments a JOIN doctors d ON a.doctor_id = d.id WHERE a.status = 'completed' GROUP BY d.department, d.name), ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY department ORDER BY cnt DESC) AS rn FROM doc_counts) SELECT department, name, cnt FROM ranked WHERE rn = 1;",
  ],
  xpAward: 250,
};
