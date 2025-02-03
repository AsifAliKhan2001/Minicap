import { UUID } from "./utils";

export interface LocationInterface {
  id: UUID;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}
