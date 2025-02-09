import { ObjectId } from "mongodb";
import { Audit } from "./Audit";

export interface Route extends Audit {
  accessible: boolean;
  segmentIds: ObjectId[];  // One-to-many with RouteSegment
}
