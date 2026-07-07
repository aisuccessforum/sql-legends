import type { Mission } from "./level001";
import { level001 } from "./level001";
import { level002 } from "./level002";
import { level003 } from "./level003";
import { level004 } from "./level004";
import { level005 } from "./level005";

/**
 * Every mission, in the exact order players unlock them. Add new
 * missions here as they're written — nothing else needs to change for
 * them to show up in the ticket dashboard.
 */
export const missions: Mission[] = [
  level001,
  level002,
  level003,
  level004,
  level005,
];

/**
 * Modules from the curriculum that don't have written tickets yet.
 * Shown as locked "coming soon" cards below the real ticket queue.
 */
export const upcomingModules: string[] = [
  "Employee Operations",
  "HR Analytics",
  "Project Management",
  "Team Performance",
  "Client Quality Checks",
  "Cross-Team Reporting",
  "Client Readiness Assessment",
  "Final Internship Assessment",
];
