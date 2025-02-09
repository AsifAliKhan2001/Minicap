import { BaseViewModel } from "./BaseViewModel";
import { IndoorLocation } from "@/models/IndoorLocation";
import { IndoorNavigationRepository } from "../repositories/FloorplanNavigationRepository";
import { Floor } from "@/models/Floor";
import { POIInterface } from "@/models/POIInterface";
import { UUID } from "@/models/utils";

interface IndoorNavigationState {
  currentFloor: Floor | null;
  currentLocation: IndoorLocation | null;
  destination: IndoorLocation | null;
  path: IndoorLocation[];
  floorPOIs: POIInterface[];
}

export class IndoorNavigationViewModel extends BaseViewModel<IndoorNavigationState> {
  private repository: IndoorNavigationRepository;

  constructor() {
    super();
    this.repository = new IndoorNavigationRepository();
    this.setData({
      currentFloor: null,
      currentLocation: null,
      destination: null,
      path: [],
      floorPOIs: []
    });
  }

  async load(id: UUID): Promise<void> {
    // Load a specific indoor location
    try {
      this.setLoading(true);
      this.setError(null);
      const location = await this.repository.findById(id);
      const currentState = this.getData();
      this.setData({
        ...currentState,
        currentLocation: location
      });
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to load indoor location'));
    } finally {
      this.setLoading(false);
    }
  }

  async save(data: Partial<IndoorNavigationState>): Promise<void> {
    throw new Error("Not implemented");
  }

  async setCurrentFloor(floor: Floor): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);

      // Load POIs for this floor
      const pois = await this.repository.findPOIsByFloor(floor.id);
      
      const currentState = this.getData();
      this.setData({
        ...currentState,
        currentFloor: floor,
        floorPOIs: pois
      });
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to set current floor'));
    } finally {
      this.setLoading(false);
    }
  }

  async findIndoorPath(
    start: IndoorLocation,
    end: IndoorLocation,
    requireAccessible: boolean = false
  ): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);

      const path = await this.repository.findAccessiblePath(start, end);
      
      const currentState = this.getData();
      this.setData({
        ...currentState,
        currentLocation: start,
        destination: end,
        path
      });
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to find indoor path'));
    } finally {
      this.setLoading(false);
    }
  }

  async findNearestAccessPoint(
    floor: Floor,
    type: 'stairs' | 'elevator'
  ): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);

      const rooms = type === 'stairs' 
        ? await this.repository.findNearestStairs(floor)
        : await this.repository.findNearestElevator(floor);

      // Update state if needed
      const currentState = this.getData();
      if (rooms.length > 0) {
        // Convert room to indoor location and set as destination
        // This is a placeholder - you'll need to implement the actual conversion
        this.setData({
          ...currentState,
          destination: {
            id: rooms[0].id,
            name: rooms[0].number,
            description: `Nearest ${type}`,
            floorId: floor.id,
            category: 'FACILITY',
            latitude: 0,
            longitude: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        });
      }
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error(`Failed to find nearest ${type}`));
    } finally {
      this.setLoading(false);
    }
  }
}
