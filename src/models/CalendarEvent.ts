import { UUID } from "./utils";

export interface CalendarEvent {
  calendarId: UUID;
  eventId: UUID;
  color?: string;         // Optional color coding for events
  reminderMinutes?: number; // Minutes before event to send reminder
  createdAt: string;      // ISO8601 date-time
}
