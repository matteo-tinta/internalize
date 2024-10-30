import { mongo, InternalizeDbName } from "../mongo-client";
import { UserModel } from "./models/user.model";

interface IUserRepository {
  all: () => Promise<Array<UserModel>>;
}

export class UserRespository implements IUserRepository {
  constructor() {}

  all = async () => {
    const mongoClient = await mongo(InternalizeDbName!);
    const users = await mongoClient.collection("users").find({}).toArray();

    return users as UserModel[]
  };

  create = async (user: UserModel) => {
    const mongoClient = await mongo(InternalizeDbName!);
    await mongoClient.collection("users").insertOne(user)

    return user
  }
}
