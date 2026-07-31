import type { Mission } from "../missions/level001";

export const junior016: Mission = {
  id: "junior-ticket-016",
  world: "Sky Airlines",
  levelLabel: "Ticket JDA-016 // Priority: Critical",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "02:30 PM. Client: Sky Airlines. Priority: Critical.",
    "\"Last one on CTEs. A route counts as 'busy' if we fly it more than once. For busy routes only, what's the average delay on the flights that were actually delayed?\"",
    "\"Two CTEs, chained: one to identify busy routes, one to pull the delayed flights on just those routes. The final query is just an average over what's left.\"",
  ],
  objective:
    "Using two chained CTEs, calculate the average delay (in minutes) of delayed flights on routes flown more than once, labeled avg_delay_busy_routes.",
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
  expectedColumns: ["avg_delay_busy_routes"],
  expectedRows: [[15]],
  requireRowOrder: false,
  hints: [
    "First CTE: group by origin and destination together, keep only the pairs flown more than once.",
    "Second CTE: join flights back to that first CTE on both origin and destination matching, filtered to delayed status.",
    "Try: WITH busy_routes AS (SELECT origin, destination FROM flights GROUP BY origin, destination HAVING COUNT(*) > 1), delayed_on_busy AS (SELECT f.delay_minutes FROM flights f JOIN busy_routes br ON f.origin = br.origin AND f.destination = br.destination WHERE f.status = 'delayed') SELECT AVG(delay_minutes) AS avg_delay_busy_routes FROM delayed_on_busy;",
  ],
  xpAward: 200,
};
