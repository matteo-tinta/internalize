import { UserType } from "@/app/lib/domain/user/user.domain";

export interface IUserRepository {
  all(): UserType[] | PromiseLike<UserType[]>;
  getUserByIdAsync(userId: string): Promise<UserType | null>;
  addUserAsync(user: UserType): Promise<void>;
  deleteAsync(user: UserType): Promise<void>;
}