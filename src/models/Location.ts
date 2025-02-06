import { UUID } from './utils';

export interface Location {
  id: UUID;
  locationType: 'outdoor' | 'floorplan';
}
