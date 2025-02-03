import { UUID } from "./utils";
import { Building } from "./Building";
import { Floorplan } from "./Floorplan";
import { Room } from "./Room";

export interface Floor {
  id: UUID;
  buildingId: UUID;
  number: number;
  name: string;
  description?: string;
  isAccessible: boolean;
  building?: Building;
  floorplan?: Floorplan;
  rooms?: Room[];
  createdAt: string;
  updatedAt: string;
}
