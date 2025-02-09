import { Event } from './Event';
import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface Course extends Event, Audit {
  courseCode: string;
  description: string;
  prerequisites: ObjectId[];
}

