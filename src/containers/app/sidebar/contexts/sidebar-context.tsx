"use client";

import {
  INIT_SIDEBAR_WIDTH,
  MAX_SIDEBAR_WIDTH,
  MIN_SIDEBAR_WIDTH,
} from "@/constants/sidebar";
import useLocalStorage from "@/hooks/use-local-storage";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo } from "react";

type StateContextType = {
  sidebarWidth: number;
};

type ControlContextType = {
  setSidebarWidth: Dispatch<SetStateAction<number>>;
};

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

const StateContext = createContext<StateContextType | null>(null);
const ControlContext = createContext<ControlContextType | null>(null);

export function SidebarProvider({ children }: ProviderProps) {
  const [sidebarWidth, setSidebarWidth] = useLocalStorage(
    "sidebarWidth",
    INIT_SIDEBAR_WIDTH,
    { deserializer },
  );

  const state = useMemo<StateContextType>(
    () => ({ sidebarWidth }),
    [sidebarWidth],
  );

  const control = useMemo<ControlContextType>(
    () => ({ setSidebarWidth }),
    [setSidebarWidth],
  );

  return (
    <StateContext.Provider value={state}>
      <ControlContext.Provider value={control}>
        {children}
      </ControlContext.Provider>
    </StateContext.Provider>
  );
}

export function useSidebarState() {
  const context = useContext(StateContext);

  if (context === null) {
    throw new Error(
      "useSidebarState has to be used within <SidebarProvider />",
    );
  }

  return context;
}

export function useSidebarControl() {
  const context = useContext(ControlContext);

  if (context === null) {
    throw new Error(
      "useSidebarControl has to be used within <SidebarProvider />",
    );
  }

  return context;
}
