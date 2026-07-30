import type { Mission } from "./level001";

export const level060: Mission = {
  id: "intern-ticket-060",
  world: "City Hospital",
  levelLabel: "Ticket INT-060 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "11:20 AM. Client: City Hospital. Priority: High.",
    "\"Workload report — how many appointments does each doctor actually have? Every doctor's name, next to their appointment count.\"",
    "\"Everything you know about GROUP BY still works after a JOIN. You're just grouping the joined result instead of one raw table.\"",
  ],
  objective:
    "Select each doctor's name along with how many appointments they have.",
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
  expectedColumns: ["doctor_name", "appointment_count"],
  expectedRows: [
    ["Dr. Ananya Rao", 4],
    ["Dr. Fatima Sheikh", 2],
    ["Dr. Meenal Joshi", 2],
    ["Dr. Rajesh Kulkarni", 1],
    ["Dr. Vikram Sinha", 3],
  ],
  requireRowOrder: false,
  hints: [
    "Join first, then group by the doctor's name, exactly like grouping worked before — just on joined data now.",
    "Notice Dr. Arjun Reddy doesn't show up at all here — a plain JOIN only keeps rows that have a match on both sides.",
    "Try: SELECT d.name AS doctor_name, COUNT(*) AS appointment_count FROM appointments a JOIN doctors d ON a.doctor_id = d.id GROUP BY d.name;",
  ],
  xpAward: 100,
};
