import { ObjectId } from "mongodb";

export interface RouteSegment {
  routeId: ObjectId;
  order: number;
  transportationMode: TransportationMode;
  path: any;
}

export enum TransportationMode {

}

