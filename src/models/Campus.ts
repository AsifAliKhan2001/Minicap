import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface Campus extends Audit {
  name: string;
  buildingIds: ObjectId[]; 
  outdoorLocation: ObjectId;
}
