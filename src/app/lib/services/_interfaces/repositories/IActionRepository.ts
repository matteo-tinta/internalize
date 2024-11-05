import { ActionDomainType } from "../../../domain/action/action";

export interface IActionRepository {
  all(): ActionDomainType[] | PromiseLike<ActionDomainType[]>;
  deleteAsync(action: ActionDomainType): Promise<void>;
  getActionByNameAsync(actionName: string): Promise<ActionDomainType | null>;
  addActionAsync(action: ActionDomainType): Promise<void>;
}