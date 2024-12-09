"use client";

import { ConfirmationModal } from "@/app/_components/modal/confirmation.modal.component";
import { ModalRef, ModalRenderProps } from "@/app/_components/modal/modal.component";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, Ref, useRef } from "react";
import { deleteAction } from "../actions";
import { Button } from "@/app/_components/form/button";
import { FormState } from '@/app/lib/dto/form/form.definitions';
import { InternalizeAction } from '@/app/_components/form/internalize-form/internalize-action.form';
import { onClickStopPropagation } from '@/app/lib/helpers/dom-events.helpers';

type ActionDeleteProps = {
  name: string;
};

type ActionsDeleteConfirmationDialogProps = ActionDeleteProps &
  FormState & {
    disabled: boolean;
    submit: () => void;
  };

const ActionDelete = (props: ActionDeleteProps) => {
  const { name } = props;
  const confirmationModal = useRef<ModalRef>(null);

  const openConfirmationDialog = () => {
    confirmationModal.current?.open();
  };

  return (
    <InternalizeAction
      action={deleteAction}
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

            <ActionsDeleteConfirmationDialog
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

const ActionsDeleteConfirmationDialog = forwardRef(
  (props: ActionsDeleteConfirmationDialogProps, ref: Ref<ModalRef>) => {
    const { name: actionName, submit, disabled } = props;

    return (
      <ConfirmationModal.Modal
        disabled={disabled}
        onYes={submit}
        onCancel={({ close }) => close()}
        ref={ref}
      >
        <ConfirmationModal.Title>
        Are you sure you want to delete action {actionName}?
        </ConfirmationModal.Title>
        <ConfirmationModal.Content>
          Deleting this action will remove{" "}
          <b className="text-red-500">Permanently</b> also the association to
          users and roles
          <ConfirmationModal.Errors {...props} />
        </ConfirmationModal.Content>
      </ConfirmationModal.Modal>
    );
  }
);

ActionsDeleteConfirmationDialog.displayName = "ActionsDeleteConfirmationDialog";

export { ActionDelete };
