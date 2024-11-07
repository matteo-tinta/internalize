"use client";

import { ConfirmationModal } from "@/app/components/modal/confirmation.modal.component";
import { ModalRef, ModalRenderProps } from "@/app/components/modal/modal.component";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { deleteAction } from "../actions";
import { Button } from "@/app/components/form/button";

type ActionDeleteProps = {
  name: string;
};

const ActionDelete = (props: ActionDeleteProps) => {
  const { name } = props;
  const confirmationModal = useRef<ModalRef>(null);

  const openConfirmationDialog = () => {
    confirmationModal.current?.open();
  };

  const onYesDelete = async (confirmationModal: ModalRenderProps) => {

    try {
      const result = await deleteAction({ name: name })
      confirmationModal.close();
    } catch (error) {
      console.error(error)      
    }

  };

  return (
    <>
      <Button variant="simple" onClick={openConfirmationDialog}>
        <FontAwesomeIcon className="text-red-500" icon={faTrash} />
      </Button>
      <ConfirmationModal.Modal
        onYes={onYesDelete}
        onCancel={({ close }) => close()}
        ref={confirmationModal}
      >
        <ConfirmationModal.Title>
          Are you sure you want to delete action {name}?
        </ConfirmationModal.Title>
        <ConfirmationModal.Content>
          Deleting this action will delete also its association with a users and roles {" "}
          <b className="text-red-500">Permanently</b>
        </ConfirmationModal.Content>
      </ConfirmationModal.Modal>
    </>
  );
};

export { ActionDelete };
