import { UUID } from "./utils";
import { OutdoorLocation } from "./OutdoorLocation";

export enum TransportationMode {
  WALKING = "WALKING",
  DRIVING = "DRIVING",
  TRANSIT = "TRANSIT",
  BICYCLE = "BICYCLE"
}

export interface RouteSegment {
  id: UUID;
  routeId: UUID;
  order: number;
  startOutdoorLocationId: UUID;
  endOutdoorLocationId: UUID;
  startOutdoorLocation?: OutdoorLocation;
  endOutdoorLocation?: OutdoorLocation;
  transportationMode: TransportationMode;
  path?: any;  // Type TBD
}
