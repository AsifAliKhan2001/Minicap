import { v4 as uuidv4 } from 'uuid';

// UUID type alias is kept for semantic clarity and future extensibility
// even though it's currently just a string
export type UUID = string;

// Generate a UUID v4 using the uuid library
export function generateUUID(): UUID {
  return uuidv4();
}

// Convert Date to ISO8601 string
export function toISOString(date: Date): string {
  return date.toISOString();
}

// Parse ISO8601 string to Date
export function fromISOString(dateStr: string): Date {
  return new Date(dateStr);
}
