import { UUID } from '@/models/utils';
import { Location } from './Location';

export interface FloorplanLocation extends Location {
  locationType: 'floorplan';
  floorplanId: UUID;
  x: number;
  y: number;
}
