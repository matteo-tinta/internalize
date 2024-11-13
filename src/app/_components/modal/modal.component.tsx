"use client";
import { Modal as BaseModal } from "@mui/base";
import classNames from "classnames";
import {
  forwardRef,
  PropsWithChildren,
  ReactNode,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type ModalRenderProps = {
  close: () => void;
};
export type ModalRef = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export type ModalProps = {
  render: (props: ModalRenderProps) => ReactNode;
  onClose?: () => void;
  onOpen?: () => void;
  backdropClassName?: string;
  className?: string | ((params: { open: boolean }) => string | undefined);
};

const Modal = forwardRef((props: ModalProps, ref: Ref<ModalRef>) => {
  const {
    render,
    className: overrideClassName,
    backdropClassName: overrideBackdropClassName,
    onOpen = () => {},
    onClose = () => {},
  } = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    onOpen();
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  useImperativeHandle(
    ref,
    () => ({
      isOpen: open,
      open: handleOpen,
      close: handleClose,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const renderModalContent = () => {
    return render({
      close: handleClose,
    });
  };

  const backdropClassName = classNames(
    "modal fixed z-[1300] inset-0 flex items-center justify-center",
    overrideBackdropClassName
  );

  const overrideClassNameFn = () => {
    return typeof overrideClassName === "function"
      ? overrideClassName({
          open,
        })
      : overrideClassName;
  };

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      slots={{ backdrop: Backdrop }}
      closeAfterTransition
      className={backdropClassName}
    >
      <ModalContent className={overrideClassNameFn()}>
        {renderModalContent()}
      </ModalContent>
    </BaseModal>
  );
});

const ModalContent = (
  props: PropsWithChildren & {
    className?: string;
  }
) => {
  const { className: overrideClassName = "", children } = props;
  const nestedDivRef = useRef<HTMLDivElement>(null);

  const className = classNames(
    "relative flex flex-col gap-[8px] overflow-hidden text-start bg-background shadow border-[1px] rounded",
    overrideClassName
  );

  return (
    <div ref={nestedDivRef} className={className}>
      {children}
    </div>
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
