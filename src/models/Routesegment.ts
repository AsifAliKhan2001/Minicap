import { UUID } from "mongodb";

export interface RouteSegment {
  routeId: UUID;
  order: number;
  transportationMode: TransportationMode;
  path: any;
}

export enum TransportationMode {

}

