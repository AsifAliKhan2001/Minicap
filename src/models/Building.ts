import { UUID } from './utils';

export interface Building {
  id: UUID;
  campusId: UUID;    // Reference to parent Campus
  name: string;
  polygonShape: any;
  description: string;
  address: string;
  openingHours: string;
  floorIds: UUID[];  // One-to-many with Floor
  locationId: UUID;  // FK to Location
}
