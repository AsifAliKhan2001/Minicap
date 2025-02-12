import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface User extends Audit {
    _id?: ObjectId;  // Unique identifier 
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

