import { UUID } from "mongodb";
import { Location } from './Location';

export interface FloorplanLocation extends Location {
  locationType: 'floorplan';
  floorplanId: UUID;
  x: number;
  y: number;
}
