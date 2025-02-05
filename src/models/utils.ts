import { v4 as uuidv4 } from 'uuid';

// Type alias for UUID strings
export type UUID = string;

// Generate a UUID v4 using the uuid package
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
