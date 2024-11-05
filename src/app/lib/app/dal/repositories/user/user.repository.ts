import { IUserRepository } from "../../../services/interfaces/repositories/IUserRepository";
import {
  InternalizeMongoClient,
} from "../../../../mongo/mongo-client";
import { User, UserType } from "../../../domain/user/user.domain";

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
    console.warn("Trying to delete ", user)
    await User.findOneAndDelete({
      userId: user.userId
    })
  }
}
