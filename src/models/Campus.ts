import { UUID } from './utils';
import { OutdoorLocation } from './OutdoorLocation';

export interface Campus {
  id: UUID;
  name: string;
  outdoorLocation: UUID; 
  buildingIds: UUID[];  // One-to-many with Building
}
