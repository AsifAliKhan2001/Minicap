import { BaseViewModel } from "@/viewmodels/BaseViewModel";
import { User } from "@/models/User";
import { ObjectId } from "mongodb";
import { UserRepository } from "@/repositories/UserRepository";
import { Audit } from "@/models/Audit";

export class UserViewModel extends BaseViewModel<User> implements UserRepository {
    private readonly COLLECTION = "Users_Info";

    // These were the only methods implemented in server.js
    async getAllUsers(): Promise<User[]> {
        return await this.withCollection(this.COLLECTION, async (collection) => {
            const users = await collection.find().toArray();
            return users.map(user => this.mapToDTO(user));
        });
    }

    async createUser(userData: Omit<User, "_id">): Promise<User> {
        return await this.withCollection(this.COLLECTION, async (collection) => {
            const result = await collection.insertOne(userData);
            const newUser = await collection.findOne({ _id: result.insertedId });
            return this.mapToDTO(newUser!);
        });
    }

    // All other repository methods should throw errors as they weren't implemented in server.js
    async findUserById(id: ObjectId): Promise<User> {
        throw new Error("Method not implemented");
    }

    async signUp(data: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<{ user: User; token: string }> {
        throw new Error("Method not implemented");
    }

    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        throw new Error("Method not implemented");
    }

    async logout(token: string): Promise<void> {
        throw new Error("Method not implemented");
    }

    async updateUser(id: ObjectId, data: Partial<User>, token: string): Promise<User> {
        throw new Error("Method not implemented");
    }

    async deleteUser(id: ObjectId, token: string): Promise<void> {
        throw new Error("Method not implemented");
    }

    async findByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented");
    }

    protected mapToDTO(doc: any): User {
        if (!doc) throw new Error('Document not found');
        return {
            _id: doc._id,
            name: doc.name,
            email: doc.email,
            password: doc.password,
            calendarIds: doc.calendarIds || []
        };
    }

    protected async updateAudit(existingAudit: Partial<Audit> | null, userId: ObjectId): Promise<Audit> {
        throw new Error("Method not implemented");
    }
}
