import { UUID } from "./utils";

export interface UserCalendar {
  userId: UUID;
  calendarId: UUID;
  role: 'owner' | 'editor' | 'viewer';
  createdAt: string;      // ISO8601 date-time
}
