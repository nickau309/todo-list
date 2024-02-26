import React from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { ChevronDownIcon24, ChevronUpIcon } from "@/assets";
import { QuaternaryButton } from "@/components/buttons";

export default function TaskNavigate({ projectId }) {
  const navigate = useNavigate();
  const { projectId: paramProjectId, taskId } = useParams();
  const { tasks } = useRouteLoaderData(
    projectId === paramProjectId ? "project" : "task",
  );

  const currIndex = tasks.findIndex((t) => t.id === taskId);
  const prevTask = tasks[currIndex - 1] ?? null;
  const nextTask = tasks[currIndex + 1] ?? null;

  const prevButtonAttr = prevTask
    ? { onClick: () => navigate(`../task/${prevTask.id}`) }
    : { disabled: true };
  const nextButtonAttr = nextTask
    ? { onClick: () => navigate(`../task/${nextTask.id}`) }
    : { disabled: true };

  return (
    <div className="flex">
      <QuaternaryButton
        className="w-8 transition-colors duration-300"
        {...prevButtonAttr}
      >
        <ChevronUpIcon />
      </QuaternaryButton>
      <QuaternaryButton
        className="w-8 transition-colors duration-300"
        {...nextButtonAttr}
      >
        <ChevronDownIcon24 />
      </QuaternaryButton>
    </div>
  );
}
