import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface User extends Audit {
    email: string;
    password: string;
    name: string;
    calendarIds: ObjectId[];
    currentLocationId?: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Administrator extends User {
    dateGranted: Date; // Date the user was granted admin rights
}

