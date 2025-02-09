import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface Weather extends Audit {
  date: Date;
  data: ForecastData;
}

export interface ForecastData {
  data: any;
}

