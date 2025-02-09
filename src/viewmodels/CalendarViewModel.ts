import { BaseViewModel } from "./BaseViewModel";
import { Calendar } from "@/models/Calendar";
import { Event } from "@/models/Event";
import { ObjectId } from "mongodb";

export class CalendarViewModel extends BaseViewModel<Calendar> implements CalendarRepository {
  private readonly COLLECTION_NAME = "calendars";

  async findCalendarById(id: ObjectId): Promise<Calendar> {
    this.setLoading(true);
    try {
      const calendar = await this.withCollection(this.COLLECTION_NAME, async (collection) => {
        const doc = await collection.findOne({ _id: id });
        if (!doc) throw new Error("Calendar not found");
        return this.mapToModel(doc);
      });
      this.setData(calendar);
      return calendar;
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to load calendar'));
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  protected mapToModel(doc: any): Calendar {
    if (!doc) return null;
    
    return {
      id: doc._id?.toString() || doc.id,
      events: (doc.events || []).map(this.mapToEvent),
      createdAt: doc.createdAt || new Date().toISOString(),
      updatedAt: doc.updatedAt || new Date().toISOString()
    };
  }

  async addEvent(event: Event): Promise<void> {
    // TODO: Implement adding event to calendar
  }

  async removeEvent(eventId: ObjectId): Promise<void> {
    // TODO: Implement removing event from calendar
  }

  getUpcomingEvents(days: number = 7): Event[] {
    if (!this.data?.events) return [];
    
    const now = new Date();
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    
    return this.data.events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate >= now && eventDate <= futureDate;
    });
  }
}
