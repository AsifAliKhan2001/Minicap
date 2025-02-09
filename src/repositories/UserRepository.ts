import { User } from "@/models/User";
import { UUID } from "@/models/utils";

export interface UserRepository {
  /**
   * Retrieves a user by their unique identifier
   * @param id - The UUID of the user to find
   * @returns Promise resolving to the found User
   * @throws {NotFoundError} If user doesn't exist
   */
  findUserById(id: UUID): Promise<User>;

  /**
   * Creates a new user account (sign up)
   * @param data - User registration data
   * @returns Promise resolving to created User and JWT token
   * @throws {ValidationError} If registration data is invalid
   * @throws {ConflictError} If email already exists
   */
  signUp(data: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<{ user: User; token: string }>;

  /**
   * Authenticates a user (login)
   * @param email - User's email
   * @param password - User's password
   * @returns Promise resolving to User and new JWT token
   * @throws {AuthError} If credentials are invalid
   */
  login(email: string, password: string): Promise<{ user: User; token: string }>;

  /**
   * Logs out a user by invalidating their JWT
   * @param token - JWT token to invalidate
   * @throws {AuthError} If token is invalid
   */
  logout(token: string): Promise<void>;

  /**
   * Updates user's information
   * @param id - The UUID of the user to update
   * @param data - Partial user data to update
   * @param token - Valid JWT token
   * @returns Promise resolving to updated User
   * @throws {NotFoundError} If user doesn't exist
   * @throws {AuthError} If token is invalid
   */
  updateUser(id: UUID, data: Partial<User>, token: string): Promise<User>;

  /**
   * Deletes a user account
   * @param id - The UUID of the user to delete
   * @param token - Valid JWT token
   * @throws {NotFoundError} If user doesn't exist
   * @throws {AuthError} If token is invalid
   */
  deleteUser(id: UUID, token: string): Promise<void>;
}
