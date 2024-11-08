import { forwardRef, PropsWithChildren, Ref } from "react";
import { Modal, ModalRef, ModalRenderProps } from "./modal.component";
import { Button } from "../form/button";
import { onClickStopPropagation } from "@/app/lib/helpers/dom-events.helpers";
import { FormState } from "@/app/lib/dto/form/form.definitions";

type ConfirmationModalProps = PropsWithChildren & {
  disabled?: boolean;
  onYes: (props: ModalRenderProps) => void;
  onCancel: (props: ModalRenderProps) => void;
};

const _ConfirmationModal = forwardRef(
  (props: ConfirmationModalProps, ref: Ref<ModalRef>) => {
    const { onYes, onCancel, children, disabled = false } = props;

    const renderModalContent = (props: ModalRenderProps) => {
      const onYesStopPropagation = onClickStopPropagation(onYes);
      const onCancelStopPropagation = onClickStopPropagation(onCancel);

      return (
        <div>
          {children}
          <div className="bg-background w-full p-2 text-right">
            <Button
              disabled={disabled}
              className="me-1"
              onClick={onYesStopPropagation(props)}
            >
              Ok
            </Button>
            <Button
              disabled={disabled}
              onClick={onCancelStopPropagation(props)}
            >
              Cancel
            </Button>
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
    );
  },
  Errors: ({errors, message}: FormState) => {
    if (!errors) {
      return null;
    }

    return (
      <div className="bg-red-500 mt-2 rounded p-2">
        <p>{message ?? "An error occoured"}</p>
        <p className="text-sm">
          {Object.entries(errors).map(([key, error]) => (
            <div key={key}>
              {key.toUpperCase()}: {error}
            </div>
          ))}
        </p>
      </div>
    );
  },
  Content: (props: PropsWithChildren) => {
    return <div className="px-5 py-3" {...props} />;
  },
};
