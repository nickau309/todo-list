import React, { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import Info from "./Info";
import MiniContent from "./MiniContent";
import ParentInfo from "./ParentInfo";
import SubTask from "./SubTask";
import Sidebar from "./Sidebar";

export default function Content({
  description,
  dueDate,
  isCompleted,
  labelIds,
  name,
  priority,
  projectId,
}) {
  const { projects } = useRouteLoaderData("root");

  const [isEditing, setIsEditing] = useState(false);

  const { isArchived } = projects.find((p) => p.id === projectId);

  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col gap-4 overflow-x-hidden p-4 pb-0">
        <div className="flex flex-col gap-2 max-[751px]:px-4">
          <ParentInfo />
          <Info
            description={description}
            isArchived={isArchived}
            isCompleted={isCompleted}
            isEditing={isEditing}
            name={name}
            setIsEditing={setIsEditing}
          />
        </div>
        <MiniContent
          disabled={isArchived || isCompleted || isEditing}
          dueDate={dueDate}
          isArchived={isArchived}
          labelIds={labelIds}
          projectId={projectId}
          priority={priority}
        />
        <hr className="mt-4 border-t-[6px] border-divider-tertiary min-[751px]:hidden" />
        <SubTask isArchived={isArchived} />
        <hr className="border-t-[6px] border-divider-tertiary min-[751px]:hidden" />
      </div>
      <div className="min-w-0 basis-[260px] max-[751px]:hidden">
        <Sidebar
          disabled={isArchived || isCompleted || isEditing}
          dueDate={dueDate}
          isArchived={isArchived}
          labelIds={labelIds}
          projectId={projectId}
          priority={priority}
        />
      </div>
    </div>
  );
}
