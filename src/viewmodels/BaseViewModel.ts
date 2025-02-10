import { MongoClient, Db, Collection, ObjectId } from "mongodb";
import { Audit } from "@/models/Audit";
import 'dotenv/config';

export abstract class BaseViewModel<T extends Audit> {
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

    /**
     * Maps MongoDB document to DTO
     * @param doc MongoDB document
     */
    protected abstract mapToDTO(doc: any): T;

    /**
     * Updates audit information
     * @param existingAudit Current audit data if exists
     * @param userId User making the change
     */
    protected abstract updateAudit(existingAudit: Partial<Audit> | null, userId: ObjectId): Promise<Audit>;

    static async cleanup(): Promise<void> {
        if (BaseViewModel.client) {
            await BaseViewModel.client.close();
            BaseViewModel.dbInstance = null;
        }
    }
}
