import type { Mission } from "../missions/level001";

export const junior043: Mission = {
  id: "junior-ticket-043",
  world: "City Hospital",
  levelLabel: "Ticket JDA-043 // Priority: High",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "03:00 PM. Client: City Hospital. Priority: High.",
    "\"Find every doctor with zero completed appointments — not zero appointments total, zero that actually finished. Cancelled, no-show, and scheduled don't count.\"",
  ],
  objective:
    "Using NOT EXISTS, select the name of every doctor with no completed appointments.",
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
  expectedRows: [["Dr. Rajesh Kulkarni"], ["Dr. Arjun Reddy"]],
  requireRowOrder: false,
  hints: [
    "Dr. Kulkarni does have an appointment on record — it's just a no_show, not completed. That's why NOT EXISTS catches him but a plain 'no appointments at all' check wouldn't.",
    "NOT EXISTS is just EXISTS with the result flipped — same correlated subquery shape.",
    "Try: SELECT d.name FROM doctors d WHERE NOT EXISTS (SELECT 1 FROM appointments a WHERE a.doctor_id = d.id AND a.status = 'completed');",
  ],
  xpAward: 200,
};
