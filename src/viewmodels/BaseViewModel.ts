import { UUID } from "../models/utils";

export abstract class BaseViewModel<T> {
  protected data: T | null = null;
  protected loading: boolean = false;
  protected error: Error | null = null;

  abstract load(id: UUID): Promise<void>;
  abstract save(data: Partial<T>): Promise<void>;
  
  getData(): T | null {
    return this.data;
  }

  isLoading(): boolean {
    return this.loading;
  }

  getError(): Error | null {
    return this.error;
  }

  protected setLoading(loading: boolean): void {
    this.loading = loading;
  }

  protected setError(error: Error | null): void {
    this.error = error;
  }

  protected setData(data: T | null): void {
    this.data = data;
  }
}
