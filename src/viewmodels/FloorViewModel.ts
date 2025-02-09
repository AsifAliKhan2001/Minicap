import { BaseViewModel } from "./BaseViewModel";
import { Floor } from "@/models/Floor";
import { FloorRepository } from "../repositories/FloorRepository";
import { ObjectId } from "mongodb";

export class FloorViewModel extends BaseViewModel<Floor[]> {
  private repository: FloorRepository;

  constructor() {
    super();
    this.repository = new FloorRepository();
  }

  async load(id: ObjectId): Promise<void> {
    await this.loadFloorById(id);
  }

  async save(data: Partial<Floor[]>): Promise<void> {
    throw new Error("Not implemented");
  }

  async loadFloorById(id: ObjectId): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      const floor = await this.repository.findById(id);
      this.setData([floor]);
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to load floor'));
    } finally {
      this.setLoading(false);
    }
  }

  async loadBuildingFloors(buildingId: ObjectId): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      const floors = await this.repository.findByBuilding(buildingId);
      this.setData(floors);
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to load building floors'));
    } finally {
      this.setLoading(false);
    }
  }
}
