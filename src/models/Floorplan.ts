import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface Floorplan extends Audit {
  data: any;
}
