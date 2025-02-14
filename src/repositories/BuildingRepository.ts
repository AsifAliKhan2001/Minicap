import { Building } from "@/models/Building";
import { ObjectId } from "mongodb";

export interface BuildingRepository {
  /**
   * Retrieves a building by its unique identifier
   * @param id - The ObjectId of the building to find
   * @returns Promise resolving to the found Building
   * @throws {NotFoundError} If building with given ID doesn't exist
   */
  findBuildingById(id: ObjectId): Promise<Building>;

  /**
   * Retrieves all buildings associated with a specific campus
   * @param campusId - The ObjectId of the campus
   * @returns Promise resolving to array of Buildings
   * @throws {NotFoundError} If campus with given ID doesn't exist
   */
  findBuildingsByCampus(campusId: ObjectId): Promise<Building[]>;

  /**
   * Retrieves all buildings in the system
   * @returns Promise resolving to array of all Buildings
   * @throws {DatabaseError} If database query fails
   */
  getAllBuildings(): Promise<Building[]>;
}
