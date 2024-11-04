import { IUserRepository } from "../../../services/interfaces/repositories/IUserRepository";
import {
  InternalizeDbName,
  InternalizeMongoClient,
} from "../../../../mongo/mongo-client";
import { User } from "@/app/lib/app/domain/user/user.domain";

export class UserRespository implements IUserRepository {
  collectionName: string = "users";
  constructor(private mongo: InternalizeMongoClient) {}
  
  all = async (): Promise<User[]> => {
    const client = await this.mongo.db(InternalizeDbName!);
    const cursor = client.collection(this.collectionName).find()

    const users: User[] = []
    for await (const user of cursor){
      users.push(user as unknown as User)
    }

    return users
  }

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
