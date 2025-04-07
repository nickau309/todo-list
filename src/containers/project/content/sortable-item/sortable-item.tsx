import type { ProjectType } from "@/types/project";
import type { TaskType } from "@/types/task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import TaskItem from "./task-item";
import { memo } from "react";

type ItemProps = {
  depth: number;
  siblingTaskIds: number[];
} & Pick<ProjectType, "isArchived"> &
  Pick<TaskType, "id" | "parentTaskId">;

function SortableItem({
  depth,
  id,
  isArchived,
  parentTaskId,
  siblingTaskIds,
}: ItemProps) {
  const {
    attributes,
    isDragging,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    attributes: { role: "presentation", tabIndex: -1 },
    transition: null,
    data: {
      parentTaskId,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const paddingLeft = [null, "pl-7", "pl-14", "pl-[84px]", "pl-28"];

  return (
    <div ref={setDroppableNodeRef} className={clsx(paddingLeft[depth])}>
      <div
        ref={setDraggableNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={clsx(
          "group/item relative",
          isDragging && "cursor-grabbing rounded-[10px]",
          "border-b border-divider-primary",
          isDragging && "bg-actionable-secondary-idle-fill",
          isDragging &&
            "before:absolute before:top-[-2.8px] before:-ml-2 before:rounded-full before:border-2 before:border-display-accent-primary-fill before:p-0.5",
          isDragging &&
            "after:absolute after:top-0 after:h-0.5 after:w-full after:bg-display-accent-primary-fill",
        )}
      >
        <div className={clsx("-mx-2", isDragging && "opacity-0")}>
          <TaskItem
            id={id}
            isArchived={isArchived}
            siblingTaskIds={siblingTaskIds}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(SortableItem);
