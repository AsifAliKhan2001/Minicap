import { ObjectId } from "mongodb";

export interface Audit {
    _id: ObjectId;
    createdBy?: ObjectId;   
    updatedBy?: ObjectId;
    createdAtUTC?: Date;
    updatedAtUTC?: Date;
}
