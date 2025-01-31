import { UUID } from "./utils";
import { Building } from "./Building";

export interface Campus {
  id: UUID;
  name: string;
  description?: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  buildings?: Building[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
