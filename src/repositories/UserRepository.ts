import { BaseRepository } from "./BaseRepository";
import { User } from "../models/User";
import { UUID } from "../models/utils";
import { ApiError } from "./BaseRepository";

export class UserRepository implements BaseRepository<User> {
  private apiBaseUrl: string = ""; // TODO: Configure API URL

  async findById(id: UUID): Promise<User> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/users/${id}`);
      
      if (!response.ok) {
        throw new ApiError(
          'Failed to fetch user',
          response.status,
          await response.json()
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to fetch user', 500, error);
    }
  }

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new ApiError(
          'Failed to create user',
          response.status,
          await response.json()
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to create user', 500, error);
    }
  }

  async update(id: UUID, data: Partial<User>): Promise<User> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new ApiError(
          'Failed to update user',
          response.status,
          await response.json()
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to update user', 500, error);
    }
  }

  async delete(id: UUID): Promise<void> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new ApiError(
          'Failed to delete user',
          response.status,
          await response.json()
        );
      }
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to delete user', 500, error);
    }
  }
}
