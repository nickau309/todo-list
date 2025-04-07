import { useTaskDialogControl } from "@/components/task-dialog";
import { CheckboxDisplay } from "@/features/checkbox";
import useFindUniqueTask from "@/hooks/task/use-find-unique-task";
import type { ProjectType } from "@/types/project";
import type { TaskType } from "@/types/task";
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
  Pick<TaskType, "id">;

export default function TaskItem({
  id,
  isArchived,
  siblingTaskIds,
}: ItemProps) {
  const { data, isSuccess } = useFindUniqueTask({ id });

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

  if (!isSuccess) {
    const length = Math.floor(Math.random() * 3);

    return (
      <div className="flex h-[42px] w-full items-center gap-1.5 pl-[5px] pr-[38px]">
        <CheckboxDisplay checked={false} priority={4} />
        <div className="min-w-0 flex-1">
          <div
            className={clsx(
              "h-2",
              length === 0 ? "w-1/3" : length === 1 ? "w-2/3" : "w-full",
              "rounded bg-divider-primary",
            )}
          />
        </div>
      </div>
    );
  }

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
          isCompleted={data.isCompleted}
          priority={data.priority}
          disabled={isArchived}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="pb-[3px]">
          <Name isCompleted={data.isCompleted} name={data.name} />
          {data.description.length !== 0 && (
            <Description
              description={data.description}
              isCompleted={data.isCompleted}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-x-2">
          <DueDate
            dueDate={data.dueDate}
            id={id}
            disabled={isArchived || data.isCompleted}
          />
          {data.labels.map((label) => (
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
