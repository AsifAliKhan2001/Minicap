import { UUID } from './utils';

export interface Route {
  id: UUID;
  accessible: boolean;
  segmentIds: UUID[];  // One-to-many with RouteSegment
}
