import { BaseViewModel } from "@/viewmodels/BaseViewModel";
import { User } from "@/models/User";
import { ObjectId } from "mongodb";
import { UserRepository } from "@/repositories/UserRepository";
import { Audit } from "@/models/Audit";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

    // Private helper method to generate token
    private generateToken(userId: ObjectId): string {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
    }


    // All other repository methods should throw errors as they weren't implemented in server.js
  
    // Find user by ID 
    async findUserById(id: ObjectId): Promise<User> {
        return await this.withCollection(this.COLLECTION, async (collection) => {
            const user = await collection.findOne({ _id: id });
            if (!user) throw new Error("User not found");
            return this.mapToDTO(user);
        });
    }

    // Allowing sign up for a new user
    async signUp(data: Omit<User, "_id" | "createdAt" | "updatedAt">): Promise<{ user: User; token: string }> {
        const existingUser = await this.findByEmail(data.email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await this.createUser({
            ...data,
            password: hashedPassword,
        });

        const token = this.generateToken(newUser._id);
        return { user: newUser, token };
    }

    // Login the user
    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = this.generateToken(user._id);
        return { user, token };
    }

    // Logout the user
    async logout(token: string): Promise<void> {
        throw new Error("Method not implemented");
    }

     // Update user details
     async updateUser(id: ObjectId, data: Partial<User>, token: string): Promise<User> {
        return await this.withCollection(this.COLLECTION, async (collection) => {
            const result = await collection.updateOne({ _id: id }, { $set: data });
            if (result.modifiedCount === 0) {
                throw new Error("User not found or no changes made");
            }
            const updatedUser = await collection.findOne({ _id: id });
            return this.mapToDTO(updatedUser!);
        });
    }


    // Delete user
    async deleteUser(id: ObjectId, token: string): Promise<void> {
        await this.withCollection(this.COLLECTION, async (collection) => {
            const result = await collection.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                throw new Error("User not found");
            }
        });
    }


    // Find user by email
    async findByEmail(email: string): Promise<User | null> {
        return await this.withCollection(this.COLLECTION, async (collection) => {
            const user = await collection.findOne({ email });
            return user ? this.mapToDTO(user) : null;
        });
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
