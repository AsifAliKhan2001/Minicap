import { UUID } from "./utils";
import { Calendar } from "./Calendar";

export interface Event {
  id: UUID;
  title: string;
  description?: string;
  startTime: string;      // ISO8601 date-time
  endTime: string;        // ISO8601 date-time
  location?: string;      // Optional location description
  isAllDay: boolean;
  createdAt: string;      // ISO8601 date-time
  updatedAt: string;      // ISO8601 date-time

  // Optional loaded relationships
  calendars?: Calendar[]; // Loaded through CalendarEvent
}
