import { UUID } from '@/models/utils';
import { FloorplanLocation } from '@/models/FloorplanLocation';
import { Floor } from '@/models/Floor';
import { Room } from '@/models/Room';
import { POI } from '@/models/POI';

export interface FloorplanNavigationRepository {
  /**
   * Retrieves an Floorplan location by its unique identifier
   * @param id - The UUID of the Floorplan location to find
   * @returns Promise resolving to the found FloorplanLocation
   * @throws {NotFoundError} If location with given ID doesn't exist
   */
  findFloorplanLocationById(id: UUID): Promise<FloorplanLocation>;

  /**
   * Creates a new Floorplan location in the system
   * @param data - Location data without system-managed fields
   * @returns Promise resolving to the created FloorplanLocation
   * @throws {ValidationError} If required fields are missing or invalid
   */
  createFloorplanLocation(data: Omit<FloorplanLocation, 'id' | 'createdAt' | 'updatedAt'>): Promise<FloorplanLocation>;

  /**
   * Updates an existing Floorplan location's information
   * @param id - The UUID of the location to update
   * @param data - Partial location data to update
   * @returns Promise resolving to the updated FloorplanLocation
   * @throws {NotFoundError} If location with given ID doesn't exist
   */
  updateFloorplanLocation(id: UUID, data: Partial<FloorplanLocation>): Promise<FloorplanLocation>;

  /**
   * Removes an Floorplan location from the system
   * @param id - The UUID of the location to delete
   * @throws {NotFoundError} If location with given ID doesn't exist
   */
  deleteFloorplanLocation(id: UUID): Promise<void>;

  /**
   * Finds all POIs on a specific floor
   * @param floorId - The UUID of the floor
   * @returns Promise resolving to array of POIs
   * @throws {NotFoundError} If floor with given ID doesn't exist
   */
  findPOIsByFloor(floorId: UUID): Promise<POI[]>;

  /**
   * Finds an accessible path between two Floorplan locations
   * @param startLocation - Starting Floorplan location
   * @param endLocation - Ending Floorplan location
   * @returns Promise resolving to array of locations forming the path
   * @throws {ValidationError} If path cannot be calculated
   */
  findAccessibleFloorplanPath(startLocation: FloorplanLocation, endLocation: FloorplanLocation): Promise<FloorplanLocation[]>;

  /**
   * Finds nearest stairs on a floor
   * @param floor - The floor to search on
   * @returns Promise resolving to array of rooms containing stairs
   */
  findNearestStairs(floor: Floor): Promise<Room[]>;

  /**
   * Finds nearest elevator on a floor
   * @param floor - The floor to search on
   * @returns Promise resolving to array of rooms containing elevators
   */
  findNearestElevator(floor: Floor): Promise<Room[]>;

  /**
   * Finds all entrances for a building
   * @param buildingId - The UUID of the building
   * @returns Promise resolving to array of entrance locations
   * @throws {NotFoundError} If building with given ID doesn't exist
   */
  findBuildingEntrances(buildingId: UUID): Promise<FloorplanLocation[]>;
}
