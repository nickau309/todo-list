import { reorderTask } from "@/actions/task";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { startTransition, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import {
  useOptimisticProject,
  useSetOptimisticProject,
} from "../contexts/optimistic-project-context";
import OverlayItem from "./overlay-item";
import SortableItem from "./sortable-item";

export default function Content({
  container,
}: {
  container: HTMLDivElement | null;
}) {
  const { isArchived, tasks } = useOptimisticProject();
  const setOptimisticProject = useSetOptimisticProject();

  const [activeId, setActiveId] = useState<string | number | null>(null);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });
  const sensors = useSensors(pointerSensor);

  console.log(tasks);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    setActiveId(active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log("handle drag end..");
    console.log(event);

    if (active.id !== over?.id) {
      const activeItem = tasks.find((item) => item.id === active.id);
      const overItem = tasks.find((item) => item.id === over?.id);
      if (activeItem !== undefined && overItem !== undefined) {
        const activeIndex = tasks.indexOf(activeItem);
        const overIndex = tasks.indexOf(overItem);
        console.log({ activeItem, overItem, activeIndex, overIndex });
        const formData = new FormData();
        formData.append("childOrder", String(overItem.childOrder));
        void reorderTask(activeItem.id, formData);

        const newItems = tasks.map((item) => {
          if (item.childOrder === activeItem.childOrder) {
            return {
              ...item,
              childOrder: overItem.childOrder,
            };
          } else if (
            item.childOrder > activeItem.childOrder &&
            item.childOrder <= overItem.childOrder
          ) {
            return {
              ...item,
              childOrder: item.childOrder - 1,
            };
          } else if (
            item.childOrder < activeItem.childOrder &&
            item.childOrder >= overItem.childOrder
          ) {
            return {
              ...item,
              childOrder: item.childOrder + 1,
            };
          } else {
            return item;
          }
        });

        startTransition(() => {
          setOptimisticProject((optimisticProject) => ({
            ...optimisticProject,
            tasks: arrayMove(newItems, activeIndex, overIndex),
          }));
        });
      }
    }

    setActiveId(null);
  };

  console.log("render..");

  const task = tasks.find((task) => task.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-[5px]"></div>
      <SortableContext
        id="test"
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <Virtuoso
          data={tasks}
          context={{
            isArchived,
            siblingTaskIds: tasks.map((task) => task.id),
          }}
          itemContent={(_, task, { isArchived, siblingTaskIds }) => {
            return (
              <SortableItem
                isArchived={isArchived}
                siblingTaskIds={siblingTaskIds}
                {...task}
              />
            );
          }}
          computeItemKey={(index, task) => {
            return task.id;
          }}
          customScrollParent={container ?? undefined}
        />
      </SortableContext>

      {/* <svg
        aria-labelledby="61e47o-aria"
        role="img"
        height="43px"
        width="800px"
        viewBox="0 0 800 43"
        data-testid="task-list-item-placeholder"
      >
        <title id="61e47o-aria">Loading...</title>
        <rect
          x="1"
          y="13"
          rx="9"
          ry="9"
          width="16"
          height="16"
          stroke="var(--product-library-display-tertiary-idle-tint)"
          stroke-width="1"
          fill="var(--product-library-background-base-primary)"
        ></rect>
        <rect
          role="presentation"
          x="0"
          y="0"
          width="100%"
          height="100%"
          clip-path="url(#61e47o-diff)"
          style='fill: url("#61e47o-animated-diff");'
        ></rect>
        <defs>
          <clipPath id="61e47o-diff">
            <rect width="60%" height="8" rx="3" x="28" y="17"></rect>
            <rect width="100%" height="1" x="0" y="42"></rect>
          </clipPath>
          <linearGradient
            id="61e47o-animated-diff"
            gradientTransform="translate(-2 0)"
          >
            <stop
              offset="0%"
              stop-color="var(--product-library-divider-primary)"
              stop-opacity="1"
            ></stop>
            <stop
              offset="50%"
              stop-color="var(--product-library-display-quaternary-idle-tint)"
              stop-opacity="0.5"
            ></stop>
            <stop
              offset="100%"
              stop-color="var(--product-library-divider-primary)"
              stop-opacity="1"
            ></stop>
          </linearGradient>
        </defs>
      </svg> */}
      <DragOverlay dropAnimation={null}>
        {task && <OverlayItem {...task} />}
      </DragOverlay>
    </DndContext>
  );
}
