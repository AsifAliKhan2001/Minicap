// src/models/User.ts
import { UUID } from "./utils";
import { OutdoorLocation } from "./OutdoorLocation";
import { Planner } from "./Planner";

export interface User {
  id: UUID;
  name: string;
  currentOutdoorLocationId?: UUID; // FK to OutdoorLocation, optional as per ERD
  currentOutdoorLocation?: OutdoorLocation; // Optional, for easier access
  plannerId: UUID; // FK to Planner
  planner?: Planner; // Optional, for easier access
}
