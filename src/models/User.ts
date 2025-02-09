import { ObjectId } from "mongodb";

export interface User {
  name: string;
  calendarIds: ObjectId[];  // Many-to-many with Calendar
  currentLocationId?: ObjectId;  // Optional FK to Location
  email: string;
  password: string;
}
