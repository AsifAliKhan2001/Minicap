import { BaseRepository, ApiError } from './BaseRepository';
import { UUID } from '@/models/utils';
import { Campus } from '@/models/Campus';
import { MongoClient, Db, Collection } from "mongodb"; // Import MongoDB types

const MONGO_URI = "mongodb+srv://Asif1:wyLpZZWGqgmfg4on@cluster0.6zyyx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URI
const COLLECTION_NAME = "minicap";

export class CampusRepository implements BaseRepository<Campus> {

  private client: MongoClient; //only temporary change to public from private to just test the method. 

  private db: Db; // MongoDB database instance
  private collection: Collection<Campus>; // MongoDB collection instance

  constructor() {
    this.client = new MongoClient(MONGO_URI);
    this.db = this.client.db("minicap");   // Database name
    this.collection = this.db.collection("campus");
  }
  
  async connect() {
    if (!this.client || !this.client.db().admin()) {
      try {
        await this.client.connect();
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw new ApiError("Failed to connect to MongoDB", 500, error);
      }
    }
  }

  async findById(id: UUID): Promise<Campus> {
    try {
      // Placeholder implementation
      throw new Error("Not implemented");
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to fetch campus', 500, error);
    }
  }

  async create(data: Omit<Campus, 'id' | 'createdAt' | 'updatedAt'>): Promise<Campus> {
    try {
      throw new Error("Not implemented");
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to create campus', 500, error);
    }
  }

  async update(id: UUID, data: Partial<Campus>): Promise<Campus> {
    try {
      throw new Error("Not implemented");
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to update campus', 500, error);
    }
  }

  async delete(id: UUID): Promise<void> {
    try {
      throw new Error("Not implemented");
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to delete campus', 500, error);
    }
  }

  // Campus-specific methods
  async findAllCampuses(): Promise<Campus[]> {
    try {
      // Ensure the connection to MongoDB is established
      await this.connect();
  
      // Fetch all documents from the "Campuses" collection
      const campuses = await this.collection.find({}).toArray();
  
      // Map the MongoDB documents to the Campus model
      return campuses.map(doc => ({
        id: doc._id.toString(), // Convert MongoDB ObjectId to string
        name: doc.name,
        buildings: doc.buildingIds || [], // Ensure buildings is an array
        buildingIds: doc.buildingIds || [], // Add buildingIds with default empty array
        outdoorLocation: doc.outdoorLocation || '' // Add outdoorLocation with default empty string
    }));
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to fetch campuses', 500, error);
    }
  }
}

export interface CampusRepository {
  /**
   * Retrieves a campus by its unique identifier
   * @param id - The UUID of the campus to find
   * @returns Promise resolving to the found Campus
   * @throws {NotFoundError} If campus with given ID doesn't exist
   */
  findCampusById(id: UUID): Promise<Campus>;

  /**
   * Creates a new campus in the system
   * @param data - Campus data without system-managed fields
   * @returns Promise resolving to the created Campus
   * @throws {ValidationError} If required fields are missing or invalid
   */
  createCampus(data: Omit<Campus, 'id' | 'createdAt' | 'updatedAt'>): Promise<Campus>;

  /**
   * Updates an existing campus's information
   * @param id - The UUID of the campus to update
   * @param data - Partial campus data to update
   * @returns Promise resolving to the updated Campus
   * @throws {NotFoundError} If campus with given ID doesn't exist
   */
  updateCampus(id: UUID, data: Partial<Campus>): Promise<Campus>;

  /**
   * Removes a campus from the system
   * @param id - The UUID of the campus to delete
   * @throws {NotFoundError} If campus with given ID doesn't exist
   * @throws {ConflictError} If campus has associated buildings
   */
  deleteCampus(id: UUID): Promise<void>;

  /**
   * Retrieves all campuses in the system
   * @returns Promise resolving to array of all Campuses
   * @throws {DatabaseError} If database query fails
   */
  getAllCampuses(): Promise<Campus[]>;
}