"use client"

import { FormState } from "@/app/lib/dto/form/form.definitions";
import { useFormStatus } from "react-dom";
import { ReactNode } from "react";
import { useSnackbar } from "../../snackbar/snackbar.context";
import { useInternalizeAction } from "@/app/hooks/useServerAction";
import { FunctionLike } from "@/app/lib/helpers/logging.helpers";


type InternalizeActionProps<TFormAction extends FunctionLike<Promise<FormState>>> = {
  onSubmitSuccess?: () => void;
  action: TFormAction;
  render: (props: InternalizeActionRenderProps<TFormAction>) => ReactNode
  notifyFromServer?: boolean
  permalink?: string
}

type InternalizeActionRenderProps<TFormAction extends FunctionLike<Promise<FormState>>> = FormState & {
  pending: ReturnType<typeof useFormStatus>["pending"]
  faulted: boolean
  submit: TFormAction
}

function InternalizeAction<TFormAction extends FunctionLike<Promise<FormState>>>(props: InternalizeActionProps<TFormAction>) {
  const {
    render,
    notifyFromServer = true,
    action,
    onSubmitSuccess = () => { },
  } = props

  const { notify } = useSnackbar()
  const [data, executeAction, pending] = useInternalizeAction<TFormAction>(action)

  const handleSubmit = async (...args: Parameters<TFormAction>) => {
    const data = await executeAction(...args)
    const hasError = !!data?.errors
    
    if(notifyFromServer) {
      notify({
        content: data.message ?? (hasError ? "An error has occoured" : "Operation was successfull"),
        type: hasError ? "danger" : "success"
      })
    }

    onSubmitSuccess()
    return data;
  }

  return render({
    pending: pending,
    submit: handleSubmit as TFormAction,
    faulted: !!data?.errors,
    ...data
  })
}

export {
  InternalizeAction
}