import { UUID } from "./utils";

export interface Building {
  id: UUID;
  name: string;  
  polygonShape?: any;  // Type TBD (consider defining a specific type)
  description?: string;
  address: string;
  openingHours?: string;
  floors: UUID; // TODO : Floor type to be changed to array of floor objects after defining the floor model
  location: UUID; 
}