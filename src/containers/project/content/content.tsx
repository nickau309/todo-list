import useGetTaskIds from "@/hooks/task/use-get-task-ids";
import type { ProjectType } from "@/types/project";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { defaultRangeExtractor, useVirtualizer } from "@tanstack/react-virtual";
import type { RefObject } from "react";
import { useCallback, useMemo } from "react";
import { useDragData } from "../../../contexts/dnd-provider";
import SortableItem from "./sortable-item";

export default function Content({
  project,
  projectId,
  scrollElementRef,
}: {
  project: ProjectType;
  projectId: string | number;
  scrollElementRef: RefObject<HTMLDivElement>;
}) {
  const isArchived = project?.isArchived ?? false;

  const { activeId, overId, offsetX } = useDragData();

  const query = useGetTaskIds({ projectId });

  const tasks = useMemo(() => {
    const tasks: {
      id: number;
      parentTaskId: number | null;
      depth: number;
    }[] = [];

    const path: number[] = [];
    for (const task of query.data ?? []) {
      while (path.length > 0 && path[path.length - 1] !== task.parentTaskId) {
        path.pop();
      }
      tasks.push({
        ...task,
        depth: path.length,
      });
      path.push(task.id);
    }

    return tasks;
  }, [query.data]);

  const displayTasks = useMemo(() => {
    if (activeId === null) {
      return tasks;
    }

    const displayTasks: {
      id: number;
      parentTaskId: number | null;
      depth: number;
    }[] = [];

    let activeTaskDepth: number | null = null;
    for (const task of tasks) {
      if (activeTaskDepth === task.depth) {
        activeTaskDepth = null;
      }
      if (activeId === task.id) {
        activeTaskDepth = task.depth;
      }
      if (activeTaskDepth === null || task.depth <= activeTaskDepth) {
        displayTasks.push(task);
      }
    }

    return displayTasks;
  }, [activeId, tasks]);

  const siblingTaskIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const projectedTask = useMemo(() => {
    if (activeId === null || overId === null) {
      return null;
    }
    const overIndex = displayTasks.findIndex((task) => task.id === overId);
    const activeIndex = displayTasks.findIndex((task) => task.id === activeId);
    const prevIndex = activeIndex < overIndex ? overIndex : overIndex - 1;
    const nextIndex = activeIndex > overIndex ? overIndex : overIndex + 1;
    const activeItem = displayTasks[activeIndex];
    const dragDepth = Math.round(offsetX / 28);
    const projectedDepth = activeItem.depth + dragDepth;
    const maxDepth = getMaxDepth({ items: displayTasks, prevIndex });
    const minDepth = getMinDepth({ items: displayTasks, nextIndex });
    let depth = projectedDepth;
    if (projectedDepth > maxDepth) {
      depth = maxDepth;
    } else if (projectedDepth < minDepth) {
      depth = minDepth;
    }
    const parentTaskId = getParentId({
      activeIndex,
      depth,
      items: displayTasks,
      prevIndex,
    });
    return { depth, parentTaskId };

    function getMaxDepth({
      items,
      prevIndex,
    }: {
      items: { depth: number }[];
      prevIndex: number;
    }) {
      if (prevIndex < 0) {
        return 0;
      }
      return items[prevIndex].depth + 1;
    }

    function getMinDepth({
      items,
      nextIndex,
    }: {
      items: { depth: number }[];
      nextIndex: number;
    }) {
      return items.at(nextIndex)?.depth ?? 0;
    }

    function getParentId({
      activeIndex,
      depth,
      items,
      prevIndex,
    }: {
      activeIndex: number;
      depth: number;
      items: { depth: number; id: number; parentTaskId: number | null }[];
      prevIndex: number;
    }) {
      if (depth === 0) {
        return null;
      }
      if (depth > items[prevIndex].depth) {
        return items[prevIndex].id;
      }
      for (let index = prevIndex; index > 0; --index) {
        if (index !== activeIndex && depth === items[index].depth) {
          return items[index].parentTaskId;
        }
      }
      return null;
    }
  }, [activeId, displayTasks, offsetX, overId]);

  const rangeExtractor = useCallback<typeof defaultRangeExtractor>(
    (range) => {
      const arr = defaultRangeExtractor(range);

      const index = displayTasks.findIndex((task) => task.id === activeId);
      if (index !== -1) {
        if (!arr.includes(index)) {
          arr.push(index);
        }
      }

      return arr;
    },
    [activeId, displayTasks],
  );

  const virtualizer = useVirtualizer({
    count: displayTasks.length,
    estimateSize: () => 43,
    getScrollElement: () => scrollElementRef.current,
    getItemKey: (index) => displayTasks[index].id,
    overscan: 14,
    rangeExtractor,
  });

  const items = virtualizer.getVirtualItems();

  const [paddingTop, paddingBottom] =
    items.length > 0
      ? [
          Math.max(0, items[0].start - virtualizer.options.scrollMargin),
          Math.max(0, virtualizer.getTotalSize() - items[items.length - 1].end),
        ]
      : [0, 0];

  return (
    <>
      <div className="h-[5px]"></div>
      <SortableContext
        id={`sortable-project-${projectId}`}
        items={displayTasks}
        strategy={verticalListSortingStrategy}
      >
        <div style={{ paddingTop, paddingBottom }}>
          {items.map((virtualRow) => {
            const task = displayTasks[virtualRow.index];
            let depth = task.depth;
            let parentTaskId = task.parentTaskId;
            if (task.id === activeId && projectedTask) {
              depth = projectedTask.depth;
              parentTaskId = projectedTask.parentTaskId;
            }
            return (
              <div
                ref={virtualizer.measureElement}
                key={virtualRow.key}
                data-index={virtualRow.index}
              >
                <SortableItem
                  depth={depth}
                  id={task.id}
                  isArchived={isArchived}
                  parentTaskId={parentTaskId}
                  siblingTaskIds={siblingTaskIds}
                />
              </div>
            );
          })}
        </div>
      </SortableContext>
    </>
  );
}
