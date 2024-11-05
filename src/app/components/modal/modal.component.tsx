"use client";
import { Modal as BaseModal } from "@mui/base";
import classNames from "classnames";
import {
  forwardRef,
  PropsWithChildren,
  ReactNode,
  Ref,
  useImperativeHandle,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type ModalRenderProps = {
  close: () => void;
};
export type ModalRef = {
  open: () => void;
};

type ModalProps = {
  render: (props: ModalRenderProps) => ReactNode;
};

const Modal = forwardRef((props: ModalProps, ref: Ref<ModalRef>) => {
  const { render } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useImperativeHandle(
    ref,
    () => ({
      open: handleOpen,
    }),
    []
  );

  const renderModalContent = () => {
    return render({
      close: handleClose,
    });
  };

  return createPortal(
    <BaseModal
      open={open}
      onClose={handleClose}
      slots={{ backdrop: Backdrop }}
      className="fixed z-[1300] inset-0 flex items-center justify-center"
    >
      <ModalContent>
        {renderModalContent()}
      </ModalContent>
    </BaseModal>,
    document?.body
  );
});

const ModalContent = (props: PropsWithChildren) => {
  return (
    <div
      className="relative flex flex-col gap-[8px] overflow-hidden text-start bg-background shadow border-[1px] rounded"
      {...props}
    />
  );
};

const Backdrop = forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className: askedClassName, ...other } = props;

  const className = classNames(
    { "bg-black/60 fixed top-0 bottom-0 left-0 right-0": open },
    askedClassName
  );

  return <div className={className} ref={ref} {...other} />;
});

Backdrop.displayName = "Backdrop";
Modal.displayName = "Modal";
export { Modal };
