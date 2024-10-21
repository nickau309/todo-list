"use client";

import type { ProjectOptimisticType, ProjectType } from "@/types/project";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useOptimistic } from "react";

type SetStateContextType = Dispatch<SetStateAction<ProjectOptimisticType>>;

type ProviderProps = {
  children: ReactNode;
  project: ProjectType;
};

const StateContext = createContext<ProjectOptimisticType | null>(null);
const SetStateContext = createContext<SetStateContextType | null>(null);

export function OptimisticProjectProvider({
  children,
  project,
}: ProviderProps) {
  const [optimisticProject, setOptimisticProject] = useOptimistic<
    ProjectOptimisticType,
    SetStateAction<ProjectOptimisticType>
  >(project, (prevState, stateOrFn) => {
    if (stateOrFn instanceof Function) {
      return stateOrFn(prevState);
    }
    return stateOrFn;
  });

  console.log(optimisticProject);

  return (
    <StateContext.Provider value={optimisticProject}>
      <SetStateContext.Provider value={setOptimisticProject}>
        {children}
      </SetStateContext.Provider>
    </StateContext.Provider>
  );
}

export function useOptimisticProject() {
  const context = useContext(StateContext);

  if (context === null) {
    throw new Error(
      "useOptimisticProject has to be used within <OptimisticProjectProvider />",
    );
  }

  return context;
}

export function useSetOptimisticProject() {
  const context = useContext(SetStateContext);

  if (context === null) {
    throw new Error(
      "useSetOptimisticProject has to be used within <OptimisticProjectProvider />",
    );
  }

  return context;
}
