"use client";

import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";
import classNames from "classnames";
import { generateRandomId } from "@/app/lib/helpers/random.helpers";

type SnackbarContext = {
  snackbars: Array<{
    id?: string;
    content: ReactNode;
    type?: "success" | "danger"
  }>;
  notify: (snackbar: SnackbarContext["snackbars"][number]) => void;
};

const SnackbarContext = createContext<SnackbarContext | null>(null);

const SnackbarContextProvider = (props: PropsWithChildren) => {
  const [snackbars, setSnackbars] = useState<SnackbarContext["snackbars"]>([]);

  const baseValue: SnackbarContext = {
    snackbars: [],
    notify: (snackbar) => {
      if(!snackbar.id){
        snackbar.id = generateRandomId()
      }

      setSnackbars((prev) => [...prev, snackbar]);
      setTimeout(() => {
        setSnackbars((prev) => prev.filter((f) => f.id != snackbar.id));
      }, 10000);
    },
  };

  return (
    <SnackbarContext.Provider value={baseValue}>
      {props.children}

      <div className="fixed right-4 top-4">
        {snackbars.map((snackbar) => (
          <div
            key={snackbar.id}
            className={
              classNames(
                "relative mb-2 z-50 font-sans flexleft-auto justify-start rounded-lg p-3 animation-appear transition-transform border-solid min-w-snackbar max-w-snackbar text-foreground-white shadow-md border-0 bg-green-600",
                {
                  "!bg-red-600": snackbar.type == "danger"
                }
              )
            }
          >
            {snackbar.content}
          </div>
        ))}
      </div>
    </SnackbarContext.Provider>
  );
};

const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw "useSnackbar must be used inside a SnackbarContextProvider";
  }
  return context;
};

export { useSnackbar, SnackbarContextProvider as SnackbarContext };
