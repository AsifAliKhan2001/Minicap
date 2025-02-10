import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface Floor extends Audit {
  buildingId: ObjectId;  // Reference to parent Building
  number: number;
  isWheelchairAccessible: boolean;
  hasElevatorAccess: boolean;
  hasRampAccess: boolean;
  roomIds: ObjectId[];   // One-to-many with Room
  floorplanId: ObjectId; // One-to-one with Floorplan
}

export interface Floorplan extends Audit {
  data: any;
}

export interface Room extends Audit {
  floorplanLocation: ObjectId;   // Reference to Floorplan Location
  number: string;
  type: string;
}
