import { UUID } from "./utils";
import { Event } from "./Event";
import { User } from "./User";

export interface Calendar {
  id: UUID;
  name: string;
  description?: string;
  color?: string;
  isPublic: boolean;
  createdAt: string;      // ISO8601 date-time
  updatedAt: string;      // ISO8601 date-time
  
  // Optional loaded relationships
  events?: Event[];       // Loaded through CalendarEvent
  users?: User[];         // Loaded through UserCalendar
}
