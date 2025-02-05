import { BaseRepository } from "./BaseRepository";
import { Building } from "../models/Building";
import { UUID } from "../models/utils";
import { ApiError } from "./BaseRepository";

export class BuildingRepository implements BaseRepository<Building> {
  async findById(id: UUID): Promise<Building> {
    try {
      // TODO: Implement actual API call when backend is ready
      throw new Error("Not implemented");
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to fetch building', 500, error);
    }
  }

  async create(data: Omit<Building, 'id' | 'createdAt' | 'updatedAt'>): Promise<Building> {
    try {
      // TODO: Implement actual API call when backend is ready
      throw new Error("Not implemented");
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to create building', 500, error);
    }
  }

  async update(id: UUID, data: Partial<Building>): Promise<Building> {
    try {
      // TODO: Implement actual API call when backend is ready
      throw new Error("Not implemented");
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to update building', 500, error);
    }
  }

  async delete(id: UUID): Promise<void> {
    try {
      // TODO: Implement actual API call when backend is ready
      throw new Error("Not implemented");
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to delete building', 500, error);
    }
  }

  // Building-specific methods
  async findByCampus(campusId: UUID): Promise<Building[]> {
    try {
      // TODO: Implement actual API call when backend is ready
      throw new Error("Not implemented");
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to fetch campus buildings', 500, error);
    }
  }
}
