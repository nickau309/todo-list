"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useSyncExternalStore } from "react";

type ProviderProps = {
  children: ReactNode;
};

const Context = createContext<boolean | null>(null);

const query = "(prefers-color-scheme: dark)";

const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onChange);
  return () => {
    mql.removeEventListener("change", onChange);
  };
};

export function PrefersColorSchemeProvider({ children }: ProviderProps) {
  const matches = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );

  return <Context.Provider value={matches}>{children}</Context.Provider>;
}

export function usePrefersColorScheme() {
  const context = useContext(Context);

  if (context === null) {
    throw new Error(
      "usePrefersColorScheme has to be used within <PrefersColorSchemeProvider />",
    );
  }

  return context;
}
