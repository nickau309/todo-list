import React from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import ChildLink from "./ChildLink";
import DueDateButton from "./DueDateButton";
import LabelLink from "./LabelLink";

export default function ItemInfoTags({ id, isArchived }) {
  const { tasks } = useLoaderData();
  const { labels } = useRouteLoaderData("root");

  const { isCompleted, dueDate, projectId, labelIds, childIds } = tasks.find(
    (t) => t.id === id
  );

  const showChildLink = (!isArchived || isCompleted) && childIds.length > 0;
  const showDueDate = !isArchived && dueDate;

  if (!showChildLink && !showDueDate && !labelIds.length) {
    return null;
  }

  const path = `/project/${projectId}/task/${id}`;

  return (
    <div className="flex flex-wrap gap-x-2">
      {showChildLink && (
        <ChildLink
          completeCount={
            tasks.filter((t) => childIds.includes(t.id) && t.isCompleted).length
          }
          isCompleted={isCompleted}
          path={path}
          totalCount={childIds.length}
        />
      )}
      {showDueDate && (
        <DueDateButton dueDate={dueDate} id={id} isCompleted={isCompleted} />
      )}
      {labels
        .filter((label) => labelIds.includes(label.id))
        .map((label) => (
          <LabelLink
            key={label.id}
            color={label.color}
            id={label.id}
            isCompleted={isCompleted}
            name={label.name}
          />
        ))}
    </div>
  );
}
