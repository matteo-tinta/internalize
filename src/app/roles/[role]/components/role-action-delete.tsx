"use client";

import { ConfirmationModal } from "@/app/_components/modal/confirmation.modal.component";
import {
  ModalRef,
} from "@/app/_components/modal/modal.component";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, Ref, useRef } from "react";
import { Button } from "@/app/_components/form/button";
import { InternalizeAction } from "@/app/_components/form/internalize-form/internalize-action.form";
import { FormState } from "@/app/lib/dto/form/form.definitions";
import { removeActionFromRole } from "../actions";
import { onClickStopPropagation } from "@/app/lib/helpers/dom-events.helpers";

type RoleActionProps = {
  role: string;
  action?: string;
  disabled?: boolean;
};

type RoleActionDeleteConfirmationDialogProps = RoleActionProps &
  FormState & {
    submit: () => void;
  };

const RoleActionDelete = (props: RoleActionProps) => {
  const { action, role } = props;
 
  const confirmationModal = useRef<ModalRef>(null);
  const openConfirmationDialog = () => {
    confirmationModal.current?.open();
  };

  return (
    <InternalizeAction
      action={removeActionFromRole}
      onSubmitSuccess={() => {
        confirmationModal.current?.close();
      }}
      render={({ pending, errors, message, submit }) => {
        const handleSubmit = async () => {
          await submit({ action: action!, role });
        };

        return (
          <>
            <Button
              disabled={props.disabled || pending}
              type="button"
              className="text-red-500 disabled:text-gray-400"
              variant="simple"
              onClick={onClickStopPropagation(openConfirmationDialog)()}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>

            <RoleActionDeleteConfirmationDialog
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

const RoleActionDeleteConfirmationDialog = forwardRef(
  (props: RoleActionDeleteConfirmationDialogProps, ref: Ref<ModalRef>) => {
    const { role, action, submit, disabled } = props;

    return (
      <ConfirmationModal.Modal
        disabled={disabled}
        onYes={submit}
        onCancel={({ close }) => close()}
        ref={ref}
      >
        <ConfirmationModal.Title>
          Are you sure you want to remove {action} from {role}?
        </ConfirmationModal.Title>
        <ConfirmationModal.Content>
          This will remove <b className="text-red-500">Permanently</b> the action{" "}
          {action}
          <ConfirmationModal.Errors {...props} />
        </ConfirmationModal.Content>
      </ConfirmationModal.Modal>
    );
  }
);

RoleActionDeleteConfirmationDialog.displayName = "RoleActionDeleteConfirmationDialog"

export { RoleActionDelete };
