import { UUID } from '@/models/utils';
import { Floor } from '@/models/Floor';

export interface FloorRepository {
  /**
   * Retrieves a floor by its unique identifier
   * @param id - The UUID of the floor to find
   * @returns Promise resolving to the found Floor
   * @throws {NotFoundError} If floor with given ID doesn't exist
   */
  findFloorById(id: UUID): Promise<Floor>;

  /**
   * Creates a new floor in the system
   * @param data - Floor data without system-managed fields
   * @returns Promise resolving to the created Floor
   * @throws {ValidationError} If required fields are missing or invalid
   */
  createFloor(data: Omit<Floor, 'id' | 'createdAt' | 'updatedAt'>): Promise<Floor>;

  /**
   * Updates an existing floor's information
   * @param id - The UUID of the floor to update
   * @param data - Partial floor data to update
   * @returns Promise resolving to the updated Floor
   * @throws {NotFoundError} If floor with given ID doesn't exist
   */
  updateFloor(id: UUID, data: Partial<Floor>): Promise<Floor>;

  /**
   * Removes a floor from the system
   * @param id - The UUID of the floor to delete
   * @throws {NotFoundError} If floor with given ID doesn't exist
   * @throws {ConflictError} If floor has associated rooms or POIs
   */
  deleteFloor(id: UUID): Promise<void>;

  /**
   * Retrieves all floors of a specific building
   * @param buildingId - The UUID of the building
   * @returns Promise resolving to array of Floors
   * @throws {NotFoundError} If building with given ID doesn't exist
   */
  findFloorsByBuilding(buildingId: UUID): Promise<Floor[]>;
}
