import { UUID } from '@/models/utils';

export interface Planner {
  id: UUID;
  taskIDs: UUID[];
}

