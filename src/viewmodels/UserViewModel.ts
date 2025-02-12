import { BaseViewModel } from "@/viewmodels/BaseViewModel";
import { User } from "@/models/User";
import { ObjectId } from "mongodb";
import { UserRepository } from "@/repositories/UserRepository";
import bcrypt from "react-native-bcrypt";
import jwt from "jsonwebtoken";
import { Audit } from "@/models/Audit";


export class UserViewModel extends BaseViewModel<User> implements UserRepository {
    private readonly COLLECTION = "Users_Info";

    async getAllUsers(): Promise<User[]> {
        return await this.withCollection(this.COLLECTION, async (collection) => {
            const users = await collection.find().toArray();
            return users.map(user => this.mapToDTO(user));
        });
    }

    async createUser(userData: Omit<User, "_id">): Promise<User> {
        return await this.withCollection(this.COLLECTION, async (collection) => {
            const result = await collection.insertOne(userData);
            return this.mapToDTO(await collection.findOne({ _id: result.insertedId }));
        });
    }

    async findUserById(id: ObjectId): Promise<User> {  
        return await this.withCollection(this.COLLECTION, async (collection) => {
            const user = await collection.findOne({ _id: id });
            if (!user) throw new Error("User not found");
            return this.mapToDTO(user);
        });
    }

    async updateAudit(existingAudit: Partial<Audit> | null, userId: ObjectId): Promise<Audit> {
        const updatedAudit: Audit = {
            createdBy: existingAudit?.createdBy ?? userId.toHexString(),
            updatedBy: userId.toHexString(),
            createdAt: existingAudit?.createdAt ?? new Date(),
            updatedAt: new Date(),
        };
    
        return updatedAudit;
    }
    

    private generateToken(userId: ObjectId): string {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
    }

    async signUp(data: Omit<User, "_id" | "createdAt" | "updatedAt">): Promise<{ user: User; token: string }> {
        const existingUser = await this.findByEmail(data.email);
        if (existingUser) throw new Error("User already exists");

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await this.createUser({ ...data, password: hashedPassword });

        return { user: newUser, token: this.generateToken(newUser._id!) };
    }

    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const user = await this.findByEmail(email);
        if (!user) throw new Error("User not found");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error("Invalid password");

        return { user, token: this.generateToken(user._id!) };
    }

    async logout(token: string): Promise<void> {
        console.log("User logged out:", token);
    }

    async updateUser(id: ObjectId, data: Partial<User>, token: string): Promise<User> {
        return await this.withCollection(this.COLLECTION, async (collection) => {
            const existingUser = await collection.findOne({ _id: id }) as unknown as User; // ✅ Cast to User
            if (!existingUser) throw new Error("User not found");
    
            const result = await collection.updateOne({ _id: id }, { $set: data });
            if (result.modifiedCount === 0) throw new Error("No changes made");
    
            // Pass the correct parameters to updateAudit
            const updatedAudit: Audit = await this.updateAudit(existingUser as Partial<Audit>, id);
    
            
            await collection.updateOne({ _id: id }, { $set: updatedAudit });
    
            return this.mapToDTO(await collection.findOne({ _id: id }) as User);
        });
    }
    

    async deleteUser(id: ObjectId, token: string): Promise<void> {
        await this.withCollection(this.COLLECTION, async (collection) => {
            const result = await collection.deleteOne({ _id: id });
            if (result.deletedCount === 0) throw new Error("User not found");
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.withCollection(this.COLLECTION, async (collection) => {
            return this.mapToDTO(await collection.findOne({ email }));
        });
    }

    protected mapToDTO(doc: any): User {
        if (!doc) throw new Error("Document not found");
        return { 
            _id: doc._id, 
            name: doc.name, 
            email: doc.email, 
            password: doc.password, 
            calendarIds: doc.calendarIds || [], 
            currentLocationId: doc.currentLocationId,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            createdBy: doc.createdBy,
            updatedBy: doc.updatedBy
        };
    }
}
