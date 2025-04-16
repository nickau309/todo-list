"use client";

import useReorderTask from "@/hooks/task/use-reorder-task";
import { ContainerIdSchema, SortableTaskDataSchema } from "@/lib/zod";
import type {
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import OverlayItem from "../containers/project/content/overlay-item";

type DragDataContextType = {
  activeId: UniqueIdentifier | null;
  overId: UniqueIdentifier | null;
  offsetX: number;
};

type ProviderProps = {
  children: ReactNode;
};

const DragDataContext = createContext<DragDataContextType | null>(null);

export default function DndProvider({ children }: ProviderProps) {
  const reorderTask = useReorderTask();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const [offsetX, setOffsetX] = useState(0);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });
  const sensors = useSensors(pointerSensor);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    console.log("handle drag start");
    console.log(event);

    setActiveId(active.id);
    setOverId(active.id);
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const { delta } = event;

    setOffsetX(delta.x);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;

    setOverId(over?.id ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log(active);

    const activeData = SortableTaskDataSchema.parse(active.data.current);
    const overData = SortableTaskDataSchema.parse(over?.data.current);

    console.log("handle drag end..");
    console.log(event);
    console.log(activeData);
    console.log(overData);

    const matched = activeData.sortable.containerId.match(
      /^sortable-project-(?<id>\d+)$/,
    );
    const parsed = ContainerIdSchema.parse(matched?.groups);
    console.log(parsed);

    if (overId) {
      reorderTask.mutate({
        activeId: active.id,
        overId,
        parentTaskId: activeData.parentTaskId,
        projectId: parsed.id,
      });
    }

    setActiveId(null);
    setOverId(null);
    setOffsetX(0);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverId(null);
    setOffsetX(0);
  };

  console.log("rendering dnd provider....");

  const value = useMemo(
    () => ({ activeId, overId, offsetX }),
    [activeId, offsetX, overId],
  );

  return (
    <DragDataContext.Provider value={value}>
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {children}
        <DragOverlay dropAnimation={null}>
          {activeId && <OverlayItem id={Number(activeId)} />}
        </DragOverlay>
      </DndContext>
    </DragDataContext.Provider>
  );
}

export function useDragData() {
  const context = useContext(DragDataContext);

  if (context === null) {
    throw new Error("useDragData has to be used within <DndProvider />");
  }

  return context;
}
