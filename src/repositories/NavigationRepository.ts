import { BaseRepository } from "./BaseRepository";
import { Route } from "../models/Route";
import { UUID } from "../models/utils";
import { ApiError } from "./BaseRepository";
import { Coordinate } from "../models/RouteSegment";

export class NavigationRepository implements BaseRepository<Route> {
  private readonly apiBaseUrl: string = ""; // TODO: Configure API URL

  async findById(id: UUID): Promise<Route> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/routes/${id}`);
      
      if (!response.ok) {
        throw new ApiError(
          'Failed to fetch route',
          response.status,
          await response.json()
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to fetch route', 500, error);
    }
  }

  async create(data: Omit<Route, 'id' | 'createdAt' | 'updatedAt'>): Promise<Route> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/routes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new ApiError(
          'Failed to create route',
          response.status,
          await response.json()
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to create route', 500, error);
    }
  }

  async update(id: UUID, data: Partial<Route>): Promise<Route> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/routes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new ApiError(
          'Failed to update route',
          response.status,
          await response.json()
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to update route', 500, error);
    }
  }

  async delete(id: UUID): Promise<void> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/routes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new ApiError(
          'Failed to delete route',
          response.status,
          await response.json()
        );
      }
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to delete route', 500, error);
    }
  }

  // Navigation-specific methods
  async calculateRoute(start: Coordinate, end: Coordinate): Promise<Route> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/routes/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ start, end }),
      });

      if (!response.ok) {
        throw new ApiError(
          'Failed to calculate route',
          response.status,
          await response.json()
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to calculate route', 500, error);
    }
  }
}
