import { ObjectId } from "mongodb";
import { Calendar, Event } from "@/models/Calendar";

export interface CalendarRepository {
  /**
   * Connects a Google Calendar to our system
   * @param googleCalendarId - The Google Calendar ID to connect
   * @param userId - The user connecting the calendar
   * @returns Promise resolving to the connected Calendar
   */
  connectGoogleCalendar(googleCalendarId: string, userId: ObjectId): Promise<Calendar>;

  /**
   * Disconnects a Google Calendar from our system
   * @param calendarId - The ObjectId of our calendar entry
   * @returns Promise resolving when disconnected
   */
  disconnectGoogleCalendar(calendarId: ObjectId): Promise<void>;

  /**
   * Gets events from a connected Google Calendar
   * @param calendarId - The ObjectId of our calendar entry
   * @returns Promise resolving to array of calendar events
   */
  getGoogleCalendarEvents(calendarId: ObjectId): Promise<Event[]>;

  /**
   * Lists all connected Google Calendars for a user
   * @param userId - The user whose calendars to list
   * @returns Promise resolving to array of connected Calendars
   */
  getUserConnectedCalendars(userId: ObjectId): Promise<Calendar[]>;
}
