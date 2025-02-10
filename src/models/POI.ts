import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface POI extends Audit {
  type: string;
  name: string;
  category: POICategory;
  description: string;
  location: ObjectId;
}

export enum POICategory {
  RESTAURANT = "RESTAURANT",
  COFFEE_SHOP = "COFFEE_SHOP",
  BATHROOM = "BATHROOM",
  LIBRARY = "LIBRARY",
  OTHER = "OTHER"
}

