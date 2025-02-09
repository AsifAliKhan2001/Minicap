import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface Planner extends Audit {
  taskIDs: ObjectId[];
}

