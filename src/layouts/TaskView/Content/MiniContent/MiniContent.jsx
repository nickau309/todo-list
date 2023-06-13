import React from "react";
import DueDate from "./DueDate";
import Labels from "./Labels";
import Priority from "./Priority";
import Project from "./Project";
import Reminders from "./Reminders";

export default function MiniContent({
  disabled,
  dueDate,
  isArchived,
  labelIds,
  projectId,
  priority,
}) {
  return (
    <div className="flex flex-col min-[751px]:hidden">
      <Project disabled={disabled} projectId={projectId} />
      {!isArchived && (
        <>
          <hr className="ml-[52px] border-divider-secondary" />
          <DueDate disabled={disabled} dueDate={dueDate} />
        </>
      )}
      <hr className="ml-[52px] border-divider-secondary" />
      <Priority disabled={disabled} priority={priority} />
      <hr className="ml-[52px] border-divider-secondary" />
      <Labels disabled={disabled} labelIds={labelIds} />
      {!isArchived && (
        <>
          <hr className="ml-[52px] border-divider-secondary" />
          <Reminders disabled={disabled} />
        </>
      )}
    </div>
  );
}
