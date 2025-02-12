import { ObjectId } from "mongodb";

export interface Audit {
    createdBy?: ObjectId | string;   // User ID or system identifier
    updatedBy?: ObjectId | string;
    createdAt?: Date;
    updatedAt?: Date;
}
