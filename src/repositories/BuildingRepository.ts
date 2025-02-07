import { BaseRepository } from "./BaseRepository";
import { Building } from "../models/Building";
import { UUID } from "../models/utils";
import { ApiError } from "./BaseRepository";
import { MongoClient, Db, Collection } from "mongodb"; // Import MongoDB types

const MONGO_URI = "mongodb+srv://Asif1:wyLpZZWGqgmfg4on@cluster0.6zyyx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URI
const COLLECTION_NAME = "BuildingTesting";

export class BuildingRepository implements BaseRepository<Building> {

  private client: MongoClient;
  private db: Db; // MongoDB database instance
  private collection: Collection<Building>; // MongoDB collection instance

  constructor() {
    this.client = new MongoClient(MONGO_URI);
    this.db = this.client.db("CampusDB");   // Database name
    this.collection = this.db.collection("BuildingTesting");
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
      throw new ApiError("Failed to connect to MongoDB", 500, error);
    }
  }

  async findById(id: UUID): Promise<Building> {
    try {
      // TODO: Implement actual API call when backend is ready
      throw new Error("Not implemented");

      // example implementation:
      // return this.collection.findOne({ id });

    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to fetch building', 500, error);
    }
  }

  async create(data: Omit<Building, 'id' | 'createdAt' | 'updatedAt'>): Promise<Building> {
    try {
      // TODO: Implement actual API call when backend is ready
      throw new Error("Not implemented");
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to create building', 500, error);
    }
  }

  async update(id: UUID, data: Partial<Building>): Promise<Building> {
    try {
      // TODO: Implement actual API call when backend is ready
      throw new Error("Not implemented");
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to update building', 500, error);
    }
  }

  async delete(id: UUID): Promise<void> {
    try {
      // TODO: Implement actual API call when backend is ready
      throw new Error("Not implemented");
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to delete building', 500, error);
    }
  }

  // Building-specific methods
  async findByCampus(campusId: UUID): Promise<Building[]> {
    try {
      // TODO: Implement actual API call when backend is ready
      throw new Error("Not implemented");

      // example implementation:
      // return this.collection.find({ campusId }).toArray();

    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to fetch campus buildings', 500, error);
    }
  }

  async findAllBuildings(): Promise<void> {
    try {
      console.log("Fetching all buildings from MongoDB...");
  
      // Get a cursor to iterate over all buildings
      const cursor = this.collection.find();
  
      // Correct way to iterate over a cursor
      for await (const building of cursor) {
        console.log("Building:", building);
      }
  
      console.log("Finished logging all buildings.");
  
    } catch (error) {
      throw new ApiError("Failed to fetch all buildings", 500, error);
    }
  }
}
