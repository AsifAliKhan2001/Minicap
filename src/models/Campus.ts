import { UUID } from "./utils";
import { Building } from "./Building";

export interface Campus {
  id: UUID;
  name: string;
  buildings: Building[]; // Campus-to-Building relationship
}
