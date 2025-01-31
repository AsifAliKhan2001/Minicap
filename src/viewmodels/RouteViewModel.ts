import { BaseViewModel } from "./BaseViewModel";
import { Route } from "../models/Route";
import { RouteRepository } from "../repositories/RouteRepository";
import { UUID } from "../models/utils";
import { OutdoorLocation } from "../models/OutdoorLocation";
import { RouteSegment, TransportationMode } from "../models/Routesegment";

interface RouteState {
  route: Route | null;
  segments: RouteSegment[];
}

export class RouteViewModel extends BaseViewModel<RouteState> {
  private repository: RouteRepository;

  constructor() {
    super();
    this.repository = new RouteRepository();
    this.setData({ route: null, segments: [] });
  }

  async load(id: UUID): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      const route = await this.repository.findById(id);
      this.setData({ route, segments: [] }); // Would need to load segments separately
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to load route'));
    } finally {
      this.setLoading(false);
    }
  }

  async save(data: Partial<RouteState>): Promise<void> {
    throw new Error("Not implemented");
  }

  async findAccessibleRoute(
    start: OutdoorLocation,
    end: OutdoorLocation,
    mode: TransportationMode = TransportationMode.WALKING
  ): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      
      const { route, segments } = await this.repository.findAccessibleRoute(start, end, mode);
      this.setData({ route, segments });
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to find accessible route'));
    } finally {
      this.setLoading(false);
    }
  }
}
