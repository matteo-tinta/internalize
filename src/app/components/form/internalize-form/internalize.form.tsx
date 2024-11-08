"use client"

import { ActionType, FormState } from "@/app/lib/dto/form/form.definitions";
import Form, { FormProps } from "next/form";
import { RefObject, useActionState, useEffect, useRef, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { InternalizeInnerForm } from "./internalize-inner.form";
import { useSnackbar } from "../../snackbar/snackbar.context";

export type InternalizeFormProps = Omit<FormProps, "action"> & {
  action: ActionType;
  onSubmitSuccess?: () => void;
  render: (options: {
    status: ReturnType<typeof useFormStatus>;
    state: FormState;
    form: RefObject<HTMLFormElement>;
    submit: () => void;
  }) => JSX.Element;
};

const InternalizeForm = (props: InternalizeFormProps) => {
  const {
    action: inputAction,
    onSubmitSuccess = () => { },
    ...formProps
  } = props;
  const ref = useRef<HTMLFormElement>(null);

  const [isNew, setIsNew] = useState(true)
  const [, startTransition] = useTransition();
  
  const { notify } = useSnackbar()
  const [state, executeAction, pending] = useActionState<FormState, FormData>(
    inputAction,
    undefined as unknown as FormState
  );

  useEffect(() => {
    if(state && !pending && !isNew) {
      onSubmitSuccess()
      setIsNew(true)
      notify({
        content: state.message ?? "Ok",
        type: !!state?.errors ? "danger" : "success"
      })
    }
  }, [state, pending])
  
  const handleSubmit = (...args: Parameters<typeof executeAction>) => {
    setIsNew(false)
    startTransition(() => {
      executeAction(...args)
    })
  }

  return (
    <Form {...formProps} action={handleSubmit} ref={ref} disabled={pending}>
      <InternalizeInnerForm
        {...props}
        action={handleSubmit}
        pending={pending}
        formRef={ref}
        state={state as FormState}
      />
    </Form>
  );
};

export { InternalizeForm };
