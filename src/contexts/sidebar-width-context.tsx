"use client";

import {
  INIT_SIDEBAR_WIDTH,
  MAX_SIDEBAR_WIDTH,
  MIN_SIDEBAR_WIDTH,
} from "@/constants/sidebar";
import useLocalStorage from "@/hooks/use-local-storage";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext } from "react";

type SetStateContextType = Dispatch<SetStateAction<number>>;

type ProviderProps = {
  children: ReactNode;
};

const deserializer = (value: string) => {
  try {
    const state: unknown = JSON.parse(value);
    if (typeof state !== "number") {
      return INIT_SIDEBAR_WIDTH;
    }
    return Math.min(Math.max(state, MIN_SIDEBAR_WIDTH), MAX_SIDEBAR_WIDTH);
  } catch {
    return INIT_SIDEBAR_WIDTH;
  }
};

const StateContext = createContext<number | null>(null);
const SetStateContext = createContext<SetStateContextType | null>(null);

export function SidebarWidthProvider({ children }: ProviderProps) {
  const [sidebarWidth, setSidebarWidth] = useLocalStorage(
    "sidebarWidth",
    INIT_SIDEBAR_WIDTH,
    { deserializer },
  );

  return (
    <StateContext.Provider value={sidebarWidth}>
      <SetStateContext.Provider value={setSidebarWidth}>
        {children}
      </SetStateContext.Provider>
    </StateContext.Provider>
  );
}

export function useSidebarWidth() {
  const context = useContext(StateContext);

  if (context === null) {
    throw new Error(
      "useSidebarWidth has to be used within <SidebarWidthProvider />",
    );
  }

  return context;
}

export function useSetSidebarWidth() {
  const context = useContext(SetStateContext);

  if (context === null) {
    throw new Error(
      "useSetSidebarWidth has to be used within <SidebarWidthProvider />",
    );
  }

  return context;
}
