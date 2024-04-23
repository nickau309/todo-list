"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

type SetStateContextType = Dispatch<SetStateAction<boolean>>;

type ProviderProps = {
  children: ReactNode;
};

const StateContext = createContext<boolean | null>(null);
const SetStateContext = createContext<SetStateContextType | null>(null);

export function PrintDialogProvider({ children }: ProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StateContext.Provider value={isOpen}>
      <SetStateContext.Provider value={setIsOpen}>
        {children}
      </SetStateContext.Provider>
    </StateContext.Provider>
  );
}

export function useIsOpen() {
  const context = useContext(StateContext);

  if (context === null) {
    throw new Error("useIsOpen has to be used within <PrintDialogProvider />");
  }

  return context;
}

export function useSetIsOpen() {
  const context = useContext(SetStateContext);

  if (context === null) {
    throw new Error(
      "useSetIsOpen has to be used within <PrintDialogProvider />",
    );
  }

  return context;
}
