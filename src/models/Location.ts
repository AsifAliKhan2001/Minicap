import { UUID } from "mongodb";

export interface Location {
  id: UUID;
  locationType: 'outdoor' | 'floorplan';
}
