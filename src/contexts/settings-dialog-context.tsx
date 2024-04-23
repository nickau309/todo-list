"use client";

import { useRouter } from "next/navigation";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";

type StateContextType = {
  isOpen: boolean;
  afterUnmount: () => void;
};

type ControlContextType = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setAfterUnmount: Dispatch<SetStateAction<() => void>>;
};

type ProviderProps = {
  children: ReactNode;
};

const StateContext = createContext<StateContextType | null>(null);
const ControlContext = createContext<ControlContextType | null>(null);

export function SettingsDialogProvider({ children }: ProviderProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [afterUnmount, setAfterUnmount] = useState<() => void>(() => () => {
    router.push("/app/today");
  });

  const stateContextValue = useMemo(
    () => ({ isOpen, afterUnmount }),
    [afterUnmount, isOpen],
  );

  const controlContextValue = useMemo(
    () => ({ setIsOpen, setAfterUnmount }),
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

export function useSettingsDialogState() {
  const context = useContext(StateContext);

  if (context === null) {
    throw new Error(
      "useSettingsDialogState has to be used within <SettingsDialogProvider />",
    );
  }

  return context;
}

export function useSettingsDialogControl() {
  const context = useContext(ControlContext);

  if (context === null) {
    throw new Error(
      "useSettingsDialogControl has to be used within <SettingsDialogProvider />",
    );
  }

  return context;
}
