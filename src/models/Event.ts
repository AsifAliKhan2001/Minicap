import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface Event extends Audit {
  name: string;
  locationId: ObjectId;  // FK to Location
  locationType: 'outdoor' | 'floorplan';  // Discriminator field
  startTime: string;
  endTime: string;
  recurrence: any;
  calendarId: ObjectId;  // FK to Calendar
}
