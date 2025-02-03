// src/models/Planner.ts
import { UUID } from "./utils";
import { User } from "./User";

export interface Planner {
  id: UUID;
  userId: UUID; // FK to User
  user?: User; // Optional, for easier access
  // ... other planner attributes if needed, add later
}
