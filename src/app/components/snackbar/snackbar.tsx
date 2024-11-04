import { useSnackbar } from "@mui/base";
import {
  forwardRef,
  ReactNode,
  Ref,
  useImperativeHandle,
  useState,
} from "react";

export type SnackbarRef = {
  open: () => void;
  close: () => void;
};

export type SnackbarPropsCallback = ReturnType<typeof useSnackbar>["getRootProps"]

export type SnackbarProps = {
  render: (props: SnackbarPropsCallback) => ReactNode;
};

const Snackbar = forwardRef<SnackbarRef, SnackbarProps>(
  (props: SnackbarProps, ref: Ref<SnackbarRef>) => {
    const [open, setOpen] = useState(false);
    const { render } = props;

    const { getRootProps } = useSnackbar({
      onClose: () => {
        setOpen(false);
      },
      open,
      autoHideDuration: 5000,
    });

    useImperativeHandle(
      ref,
      () => {
        return {
          open: () => setOpen(true),
          close: () => setOpen(false),
        };
      },
      []
    );

    if (!open) {
      return null;
    }

    return render(getRootProps);
  }
);

Snackbar.displayName = "Snackbar";

export { Snackbar };
