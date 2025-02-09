import { BaseViewModel } from "./BaseViewModel";
import { User } from "@/models/User";
import { ObjectId } from "mongodb";

export class UserViewModel extends BaseViewModel<User> {
  async load(id: ObjectId): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      
      // TODO: Implement actual API call
      const mockUser: User = {
        id,
        email: '',
        firstName: '',
        lastName: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      this.setData(mockUser);
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to load user'));
    } finally {
      this.setLoading(false);
    }
  }

  async save(data: Partial<User>): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      
      if (this.data) {
        this.setData({
          ...this.data,
          ...data,
          updatedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to save user'));
    } finally {
      this.setLoading(false);
    }
  }

  getFullName(): string {
    if (!this.data) return '';
    return `${this.data.firstName} ${this.data.lastName}`.trim();
  }
}
