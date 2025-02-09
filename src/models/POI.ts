import { UUID } from '@/models/utils';

export interface POI {
  id: UUID;
  type: string;
  description: string;
}

