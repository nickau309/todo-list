"use client";

import type { Dispatch, FormEvent, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";

type HandleSubmitType = (e: FormEvent<HTMLFormElement>) => void;

type StateContextType = {
  isOpen: boolean;
  handleSubmit: HandleSubmitType | null;
};

type ControlContextType = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setHandleSubmit: Dispatch<SetStateAction<HandleSubmitType | null>>;
};

type ProviderProps = {
  children: ReactNode;
};

const StateContext = createContext<StateContextType | null>(null);
const ControlContext = createContext<ControlContextType | null>(null);

export function ConfirmDialogProvider({ children }: ProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [handleSubmit, setHandleSubmit] = useState<HandleSubmitType | null>(
    null,
  );

  const stateContextValue = useMemo(
    () => ({ isOpen, handleSubmit }),
    [handleSubmit, isOpen],
  );

  const controlContextValue = useMemo(
    () => ({ setIsOpen, setHandleSubmit }),
    [],
  );

  return (
    <StateContext.Provider value={stateContextValue}>
      <ControlContext.Provider value={controlContextValue}>
        {children}
      </ControlContext.Provider>
    </StateContext.Provider>
  );
}

export function useConfirmDialogState() {
  const context = useContext(StateContext);

  if (context === null) {
    throw new Error(
      "useConfirmDialogState has to be used within <ConfirmDialogProvider />",
    );
  }

  return context;
}

export function useConfirmDialogControl() {
  const context = useContext(ControlContext);

  if (context === null) {
    throw new Error(
      "useConfirmDialogControl has to be used within <ConfirmDialogProvider />",
    );
  }

  return context;
}
