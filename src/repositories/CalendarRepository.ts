import { BaseRepository } from "./BaseRepository";
import { Calendar } from "../models/Calendar";
import { UUID } from "../models/utils";
import { ApiError } from "./BaseRepository";

export class CalendarRepository implements BaseRepository<Calendar> {
  private readonly apiBaseUrl: string = ""; // TODO: Configure API URL

  async findById(id: UUID): Promise<Calendar> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/calendars/${id}`);
      
      if (!response.ok) {
        throw new ApiError(
          'Failed to fetch calendar',
          response.status,
          await response.json()
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to fetch calendar', 500, error);
    }
  }

  async create(data: Omit<Calendar, 'id' | 'createdAt' | 'updatedAt'>): Promise<Calendar> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/calendars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new ApiError(
          'Failed to create calendar',
          response.status,
          await response.json()
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to create calendar', 500, error);
    }
  }

  async update(id: UUID, data: Partial<Calendar>): Promise<Calendar> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/calendars/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new ApiError(
          'Failed to update calendar',
          response.status,
          await response.json()
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to update calendar', 500, error);
    }
  }

  async delete(id: UUID): Promise<void> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/calendars/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new ApiError(
          'Failed to delete calendar',
          response.status,
          await response.json()
        );
      }
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to delete calendar', 500, error);
    }
  }
}
