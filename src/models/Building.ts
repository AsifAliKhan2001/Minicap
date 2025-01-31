import { UUID } from "./utils";

export interface Building {
  id: UUID;
  name: string;
  code: string;           // Building code (e.g., "H", "MB")
  address: string;
  description?: string;
  polygonShape?: any;     // Type TBD
}
