import { UUID } from "@/models/utils";
import { Calendar } from "@/models/Calendar";

export interface CalendarRepository {
  /**
   * Retrieves a connected calendar by its unique identifier
   * @param id - The UUID of the calendar to find
   * @returns Promise resolving to the found Calendar
   * @throws {NotFoundError} If calendar with given ID doesn't exist
   */
  findCalendarById(id: UUID): Promise<Calendar>;

  /**
   * Connects a Google Calendar to the system
   * @param googleCalendarId - The Google Calendar ID to connect
   * @returns Promise resolving to the connected Calendar
   * @throws {ValidationError} If calendar ID is invalid
   * @throws {AuthError} If Google Calendar authentication fails
   */
  connectGoogleCalendar(googleCalendarId: string): Promise<Calendar>;

  /**
   * Disconnects a Google Calendar from the system
   * @param id - The UUID of the calendar to disconnect
   * @throws {NotFoundError} If calendar with given ID doesn't exist
   */
  disconnectGoogleCalendar(id: UUID): Promise<void>;

  /**
   * Lists all connected Google Calendars
   * @returns Promise resolving to array of connected Calendars
   * @throws {AuthError} If Google Calendar API access fails
   */
  getConnectedCalendars(): Promise<Calendar[]>;

  /**
   * Syncs and retrieves latest events from a connected calendar
   * @param id - The UUID of the calendar to sync
   * @returns Promise resolving to the updated Calendar with latest events
   * @throws {NotFoundError} If calendar with given ID doesn't exist
   * @throws {AuthError} If Google Calendar API access fails
   */
  syncCalendarEvents(id: UUID): Promise<Calendar>;
}
