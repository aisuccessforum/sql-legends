import type { Mission } from "../missions/level001";

export const junior013: Mission = {
  id: "junior-ticket-013",
  world: "City Hospital",
  levelLabel: "Ticket JDA-013 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "11:30 AM. Client: City Hospital. Priority: Medium.",
    "\"Chain two CTEs together this time. First, completed appointments per doctor. Second, filter that down to doctors with more than 1. Then the real query just asks which doctors made that second list.\"",
  ],
  objective:
    "Using two chained CTEs, select the name of every doctor with more than 1 completed appointment.",
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
  expectedColumns: ["name"],
  expectedRows: [["Dr. Ananya Rao"], ["Dr. Fatima Sheikh"], ["Dr. Meenal Joshi"]],
  requireRowOrder: false,
  hints: [
    "First CTE: completed appointments grouped by doctor_id, with a count. Second CTE: select doctor_id from the first one, filtered to counts above 1.",
    "The final SELECT can use IN with a subquery on the second CTE, or JOIN it to doctors directly — either works.",
    "Try: WITH completed_appts AS (SELECT doctor_id, COUNT(*) AS cnt FROM appointments WHERE status = 'completed' GROUP BY doctor_id), busy_doctors AS (SELECT doctor_id FROM completed_appts WHERE cnt > 1) SELECT d.name FROM doctors d WHERE d.id IN (SELECT doctor_id FROM busy_doctors);",
  ],
  xpAward: 175,
};
