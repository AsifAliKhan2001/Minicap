import { BaseRepository } from "./BaseRepository";
import { Weather, ForecastData } from "../models/Weather";
import { UUID } from "../models/utils";
import { ApiError } from "./BaseRepository";

export class WeatherRepository implements BaseRepository<Weather> {
  private apiBaseUrl: string = ""; // TODO: Configure API URL

  async findById(id: UUID): Promise<Weather> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/weather/${id}`);
      
      if (!response.ok) {
        throw new ApiError(
          'Failed to fetch weather',
          response.status,
          await response.json()
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to fetch weather', 500, error);
    }
  }

  async create(data: Omit<Weather, 'id' | 'createdAt' | 'updatedAt'>): Promise<Weather> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/weather`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new ApiError(
          'Failed to create weather',
          response.status,
          await response.json()
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to create weather', 500, error);
    }
  }

  async update(id: UUID, data: Partial<Weather>): Promise<Weather> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/weather/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new ApiError(
          'Failed to update weather',
          response.status,
          await response.json()
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to update weather', 500, error);
    }
  }

  async delete(id: UUID): Promise<void> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/weather/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new ApiError(
          'Failed to delete weather',
          response.status,
          await response.json()
        );
      }
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to delete weather', 500, error);
    }
  }
}
