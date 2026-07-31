import type { Mission } from "../missions/level001";

export const junior010: Mission = {
  id: "junior-ticket-010",
  world: "City Hospital",
  levelLabel: "Ticket JDA-010 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "09:35 AM. Client: City Hospital. Priority: Medium.",
    "\"You built this exact result with a derived table two tickets ago. Do it again, but as a CTE — doctors with more than 2 appointments. Compare how it reads.\"",
  ],
  objective:
    "Using a CTE of each doctor's appointment count, select doctors with more than 2 appointments.",
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
  expectedColumns: ["name", "appointment_count"],
  expectedRows: [
    ["Dr. Ananya Rao", 4],
    ["Dr. Vikram Sinha", 3],
  ],
  requireRowOrder: false,
  hints: [
    "The JOIN and GROUP BY go inside the CTE, exactly like they would in a derived table.",
    "The outer query is just SELECT * FROM your_cte WHERE ... — the filter happens after the CTE has already been built.",
    "Try: WITH doctor_counts AS (SELECT d.name, COUNT(*) AS appointment_count FROM appointments a JOIN doctors d ON a.doctor_id = d.id GROUP BY d.name) SELECT * FROM doctor_counts WHERE appointment_count > 2;",
  ],
  xpAward: 150,
};
