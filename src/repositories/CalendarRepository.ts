import { ObjectId } from "mongodb";
import { Calendar } from "@/models/Calendar";

export interface CalendarRepository {
  /**
   * Retrieves a calendar by its unique identifier
   * @param id - The ObjectId of the calendar to find
   * @returns Promise resolving to the found Calendar
   */
  findCalendarById(id: ObjectId): Promise<Calendar>;

  /**
   * Lists all available Google Calendars
   * @returns Promise resolving to array of Calendars
   */
  getAllCalendars(): Promise<Calendar[]>;

  /**
   * Retrieves latest events from a calendar
   * @param id - The ObjectId of the calendar
   * @returns Promise resolving to the Calendar with latest events
   */
  getCalendarEvents(id: ObjectId): Promise<Calendar>;
}
