import { BaseViewModel } from "./BaseViewModel";
import { Building } from "../models/Building";
import { BuildingRepository } from "../repositories/BuildingRepository";
import { UUID } from "../models/utils";

export class BuildingViewModel extends BaseViewModel<Building> {
  public repository: BuildingRepository; //only temporary change to public from private to just test the method. 

  //oginal code
  //private repository: BuildingRepository;

  constructor() {
    super();
    this.repository = new BuildingRepository();
  }

  async load(id: UUID): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      const data = await this.repository.findById(id);
      this.setData(data);
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to load building'));
    } finally {
      this.setLoading(false);
    }
  }

  async save(data: Partial<Building>): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      
      if (this.data) {
        const updated = await this.repository.update(this.data.id, data);
        this.setData(updated);
      } else if (data as Omit<Building, 'id' | 'createdAt' | 'updatedAt'>) {
        const created = await this.repository.create(data as Omit<Building, 'id' | 'createdAt' | 'updatedAt'>);
        this.setData(created);
      }
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to save building'));
    } finally {
      this.setLoading(false);
    }
  }

  async loadByCampus(campusId: UUID): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      const buildings = await this.repository.findByCampus(campusId);
      // Since this is a list operation, we might want to handle this differently
      // For now, just take the first building if any
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
    // Call the repository function (which logs automatically)
    await this.repository.findAllBuildings();

  } catch (error) {
    this.setError(error instanceof Error ? error : new Error("Failed to load buildings"));
    console.error("Error fetching buildings:", error);
  } finally {
    this.setLoading(false);
  }
}
}