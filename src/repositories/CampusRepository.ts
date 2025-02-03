import { BaseRepository, ApiError } from './BaseRepository';
import { UUID } from '../models/utils';
import { Campus } from '../models/Campus';

export class CampusRepository implements BaseRepository<Campus> {
  async findById(id: UUID): Promise<Campus> {
    try {
      // Placeholder implementation
      throw new Error("Not implemented");
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to fetch campus', 500, error);
    }
  }

  async create(data: Omit<Campus, 'id' | 'createdAt' | 'updatedAt'>): Promise<Campus> {
    try {
      throw new Error("Not implemented");
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to create campus', 500, error);
    }
  }

  async update(id: UUID, data: Partial<Campus>): Promise<Campus> {
    try {
      throw new Error("Not implemented");
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to update campus', 500, error);
    }
  }

  async delete(id: UUID): Promise<void> {
    try {
      throw new Error("Not implemented");
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to delete campus', 500, error);
    }
  }

  // Campus-specific methods
  async findAllCampuses(): Promise<Campus[]> {
    try {
      // Placeholder data for Concordia's campuses
      return [
        {
          id: '1', // Temporary hardcoded ID until backend is ready
          name: 'Sir George Williams Campus',
          description: 'Downtown campus',
          city: 'Montreal',
          address: '1455 De Maisonneuve Blvd. W.',
          latitude: 45.497,
          longitude: -73.579,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2', // Temporary hardcoded ID until backend is ready
          name: 'Loyola Campus',
          description: 'West end campus',
          city: 'Montreal',
          address: '7141 Sherbrooke St. W.',
          latitude: 45.458,
          longitude: -73.640,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to fetch campuses', 500, error);
    }
  }
}
