import { UUID } from "@/models/utils";
import { Route } from "@/models/Route";
import { RouteSegment} from "@/models/RouteSegment";
import { OutdoorLocation } from "@/models/OutdoorLocation";

export interface RouteRepository {
  /**
   * Retrieves a route by its unique identifier
   * @param id - The UUID of the route to find
   * @returns Promise resolving to the found Route
   * @throws {NotFoundError} If route with given ID doesn't exist
   */
  findRouteById(id: UUID): Promise<Route>;

  /**
   * Creates a new route in the system
   * @param data - Route data without system-managed fields
   * @returns Promise resolving to the created Route
   * @throws {ValidationError} If required fields are missing or invalid
   */
  createRoute(data: Omit<Route, "id" | "createdAt" | "updatedAt">): Promise<Route>;

  /**
   * Updates an existing route's information
   * @param id - The UUID of the route to update
   * @param data - Partial route data to update
   * @returns Promise resolving to the updated Route
   * @throws {NotFoundError} If route with given ID doesn't exist
   * @throws {ValidationError} If update data is invalid
   */
  updateRoute(id: UUID, data: Partial<Omit<Route, "id" | "createdAt" | "updatedAt">>): Promise<Route>;

  /**
   * Removes a route from the system
   * @param id - The UUID of the route to delete
   * @throws {NotFoundError} If route with given ID doesn't exist
   */
  deleteRoute(id: UUID): Promise<void>;

  /**
   * Calculates an accessible route between two locations
   * @param start - Starting outdoor location
   * @param end - Ending outdoor location
   * @param mode - Transportation mode to use
   * @returns Promise resolving to route and its segments
   * @throws {ValidationError} If locations are invalid
   */
  findAccessibleRoute(
    start: OutdoorLocation,
    end: OutdoorLocation,
    mode: string
  ): Promise<{ route: Route; segments: RouteSegment[] }>;
}
