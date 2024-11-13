"use client"

import { FormState } from "@/app/lib/dto/form/form.definitions";
import { RefObject } from "react";
import { useFormStatus } from "react-dom";
import { InternalizeFormProps } from "./internalize.form";

const InternalizeInnerForm = (
  props: Omit<InternalizeFormProps, "action"> & {
    state: FormState;
    action: (payload: FormData) => void
    pending: boolean;
    formRef: RefObject<HTMLFormElement>;
  }
) => {
  const formStatus = useFormStatus();
  const { state, render, formRef } = props;

  return render({
    form: formRef,
    state: state,
    status: formStatus,
    submit: () => {
      formRef.current?.requestSubmit()
    }
  });
};

export { InternalizeInnerForm };
