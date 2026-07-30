import type { Mission } from "./level001";
import { level001 } from "./level001";
import { level002 } from "./level002";
import { level003 } from "./level003";
import { level004 } from "./level004";
import { level005 } from "./level005";
import { level006 } from "./level006";
import { level007 } from "./level007";
import { level008 } from "./level008";
import { level009 } from "./level009";
import { level010 } from "./level010";
import { level011 } from "./level011";
import { level012 } from "./level012";
import { level013 } from "./level013";
import { level014 } from "./level014";
import { level015 } from "./level015";

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
  level006,
  level007,
  level008,
  level009,
  level010,
  level011,
  level012,
  level013,
  level014,
  level015,
];

/**
 * Modules from the curriculum that don't have written tickets yet.
 * Shown as locked "coming soon" cards below the real ticket queue.
 */
export const upcomingModules: string[] = [
  "HR Analytics",
  "Project Management",
  "Team Performance",
  "Client Quality Checks",
  "Cross-Team Reporting",
  "Client Readiness Assessment",
  "Final Internship Assessment",
];
