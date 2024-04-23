"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useSyncExternalStore } from "react";

type ProviderProps = {
  children: ReactNode;
};

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("resize", callback);
  };
}

const WidthContext = createContext<number | null>(null);

export function WidthProvider({ children }: ProviderProps) {
  const width = useSyncExternalStore(
    subscribe,
    () => window.innerWidth,
    () => Number.MAX_SAFE_INTEGER,
  );

  return (
    <WidthContext.Provider value={width}>{children}</WidthContext.Provider>
  );
}

export function useWidth() {
  const context = useContext(WidthContext);

  if (context === null) {
    throw new Error("useWidth has to be used within <WidthProvider />");
  }

  return context;
}
