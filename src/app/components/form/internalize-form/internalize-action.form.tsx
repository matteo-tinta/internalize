"use client"

import { FormState } from "@/app/lib/dto/form/form.definitions";
import { useFormStatus } from "react-dom";
import { ReactNode, useActionState, useEffect, useState, useTransition } from "react";


type InternalizeActionProps<TFormState extends FormState, TFormPayload = FormData> = {
  onSubmitSuccess?: () => void;
  render: (props: InternalizeActionRenderProps<TFormPayload>) => ReactNode;
  action: (payload: TFormPayload) => TFormState | Promise<TFormState>, 
  initialState?: Awaited<TFormState>, 
  permalink?: string
}

type InternalizeActionRenderProps<TFormPayload = FormData> = FormState & {
  pending: ReturnType<typeof useFormStatus>["pending"]
  faulted: boolean
  submit: (payload: TFormPayload) => void
}

function InternalizeAction<TFormState extends FormState, TFormPayload = FormData>(props: InternalizeActionProps<TFormState, TFormPayload>) {
  const {
    render,
    action,
    initialState = {},
    permalink,
    onSubmitSuccess = () => { },
  } = props

  const [isNew, setIsNew] = useState(true)
  const [pendingTransition, startTransition] = useTransition();
  const [data, executeAction, pending] = useActionState<TFormState, TFormPayload>(
    (_, payload) => action(payload), initialState as Awaited<TFormState>, permalink)

  useEffect(() => {
    if(data && !pending && !data?.errors && !isNew) {
      onSubmitSuccess()
    }
  }, [data, pending])

  const handleSubmit = (payload: TFormPayload) => {
    setIsNew(false);
    startTransition(() => {
      executeAction(payload)
    })
  }

  return render({
    pending: pending || pendingTransition,
    submit: handleSubmit,
    faulted: !!data?.errors,
    ...data
  })
}

export {
  InternalizeAction
}