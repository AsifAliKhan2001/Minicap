import { BaseViewModel } from "./BaseViewModel";
import { POIInterface } from "@/models/POIInterface";
import { MapRepository } from "../repositories/MapRepository";
import { RouteViewModel } from "./RouteViewModel";
import { OutdoorLocation } from "@/models/OutdoorLocation";
import { TransportationMode } from "@/models/RouteSegment";
import { ObjectId } from "mongodb";

interface MapState {
  pois: POIInterface[];
  selectedPOI: POIInterface | null;
  currentLocation: OutdoorLocation | null;
  destination: OutdoorLocation | null;
  isIndoorMode: boolean;
}

export class MapViewModel extends BaseViewModel<MapState> {
  private repository: MapRepository;
  private routeViewModel: RouteViewModel;

  constructor() {
    super();
    this.repository = new MapRepository();
    this.routeViewModel = new RouteViewModel();
    this.indoorNavigationViewModel = new IndoorNavigationViewModel();
    this.setData({
      pois: [],
      selectedPOI: null,
      currentLocation: null,
      destination: null,
      isIndoorMode: false,
    });
  }

  async load(id: ObjectId): Promise<void> {
    await this.loadAllPOIs();
  }

  async save(data: Partial<MapState>): Promise<void> {
    throw new Error("Not implemented");
  }

  async loadAllPOIs(): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);

      const pois = await this.repository.findAllPOIs();
      const currentState = this.getData();
      this.setData({
        ...currentState,
        pois,
      });
    } catch (error) {
      this.setError(
        error instanceof Error ? error : new Error("Failed to load POIs")
      );
    } finally {
      this.setLoading(false);
    }
  }

  setCurrentLocation(location: OutdoorLocation): void {
    const currentState = this.getData();
    this.setData({
      ...currentState,
      currentLocation: location,
    });
  }

  setDestination(location: OutdoorLocation): void {
    const currentState = this.getData();
    this.setData({
      ...currentState,
      destination: location,
    });
  }

  async calculateRoute(
    mode: TransportationMode = TransportationMode.WALKING
  ): Promise<void> {
    const state = this.getData();
    if (!state?.currentLocation || !state?.destination) {
      throw new Error("Both current location and destination must be set");
    }

    // If both locations are outdoors, use outdoor routing
    if (!state.isIndoorMode) {
      await this.routeViewModel.findAccessibleRoute(
        state.currentLocation,
        state.destination,
        mode
      );
      return;
    }

    // For indoor-to-indoor routing, use indoor navigation
    // This is a placeholder - you'll need to implement the actual indoor-to-indoor routing
    throw new Error("Indoor routing not implemented yet");
  }

  async switchToIndoorMode(building: Building, floor: Floor): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);

      await this.indoorNavigationViewModel.setCurrentFloor(floor);

      const currentState = this.getData();
      this.setData({
        ...currentState,
        isIndoorMode: true,
      });
    } catch (error) {
      this.setError(
        error instanceof Error
          ? error
          : new Error("Failed to switch to indoor mode")
      );
    } finally {
      this.setLoading(false);
    }
  }

  async switchToOutdoorMode(): Promise<void> {
    const currentState = this.getData();
    this.setData({
      ...currentState,
      isIndoorMode: false,
    });
  }

  getIndoorNavigationData() {
    return this.indoorNavigationViewModel.getData();
  }

  getRouteData() {
    return this.routeViewModel.getData();
  }

  selectPOI(poi: POIInterface): void {
    const currentState = this.getData();
    this.setData({
      ...currentState,
      selectedPOI: poi,
    });
  }
}
