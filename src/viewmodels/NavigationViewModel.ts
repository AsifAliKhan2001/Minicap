import { BaseViewModel } from "./BaseViewModel";
import { Route } from "@/models/Route";
import { RouteSegment, Coordinate } from "@/models/RouteSegment";
import { UUID } from "@/models/utils";

export class NavigationViewModel extends BaseViewModel<Route> {
  private currentLocation?: Coordinate;
  private destination?: Coordinate;

  async load(id: UUID): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      
      // TODO: Implement actual API call
      // Mock data for now
      const mockRoute: Route = {
        id,
        startLocationId: 'start-id',
        endLocationId: 'end-id',
        estimatedDuration: 600, // 10 minutes
        distance: 500, // meters
        segments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      this.setData(mockRoute);
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to load route'));
    } finally {
      this.setLoading(false);
    }
  }

  async save(data: Partial<Route>): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      
      if (this.data) {
        this.setData({
          ...this.data,
          ...data,
          updatedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to save route'));
    } finally {
      this.setLoading(false);
    }
  }

  setCurrentLocation(coordinate: Coordinate): void {
    this.currentLocation = coordinate;
  }

  setDestination(coordinate: Coordinate): void {
    this.destination = coordinate;
  }

  async calculateRoute(): Promise<void> {
    if (!this.currentLocation || !this.destination) {
      throw new Error('Current location and destination must be set');
    }
    
    // TODO: Implement route calculation logic
  }

  getEstimatedArrival(): Date | null {
    if (!this.data?.estimatedDuration) return null;
    
    const now = new Date();
    return new Date(now.getTime() + this.data.estimatedDuration * 1000);
  }
}
