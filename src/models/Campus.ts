import { UUID } from './utils';

export interface Campus {
  id: UUID;
  name: string;
  buildingIds: UUID[];  // One-to-many with Building
}
