import { UUID } from "mongodb";

export interface Calendar {
  id: UUID;
  eventIds: UUID[]; // One-to-many with Event
  userIds: UUID[]; // Many-to-many with User
}
