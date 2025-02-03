// Type alias for UUID strings
export type UUID = string;

// Generate a UUID v4
export function generateUUID(): UUID {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Convert Date to ISO8601 string
export function toISOString(date: Date): string {
  return date.toISOString();
}

// Parse ISO8601 string to Date
export function fromISOString(dateStr: string): Date {
  return new Date(dateStr);
}
