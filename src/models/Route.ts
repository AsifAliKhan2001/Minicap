// src/models/Route.ts
import { UUID } from "./utils";

export interface Route {
  id: UUID;
  accessible?: boolean;
}
