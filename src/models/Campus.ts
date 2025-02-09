import { UUID } from '@/models/utils';

export interface Campus {
  id: UUID;
  name: string;
  buildingIds: UUID[]; 
  outdoorLocation: UUID;
}
