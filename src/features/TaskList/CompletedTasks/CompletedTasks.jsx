import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import ListItem from "./ListItem";

export default function CompletedTasks({ isInTaskPanel }) {
  const { completeOrder, tasks } = useLoaderData();
  const { taskId } = useParams();

  const task = tasks.find((t) => t.id === taskId) ?? null;

  return (
    <ul>
      {completeOrder.map((childId) => {
        const currDepth = tasks.find((t) => t.id === childId).depth;
        return (
          <ListItem
            key={childId}
            id={childId}
            displayDepth={
              isInTaskPanel ? currDepth - task.depth - 1 : currDepth
            }
            isInTaskPanel={isInTaskPanel}
          />
        );
      })}
    </ul>
  );
}
