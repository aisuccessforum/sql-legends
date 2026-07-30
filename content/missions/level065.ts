import type { Mission } from "./level001";

export const level065: Mission = {
  id: "intern-ticket-065",
  world: "City Hospital",
  levelLabel: "Ticket INT-065 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "03:30 PM. Client: City Hospital. Priority: High.",
    "\"Last one on City Hospital for now. Cardiology and Orthopedics only — completed appointments per doctor, busiest doctor first. This goes straight to the department heads.\"",
    "\"JOIN, WHERE on two different conditions, GROUP BY, and ORDER BY — every piece from this whole module, in one query. You've written each part separately already.\"",
    "\"Get this right and you've cleared cross-team reporting. Next stop, a proper client readiness assessment — no more hand-holding on which technique to use.\"",
  ],
  objective:
    "For doctors in Cardiology or Orthopedics, select each doctor's name and their count of completed appointments, sorted from most to least.",
  schemaLabel: "appointments, doctors",
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
  expectedColumns: ["doctor_name", "completed_count"],
  expectedRows: [
    ["Dr. Ananya Rao", 3],
    ["Dr. Vikram Sinha", 1],
  ],
  requireRowOrder: true,
  hints: [
    "Two WHERE conditions this time: one on department (using IN, since there are two acceptable values), one on status.",
    "Doctors with zero completed appointments — like Dr. Kulkarni or Dr. Reddy — simply won't appear at all, since the WHERE filter runs before grouping.",
    "Try: SELECT d.name AS doctor_name, COUNT(*) AS completed_count FROM appointments a JOIN doctors d ON a.doctor_id = d.id WHERE a.status = 'completed' AND d.department IN ('Cardiology', 'Orthopedics') GROUP BY d.name ORDER BY completed_count DESC;",
  ],
  xpAward: 100,
};
