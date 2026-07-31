import type { Mission } from "../missions/level001";
import { junior001 } from "./junior001";
import { junior002 } from "./junior002";
import { junior003 } from "./junior003";
import { junior004 } from "./junior004";
import { junior005 } from "./junior005";
import { junior006 } from "./junior006";
import { junior007 } from "./junior007";
import { junior008 } from "./junior008";

/**
 * Junior Data Analyst rank missions, in unlock order. Populated module by
 * module the same way the Intern track was built. IDs use the
 * "junior-ticket-XXX" prefix so they can never collide with
 * "intern-ticket-XXX" IDs in the same completedMissions array.
 */
export const juniorMissions: Mission[] = [
  junior001,
  junior002,
  junior003,
  junior004,
  junior005,
  junior006,
  junior007,
  junior008,
];

/**
 * Module names not yet built, shown as locked "coming soon" cards.
 */
export const juniorUpcomingModules: string[] = [
  "Common Table Expressions",
  "Window Functions I",
  "Window Functions II",
  "Advanced Joins",
  "Junior Analyst Capstone Assessment",
];
