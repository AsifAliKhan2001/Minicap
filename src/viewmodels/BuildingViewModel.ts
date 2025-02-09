import { BaseViewModel } from "./BaseViewModel";
import { Building } from "@/models/Building";
import { BuildingRepository } from "../repositories/BuildingRepository";
import { UUID } from "mongodb";
import { Collection, ObjectId } from "mongodb";
import 'dotenv/config';

export class BuildingViewModel extends BaseViewModel<Building> implements BuildingRepository {
  async save(data: Partial<Building>): Promise<void> {
    throw new Error('Building modification is not supported');
  }
  private readonly COLLECTION_NAME = "buildings";

  async findBuildingById(id: UUID): Promise<Building> {
    return this.withCollection(this.COLLECTION_NAME, async (collection) => {
      const building = await collection.findOne({ _id: new ObjectId(id) });
      if (!building) {
        throw new Error("Building not found");
      }
      return this.mapToBuilding(building);
    });
  }

  async getAllBuildings(): Promise<Building[]> {
    return this.withCollection(this.COLLECTION_NAME, async (collection) => {
      const buildings = await collection.find().toArray();
      return buildings.map(this.mapToBuilding);
    });
  }

  async findBuildingsByCampus(campusId: UUID): Promise<Building[]> {
    return this.withCollection(this.COLLECTION_NAME, async (collection) => {
      const buildings = await collection.find({ campusId }).toArray();
      return buildings.map(this.mapToBuilding);
    });
  }



  private mapToBuilding(doc: any): Building {
    return {
      id: doc._id.toString(),
      name: doc.name,
      address: doc.address || "Address unavailable",
      description: doc.description || "No description available",
      polygonShape: doc.polygonShape || null,
      openingHours: doc.openingHours || "Hours unavailable",
      floors: doc.floors?.toString() || "",
      location: doc.location?.toString() || ""
    };
  }

  async load(id: UUID): Promise<void> {
    try {
      this.setLoading(true);
      const building = await this.findBuildingById(id);
      this.setData(building);
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to load building'));
    } finally {
      this.setLoading(false);
    }
  }

  async loadBuildingsByCampus(campusId: UUID): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      const buildings = await this.findBuildingsByCampus(campusId);
      this.setData(buildings[0] || null);
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to load campus buildings'));
    } finally {
      this.setLoading(false);
    }
  }
  
  async loadAllBuildings(): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      console.log("Fetching all buildings from the database...");
      const buildings = await this.getAllBuildings();
      this.setData(buildings[0] || null);
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error("Failed to load buildings"));
      console.error("Error fetching buildings:", error);
    } finally {
      this.setLoading(false);
    }
  }
}
