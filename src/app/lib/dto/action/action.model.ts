import { IAction } from "../../domain/action/action";

export const actionToDto = (action: IAction) => {
  return {
    name: action.name
  } as IAction
}