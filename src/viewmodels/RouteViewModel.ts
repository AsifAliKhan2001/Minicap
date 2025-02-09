import { BaseViewModel } from "./BaseViewModel";
import { Route } from "@/models/Route";
import { RouteRepository } from "../repositories/RouteRepository";
import { RouteSegment } from "@/models/Routesegment";
import { ObjectId } from "mongodb";
export class RouteViewModel extends BaseViewModel<Route[]> implements RouteRepository {
  async save(data: (Route | undefined)[]): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);

      if (!data) {
        throw new Error("No data provided to save");
      }

      const validRoutes = data.filter((route): route is Route => route !== undefined);
      
      await this.withCollection(this.ROUTES_COLLECTION, async (collection) => {
        for (const route of validRoutes) {
          await collection.updateOne(
            { id: route.id },
            { 
              $set: {
                ...route,
                updatedAt: new Date()
              }
            },
            { upsert: true }
          );
        }
      });

      this.setData(validRoutes);
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to save routes'));
      throw error;
    } finally {
      this.setLoading(false);
    }
  }
  private readonly ROUTES_COLLECTION = "routes";
  private readonly SEGMENTS_COLLECTION = "routeSegments";

  private mapToRoute(doc: any): Route {
    return {
      id: doc.id,
      accessible: doc.accessible,
      segmentIds: doc.segmentIds,
      createdAt: new Date(doc.createdAt),
      updatedAt: new Date(doc.updatedAt)
    };
  }

  private mapToSegment(doc: any): RouteSegment {
    return {
      routeId: doc.routeId,
      order: doc.order,
      transportationMode: doc.transportationMode,
      path: doc.path
    };
  }

  async findRouteById(id: ObjectId): Promise<Route> {
    const route = await this.withCollection(this.ROUTES_COLLECTION, async (collection) => {
      const doc = await collection.findOne({ id });
      return doc ? this.mapToRoute(doc) : null;
    });
    
    if (!route) {
      throw new Error('Route not found');
    }
    
    return route;
  }

  async findSegmentsByRouteId(routeId: ObjectId): Promise<RouteSegment[]> {
    return await this.withCollection(this.SEGMENTS_COLLECTION, async (collection) => {
      const docs = await collection.find({ routeId }).toArray();
      return docs.map(doc => this.mapToSegment(doc));
    });
  }

  async createRoute(data: Omit<Route, "id" | "createdAt" | "updatedAt">): Promise<Route> {
    return await this.withCollection(this.ROUTES_COLLECTION, async (collection) => {
      const doc = {
        ...data,
        id: new ObjectId(),
        segmentIds: [], // Initialize empty segments array
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await collection.insertOne(doc);
      return this.mapToRoute(doc);
    });
  }

  async createRouteSegment(segment: Omit<RouteSegment, 'path'>): Promise<RouteSegment> {
    return await this.withCollection(this.SEGMENTS_COLLECTION, async (collection) => {
      const doc = {
        ...segment,
        id: new ObjectId(),
        path: null
      };
      await collection.insertOne(doc);
      return this.mapToSegment(doc);
    });
  }

  async load(id?: ObjectId): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);

      const routes = id ? 
        [await this.findRouteById(id)] : 
        await this.withCollection(this.ROUTES_COLLECTION, async (collection) => {
          const docs = await collection.find({}).toArray();
          return docs.map(doc => this.mapToRoute(doc));
        });

      this.setData(routes);
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to load routes'));
    } finally {
      this.setLoading(false);
    }
  }

  // Required interface methods with basic implementations
  async updateRoute(): Promise<Route> { throw new Error("Not implemented"); }
  async deleteRoute(): Promise<void> { throw new Error("Not implemented"); }
  async updateRouteSegment(): Promise<RouteSegment> { throw new Error("Not implemented"); }
  async deleteRouteSegment(): Promise<void> { throw new Error("Not implemented"); }
  async findAccessibleRoute(): Promise<{ route: Route; segments: RouteSegment[] }> { 
    throw new Error("Not implemented"); 
  }
}
