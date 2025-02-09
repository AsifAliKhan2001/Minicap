import { UUID } from '@/models/utils';

export interface Location {
  id: UUID;
  locationType: 'outdoor' | 'floorplan';
}
