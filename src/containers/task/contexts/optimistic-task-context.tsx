"use client";

import type { TaskOptimisticType, TaskType } from "@/types/task";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useOptimistic } from "react";

type SetStateContextType = Dispatch<SetStateAction<TaskOptimisticType>>;

type ProviderProps = {
  children: ReactNode;
  task: TaskType;
};

const StateContext = createContext<TaskOptimisticType | null>(null);
const SetStateContext = createContext<SetStateContextType | null>(null);

export function OptimisticTaskProvider({ children, task }: ProviderProps) {
  const [optimisticTask, setOptimisticTask] = useOptimistic<
    TaskOptimisticType,
    SetStateAction<TaskOptimisticType>
  >(task, (prevState, stateOrFn) => {
    if (stateOrFn instanceof Function) {
      return stateOrFn(prevState);
    }
    return stateOrFn;
  });

  console.log(optimisticTask);

  return (
    <StateContext.Provider value={optimisticTask}>
      <SetStateContext.Provider value={setOptimisticTask}>
        {children}
      </SetStateContext.Provider>
    </StateContext.Provider>
  );
}

export function useOptimisticTask() {
  const context = useContext(StateContext);

  if (context === null) {
    throw new Error(
      "useOptimisticTask has to be used within <OptimisticTaskProvider />",
    );
  }

  return context;
}

export function useSetOptimisticTask() {
  const context = useContext(SetStateContext);

  if (context === null) {
    throw new Error(
      "useSetOptimisticTask has to be used within <OptimisticTaskProvider />",
    );
  }

  return context;
}
