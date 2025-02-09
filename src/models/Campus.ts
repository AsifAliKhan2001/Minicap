import { UUID } from './utils';

export interface Campus {
  id: UUID;
  name: string;
  buildings: UUID[]; 
}
