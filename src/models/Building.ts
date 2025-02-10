import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface Building extends Audit {
  name: string;  
  address: string;
  description: string;
  polygonShape?: any;  // Type TBD (consider defining a specific type)
  openingHours?: string;
  floors: ObjectId[]; 
  outdoorLocation: ObjectId; 
}
