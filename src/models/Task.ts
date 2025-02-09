import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface Task extends Audit {
  description: string;
  locationId: ObjectId;  // FK to Location
  locationType: string;
  emergencyTask: boolean;
  needsDisplay: boolean;
  plannerId: ObjectId;   // FK to Planner
}
