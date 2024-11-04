import { Action } from "../../../domain/action/action";

export interface IActionRepository {
  deleteAsync(action: Action): unknown;
  getActionByNameAsync(actionName: string): unknown;
  addActionAsync(action: Action): unknown;
  all(): Promise<Action[]>;
}