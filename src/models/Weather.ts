import { UUID } from "./utils";

export interface Weather {
  id: UUID;
  date: string;           // ISO8601 date string
  data?: any;            // Type TBD
}
