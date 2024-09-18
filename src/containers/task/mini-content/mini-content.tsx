"use client";

import { useOptimisticTask } from "../contexts/optimistic-task-context";
import { useTaskState } from "../contexts/task-context";
import DueDate from "./due-date";
import Labels from "./labels";
import Priority from "./priority";
import Project from "./project";
import Reminders from "./reminders";

export default function MiniContent() {
  const {
    isCompleted,
    project: { isArchived },
  } = useOptimisticTask();

  const { isEditingInfo } = useTaskState();

  const isDisabled = isCompleted || isArchived || isEditingInfo;

  return (
    <div className="flex flex-col">
      <Project disabled={isDisabled} />
      {!isArchived && (
        <>
          <hr className="ml-[52px] border-divider-secondary" />
          <DueDate disabled={isDisabled} />
        </>
      )}
      <hr className="ml-[52px] border-divider-secondary" />
      <Priority disabled={isDisabled} />
      <hr className="ml-[52px] border-divider-secondary" />
      <Labels disabled={isDisabled} />
      {!isArchived && (
        <>
          <hr className="ml-[52px] border-divider-secondary" />
          <Reminders disabled={isDisabled} />
        </>
      )}
    </div>
  );
}
