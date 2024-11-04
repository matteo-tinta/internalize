import { ActionType, FormState } from "@/app/lib/form.definitions";
import Form, { FormProps } from "next/form";
import { useActionState, useEffect, useRef } from "react";
import { createPortal, useFormStatus } from "react-dom";
import { Snackbar, SnackbarPropsCallback, SnackbarRef } from "../snackbar/snackbar";

type InternalizeFormProps = Omit<FormProps, "action"> & {
  action: ActionType;
  render: (
    status: ReturnType<typeof useFormStatus>,
    state: FormState
  ) => JSX.Element;
};

const InternalizeSnackbackResponse = (props: {
  formStatus: ReturnType<typeof useFormStatus>
  state: FormState
}) => {
  const {
    formStatus,
    state
  } = props

  const {
    errors = {}, 
    message
  } = state ?? {}

  const isError = Object.keys(errors).length
  const hasMessage = !!message
  
  
  const snackbarRef = useRef<SnackbarRef>(null);
  useEffect(() => {
    snackbarRef.current?.open()
  }, [formStatus, state]);

  const successSnackbarContent = (props: SnackbarPropsCallback) => {
    return (
      <div className="fixed z-50 font-sans flex right-4 top-4 left-auto justify-start rounded-lg font-semibold bg-green-600 p-3 animation-appear transition-transform border-solid min-w-snackbar max-w-snackbar shadow-md border-0"
      {...props()}>
        {state?.message || "Submitted Successfully!"}
      </div>
    )
  }

  const failedSnackbarContent = (props: SnackbarPropsCallback) => {
    return (
      <div className="fixed z-50 font-sans flex right-4 top-4 left-auto justify-start rounded-lg font-semibold bg-red-600 p-3 animation-appear transition-transform border-solid min-w-snackbar max-w-snackbar shadow-md border-0"
      {...props()}>
        {state?.message || "An error occoured"}
      </div>
    )
  }

  const renderSnackbar = (props: SnackbarPropsCallback) => {
    if(isError){
      return failedSnackbarContent(props)
    }

    if(hasMessage){
      return successSnackbarContent(props)
    }

    return null
  }

  return createPortal(
    <Snackbar 
      key={message}
      render={renderSnackbar}
      ref={snackbarRef} 
    />,
    document.body
  )
}

const InternalizeInnerForm = (
  props: InternalizeFormProps & { state: FormState }
) => {
  const formStatus = useFormStatus();
  const { state, render } = props;

  return (
    <>
      {render(formStatus, state)}

      <InternalizeSnackbackResponse 
        state={state}
        formStatus={formStatus}
      />
    </>
  );
};

const InternalizeForm = (props: InternalizeFormProps) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render,
    action: inputAction,
    ...formProps
  } = props;
  const [state, action] = useActionState<FormState, FormData>(
    inputAction,
    undefined as unknown as FormState
  );

  return (
    <Form {...formProps} action={action}>
      <InternalizeInnerForm {...props} state={state as FormState} />
    </Form>
  );
};

export { InternalizeForm };
