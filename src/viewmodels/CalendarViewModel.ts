import { BaseViewModel } from "./BaseViewModel";
import { Calendar, Event } from "@/models/Calendar";
import { ObjectId } from "mongodb";
import { Audit } from "@/models/Audit";
import { CalendarRepository } from "@/repositories/CalendarRepository";

export class CalendarViewModel extends BaseViewModel<Calendar> implements CalendarRepository {
    protected mapToDTO(doc: any): Calendar {
      if (!doc) throw new Error(`Calendar Not Found`);
      
      return {
        _id: doc._id,
        eventIds: doc.eventIds || [],
        userIds: doc.userIds || [],
        ...doc.audit
      };
    }
    private readonly COLLECTION_NAME = "calendars";

    async connectGoogleCalendar(googleCalendarId: string, userId: ObjectId): Promise<Calendar> {
        return this.withCollection(this.COLLECTION_NAME, async (collection) => {
            const calendar: Calendar = {
                eventIds: [],
                userIds: [userId],
                ...await this.updateAudit(null, userId)
            };

            await collection.insertOne(calendar);
            return calendar;
        });
    }

    async disconnectGoogleCalendar(calendarId: ObjectId): Promise<void> {
        return this.withCollection(this.COLLECTION_NAME, async (collection) => {
            const result = await collection.deleteOne({ _id: calendarId });
            if (result.deletedCount === 0) {
                throw new Error(`Calendar with id ${calendarId} not found`);
            }
        });
    }

    async getGoogleCalendarEvents(calendarId: ObjectId): Promise<Event[]> {
        // TODO: Implement Google Calendar API integration
        return [];
    }

    async getUserConnectedCalendars(userId: ObjectId): Promise<Calendar[]> {
        return this.withCollection(this.COLLECTION_NAME, async (collection) => {
            const calendars = await collection.find({ userIds: userId }).toArray();
            return calendars as Calendar[];
        });
    }

    protected async updateAudit(existingAudit: Partial<Audit> | null, userId: ObjectId): Promise<Audit> {
        const now = new Date();
        return {
            _id: existingAudit?._id || new ObjectId(),
            createdAtUTC: existingAudit?.createdAtUTC || now,
            updatedAtUTC: now,
            createdBy: existingAudit?.createdBy || userId,
            updatedBy: userId
        };
    }
}
