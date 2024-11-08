import { useCallback, useState } from "react"
import { FormState } from "../lib/dto/form/form.definitions"
import { FunctionLike } from "../lib/helpers/logging.helpers"

type useInternalizeActionProps<TFormAction extends FunctionLike<Promise<FormState>>> = {
  action: TFormAction
}

type useInternalizeActionReturnType<TFormAction extends FunctionLike<Promise<FormState>>> = [
  data: Awaited<ReturnType<useInternalizeActionProps<TFormAction>["action"]>> | undefined,
  action: useInternalizeActionProps<TFormAction>["action"],
  pending: boolean
]

const useInternalizeAction = <TFormAction extends FunctionLike<Promise<FormState>>>
(action: useInternalizeActionProps<TFormAction>["action"]): useInternalizeActionReturnType<TFormAction> => {
  const [state, setState] = useState<{
    pending: boolean,
    data?: Awaited<ReturnType<TFormAction>>
  }>({
    pending: false,
    data: undefined
  })

  const executeAction = useCallback(async (...args: Parameters<TFormAction>) => {
    setState({
      pending: true
    })

    const result = await action(...args)

    setState({
      pending: false,
      data: result as Awaited<ReturnType<TFormAction>>
    })

    return result
  }, [action])

  return [
    state.data,
    executeAction as TFormAction,
    state.pending
  ]
}

export {
  useInternalizeAction
}