import { UUID } from "mongodb";

export interface BaseRepository<T> {
  findById(id: UUID): Promise<T>;
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>, token: string): Promise<T>;
  update(id: UUID, data: Partial<T>, token: string): Promise<T>;
  delete(id: UUID, token: string): Promise<void>;
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
