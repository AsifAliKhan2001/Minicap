import { UUID } from "mongodb";

export interface Planner {
  id: UUID;
  taskIDs: UUID[];
}

