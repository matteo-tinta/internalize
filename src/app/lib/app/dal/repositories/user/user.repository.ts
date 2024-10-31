import { IUserRepository } from "../../../services/interfaces/repositories/IUserRepository";
import {
  InternalizeDbName,
  InternalizeMongoClient,
} from "../../../../mongo/mongo-client";
import { User } from "@/app/lib/app/domain/user/user.domain";

export class UserRespository implements IUserRepository {
  collectionName: string = "users";
  constructor(private mongo: InternalizeMongoClient) {}

  getUserByIdAsync = async (userId: string): Promise<User | undefined> => {
    const mongoClient = await this.mongo.db(InternalizeDbName!);
    return (await mongoClient.collection(this.collectionName).findOne({
      userId: userId,
    })) as unknown as User;
  };

  addUserAsync = async (user: User) => {
    const mongoClient = await this.mongo.db(InternalizeDbName!);

    await mongoClient.collection(this.collectionName).insertOne(user);
  };
}
