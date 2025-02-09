import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface POI extends Audit {
  type: string;
  description: string;
}

