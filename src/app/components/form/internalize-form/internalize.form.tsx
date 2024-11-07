"use client"

import { ActionType, FormState } from "@/app/lib/dto/form/form.definitions";
import Form, { FormProps } from "next/form";
import { RefObject, useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { InternalizeInnerForm } from "./internalize-inner.form";

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
    render,
    action: inputAction,
    onSubmitSuccess = () => { },
    ...formProps
  } = props;
  const ref = useRef<HTMLFormElement>(null);

  const [state, executeAction, pending] = useActionState<FormState, FormData>(
    inputAction,
    undefined as unknown as FormState
  );

  useEffect(() => {
    if(!pending && !state?.errors) {
      onSubmitSuccess()
      ref.current?.reset()
    }
  }, [pending])

  return (
    <Form {...formProps} action={executeAction} ref={ref} disabled={pending}>
      <InternalizeInnerForm
        {...props}
        action={executeAction}
        pending={pending}
        formRef={ref}
        state={state as FormState}
      />
    </Form>
  );
};

export { InternalizeForm };
