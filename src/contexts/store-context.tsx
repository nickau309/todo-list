"use client";

import type { State } from "@/store/store";
import { createCounterStore } from "@/store/store";
import type { ReactNode } from "react";
import { createContext, useRef, useContext } from "react";
import { useStore as useZustandStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

type StoreContextType = ReturnType<typeof createCounterStore>;

type ProviderProps = {
  children: ReactNode;
};

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: ProviderProps) {
  const ref = useRef<StoreContextType>();
  if (!ref.current) {
    ref.current = createCounterStore();
  }

  return (
    <StoreContext.Provider value={ref.current}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore<T>(selector: (state: State) => T) {
  const context = useContext(StoreContext);

  if (context === null) {
    throw new Error("useStore has to be used within <StoreProvider />");
  }

  return useZustandStore(context, useShallow(selector));
}
