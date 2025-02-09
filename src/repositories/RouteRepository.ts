import { ObjectId } from "mongodb";
import { Route } from "@/models/Route";
import { OutdoorLocation } from "@/models/OutdoorLocation";
import { RouteSegment } from "@/models/Routesegment";

export interface RouteRepository {
  /**
   * Retrieves a route by its unique identifier
   * @param id - The ObjectId of the route to find
   * @returns Promise resolving to the found Route
   * @throws {NotFoundError} If route with given ID doesn't exist
   */
  findRouteById(id: ObjectId): Promise<Route>;

  /**
   * Creates a new route in the system
   * @param data - Route data without system-managed fields
   * @returns Promise resolving to the created Route
   * @throws {ValidationError} If required fields are missing or invalid
   */
  createRoute(data: Omit<Route, "id" | "createdAt" | "updatedAt">): Promise<Route>;

  /**
   * Updates an existing route's information
   * @param id - The ObjectId of the route to update
   * @param data - Partial route data to update
   * @returns Promise resolving to the updated Route
   * @throws {NotFoundError} If route with given ID doesn't exist
   * @throws {ValidationError} If update data is invalid
   */
  updateRoute(id: ObjectId, data: Partial<Omit<Route, "id" | "createdAt" | "updatedAt">>): Promise<Route>;

  /**
   * Removes a route from the system
   * @param id - The ObjectId of the route to delete
   * @throws {NotFoundError} If route with given ID doesn't exist
   */
  deleteRoute(id: ObjectId): Promise<void>;

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

  /**
   * Creates a new route segment in the system
   * @param segment - Route segment data without path
   * @returns Promise resolving to the created RouteSegment
   * @throws {ValidationError} If required fields are missing or invalid
   */
  createRouteSegment(segment: Omit<RouteSegment, 'path'>): Promise<RouteSegment>;

  /**
   * Retrieves all segments of a route by the route's unique identifier
   * @param routeId - The ObjectId of the route to find segments for
   * @returns Promise resolving to an array of RouteSegments
   * @throws {NotFoundError} If route with given ID doesn't exist
   */
  findSegmentsByRouteId(routeId: ObjectId): Promise<RouteSegment[]>;

  /**
   * Updates an existing route segment's information
   * @param routeId - The ObjectId of the route to which the segment belongs
   * @param segmentId - The ObjectId of the segment to update
   * @param data - Partial route segment data to update
   * @returns Promise resolving to the updated RouteSegment
   * @throws {NotFoundError} If route or segment with given IDs don't exist
   * @throws {ValidationError} If update data is invalid
   */
  updateRouteSegment(
    routeId: ObjectId, 
    segmentId: ObjectId, 
    data: Partial<Omit<RouteSegment, 'routeId' | 'path'>>
  ): Promise<RouteSegment>;

  /**
   * Removes a route segment from the system
   * @param routeId - The ObjectId of the route to which the segment belongs
   * @param segmentId - The ObjectId of the segment to delete
   * @throws {NotFoundError} If route or segment with given IDs don't exist
   */
  deleteRouteSegment(routeId: ObjectId, segmentId: ObjectId): Promise<void>;
}
