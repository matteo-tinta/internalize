"use client";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../_components/form/button";
import { forwardRef, Ref, useRef } from "react";
import { deleteUser } from "../actions";
import { onClickStopPropagation } from "../../lib/helpers/dom-events.helpers";
import { ConfirmationModal } from "@/app/_components/modal/confirmation.modal.component";
import { ModalRef } from "@/app/_components/modal/modal.component";
import { FormState } from "@/app/lib/dto/form/form.definitions";
import { InternalizeAction } from "@/app/_components/form/internalize-form/internalize-action.form";

type UserDeleteProps = {
  userId: string;
};

type UserDeleteConfirmationDialogProps = UserDeleteProps &
  FormState & {
    submit: () => void;
    disabled: boolean;
  };

const UserDelete = (props: UserDeleteProps) => {
  const { userId } = props;
  const confirmationModal = useRef<ModalRef>(null);

  const openConfirmationDialog = () => {
    confirmationModal.current?.open();
  };

  return (
    <InternalizeAction
      action={deleteUser}
      onSubmitSuccess={() => {
        confirmationModal.current?.close();
      }}
      render={({ pending, errors, message, submit }) => {
        const handleSubmit = async () => {
          await submit({ userId });
        };

        return (
          <>
            <Button
              disabled={pending}
              type="button"
              className="text-red-500 disabled:text-gray-400"
              variant="simple"
              onClick={onClickStopPropagation(openConfirmationDialog)()}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>

            <UserDeleteConfirmationDialog
              {...props}
              ref={confirmationModal}
              disabled={pending}
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

const UserDeleteConfirmationDialog = forwardRef(
  (props: UserDeleteConfirmationDialogProps, ref: Ref<ModalRef>) => {
    const { userId, submit, disabled } = props;

    return (
      <ConfirmationModal.Modal
        onYes={submit}
        disabled={disabled}
        onCancel={({ close }) => close()}
        ref={ref}
      >
        <ConfirmationModal.Title>
          Are you sure you want to delete {userId}?
        </ConfirmationModal.Title>
        <ConfirmationModal.Content>
          This will delete <b className="text-red-500">Permanently</b> user with id {userId}
          <ConfirmationModal.Errors {...props} />
        </ConfirmationModal.Content>
      </ConfirmationModal.Modal>
    );
  }
);

UserDeleteConfirmationDialog.displayName = "UserRoleDeleteConfirmationDialog";

export { UserDelete };
