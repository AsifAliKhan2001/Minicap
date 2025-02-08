import { Location } from './Location';

export interface OutdoorLocation extends Location {
  locationType: 'outdoor';
  latitude: number;
  longitude: number;
  latitudeDelta: number;     // Added field
  longitudeDelta: number;    // Added field
}

