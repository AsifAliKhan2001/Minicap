import { BaseViewModel } from "./BaseViewModel";
import { Campus } from "../models/Campus";
import { CampusRepository } from "../repositories/CampusRepository";
import { UUID } from "../models/utils";

export class CampusViewModel extends BaseViewModel<Campus[]> {
  private repository: CampusRepository;

  constructor() {
    super();
    this.repository = new CampusRepository();
  }

  async load(id: UUID): Promise<void> {
    // For campus view, we'll load all campuses instead of a single one
    await this.loadAllCampuses();
  }

  async save(data: Partial<Campus[]>): Promise<void> {
    throw new Error("Not implemented");
  }

  async loadAllCampuses(): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      const campuses = await this.repository.findAllCampuses();
      this.setData(campuses);
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to load campuses'));
    } finally {
      this.setLoading(false);
    }
  }

  async loadCampusById(id: UUID): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      const campus = await this.repository.findById(id);
      this.setData([campus]);
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to load campus'));
    } finally {
      this.setLoading(false);
    }
  }
}
