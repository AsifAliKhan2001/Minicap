import { UUID } from './utils';

export interface Campus {
  id: UUID;
  name: string;
  buildings: Building[]; // Campus-to-Building relationship
}
