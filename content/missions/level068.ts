import type { Mission } from "./level001";

export const level068: Mission = {
  id: "intern-ticket-068",
  world: "Sky Airlines",
  levelLabel: "Ticket INT-068 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "10:00 AM. Client: Sky Airlines. Priority: Medium.",
    "\"Route planning wants to know which destinations we fly to most — every destination, how many flights land there, busiest first.\"",
  ],
  objective:
    "Select each destination along with how many flights go there, sorted from most flights to fewest.",
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
    "You need one row per destination, not one row per flight — that's a hint about which technique groups rows together.",
    "Two things happen after the grouping: you get a count, and you arrange the results by that count.",
    "Try: SELECT destination, COUNT(*) AS flight_count FROM flights GROUP BY destination ORDER BY flight_count DESC;",
  ],
  expectedColumns: ["destination", "flight_count"],
  expectedRows: [
    ["Mumbai", 3],
    ["Delhi", 3],
    ["Kolkata", 2],
    ["Chennai", 2],
    ["Bangalore", 2],
  ],
  requireRowOrder: false,
  xpAward: 125,
};
