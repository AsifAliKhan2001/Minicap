import { UUID } from "./utils";
import { OutdoorLocation } from "./OutdoorLocation";

export interface Coordinate {
  lat: number;
  lng: number;
}

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
  path?: Coordinate[];  // Array of coordinates defining the route path
}
