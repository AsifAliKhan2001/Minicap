import { UUID } from "./utils";
import { Floor } from "./Floor";

export interface Room {
  id: UUID;
  floorId: UUID;
  number: string;
  name?: string;
  type: 'CLASSROOM' | 'OFFICE' | 'LAB' | 'BATHROOM' | 'OTHER';
  capacity?: number;
  isAccessible: boolean;
  floor?: Floor;
  createdAt: string;
  updatedAt: string;
}
