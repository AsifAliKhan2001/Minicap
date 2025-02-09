import { UUID } from '@/models/utils';
import { POI } from '@/models/POI';

export interface MapRepository {
  /**
   * Retrieves a map POI by its unique identifier
   * @param id - The UUID of the POI to find
   * @returns Promise resolving to the found POI
   * @throws {NotFoundError} If POI with given ID doesn't exist
   */
  findMapPOIById(id: UUID): Promise<POI>;

  /**
   * Creates a new map POI in the system
   * @param data - POI data without system-managed fields
   * @returns Promise resolving to the created POI
   * @throws {ValidationError} If required fields are missing or invalid
   */
  createMapPOI(data: Omit<POI, 'id' | 'createdAt' | 'updatedAt'>): Promise<POI>;

  /**
   * Updates an existing map POI's information
   * @param id - The UUID of the POI to update
   * @param data - Partial POI data to update
   * @returns Promise resolving to the updated POI
   * @throws {NotFoundError} If POI with given ID doesn't exist
   */
  updateMapPOI(id: UUID, data: Partial<POI>): Promise<POI>;

  /**
   * Removes a map POI from the system
   * @param id - The UUID of the POI to delete
   * @throws {NotFoundError} If POI with given ID doesn't exist
   */
  deleteMapPOI(id: UUID): Promise<void>;

  /**
   * Retrieves all POIs in the system
   * @returns Promise resolving to array of all POIs
   * @throws {DatabaseError} If database query fails
   */
  getAllMapPOIs(): Promise<POI[]>;
}
