import { UUID } from "mongodb";

export interface POI {
  id: UUID;
  type: string;
  description: string;
}

