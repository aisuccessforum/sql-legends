import type { Mission } from "./level001";

export const level059: Mission = {
  id: "intern-ticket-059",
  world: "City Hospital",
  levelLabel: "Ticket INT-059 // Priority: Low",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "10:40 AM. Client: City Hospital. Priority: Low.",
    "\"Front desk wants the full appointment list in date order, earliest first, so they can print the week's schedule.\"",
  ],
  objective:
    "Select the patient name and appointment date for every appointment, sorted from earliest to latest.",
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
  expectedColumns: ["patient_name", "appointment_date"],
  expectedRows: [
    ["Ravi Patel", "2026-06-01"],
    ["Sunita Devi", "2026-06-02"],
    ["Amit Shah", "2026-06-03"],
    ["Kavya Nair", "2026-06-03"],
    ["Rohan Mehta", "2026-06-04"],
    ["Priya Iyer", "2026-06-05"],
    ["Sanjay Gupta", "2026-06-05"],
    ["Neha Verma", "2026-06-06"],
    ["Karan Malhotra", "2026-06-07"],
    ["Divya Kapoor", "2026-06-08"],
    ["Suresh Rao", "2026-06-09"],
    ["Anjali Desai", "2026-06-10"],
  ],
  requireRowOrder: true,
  hints: [
    "The join here doesn't even affect the output columns — it's mostly just practice keeping the JOIN in place while adding ORDER BY.",
    "ORDER BY goes at the very end, same as always, sorting on the appointments table's date column.",
    "Try: SELECT a.patient_name, a.appointment_date FROM appointments a JOIN doctors d ON a.doctor_id = d.id ORDER BY a.appointment_date ASC;",
  ],
  xpAward: 100,
};
