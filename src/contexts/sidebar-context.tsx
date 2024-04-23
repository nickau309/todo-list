"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";

type SidebarDispatch = {
  setShowSidebarLg: Dispatch<SetStateAction<boolean>>;
  setShowSidebarSm: Dispatch<SetStateAction<boolean>>;
};

type SidebarProviderProps = {
  children: ReactNode;
};

const ShowSidebarLgContext = createContext<boolean | null>(null);
const ShowSidebarSmContext = createContext<boolean | null>(null);
const SidebarDispatchContext = createContext<SidebarDispatch | null>(null);

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [showSidebarLg, setShowSidebarLg] = useState(true);
  const [showSidebarSm, setShowSidebarSm] = useState(false);

  const dispatch = useMemo(() => ({ setShowSidebarLg, setShowSidebarSm }), []);

  return (
    <ShowSidebarLgContext.Provider value={showSidebarLg}>
      <ShowSidebarSmContext.Provider value={showSidebarSm}>
        <SidebarDispatchContext.Provider value={dispatch}>
          {children}
        </SidebarDispatchContext.Provider>
      </ShowSidebarSmContext.Provider>
    </ShowSidebarLgContext.Provider>
  );
}

export function useShowSidebarLg() {
  const showSidebarLgContext = useContext(ShowSidebarLgContext);

  if (showSidebarLgContext === null) {
    throw new Error(
      "useShowSidebarLg has to be used within <SidebarProvider />",
    );
  }

  return showSidebarLgContext;
}

export function useShowSidebarSm() {
  const showSidebarSmContext = useContext(ShowSidebarSmContext);

  if (showSidebarSmContext === null) {
    throw new Error(
      "useShowSidebarSm has to be used within <SidebarProvider />",
    );
  }

  return showSidebarSmContext;
}

export function useSidebarDispatch() {
  const sidebarDispatchContext = useContext(SidebarDispatchContext);

  if (sidebarDispatchContext === null) {
    throw new Error(
      "useSidebarDispatch has to be used within <SidebarProvider />",
    );
  }

  return sidebarDispatchContext;
}
