import { BaseViewModel } from "./BaseViewModel";
import { POIInterface } from "@/models/POIInterface";
import { POIRepository } from "../repositories/POIRepository";
import { UUID } from "@/models/utils";

export class POIViewModel extends BaseViewModel<POIInterface> {
  private repository: POIRepository;

  constructor() {
    super();
    this.repository = new POIRepository();
  }

  async load(id: UUID): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      const data = await this.repository.findById(id);
      this.setData(data);
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to load POI'));
    } finally {
      this.setLoading(false);
    }
  }

  async save(data: Partial<POIInterface>): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      
      if (this.data) {
        const updated = await this.repository.update(this.data.id, data);
        this.setData(updated);
      } else if (data as Omit<POIInterface, 'id' | 'createdAt' | 'updatedAt'>) {
        const created = await this.repository.create(data as Omit<POIInterface, 'id' | 'createdAt' | 'updatedAt'>);
        this.setData(created);
      }
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to save POI'));
    } finally {
      this.setLoading(false);
    }
  }

  async findNearby(latitude: number, longitude: number, radius: number): Promise<POIInterface[]> {
    try {
      return await this.repository.findNearby(latitude, longitude, radius);
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to find nearby POIs'));
      return [];
    }
  }

  async findByCategory(category: string): Promise<POIInterface[]> {
    try {
      return await this.repository.findByCategory(category);
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to find POIs by category'));
      return [];
    }
  }
}
