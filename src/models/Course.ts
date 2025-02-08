import { Event } from './Event';
import { UUID } from "./utils";

export interface Course extends Event {
  courseCode: string;
  description: string;
  prerequisites: UUID[];
}

