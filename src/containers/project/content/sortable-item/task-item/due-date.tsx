import { removeDueDate, updateDueDate } from "@/actions/task";
import { DueDateIcon12 } from "@/assets";
import {
  DueDatePopover,
  DueDatePopoverButton,
  DueDatePopoverPanel,
} from "@/features/due-date-popover";
import dayjs from "@/lib/dayjs";
import type { ProjectType } from "@/types/project";
import getDueDateString from "@/utils/getDueDateString";
import getDueDateTextColor from "@/utils/getDueDateTextColor";
import clsx from "clsx";
import { startTransition, useCallback } from "react";
import { useSetOptimisticProject } from "../../../contexts/optimistic-project-context";

type DueDateProps = {
  disabled: boolean;
} & Pick<ProjectType["tasks"][number], "dueDate" | "id">;

export default function DueDate({ disabled, dueDate, id }: DueDateProps) {
  const setOptimisticProject = useSetOptimisticProject();

  const setDueDate = useCallback(
    (dueDate: Date | null) => {
      startTransition(() => {
        setOptimisticProject((optimisticProject) => ({
          ...optimisticProject,
          tasks: optimisticProject.tasks.map((task) => {
            if (task.id !== id) {
              return task;
            }
            return {
              ...task,
              dueDate,
            };
          }),
        }));
      });
      if (dueDate !== null) {
        const formData = new FormData();
        formData.append("date", dayjs(dueDate).format("YYYY-MM-DD"));
        void updateDueDate(id, formData);
      } else {
        void removeDueDate(id);
      }
    },
    [id, setOptimisticProject],
  );

  if (dueDate === null) {
    return null;
  }

  return (
    <DueDatePopover
      disabled={disabled}
      dueDate={dueDate}
      setDueDate={setDueDate}
    >
      <DueDatePopoverButton
        className={clsx(
          "flex items-center gap-0.5",
          disabled
            ? "text-display-secondary-idle-tint"
            : (getDueDateTextColor(dueDate) ?? "text-[#808080]"),
        )}
      >
        <span>
          <DueDateIcon12 />
        </span>
        <span className="text-xs/4">{getDueDateString(dueDate)}</span>
      </DueDatePopoverButton>
      <DueDatePopoverPanel />
    </DueDatePopover>
  );
}
