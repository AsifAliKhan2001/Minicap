import { MongoClient, ObjectId } from "mongodb";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";
import { v4 as uuidv4 } from "uuid"; 

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://Asif1:wyLpZZWGqgmfg4on@cluster0.6zyyx.mongodb.net/Users_Info";
const DATABASE_NAME = "Users_Info";
const COLLECTION_NAME = "Users";
const SESSION_COLLECTION = "User_Sessions"; 

export class UserViewModel implements UserRepository {
    private client: MongoClient;
    private collection: any;
    private sessionCollection: any;

    constructor() {
        this.client = new MongoClient(MONGO_URI);
    }

    async connect() {
        if (!this.client) {
            this.client = new MongoClient(MONGO_URI);
        }
        try {
            await this.client.connect(); 
            const db = this.client.db(DATABASE_NAME);
            this.collection = db.collection(COLLECTION_NAME);
            this.sessionCollection = db.collection(SESSION_COLLECTION);
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error);
            throw new Error("Database connection failed");
        }
    }

    async signUp(data: Omit<User, "_id" | "createdAt" | "updatedAt">): Promise<{ user: User; token: string }> {
        await this.connect();

        
        const result = await this.collection.insertOne({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const newUser = await this.findUserById(result.insertedId);

        // Generate session token
        const token = uuidv4();
        await this.sessionCollection.insertOne({ userId: result.insertedId, token, createdAt: new Date() });

        return { user: newUser, token };
    }

    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        await this.connect();

        
        const user = await this.collection.findOne({ email, password });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        // Generate session token
        const token = uuidv4();
        await this.sessionCollection.insertOne({ userId: user._id, token, createdAt: new Date() });

        return { user, token };
    }

    async logout(token: string): Promise<void> {
        await this.connect();
        await this.sessionCollection.deleteOne({ token });
    }

    async validateSession(token: string): Promise<User | null> {
        await this.connect();
        const session = await this.sessionCollection.findOne({ token });
        if (!session) return null;

        return await this.findUserById(session.userId);
    }

    async findUserById(id: ObjectId): Promise<User> {
        await this.connect();
        const user = await this.collection.findOne({ _id: id });
        if (!user) throw new Error("User not found");
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        await this.connect();
        return await this.collection.findOne({ email });
    }

    async updateUser(id: ObjectId, data: Partial<User>, token: string): Promise<User> {
        await this.connect();
        await this.collection.updateOne({ _id: id }, { $set: { ...data, updatedAt: new Date() } });
        return await this.findUserById(id);
    }

    async deleteUser(id: ObjectId, token: string): Promise<void> {
        await this.connect();
        await this.collection.deleteOne({ _id: id });
    }
}