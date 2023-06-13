import React, { useState } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import { Reorder } from "framer-motion";
import equal from "fast-deep-equal";
import ReorderItem from "./ReorderItem";

export default function ReorderGroup() {
  const fetcher = useFetcher();
  const { projects } = useLoaderData();

  const [draggingId, setDraggingId] = useState(null);
  const [order, setOrder] = useState([]);

  // When it is not dragging
  if (!draggingId) {
    // When fetcher is not submitting / loading
    if (!fetcher.formData) {
      // Update the newest orders if there is any difference
      const projectOrder = projects
        .filter((p) => !p.isArchived && p.childOrder)
        .map((p) => p.id);
      if (!equal(order, projectOrder)) {
        setOrder(projectOrder);
        return;
      }
    }
  }

  const setProjectOrder = () => {
    const index = order.indexOf(draggingId);
    const prevId = order[index - 1] ?? null;
    fetcher.submit(
      { type: "moveProject", id: draggingId, prevId },
      { method: "post" }
    );
  };

  return (
    <Reorder.Group values={order} onReorder={setOrder} className="relative">
      {order.map((projectId) => (
        <ReorderItem
          key={projectId}
          id={projectId}
          isDragging={projectId === draggingId}
          setDraggingId={setDraggingId}
          setProjectOrder={setProjectOrder}
        />
      ))}
    </Reorder.Group>
  );
}
