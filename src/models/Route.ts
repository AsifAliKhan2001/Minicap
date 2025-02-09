import { UUID } from '@/models/utils';

export interface Route {
  id: UUID;
  accessible: boolean;
  segmentIds: UUID[];  // One-to-many with RouteSegment
  createdAt: Date;
  updatedAt: Date;
}
