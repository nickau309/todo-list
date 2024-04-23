"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

type SetStateContextType = Dispatch<SetStateAction<boolean>>;

type ProviderProps = {
  children: ReactNode;
};

const StateContext = createContext<boolean | null>(null);
const SetStateContext = createContext<SetStateContextType | null>(null);

export function ShowNavMenuProvider({ children }: ProviderProps) {
  const [showNavMenu, setShowNavMenu] = useState(false);

  return (
    <StateContext.Provider value={showNavMenu}>
      <SetStateContext.Provider value={setShowNavMenu}>
        {children}
      </SetStateContext.Provider>
    </StateContext.Provider>
  );
}

export function useShowNavMenu() {
  const context = useContext(StateContext);

  if (context === null) {
    throw new Error(
      "useShowNavMenu has to be used within <ShowNavMenuProvider />",
    );
  }

  return context;
}

export function useSetShowNavMenu() {
  const context = useContext(SetStateContext);

  if (context === null) {
    throw new Error(
      "useSetShowNavMenu has to be used within <ShowNavMenuProvider />",
    );
  }

  return context;
}
