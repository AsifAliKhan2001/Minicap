import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface Calendar extends Audit {
  eventIds: ObjectId[]; // One-to-many with Event
  userIds: ObjectId[]; // Many-to-many with User
}
