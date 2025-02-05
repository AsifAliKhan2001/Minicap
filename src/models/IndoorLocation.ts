import { UUID } from "./utils";
import { LocationInterface } from "./LocationInterface";
import { Floor } from "./Floor";
import { Room } from "./Room";

export interface IndoorLocation extends LocationInterface {
  floorId: UUID;
  roomId?: UUID;
  floor?: Floor;
  room?: Room;
  accessibilityInfo?: string;
  category: 'CLASSROOM' | 'LABORATORY' | 'OFFICE' | 'FACILITY' | 'OTHER';
}
