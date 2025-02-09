import { UUID } from "mongodb";

export interface Weather {
  id: UUID;
  date: string;
  data: ForecastData;
}

export interface ForecastData {
  data: any;
}

