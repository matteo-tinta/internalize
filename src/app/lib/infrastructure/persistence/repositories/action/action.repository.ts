import { ActionDomainType, Action } from "@/app/lib/domain/action/action"
import { IActionRepository } from "@/app/lib/services/_interfaces/repositories/IActionRepository"
import { InternalizeMongoClient } from "../../mongo-client"

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