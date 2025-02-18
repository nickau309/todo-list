"use client";

import { useProjects } from "@/contexts/projects-context";
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
  const projects = useProjects();

  const { isCompleted, projectId } = useOptimisticTask();

  const { isEditingInfo } = useTaskState();

  const project =
    projects.find((project) => project.id === projectId) ?? projects[0];
  const { isArchived } = project;

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
