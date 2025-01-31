import { UUID } from "./utils";
import { LocationInterface } from "./LocationInterface";

export interface POIInterface extends LocationInterface {
  category: string;
  tags: string[];
  imageUrl?: string;
  operatingHours?: string;
  contactInfo?: string;
  isAccessible: boolean;
  rating?: number;
}
