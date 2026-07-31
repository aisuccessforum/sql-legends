import type { Mission } from "../missions/level001";

export const junior048: Mission = {
  id: "junior-ticket-048",
  world: "Sky Airlines",
  levelLabel: "Ticket JDA-048 // Final Assessment 4 of 6",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "12:00 PM. Client: Sky Airlines. Priority: Critical.",
    "\"For every route that had a delay, show me the single worst-delayed flight on that route. Routes with no delays at all just aren't part of this report.\"",
  ],
  objective:
    "For each route (origin and destination) with at least one delayed flight, select the flight with the longest delay.",
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
  expectedColumns: ["flight_number", "origin", "destination", "delay_minutes"],
  expectedRows: [
    ["SA105", "Chennai", "Delhi", 20],
    ["SA107", "Kolkata", "Mumbai", 90],
    ["SA102", "Mumbai", "Bangalore", 45],
    ["SA111", "Mumbai", "Delhi", 15],
  ],
  requireRowOrder: false,
  hints: [
    "Filter to delayed flights before ranking anything — on-time and cancelled flights shouldn't even enter the picture.",
    "A route is two columns together, and every route in this dataset only has one delayed flight — so the ranking is real, it just doesn't have to break any ties this time.",
    "Try: WITH ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY origin, destination ORDER BY delay_minutes DESC) AS rn FROM flights WHERE status = 'delayed') SELECT flight_number, origin, destination, delay_minutes FROM ranked WHERE rn = 1;",
  ],
  xpAward: 250,
};
