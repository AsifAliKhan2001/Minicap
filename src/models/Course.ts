import { Event } from './Event';

export interface Course extends Event {
  courseCode: string;
  description: string;
}

