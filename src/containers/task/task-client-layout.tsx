"use client";

import { deleteTask } from "@/actions/task";
import ConfirmDialog from "@/components/confirm-dialog";
import TaskDeletionDialog from "@/components/task-deletion-dialog";
import { useTaskDialogState } from "@/components/task-dialog";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { startTransition, useCallback } from "react";
import TaskDialog from "./components/task-dialog";
import {
  useOptimisticTask,
  useSetOptimisticTask,
} from "./contexts/optimistic-task-context";
import { useTaskControl, useTaskState } from "./contexts/task-context";

type LayoutProps = {
  children: ReactNode;
};

export default function TaskClientLayout({ children }: LayoutProps) {
  const { prevHref } = useTaskDialogState();

  const router = useRouter();

  const { id, name, isDeleting } = useOptimisticTask();
  const setOptimisticTask = useSetOptimisticTask();

  const { isConfirmDialogOpen, isTaskDeletionDialogOpen } = useTaskState();
  const {
    setIsConfirmDialogOpen,
    setIsTaskDeletionDialogOpen,
    setIsTaskDialogOpen,
  } = useTaskControl();

  // Confirm Dialog
  const handleConfirmDialogSubmit = useCallback(() => {
    router.push(prevHref);
  }, [prevHref, router]);

  // Task Deletion Dialog
  const handleTaskDeletionDialogSubmit = useCallback(() => {
    startTransition(() => {
      setOptimisticTask((optimisticTask) => ({
        ...optimisticTask,
        isDeleting: true,
      }));
    });
    void deleteTask(id, prevHref);
  }, [id, prevHref, setOptimisticTask]);

  return (
    <TaskDialog onOpenChange={setIsTaskDialogOpen} open={!isDeleting}>
      {children}
      <ConfirmDialog
        handleSubmit={handleConfirmDialogSubmit}
        onOpenChange={setIsConfirmDialogOpen}
        open={isConfirmDialogOpen}
      />
      <TaskDeletionDialog
        handleSubmit={handleTaskDeletionDialogSubmit}
        name={name}
        onOpenChange={setIsTaskDeletionDialogOpen}
        open={isTaskDeletionDialogOpen}
      />
    </TaskDialog>
  );
}
