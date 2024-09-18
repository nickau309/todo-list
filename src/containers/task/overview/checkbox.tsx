"use client";

import { updateIsCompleted } from "@/actions/task";
import { CheckboxButton } from "@/features/checkbox";
import { startTransition, useCallback } from "react";
import {
  useOptimisticTask,
  useSetOptimisticTask,
} from "../contexts/optimistic-task-context";
import { useTaskState } from "../contexts/task-context";

export default function Checkbox() {
  const {
    id,
    isCompleted,
    priority,
    project: { isArchived },
  } = useOptimisticTask();
  const setOptimisticTask = useSetOptimisticTask();

  const { isEditingInfo } = useTaskState();

  const setIsCompleted = useCallback(
    (isCompleted: boolean) => {
      startTransition(() => {
        setOptimisticTask((optimisticTask) => ({
          ...optimisticTask,
          isCompleted,
        }));
      });
      const formData = new FormData();
      formData.append("isCompleted", String(isCompleted));
      void updateIsCompleted(id, formData);
    },
    [id, setOptimisticTask],
  );

  const isDisabled = isArchived || isEditingInfo;

  return (
    <div className="-mt-px shrink-0 basis-6">
      <CheckboxButton
        checked={isCompleted}
        disabled={isDisabled}
        priority={priority}
        setChecked={setIsCompleted}
      />
    </div>
  );
}
