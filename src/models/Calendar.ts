import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface Calendar extends Audit {
  eventIds: ObjectId[]; // One-to-many with Event
  userIds: ObjectId[]; // Many-to-many with User
}

export interface Event extends Audit {
  name: string;
  locationId: ObjectId;  // FK to Location
  locationType: 'outdoor' | 'floorplan';  // Discriminator field
  startTime: string;
  endTime: string;
  recurrence: any;
  calendarId: ObjectId;  // FK to Calendar
}

export interface Course extends Event, Audit {
  courseCode: string;
  description: string;
  prerequisites: ObjectId[];
}

