import React from "react";
import DueDate from "./DueDate";
import Labels from "./Labels";
import Priority from "./Priority";
import Project from "./Project";
import Reminders from "./Reminders";

export default function Sidebar({
  disabled,
  dueDate,
  isArchived,
  labelIds,
  projectId,
  priority,
}) {
  return (
    <div className="flex h-full flex-col gap-2 overflow-y-auto overflow-x-hidden bg-aside px-6 pb-4 pt-3">
      <Project disabled={disabled} projectId={projectId} />
      <hr className="border-divider-secondary" />
      {!isArchived && (
        <>
          <DueDate disabled={disabled} dueDate={dueDate} />
          <hr className="border-divider-secondary" />
        </>
      )}
      <Priority disabled={disabled} priority={priority} />
      <hr className="border-divider-secondary" />
      <Labels disabled={disabled} labelIds={labelIds} />
      <hr className="border-divider-secondary" />
      {!isArchived && (
        <>
          <Reminders disabled={disabled} />
          <hr className="border-divider-secondary" />
        </>
      )}
    </div>
  );
}
