import { ObjectId } from 'mongodb';
import { POI, POICategory } from '@/models/POI';

export interface MapRepository {
  /**
   * Retrieves a POI by its unique identifier
   * @param id - The ObjectId of the POI to find
   * @returns Promise resolving to the found POI
   * @throws {NotFoundError} If POI with given ID doesn't exist
   */
  findPOIById(id: ObjectId): Promise<POI>;

  /**
   * Retrieves all POIs in the system
   * @returns Promise resolving to array of all POIs
   * @throws {DatabaseError} If database query fails
   */
  getAllPOIs(): Promise<POI[]>;

  /**
   * Finds POIs by category
   * @param category - The category to filter by
   * @returns Promise resolving to array of matching POIs
   * @throws {DatabaseError} If database query fails
   */
  findPOIsByCategory(category: POICategory): Promise<POI[]>;

  /**
   * Creates a new POI in the system with audit trail
   * @param data - POI data without system-managed fields
   * @param userId - ID of user creating the POI for audit
   * @returns Promise resolving to the created POI with audit
   * @throws {ValidationError} If required fields are missing or invalid
   */
  createPOI(data: Omit<POI, '_id' | 'createdAtUTC' | 'updatedAtUTC'>, userId: ObjectId): Promise<POI>;

  /**
   * Updates an existing POI's information and audit trail
   * @param id - The ObjectId of the POI to update
   * @param data - Partial POI data to update
   * @param userId - ID of user updating the POI for audit
   * @returns Promise resolving to the updated POI with new audit
   * @throws {NotFoundError} If POI with given ID doesn't exist
   */
  updatePOI(id: ObjectId, data: Partial<POI>, userId: ObjectId): Promise<POI>;

  /**
   * Removes a POI and logs deletion in audit
   * @param id - The ObjectId of the POI to delete
   * @param userId - ID of user deleting the POI for audit
   * @throws {NotFoundError} If POI with given ID doesn't exist
   */
  deletePOI(id: ObjectId, userId: ObjectId): Promise<void>;
}
