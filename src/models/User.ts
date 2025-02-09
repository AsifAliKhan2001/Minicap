import { UUID } from '@/models/utils';

export interface User {
  id: UUID;
  name: string;
  calendarIds: UUID[];  // Many-to-many with Calendar
  currentLocationId?: UUID;  // Optional FK to Location
  data: any;
}
