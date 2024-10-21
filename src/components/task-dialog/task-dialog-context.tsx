"use client";

import type { TaskType } from "@/types/task";
import type { Route } from "next";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";

type StateContextType = {
  prevHref: Route;
  siblingTaskIds: TaskType["id"][];
};

type ControlContextType = {
  setPrevHref: Dispatch<SetStateAction<Route>>;
  setSiblingTaskIds: Dispatch<SetStateAction<TaskType["id"][]>>;
};

type ProviderProps = {
  children: ReactNode;
};

const StateContext = createContext<StateContextType | null>(null);
const ControlContext = createContext<ControlContextType | null>(null);

export function TaskDialogProvider({ children }: ProviderProps) {
  const [prevHref, setPrevHref] = useState<Route>("/app/today");

  const [siblingTaskIds, setSiblingTaskIds] = useState<TaskType["id"][]>([]);

  const state = useMemo<StateContextType>(
    () => ({ prevHref, siblingTaskIds }),
    [prevHref, siblingTaskIds],
  );

  const control = useMemo<ControlContextType>(
    () => ({ setPrevHref, setSiblingTaskIds }),
    [],
  );

  return (
    <StateContext.Provider value={state}>
      <ControlContext.Provider value={control}>
        {children}
      </ControlContext.Provider>
    </StateContext.Provider>
  );
}

export function useTaskDialogState() {
  const context = useContext(StateContext);

  if (context === null) {
    throw new Error(
      "useTaskDialogState has to be used within <TaskDialogProvider />",
    );
  }

  return context;
}

export function useTaskDialogControl() {
  const context = useContext(ControlContext);

  if (context === null) {
    throw new Error(
      "useTaskDialogControl has to be used within <TaskDialogProvider />",
    );
  }

  return context;
}
