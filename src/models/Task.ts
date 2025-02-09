import { UUID } from '@/models/utils';

export interface Task {
  id: UUID;
  description: string;
  locationId: UUID;  // FK to Location
  locationType: string;
  emergencyTask: boolean;
  needsDisplay: boolean;
  plannerId: UUID;   // FK to Planner
}
