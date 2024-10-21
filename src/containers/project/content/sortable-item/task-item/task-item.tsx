import { useTaskDialogControl } from "@/components/task-dialog";
import type { ProjectType } from "@/types/project";
import clsx from "clsx";
import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { KeyboardEvent } from "react";
import Checkbox from "./checkbox";
import Description from "./description";
import DueDate from "./due-date";
import Label from "./label";
import Name from "./name";

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

export default function TaskItem({
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
  const { setPrevHref, setSiblingTaskIds } = useTaskDialogControl();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const href: Route = `/app/task/${id}`;
  router.prefetch(href);

  const navigateToTask = () => {
    router.push(href);
    setPrevHref(`${pathname}?${searchParams.toString()}` as Route);
    setSiblingTaskIds(siblingTaskIds);
  };

  const handleClick = () => {
    navigateToTask();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigateToTask();
    }
  };

  return (
    <div
      role="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={clsx(
        "flex w-full gap-1.5 rounded-[5px] py-2 pl-[5px] pr-[38px]",
        "group-focus-within/item:bg-task-list-item group-focus-within/item:outline-none group-focus-within/item:ring-1 group-focus-within/item:ring-inset group-focus-within/item:ring-task-list-item",
      )}
    >
      <div className="shrink-0 basis-6">
        <Checkbox
          id={id}
          isArchived={isArchived}
          isCompleted={isCompleted}
          priority={priority}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="pb-[3px]">
          <Name isCompleted={isCompleted} name={name} />
          {description.length !== 0 && (
            <Description description={description} isCompleted={isCompleted} />
          )}
        </div>
        <div className="flex flex-wrap gap-x-2">
          <DueDate
            disabled={isArchived || isCompleted}
            dueDate={dueDate}
            id={id}
          />
          {labels.map((label) => (
            <Label
              key={label.id}
              color={label.color}
              id={label.id}
              name={label.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
