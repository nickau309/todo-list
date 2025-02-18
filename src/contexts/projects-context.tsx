"use client";

import type { NewProjectOptimisticType, NewProjectType } from "@/types/project";
import type { Dispatch, ReactNode } from "react";
import { createContext, useContext, useOptimistic } from "react";

type ProjectOptimisticAction = {
  type: "create";
  name: string;
};

type ProviderProps = {
  children: ReactNode;
  projects: NewProjectType[];
};

function reducer(
  projects: NewProjectOptimisticType[],
  action: ProjectOptimisticAction,
) {
  if (action.type === "create") {
    const newProject: NewProjectOptimisticType = {
      childOrder: Number.MAX_SAFE_INTEGER,
      color: "CHARCOAL",
      id: Number.MAX_SAFE_INTEGER,
      isArchived: false,
      isCreating: true,
      isFavorite: false,
      isInboxProject: false,
      name: action.name,
      viewStyle: "LIST",
    };
    return projects.concat(newProject);
  }
  return projects;
}

const StateContext = createContext<NewProjectType[] | null>(null);
const OptimisticStateContext = createContext<NewProjectOptimisticType[] | null>(
  null,
);
const OptimisticDispatchContext =
  createContext<Dispatch<ProjectOptimisticAction> | null>(null);

export function ProjectsProvider({ children, projects }: ProviderProps) {
  const [optimisticProjects, dispatch] = useOptimistic(projects, reducer);

  return (
    <StateContext.Provider value={projects}>
      <OptimisticStateContext.Provider value={optimisticProjects}>
        <OptimisticDispatchContext.Provider value={dispatch}>
          {children}
        </OptimisticDispatchContext.Provider>
      </OptimisticStateContext.Provider>
    </StateContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(StateContext);

  if (context === null) {
    throw new Error("useProjects has to be used within <ProjectsProvider />");
  }

  return context;
}

export function useOptimisticProjects() {
  const context = useContext(OptimisticStateContext);

  if (context === null) {
    throw new Error(
      "useOptimisticProjects has to be used within <ProjectsProvider />",
    );
  }

  return context;
}

export function useDispatchOptimisticProjects() {
  const context = useContext(OptimisticDispatchContext);

  if (context === null) {
    throw new Error(
      "useDispatchOptimisticProjects has to be used within <ProjectsProvider />",
    );
  }

  return context;
}
