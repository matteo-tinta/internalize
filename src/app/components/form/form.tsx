import Form, { FormProps } from "next/form"
import { useFormStatus } from "react-dom"

type InternalizeFormProps = FormProps & {
  render: (status: ReturnType<typeof useFormStatus>) => JSX.Element
}

const InternalizeInnerForm = (props: InternalizeFormProps) => {
  const formStatus = useFormStatus()
  const {
    render
  } = props

  return render(formStatus)
}

const InternalizeForm = (props: InternalizeFormProps) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render,
    ...formProps
  } = props

  return (
    <Form {...formProps}>
      <InternalizeInnerForm {...props} />
    </Form>
  )
}

export {
  InternalizeForm 
}