import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface Location extends Audit {
  locationType: 'outdoor' | 'floorplan';
}
