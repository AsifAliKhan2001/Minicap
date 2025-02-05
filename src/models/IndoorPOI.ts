import { POIInterface } from "./POIInterface";
import { UUID } from "./utils";
import { Floor } from "./Floor";
import { Room } from "./Room";

export interface IndoorPOI extends POIInterface {
  floorId: UUID;
  roomId?: UUID;
  floor?: Floor;
  room?: Room;
  category: 'RESTAURANT' | 'SHOP' | 'SERVICE' | 'STUDY_AREA' | 'OTHER';
}
