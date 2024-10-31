import { User } from "@/app/lib/app/domain/user/user.domain";

export interface IUserRepository {
  addUserAsync(user: User): Promise<void>;
}