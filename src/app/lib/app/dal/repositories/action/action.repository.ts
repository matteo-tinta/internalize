import { InternalizeMongoClient } from "@/app/lib/mongo/mongo-client";
import { Action, ActionDomainType } from "../../../domain/action/action";
import { IActionRepository } from "../../../services/interfaces/repositories/IActionRepository";

export class ActionRepository implements IActionRepository {
  constructor(private mongo: InternalizeMongoClient) {}
  
  async getActionByNameAsync(actionName: string): Promise<ActionDomainType | null> {
    return await Action.findOne({
      name: actionName
    })
  }

  async addActionAsync(action: ActionDomainType) {
    await action.save()
  }
  
  async all(): Promise<ActionDomainType[]> {
    return await Action.find()
  }

  async deleteAsync(action: ActionDomainType) {
    await Action.findOneAndDelete({
      name: action.name
    })
  }
}