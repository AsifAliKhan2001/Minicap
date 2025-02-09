import { UUID } from 'mongodb';
import { POI } from '@/models/POI';

export interface MapRepository {
  /**
   * Retrieves a POI by its unique identifier
   * @param id - The UUID of the POI to find
   * @returns Promise resolving to the found POI
   * @throws {NotFoundError} If POI with given ID doesn't exist
   */
  findPOIById(id: UUID): Promise<POI>;

  /**
   * Retrieves all POIs in the system
   * @returns Promise resolving to array of all POIs
   * @throws {DatabaseError} If database query fails
   */
  getAllPOIs(): Promise<POI[]>;

  /**
   * Finds POIs by category
   * @param category - Category to filter by
   * @returns Promise resolving to array of matching POIs
   */
  findPOIsByCategory(category: string): Promise<POI[]>;

  /**
   * Finds POIs within specified radius of coordinates
   * @param latitude - Center point latitude
   * @param longitude - Center point longitude
   * @param radius - Search radius in meters
   * @returns Promise resolving to array of nearby POIs
   */
  findNearbyPOIs(latitude: number, longitude: number, radius: number): Promise<POI[]>;

  /**
   * Creates a new POI in the system
   * @param data - POI data without system-managed fields
   * @param token - Authentication token
   * @returns Promise resolving to the created POI
   * @throws {ValidationError} If required fields are missing or invalid
   */
  createPOI(data: Omit<POI, 'id' | 'createdAt' | 'updatedAt'>, token: string): Promise<POI>;

  /**
   * Updates an existing POI's information
   * @param id - The UUID of the POI to update
   * @param data - Partial POI data to update
   * @param token - Authentication token
   * @returns Promise resolving to the updated POI
   * @throws {NotFoundError} If POI with given ID doesn't exist
   */
  updatePOI(id: UUID, data: Partial<POI>, token: string): Promise<POI>;

  /**
   * Removes a POI from the system
   * @param id - The UUID of the POI to delete
   * @param token - Authentication token
   * @throws {NotFoundError} If POI with given ID doesn't exist
   */
  deletePOI(id: UUID, token: string): Promise<void>;
}
