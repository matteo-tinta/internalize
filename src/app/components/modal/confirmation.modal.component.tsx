import { forwardRef, PropsWithChildren, Ref } from "react";
import { Modal, ModalRef, ModalRenderProps } from "./modal.component";
import { Button } from "../form/button";

type ConfirmationModalProps = PropsWithChildren & {
  disabled?: boolean
  onYes: (props: ModalRenderProps) => void;
  onCancel: (props: ModalRenderProps) => void;
};

const _ConfirmationModal = forwardRef((props: ConfirmationModalProps, ref: Ref<ModalRef>) => {
    const { onYes, onCancel, children, disabled = false } = props;

    const renderModalContent = (props: ModalRenderProps) => {
      return (
        <div>
          { children }
          <div className="bg-background w-full p-2 text-right">
            <Button disabled={disabled} className="me-1" onClick={() => onYes(props)}>
              Ok
            </Button>
            <Button disabled={disabled} onClick={() => onCancel(props)}>Cancel</Button>
          </div>
        </div>
      );
    };

    return <Modal ref={ref} render={renderModalContent} />;
  }
);

_ConfirmationModal.displayName = "ConfirmationModal";

export const ConfirmationModal = {
  Modal: _ConfirmationModal,
  Title: (props: PropsWithChildren) => {
    return (
      <div className="px-5 py-3 !text-xlg font-bold bg-background" {...props} />
    )
  },
  Content: (props: PropsWithChildren) => {
    return (
      <div className="px-5 py-3" {...props} />
    )
  },
};
