"use client";

import { useTaskDialogState } from "@/components/task-dialog";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type StateContextType = {
  isConfirmDialogOpen: boolean;
  isEditingInfo: boolean;
  isTaskDeletionDialogOpen: boolean;
};

type ControlContextType = {
  setIsConfirmDialogOpen: (open: boolean) => void;
  setIsEditingInfo: (open: boolean) => void;
  setIsTaskDeletionDialogOpen: (open: boolean) => void;
  setIsTaskDialogOpen: (open: boolean) => void;
};

type ProviderProps = {
  children: ReactNode;
};

const StateContext = createContext<StateContextType | null>(null);
const ControlContext = createContext<ControlContextType | null>(null);

export function TaskProvider({ children }: ProviderProps) {
  const { prevHref } = useTaskDialogState();

  const router = useRouter();

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const [isEditingInfo, setIsEditingInfo] = useState(false);

  const [isTaskDeletionDialogOpen, setIsTaskDeletionDialogOpen] =
    useState(false);

  const setIsTaskDialogOpen = useCallback(
    (open: boolean) => {
      if (!open) {
        if (isEditingInfo) {
          setIsConfirmDialogOpen(true);
        } else {
          console.log("router push 1");
          router.push(prevHref);
        }
      }
    },
    [isEditingInfo, prevHref, router],
  );

  console.log({
    isConfirmDialogOpen,
    isEditingInfo,
    isTaskDeletionDialogOpen,
  });

  const state = useMemo<StateContextType>(
    () => ({
      isConfirmDialogOpen,
      isEditingInfo,
      isTaskDeletionDialogOpen,
    }),
    [isConfirmDialogOpen, isEditingInfo, isTaskDeletionDialogOpen],
  );

  const control = useMemo<ControlContextType>(
    () => ({
      setIsConfirmDialogOpen,
      setIsEditingInfo,
      setIsTaskDeletionDialogOpen,
      setIsTaskDialogOpen,
    }),
    [setIsTaskDialogOpen],
  );

  return (
    <StateContext.Provider value={state}>
      <ControlContext.Provider value={control}>
        {children}
      </ControlContext.Provider>
    </StateContext.Provider>
  );
}

export function useTaskState() {
  const context = useContext(StateContext);

  if (context === null) {
    throw new Error("useTaskState has to be used within <TaskProvider />");
  }

  return context;
}

export function useTaskControl() {
  const context = useContext(ControlContext);

  if (context === null) {
    throw new Error("useTaskControl has to be used within <TaskProvider />");
  }

  return context;
}
