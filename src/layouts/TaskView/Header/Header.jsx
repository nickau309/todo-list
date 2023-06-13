import React from "react";
import { CloseIcon24 } from "@assets";
import { QuaternaryButton } from "@components/buttons";
import TaskNavigate from "./TaskNavigate";
import TaskViewMenu from "./TaskViewMenu";
import Title from "./Title";

export default function Header({ addedAt, handleClose, name, projectId }) {
  return (
    <div className="flex h-full items-center justify-between gap-4 px-4">
      <div className="min-w-0">
        <Title projectId={projectId} />
      </div>
      <div className="flex gap-2">
        <TaskNavigate projectId={projectId} />
        <TaskViewMenu addedAt={addedAt} name={name} projectId={projectId} />
        <QuaternaryButton
          onClick={handleClose}
          className="w-8 transition-colors duration-300"
        >
          <CloseIcon24 />
        </QuaternaryButton>
      </div>
    </div>
  );
}
