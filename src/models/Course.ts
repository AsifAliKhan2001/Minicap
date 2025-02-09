import { Event } from './Event';
import { UUID } from "mongodb";

export interface Course extends Event {
  courseCode: string;
  description: string;
  prerequisites: UUID[];
}

