import { UUID } from "@/models/utils";

export interface BaseRepository<T> {
  findById(id: UUID): Promise<T>;
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: UUID, data: Partial<T>): Promise<T>;
  delete(id: UUID): Promise<void>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
