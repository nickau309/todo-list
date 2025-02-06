"use client";

import type { LabelType } from "@/types/label";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";

type ProviderProps = {
  children: ReactNode;
  labels: LabelType[];
};

const Context = createContext<LabelType[] | null>(null);

export function LabelsDataProvider({ children, labels }: ProviderProps) {
  return <Context.Provider value={labels}>{children}</Context.Provider>;
}

export function useLabelsData() {
  const context = useContext(Context);

  if (context === null) {
    throw new Error(
      "useLabelsData has to be used within <LabelsDataProvider />",
    );
  }

  return context;
}
