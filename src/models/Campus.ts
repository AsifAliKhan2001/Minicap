import { UUID } from "mongodb";

export interface Campus {
  id: UUID;
  name: string;
  buildingIds: UUID[]; 
  outdoorLocation: UUID;
}
