import { UUID } from './utils';

export interface Event {
  id: UUID;
  name: string;
  locationId: UUID;  // FK to Location
  locationType: 'outdoor' | 'floorplan';  // Discriminator field
  startTime: string;
  endTime: string;
  recurrence: any;
  calendarId: UUID;  // FK to Calendar
}
