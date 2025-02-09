import { ObjectId } from "mongodb";
import { Location } from './Location';

export interface FloorplanLocation extends Location {
  locationType: 'floorplan';
  floorplanId: ObjectId;
  x: number;
  y: number;
}
