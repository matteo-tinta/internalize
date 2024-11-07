"use client";

import { ConfirmationModal } from "@/app/components/modal/confirmation.modal.component";
import {
  ModalRef,
  ModalRenderProps,
} from "@/app/components/modal/modal.component";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, Ref, Suspense, useRef } from "react";
import { Button } from "@/app/components/form/button";
import { removeRoleFromUser } from "../actions";
import { InternalizeAction } from "@/app/components/form/internalize-form/internalize-action.form";
import { FormState } from "@/app/lib/dto/form/form.definitions";

type UserRoleProps = {
  userId: string;
  role: string | undefined;
  disabled?: boolean;
};

type UserRoleDeleteConfirmationDialogProps = UserRoleProps &
  FormState & {
    submit: () => void;
  };

const UserRoleDelete = (props: UserRoleProps) => {
  const { userId, role } = props;
  const confirmationModal = useRef<ModalRef>(null);

  const openConfirmationDialog = () => {
    confirmationModal.current?.open();
  };

  return (
    <InternalizeAction<FormState, { userId: string; role: string }>
      action={removeRoleFromUser}
      onSubmitSuccess={() => {
        confirmationModal.current?.close();
      }}
      render={({ pending, errors, message, submit }) => {
        const handleSubmit = () => {
          submit({ userId, role: role! });
        };

        return (
          <>
            <Button
              disabled={props.disabled || pending}
              type="button"
              className="text-red-500 disabled:text-gray-400"
              variant="simple"
              onClick={openConfirmationDialog}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>

            <UserRoleDeleteConfirmationDialog
              {...props}
              ref={confirmationModal}
              disabled={pending || props.disabled}
              submit={handleSubmit}
              errors={errors}
              message={message}
            />
          </>
        );
      }}
    />
  );
};

const UserRoleDeleteConfirmationDialog = forwardRef(
  (props: UserRoleDeleteConfirmationDialogProps, ref: Ref<ModalRef>) => {
    const { role, userId, submit, disabled, errors, message } = props;

    return (
      <ConfirmationModal.Modal
        disabled={disabled}
        onYes={submit}
        onCancel={({ close }) => close()}
        ref={ref}
      >
        <ConfirmationModal.Title>
          Are you sure you want to remove {role} from {userId}?
        </ConfirmationModal.Title>
        <ConfirmationModal.Content>
          This will remove <b className="text-red-500">Permanently</b> the role{" "}
          {role}
          {errors && (
            <div className="bg-red-500 mt-2 rounded p-2">
              <p>{message}</p>
              <p className="text-sm">
                {Object.entries(errors).map(([key, error]) => (
                  <div>
                    {key.toUpperCase()}: {error}
                  </div>
                ))}
              </p>
            </div>
          )}
        </ConfirmationModal.Content>
      </ConfirmationModal.Modal>
    );
  }
);

export { UserRoleDelete };
