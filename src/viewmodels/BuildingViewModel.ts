import { BaseViewModel } from "./BaseViewModel";
import { Building } from "@/models/Building";
import { ObjectId } from "mongodb";
import { Audit } from "../models/Audit";
import { BuildingRepository } from "@/repositories/BuildingRepository";

export class BuildingViewModel extends BaseViewModel<Building> implements BuildingRepository {
    private readonly COLLECTION_NAME = "buildings";

    async findBuildingById(id: ObjectId): Promise<Building> {
        return this.withCollection(this.COLLECTION_NAME, async (collection) => {
            const doc = await collection.findOne({ _id: id });
            if (!doc) throw new Error(`Building with id ${id} not found`);
            return this.mapToDTO(doc);
        });
    }

    async findBuildingsByCampus(campusId: ObjectId): Promise<Building[]> {
        return this.withCollection(this.COLLECTION_NAME, async (collection) => {
            const docs = await collection.find({ campusId }).toArray();
            return docs.map(doc => this.mapToDTO(doc));
        });
    }

    async getAllBuildings(): Promise<Building[]> {
        return this.withCollection(this.COLLECTION_NAME, async (collection) => {
            const docs = await collection.find({}).toArray();
            return docs.map(doc => this.mapToDTO(doc));
        });
    }

    protected mapToDTO(doc: any): Building {
        return {
            _id: doc._id,  // Already ObjectId, no conversion needed
            name: doc.name,
            address: doc.address,
            description: doc.description,
            floors: doc.floors,
            location: doc.location,
            createdAtUTC: doc.createdAtUTC,
            updatedAtUTC: doc.updatedAtUTC,
            createdBy: doc.createdBy,
            updatedBy: doc.updatedBy
        };
    }

    protected async updateAudit(existingAudit: Partial<Audit> | null, userId: ObjectId): Promise<Audit> {
        const now = new Date();
        if (!existingAudit) {
            return {
                _id: new ObjectId(),
                createdAtUTC: now,
                updatedAtUTC: now,
                createdBy: userId,
                updatedBy: userId
            };
        }
        return {
            _id: existingAudit._id!,
            createdAtUTC: existingAudit.createdAtUTC!,
            createdBy: existingAudit.createdBy!,
            updatedAtUTC: now,
            updatedBy: userId
        };
    }
}
