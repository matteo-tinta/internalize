import { ActionType, FormState } from "@/app/lib/form.definitions"
import Form, { FormProps } from "next/form"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"

type InternalizeFormProps<RouteInferType = ActionType> = Omit<FormProps<RouteInferType>, "action"> & {
  action: ActionType,
  render: (status: ReturnType<typeof useFormStatus>, state: FormState) => JSX.Element
}

const InternalizeInnerForm = <RouteInferType = ActionType>(props: InternalizeFormProps<RouteInferType> & {state: FormState}) => {
  const formStatus = useFormStatus()
  const {
    state,
    render
  } = props

  return render(formStatus, state)
}

const InternalizeForm = <RouteInferType = ActionType>(props: InternalizeFormProps<RouteInferType>) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render,
    action: inputAction,
    ...formProps
  } = props
  const [state, action] = useActionState<FormState, FormData>(inputAction, undefined)

  return (
    <Form {...formProps} action={action}>
      <InternalizeInnerForm<RouteInferType> {...props} state={state as FormState} />
    </Form>
  )
}

export {
  InternalizeForm 
}