import type { Mission } from "./level001";

export const level058: Mission = {
  id: "intern-ticket-058",
  world: "City Hospital",
  levelLabel: "Ticket INT-058 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "10:05 AM. Client: City Hospital. Priority: Medium.",
    "\"Cardiology is being audited separately this month. Every appointment tied to a Cardiology doctor, patient and doctor name.\"",
    "\"Notice the filter this time isn't on the appointments table at all — it's on the doctors table. Doesn't matter which table a column lives in once they're joined; you can filter on either.\"",
  ],
  objective:
    "Select the patient name and doctor name for every appointment with a doctor in the 'Cardiology' department.",
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
  expectedColumns: ["patient_name", "doctor_name"],
  expectedRows: [
    ["Ravi Patel", "Dr. Ananya Rao"],
    ["Amit Shah", "Dr. Ananya Rao"],
    ["Rohan Mehta", "Dr. Ananya Rao"],
    ["Priya Iyer", "Dr. Rajesh Kulkarni"],
    ["Karan Malhotra", "Dr. Ananya Rao"],
  ],
  requireRowOrder: false,
  hints: [
    "The department column lives on the doctors table — use that alias when you filter on it.",
    "Everything else about the query stays the same as the last two tickets.",
    "Try: SELECT a.patient_name, d.name AS doctor_name FROM appointments a JOIN doctors d ON a.doctor_id = d.id WHERE d.department = 'Cardiology';",
  ],
  xpAward: 100,
};
