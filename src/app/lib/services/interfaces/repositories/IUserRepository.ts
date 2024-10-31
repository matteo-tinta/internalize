import { User } from "@/app/lib/domain/user.domain";

export interface IUserRepository {
  addUserAsync(user: User): Promise<void>;
}