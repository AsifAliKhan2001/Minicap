import { UUID } from './utils';

export interface Room {
  id: UUID;
  floorId: UUID;    // Reference to parent Floor
  number: string;
  type: string;
}
