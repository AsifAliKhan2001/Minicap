import { POIInterface } from "./POIInterface";

export interface OutdoorPOI extends POIInterface {
  category: 'FOOD_TRUCK' | 'GARDEN' | 'MONUMENT' | 'SPORTS' | 'OTHER';
  seasonalAvailability?: {
    startDate: string;
    endDate: string;
  };
}
