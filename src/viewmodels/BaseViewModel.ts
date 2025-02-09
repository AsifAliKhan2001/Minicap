import { MongoClient, Db, Collection } from "mongodb";
import { UUID } from "@/models/utils";
import 'dotenv/config';

export abstract class BaseViewModel<T> {
  protected data: T | null = null;
  protected loading: boolean = false;
  protected error: Error | null = null;
  private static client: MongoClient;
  private static dbInstance: Db | null = null;

  constructor() {
    if (!BaseViewModel.client) {
      const uri = process.env.MONGO_URI;
      if (!uri) {
        throw new Error('MongoDB URI not found in environment variables');
      }
      BaseViewModel.client = new MongoClient(uri);
    }
  }

  protected async getDb(): Promise<Db> {
    if (!BaseViewModel.dbInstance) {
      try {
        await BaseViewModel.client.connect();
        BaseViewModel.dbInstance = BaseViewModel.client.db("minicap");
      } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw new Error("Database connection failed");
      }
    }
    return BaseViewModel.dbInstance;
  }

  protected async withCollection<R>(
    collectionName: string,
    operation: (collection: Collection) => Promise<R>
  ): Promise<R> {
    try {
      const db = await this.getDb();
      const collection = db.collection(collectionName);
      return await operation(collection);
    } catch (error) {
      console.error(`Error in collection operation: ${error}`);
      throw error;
    }
  }

  abstract load(id: UUID): Promise<void>;
  abstract save(data: Partial<T>): Promise<void>;
  
  getData(): T | null {
    return this.data;
  }

  isLoading(): boolean {
    return this.loading;
  }

  getError(): Error | null {
    return this.error;
  }

  protected setLoading(loading: boolean): void {
    this.loading = loading;
  }

  protected setError(error: Error | null): void {
    this.error = error;
  }

  protected setData(data: T | null): void {
    this.data = data;
  }

  static async cleanup(): Promise<void> {
    if (BaseViewModel.client) {
      try {
        await BaseViewModel.client.close();
        BaseViewModel.dbInstance = null;
      } catch (error) {
        console.error("Error closing MongoDB connection:", error);
      }
    }
  }
}
