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

export function OldConfirmDialogProvider({ children }: ProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [handleSubmit, setHandleSubmit] = useState<HandleSubmitType | null>(
    null,
  );

  const state = useMemo(
    () => ({ isOpen, handleSubmit }),
    [handleSubmit, isOpen],
  );

  const control = useMemo(() => ({ setIsOpen, setHandleSubmit }), []);

  return (
    <StateContext.Provider value={state}>
      <ControlContext.Provider value={control}>
        {children}
      </ControlContext.Provider>
    </StateContext.Provider>
  );
}

export function useOldConfirmDialogState(component: string) {
  const context = useContext(StateContext);

  if (context === null) {
    throw new Error(
      `<${component} /> is missing a parent <ConfirmDialogProvider /> component.`,
    );
  }

  return context;
}

export function useOldConfirmDialogControl(component: string) {
  const context = useContext(ControlContext);

  if (context === null) {
    throw new Error(
      `<${component} /> is missing a parent <ConfirmDialogProvider /> component.`,
    );
  }

  return context;
}
