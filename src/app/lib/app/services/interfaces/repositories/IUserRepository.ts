import { User } from "@/app/lib/app/domain/user/user.domain";

export interface IUserRepository {
  all(): User[] | PromiseLike<User[]>;
  getUserByIdAsync(userId: string): Promise<User | undefined>;
  addUserAsync(user: User): Promise<void>;
  deleteAsync(user: User): Promise<void>;
}