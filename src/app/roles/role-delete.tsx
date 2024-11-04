"use client";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../components/form/button";
import { useRef } from "react";
import {
  ModalRef,
  ModalRenderProps,
} from "../components/modal/modal.component";
import { ConfirmationModal } from "../components/modal/confirmation.modal.component";
import { deleteRole } from "./actions";

type RoleDeleteProps = {
  name: string;
};

const RoleDelete = (props: RoleDeleteProps) => {
  const { name } = props;
  const confirmationModal = useRef<ModalRef>(null);

  const openConfirmationDialog = () => {
    confirmationModal.current?.open();
  };

  const onYesDelete = async (confirmationModal: ModalRenderProps) => {

    try {
      const result = await deleteRole({ name: name })
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
          Are you sure you want to delete role {name}?
        </ConfirmationModal.Title>
        <ConfirmationModal.Content>
          Deleting this role will remove <b className="text-red-500">Permanently</b> also the association to users and actions
        </ConfirmationModal.Content>
      </ConfirmationModal.Modal>
    </>
  );
};

export { RoleDelete };
