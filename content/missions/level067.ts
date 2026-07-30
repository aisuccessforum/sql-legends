import type { Mission } from "./level001";

export const level067: Mission = {
  id: "intern-ticket-067",
  world: "Sky Airlines",
  levelLabel: "Ticket INT-067 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "09:15 AM. Client: Sky Airlines. Priority: Medium.",
    "\"When a flight actually gets delayed, how long is the average wait? Cancelled flights don't have a delay time, they just don't happen — don't let those confuse the math.\"",
  ],
  objective:
    "Find the average delay time, in minutes, for flights with a status of 'delayed', labeling the result as avg_delay.",
  schemaLabel: "flights",
  seedSql: `
    CREATE TABLE flights (
      id INTEGER PRIMARY KEY,
      flight_number TEXT,
      origin TEXT,
      destination TEXT,
      status TEXT,
      passenger_count INTEGER,
      delay_minutes INTEGER
    );
    INSERT INTO flights (id, flight_number, origin, destination, status, passenger_count, delay_minutes) VALUES
      (1, 'SA101', 'Mumbai', 'Delhi', 'on_time', 180, NULL),
      (2, 'SA102', 'Mumbai', 'Bangalore', 'delayed', 165, 45),
      (3, 'SA103', 'Delhi', 'Chennai', 'on_time', 190, NULL),
      (4, 'SA104', 'Bangalore', 'Mumbai', 'cancelled', 0, NULL),
      (5, 'SA105', 'Chennai', 'Delhi', 'delayed', 175, 20),
      (6, 'SA106', 'Mumbai', 'Kolkata', 'on_time', 200, NULL),
      (7, 'SA107', 'Kolkata', 'Mumbai', 'delayed', 150, 90),
      (8, 'SA108', 'Delhi', 'Bangalore', 'on_time', 185, NULL),
      (9, 'SA109', 'Bangalore', 'Chennai', 'cancelled', 0, NULL),
      (10, 'SA110', 'Chennai', 'Mumbai', 'on_time', 195, NULL),
      (11, 'SA111', 'Mumbai', 'Delhi', 'delayed', 170, 15),
      (12, 'SA112', 'Delhi', 'Kolkata', 'on_time', 160, NULL);
  `,
  schemaPreview: [
    {
      table: "flights",
      columns: [
        "id",
        "flight_number",
        "origin",
        "destination",
        "status",
        "passenger_count",
        "delay_minutes",
      ],
    },
  ],
  hints: [
    "\"Average\" of a number column, for a specific subset of rows — you've done this shape before, just with a new dataset.",
    "Narrow down to the right rows before you summarize them.",
    "Try: SELECT AVG(delay_minutes) AS avg_delay FROM flights WHERE status = 'delayed';",
  ],
  expectedColumns: ["avg_delay"],
  expectedRows: [[42.5]],
  requireRowOrder: false,
  xpAward: 125,
};
