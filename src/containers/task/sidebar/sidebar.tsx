"use client";

import clsx from "clsx";
import { useOptimisticTask } from "../contexts/optimistic-task-context";
import { useTaskState } from "../contexts/task-context";
import DueDate from "./due-date";
import Labels from "./labels";
import Location from "./location";
import Priority from "./priority";
import Project from "./project";
import Reminders from "./reminders";

export default function Sidebar() {
  const {
    isCompleted,
    project: { isArchived },
  } = useOptimisticTask();

  const { isEditingInfo } = useTaskState();

  const isDisabled = isCompleted || isArchived || isEditingInfo;

  return (
    <div
      className={clsx(
        "flex h-full w-full flex-col gap-2 overflow-y-auto overflow-x-hidden",
        "bg-background-base-secondary px-6 py-4",
      )}
    >
      <Project disabled={isDisabled} />
      {!isArchived && (
        <>
          <hr className="border-divider-primary" />
          <DueDate disabled={isDisabled} />
        </>
      )}
      <hr className="border-divider-primary" />
      <Priority disabled={isDisabled} />
      <hr className="border-divider-primary" />
      <Labels disabled={isDisabled} />
      {!isArchived && (
        <>
          <hr className="border-divider-primary" />
          <Reminders disabled={isDisabled} />
          <hr className="border-divider-primary" />
          <Location disabled={isDisabled} />
        </>
      )}
      <hr className="border-divider-primary" />
    </div>
  );
}
