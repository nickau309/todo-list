import type { ProjectType } from "@/types/project";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import TaskItem from "./task-item";

type ItemProps = {
  siblingTaskIds: number[];
} & Pick<ProjectType, "isArchived"> &
  Pick<
    ProjectType["tasks"][number],
    | "description"
    | "dueDate"
    | "id"
    | "isCompleted"
    | "labels"
    | "name"
    | "priority"
  >;

export default function SortableItem({
  description,
  dueDate,
  id,
  isArchived,
  isCompleted,
  labels,
  name,
  priority,
  siblingTaskIds,
}: ItemProps) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    attributes: { role: "presentation", tabIndex: -1 },
    id,
    transition: null,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    // indent div
    <div ref={setNodeRef} style={style}>
      <div
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
            description={description}
            dueDate={dueDate}
            id={id}
            isArchived={isArchived}
            isCompleted={isCompleted}
            labels={labels}
            name={name}
            priority={priority}
            siblingTaskIds={siblingTaskIds}
          />
        </div>
      </div>
    </div>
  );
}
