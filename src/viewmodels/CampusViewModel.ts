import { BaseViewModel } from "./BaseViewModel";
import { Campus } from "@/models/Campus";
import { ObjectId } from "mongodb";
import { CampusRepository } from "@/repositories/CampusRepository";

export class CampusViewModel extends BaseViewModel<Campus[]> implements CampusRepository {
  private readonly COLLECTION = "campus";

  private mapToCampus(doc: any): Campus {
    return {
      id: doc.id,
      name: doc.name,
      buildingIds: doc.buildingIds,
      outdoorLocation: doc.outdoorLocation
    };
  }

  async findCampusById(id: ObjectId): Promise<Campus> {
    const campus = await this.withCollection(this.COLLECTION, async (collection) => {
      const doc = await collection.findOne({ id });
      return doc ? this.mapToCampus(doc) : null;
    });
    
    if (!campus) {
      throw new Error('Campus not found');
    }
    
    return campus;
  }

  async getAllCampuses(): Promise<Campus[]> {
    return await this.withCollection(this.COLLECTION, async (collection) => {
      const docs = await collection.find({}).toArray();
      return docs.map(doc => this.mapToCampus(doc));
    });
  }

  async load(id?: ObjectId): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);

      const campuses = id ? 
        [await this.findCampusById(id)] : 
        await this.getAllCampuses();

      this.setData(campuses);
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to load campus'));
    } finally {
      this.setLoading(false);
    }
  }

  async save(): Promise<void> {
    throw new Error("Campus modification not supported");
  }
}