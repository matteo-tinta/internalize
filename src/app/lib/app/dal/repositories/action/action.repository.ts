import { InternalizeDbName, InternalizeMongoClient } from "@/app/lib/mongo/mongo-client";
import { Action } from "../../../domain/action/action";
import { IActionRepository } from "../../../services/interfaces/repositories/IActionRepository";

export class ActionRepository implements IActionRepository {
  collectionName: string = "actions";
  constructor(private mongo: InternalizeMongoClient) {}
 

  async getActionByNameAsync(actionName: string): Promise<Action | undefined> {
    const mongoClient = await this.mongo.db(InternalizeDbName!);
    return (await mongoClient.collection(this.collectionName).findOne({
      name: actionName,
    })) as unknown as Action;
  }

  async addActionAsync(action: Action) {
    const mongoClient = await this.mongo.db(InternalizeDbName!);
    await mongoClient.collection(this.collectionName).insertOne(action);
  }
  
  async all(): Promise<Action[]> {
    const client = await this.mongo.db(InternalizeDbName!);
    const cursor = client.collection(this.collectionName).find()

    const users: Action[] = []
    for await (const user of cursor){
      users.push(user as unknown as Action)
    }

    return users
  }

  async deleteAsync(action: Action) {
    const mongoClient = await this.mongo.db(InternalizeDbName!);

    await mongoClient.collection(this.collectionName).findOneAndDelete({
      name: action.name
    });
  }
}