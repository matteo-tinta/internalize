import { handleError } from "@/app/actions"
import { AsyncFunctionLike } from "./logging.helpers"
import { ActionType, FormState } from "../dto/form/form.definitions"

const formAction = (callback: ActionType) => async (...args: Parameters<ActionType>): Promise<FormState> => {
  try {
    return await callback(...args)
  } catch (error) {
    return handleError(error)
  }
}

  const action = <T extends AsyncFunctionLike<Awaited<ReturnType<T>>>>(callbackAsync: T) => 
    async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>> | FormState> => {
  try {
    return await callbackAsync(...args)
  } catch (error) {
    return handleError(error)
  }
}

export {
  formAction,
  action
}