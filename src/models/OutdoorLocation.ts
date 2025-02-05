import { LocationInterface } from "./LocationInterface";
import { UUID } from "./utils";


export interface OutdoorLocation extends LocationInterface {
  type: 'ENTRANCE' | 'PARKING' | 'BIKE_RACK' | 'BUS_STOP' | 'OTHER';
  isAccessible: boolean;
  nearestBuildingId?: UUID;
}
