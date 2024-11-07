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
import { deleteUser } from "./actions";
import { onClickStopPropagation } from "../lib/helpers/dom-events.helpers";

type UserDeleteProps = {
  userId: string;
};

const UserDelete = (props: UserDeleteProps) => {
  const { userId } = props;
  const confirmationModal = useRef<ModalRef>(null);

  const openConfirmationDialog = () => {
    confirmationModal.current?.open();
  };

  const onYesDelete = async (confirmationModal: ModalRenderProps) => {

    try {
      await deleteUser({ userId: userId })
      confirmationModal.close();
    } catch (error) {
      console.error(error)      
    }

  };

  return (
    <>
      <Button variant="simple" onClick={onClickStopPropagation(openConfirmationDialog)()}>
        <FontAwesomeIcon className="text-red-500" icon={faTrash} />
      </Button>
      <ConfirmationModal.Modal
        onYes={onYesDelete}
        onCancel={({ close }) => close()}
        ref={confirmationModal}
      >
        <ConfirmationModal.Title>
          Are you sure you want to delete user {userId}?
        </ConfirmationModal.Title>
        <ConfirmationModal.Content>
          Deleting this user will delete also its roles and actions{" "}
          <b className="text-red-500">Permanently</b>
        </ConfirmationModal.Content>
      </ConfirmationModal.Modal>
    </>
  );
};

export { UserDelete };
