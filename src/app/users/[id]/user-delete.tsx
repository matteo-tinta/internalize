"use client";

import { ConfirmationModal } from "@/app/components/modal/confirmation.modal.component";
import { ModalRef, ModalRenderProps } from "@/app/components/modal/modal.component";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { Button } from "@/app/components/form/button";
import { removeRoleFromUser } from "./actions";

type UserRoleProps = {
  userId: string;
  role: string | undefined;
  disabled?: boolean;
};

const UserRoleDelete = (props: UserRoleProps) => {
  const { userId, role } = props;
  const confirmationModal = useRef<ModalRef>(null);

  const openConfirmationDialog = () => {
    confirmationModal.current?.open();
  };

  const onYesDelete = async (confirmationModal: ModalRenderProps) => {

    try {
      await removeRoleFromUser({ userId: userId, role: role! })
      confirmationModal.close();
    } catch (error) {
      console.error(error)      
    }

  };

  return (
    <>
      <Button disabled={props.disabled} className="text-red-500 disabled:text-gray-400" variant="simple" onClick={openConfirmationDialog}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <ConfirmationModal.Modal
        onYes={onYesDelete}
        onCancel={({ close }) => close()}
        ref={confirmationModal}
      >
        <ConfirmationModal.Title>
          Are you sure you want to remove {role} from {userId}?
        </ConfirmationModal.Title>
        <ConfirmationModal.Content>
          This will remove <b className="text-red-500">Permanently</b> the role {role}
        </ConfirmationModal.Content>
      </ConfirmationModal.Modal>
    </>
  );
};

export { UserRoleDelete };
