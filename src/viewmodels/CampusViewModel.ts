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

      console.log("Fetching campuses...");


      const campuses = await this.repository.findAllCampuses();

      console.log("Fetched campuses:", campuses);

      this.setData(campuses);
    } catch (error) {

      console.error("Error fetching campuses:", error);

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

(async () => {
  const campusVM = new CampusViewModel();

  console.log("Calling loadAllCampuses()...");
  await campusVM.loadAllCampuses();

  console.log("Final fetched campuses:", campusVM.getData());
})();
