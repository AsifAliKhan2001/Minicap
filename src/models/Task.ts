// src/models/Task.ts
import { UUID } from "./utils";
import { OutdoorLocation } from "./OutdoorLocation";
import { IndoorLocation } from "./IndoorLocation";
import { Planner } from "./Planner";

export interface Task {
  id: UUID;
  description: string;
  outdoorLocationId?: UUID; // Optional FK to OutdoorLocation
  outdoorLocation?: OutdoorLocation; // Optional, for easier access
  IndoorLocationId?: UUID; // Optional FK to IndoorLocation
  IndoorLocation?: IndoorLocation; // Optional, for easier access
  indoorTask?: boolean;
  emergencyTask?: boolean;
  needsDisplay?: boolean;
  plannerId: UUID; // FK to Planner
  planner?: Planner; // Optional, for easier access
}
