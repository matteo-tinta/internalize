"use client"

import { FormState } from "@/app/lib/dto/form/form.definitions";
import { useEffect, useRef } from "react";
import { createPortal, useFormStatus } from "react-dom";
import { SnackbarRef, SnackbarPropsCallback, Snackbar } from "../../snackbar/snackbar";

const InternalizeSnackbackResponse = (props: {
  formStatus: ReturnType<typeof useFormStatus>;
  state: FormState;
}) => {
  const { formStatus, state } = props;

  const { errors = {}, message } = state ?? {};

  const isError = Object.keys(errors).length;
  const hasMessage = !!message;

  const snackbarRef = useRef<SnackbarRef>(null);

  useEffect(() => {
    snackbarRef.current?.open();
  }, [formStatus, state]);

  const successSnackbarContent = (props: SnackbarPropsCallback) => {
    return (
      <div
        className="fixed z-50 font-sans flex right-4 top-4 left-auto justify-start rounded-lg bg-green-600 p-3 animation-appear transition-transform border-solid min-w-snackbar max-w-snackbar text-foreground-white shadow-md border-0"
        {...props()}
      >
        {state?.message || "Submitted Successfully!"}
      </div>
    );
  };

  const failedSnackbarContent = (props: SnackbarPropsCallback) => {
    return (
      <div
        className="fixed z-50 font-sans flex right-4 top-4 left-auto justify-start rounded-lg bg-red-600 p-3 animation-appear transition-transform border-solid min-w-snackbar max-w-snackbar text-foreground-white shadow-md border-0"
        {...props()}
      >
        {state?.message || "An error occoured"}
      </div>
    );
  };

  const renderSnackbar = (props: SnackbarPropsCallback) => {
    if (isError) {
      return failedSnackbarContent(props);
    }

    if (hasMessage) {
      return successSnackbarContent(props);
    }

    return null;
  };

  return createPortal(
    <Snackbar key={message} render={renderSnackbar} ref={snackbarRef} />,
    document.body
  );
};

export { InternalizeSnackbackResponse };
