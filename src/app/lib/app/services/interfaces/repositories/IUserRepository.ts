import { User } from "@/app/lib/app/domain/user/user.domain";

export interface IUserRepository {
  getUserByIdAsync(userId: string): Promise<User | undefined>;
  addUserAsync(user: User): Promise<void>;
}