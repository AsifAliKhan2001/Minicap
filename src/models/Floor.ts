import { UUID } from "mongodb";

export interface Floor {
  id: UUID;
  buildingId: UUID;  // Reference to parent Building
  number: number;
  isWheelchairAccessible: boolean;
  hasElevatorAccess: boolean;
  hasRampAccess: boolean;
  roomIds: UUID[];   // One-to-many with Room
  floorplanId: UUID; // One-to-one with Floorplan
}
