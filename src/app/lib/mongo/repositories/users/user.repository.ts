import { IUserRepository } from "../../../services/interfaces/repositories/IUserRepository";
import {
  InternalizeDbName,
  InternalizeMongoClient,
} from "../../mongo-client";
import { User } from "@/app/lib/domain/user.domain";

export class UserRespository implements IUserRepository {
  constructor(private mongo: InternalizeMongoClient) {}

  addUserAsync = async (user: User) => {
    const mongoClient = await this.mongo.db(InternalizeDbName!);

    await mongoClient.collection("users").insertOne(user);
  };
}
