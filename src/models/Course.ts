// src/models/Course.ts
import { UUID } from "./utils";
import { Event } from "./Event";

export interface Course extends Event {
  courseCode: string;
  eventId: UUID; // FK to Event, also PK as per ERD
}
