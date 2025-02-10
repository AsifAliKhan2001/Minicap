import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface User extends Audit {
    email: string;
    password: string;
    name: string;
    calendarIds: ObjectId[];
    currentLocationId?: ObjectId;
}

export interface Administrator extends User {
  dateGranted: Date;
}
