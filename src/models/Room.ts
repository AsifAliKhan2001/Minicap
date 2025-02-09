import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface Room extends Audit {
  floorId: ObjectId;    // Reference to parent Floor
  number: string;
  type: string;
}
