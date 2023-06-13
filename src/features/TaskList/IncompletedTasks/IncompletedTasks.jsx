import React, { useState } from "react";
import { useFetcher, useLoaderData, useParams } from "react-router-dom";
import { Reorder } from "framer-motion";
import equal from "fast-deep-equal";
import ReorderItem from "./ReorderItem";

export default function IncompletedTasks({ isInTaskPanel }) {
  const fetcher = useFetcher();
  const { incompleteOrder, tasks } = useLoaderData();
  const { taskId } = useParams();

  const [draggingId, setDraggingId] = useState(null);
  const [order, setOrder] = useState(incompleteOrder);

  const task = tasks.find((t) => t.id === taskId) ?? null;

  // When it is not dragging & inside task panel
  if (!draggingId && isInTaskPanel) {
    if (fetcher.formData) {
      // Update the optimistic order when fetcher submitting
      const { depth, id } = Object.fromEntries(fetcher.formData);
      if (depth - task.depth === 2) {
        const newOrder = order.filter((taskId) => taskId !== id);
        if (!equal(order, newOrder)) {
          setOrder(newOrder);
          return;
        }
      }
    } else {
      // Update the newest orders if there is any difference
      if (!equal(order, incompleteOrder)) {
        setOrder(incompleteOrder);
        return;
      }
    }
  }

  // When it is not dragging & not inside task panel
  if (!draggingId && !isInTaskPanel) {
    // When fetcher is not submitting / loading
    if (!fetcher.formData) {
      // Update the newest orders if there is any difference
      if (!equal(order, incompleteOrder)) {
        setOrder(incompleteOrder);
        return;
      }
    }
  }

  // When it is dragging & not inside task panel
  if (draggingId && !isInTaskPanel) {
    // Hide all descendant sub-tasks of currently dragging task
    const draggingTask = tasks.find((t) => t.id === draggingId);
    if (!draggingTask.isCollapsed) {
      const childIds = [...draggingTask.childIds];
      const hideChildIds = [];
      while (childIds.length) {
        const currentId = childIds.shift();
        hideChildIds.push(currentId);
        const currentTask = tasks.find((t) => t.id === currentId);
        childIds.unshift(...currentTask.childIds);
      }
      const newOrder = order.filter((id) => !hideChildIds.includes(id));
      if (!equal(order, newOrder)) {
        setOrder(newOrder);
        return;
      }
    }
  }

  const setTaskDepth = (depth) => {
    const index = order.indexOf(draggingId);
    const prevId = order[index - 1] ?? null;
    const nextId = order[index + 1] ?? null;
    fetcher.submit(
      {
        type: "moveTask",
        id: draggingId,
        depth: isInTaskPanel ? depth + task.depth + 1 : depth,
        prevId,
        nextId,
      },
      { method: "post" }
    );
  };

  return (
    <Reorder.Group values={order} onReorder={setOrder} className="relative">
      {order.map((childId, i, arr) => {
        const currDepth = tasks.find((t) => t.id === childId).depth;
        const prevId = arr[i - 1];
        const prevDepth = tasks.find((t) => t.id === prevId)?.depth;
        const nextId = arr[i + 1];
        const nextDepth = tasks.find((t) => t.id === nextId)?.depth;
        return (
          <ReorderItem
            key={childId}
            itemId={childId}
            isDragging={childId === draggingId}
            setDraggingId={setDraggingId}
            displayDepth={
              isInTaskPanel ? currDepth - task.depth - 1 : currDepth
            }
            minDepth={
              prevId && nextId
                ? isInTaskPanel
                  ? nextDepth - task.depth - 1
                  : nextDepth
                : 0
            }
            maxDepth={
              prevId
                ? isInTaskPanel
                  ? prevDepth - task.depth
                  : Math.min(prevDepth + 1, 4)
                : 0
            }
            appendTask={setTaskDepth}
            isInTaskPanel={isInTaskPanel}
          />
        );
      })}
    </Reorder.Group>
  );
}
