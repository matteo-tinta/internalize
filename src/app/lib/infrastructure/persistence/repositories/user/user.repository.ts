import { UserType, User } from "@/app/lib/domain/user/user.domain";
import { IUserRepository } from "@/app/lib/services/_interfaces/repositories/IUserRepository";
import { InternalizeMongoClient } from "../../mongo-client";

export class UserRespository implements IUserRepository {
  constructor(private mongo: InternalizeMongoClient) {}
  
  all = async (): Promise<UserType[]> => {
    return await User.find()
  }

  getUserByIdAsync = async (userId: string): Promise<UserType | null> => {
    return await User.findOne({
      userId: userId
    })
  };

  addUserAsync = async (user: UserType) => {
    await user.save()
  };

  deleteAsync = async (user: UserType): Promise<void> => {
    await User.findOneAndDelete({
      userId: user.userId
    })
  }
}
