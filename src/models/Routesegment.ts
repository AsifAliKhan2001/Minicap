import { UUID } from './utils';

export interface RouteSegment {
  routeId: UUID;
  order: number;
  transportationMode: string;
  path: any;
}

