import { UUID } from "./utils";

export interface Building {
  id: UUID;
  name: string;
  code: string;           // Building code (e.g., "H", "MB")
  address: string;
  description?: string;
  polygonShape?: any;     // Type TBD
}

// ---with the new erd diagram:---
// import { UUID } from "./utils";

// export interface Building {
//   id: UUID;
//   name: string;
//   code: string;  // Building code (e.g., "H", "MB")
//   address: string;
//   description?: string;
//   polygonShape?: any;  // Type TBD (consider defining a specific type)
//   campusId: UUID;  // Foreign key from ERD
//   openingHours?: string;
//   outdoorLocationId?: UUID;  // For mapping location if applicable

// }