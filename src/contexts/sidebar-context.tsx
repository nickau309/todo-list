"use client";

import {
  INIT_SIDEBAR_WIDTH,
  MAX_SIDEBAR_WIDTH,
  MIN_SIDEBAR_WIDTH,
} from "@/constants/sidebar";
import useLocalStorage from "@/hooks/use-local-storage";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useWidth } from "./width-context";

type StateContextType = {
  showSidebarLg: boolean;
  showSidebarSm: boolean;
  showSidebar: boolean;
  sidebarWidth: number;
  isSettingsMenuOpen: boolean;
  isResourcesMenuOpen: boolean;
};

type ControlContextType = {
  setShowSidebarSm: Dispatch<SetStateAction<boolean>>;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  setSidebarWidth: Dispatch<SetStateAction<number>>;
  setIsSettingsMenuOpen: Dispatch<SetStateAction<boolean>>;
  setIsResourcesMenuOpen: Dispatch<SetStateAction<boolean>>;
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
  const width = useWidth();

  const [showSidebarLg, setShowSidebarLg] = useState(true);
  const [showSidebarSm, setShowSidebarSm] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useLocalStorage(
    "sidebarWidth",
    INIT_SIDEBAR_WIDTH,
    { deserializer },
  );

  useEffect(() => {
    if (width > 750) {
      setShowSidebarSm(false);
    } else {
      setShowSidebarLg(true);
    }
  }, [setShowSidebarLg, setShowSidebarSm, width]);

  const showSidebar = width > 750 ? showSidebarLg : showSidebarSm;
  const setShowSidebar = width > 750 ? setShowSidebarLg : setShowSidebarSm;

  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false);

  useEffect(() => {
    if (!showSidebar) {
      setIsSettingsMenuOpen(false);
      setIsResourcesMenuOpen(false);
    }
  }, [showSidebar]);

  const state = useMemo<StateContextType>(
    () => ({
      showSidebarLg,
      showSidebarSm,
      showSidebar,
      sidebarWidth,
      isSettingsMenuOpen,
      isResourcesMenuOpen,
    }),
    [
      isResourcesMenuOpen,
      isSettingsMenuOpen,
      showSidebar,
      showSidebarLg,
      showSidebarSm,
      sidebarWidth,
    ],
  );

  const control = useMemo<ControlContextType>(
    () => ({
      setShowSidebarSm,
      setShowSidebar,
      setSidebarWidth,
      setIsSettingsMenuOpen,
      setIsResourcesMenuOpen,
    }),
    [setShowSidebar, setSidebarWidth],
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
