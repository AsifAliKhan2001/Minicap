import { UUID } from './utils';

export interface Campus {
  id: UUID;
  name: string;
  outdoorLocation: UUID; 
  buildingIds: UUID[];  // One-to-many with Building
}
