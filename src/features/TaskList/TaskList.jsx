import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useShowCompleted } from "@/contexts";
import { AddTask } from "@/features";
import { classNames } from "@/utils";
import AddTaskButton from "./AddTaskButton";
import CompletedTasks from "./CompletedTasks";
import IncompletedTasks from "./IncompletedTasks";

export default function TaskList({
  isArchived = false,
  isInTaskPanel = false,
}) {
  const { completeOrder, tasks } = useLoaderData();
  const { taskId } = useParams();

  const showCompleted = useShowCompleted();

  const task = tasks.find((t) => t.id === taskId) ?? null;

  return (
    <div
      className={classNames(
        !isInTaskPanel && "mt-[5px] pb-[18px]",
        "w-full max-w-[800px]",
      )}
    >
      <IncompletedTasks isInTaskPanel={isInTaskPanel} />
      {!task?.isCompleted && <AddTask />}
      {!isArchived && !task?.isCompleted && (
        <AddTaskButton isInTaskPanel={isInTaskPanel} />
      )}
      {!task?.isCompleted && showCompleted && completeOrder.length > 0 && (
        <hr
          className={
            isInTaskPanel ? "border-divider-secondary" : "border-divider-base"
          }
        />
      )}
      {(showCompleted || (isArchived && isInTaskPanel)) && (
        <CompletedTasks isInTaskPanel={isInTaskPanel} />
      )}
    </div>
  );
}
