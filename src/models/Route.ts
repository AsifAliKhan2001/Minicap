import { UUID } from "./utils";
import { RouteSegment } from "./RouteSegment";

export interface Route {
  id: UUID;
  accessible: boolean;
  segments?: RouteSegment[];
  createdAt: string;
  updatedAt: string;
}
