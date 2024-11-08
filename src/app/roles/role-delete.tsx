"use client";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../components/form/button";
import { forwardRef, Ref, useRef } from "react";
import { ModalRef } from "../components/modal/modal.component";
import { ConfirmationModal } from "../components/modal/confirmation.modal.component";
import { deleteRole } from "./actions";
import { FormState } from "../lib/dto/form/form.definitions";
import { InternalizeAction } from "../components/form/internalize-form/internalize-action.form";
import { onClickStopPropagation } from "../lib/helpers/dom-events.helpers";

type RoleDeleteProps = {
  name: string;
};

type RoleDeleteConfirmationDialogProps = RoleDeleteProps &
  FormState & {
    disabled: boolean;
    submit: () => void;
  };

const RoleDelete = (props: RoleDeleteProps) => {
  const { name } = props;
  const confirmationModal = useRef<ModalRef>(null);

  const openConfirmationDialog = () => {
    confirmationModal.current?.open();
  };

  return (
    <InternalizeAction
      action={deleteRole}
      onSubmitSuccess={() => {
        confirmationModal.current?.close();
      }}
      render={({ pending, errors, message, submit }) => {
        const handleSubmit = async () => {
          await submit({ name });
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

            <RoleDeleteConfirmationDialog
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

const RoleDeleteConfirmationDialog = forwardRef(
  (props: RoleDeleteConfirmationDialogProps, ref: Ref<ModalRef>) => {
    const { name: role, submit, disabled } = props;

    return (
      <ConfirmationModal.Modal
        disabled={disabled}
        onYes={submit}
        onCancel={({ close }) => close()}
        ref={ref}
      >
        <ConfirmationModal.Title>
          Are you sure you want to delete role {role}?
        </ConfirmationModal.Title>
        <ConfirmationModal.Content>
          Deleting this role will remove{" "}
          <b className="text-red-500">Permanently</b> also the association to
          users and actions
          <ConfirmationModal.Errors {...props} />
        </ConfirmationModal.Content>
      </ConfirmationModal.Modal>
    );
  }
);

RoleDeleteConfirmationDialog.displayName = "RoleDeleteConfirmationDialog";

export { RoleDelete };
