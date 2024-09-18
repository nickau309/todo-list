import {
  removeDueDate as removeDueDateAction,
  updateDueDate,
} from "@/actions/task";
import { DueDateIcon24, RemoveIcon24 } from "@/assets";
import {
  DueDatePopover,
  DueDatePopoverButton,
  DueDatePopoverPanel,
} from "@/features/due-date-popover";
import dayjs from "@/lib/dayjs";
import getDueDateString from "@/utils/getDueDateString";
import getDueDateTextColor from "@/utils/getDueDateTextColor";
import clsx from "clsx";
import { startTransition, useCallback } from "react";
import {
  useOptimisticTask,
  useSetOptimisticTask,
} from "../contexts/optimistic-task-context";

type DueDateProps = {
  disabled?: boolean;
};

export default function DueDate({ disabled = false }: DueDateProps) {
  const { id, dueDate } = useOptimisticTask();
  const setOptimisticTask = useSetOptimisticTask();

  const removeDueDate = useCallback(() => {
    startTransition(() => {
      setOptimisticTask((optimisticTask) => ({
        ...optimisticTask,
        dueDate: null,
      }));
    });
    void removeDueDateAction(id);
  }, [id, setOptimisticTask]);

  const setDueDate = useCallback(
    (dueDate: Date | null) => {
      if (dueDate !== null) {
        startTransition(() => {
          setOptimisticTask((optimisticTask) => ({
            ...optimisticTask,
            dueDate,
          }));
        });
        const formData = new FormData();
        formData.append("date", dayjs(dueDate).format("YYYY-MM-DD"));
        void updateDueDate(id, formData);
      } else {
        removeDueDate();
      }
    },
    [id, removeDueDate, setOptimisticTask],
  );

  const hasDueDate = dueDate !== null;

  return (
    <DueDatePopover
      disabled={disabled}
      dueDate={dueDate}
      setDueDate={setDueDate}
    >
      {hasDueDate ? (
        <div className="relative flex items-center px-3">
          <DueDatePopoverButton
            type="button"
            className={clsx(
              "group peer",
              "flex h-10 min-w-[68px] flex-1 select-none items-center gap-3.5 rounded-[5px] pl-1.5 pr-3",
              "transition-colors duration-300",
              "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
              "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
            )}
          >
            <span
              className={clsx(
                getDueDateTextColor(dueDate),
                "group-aria-disabled:opacity-60",
              )}
            >
              <DueDateIcon24 />
            </span>
            <span className="truncate text-sm/8">
              {getDueDateString(dueDate)}
            </span>
          </DueDatePopoverButton>
          {!disabled && (
            <button
              type="button"
              aria-disabled={disabled}
              aria-label="No Date"
              onClick={removeDueDate}
              className={clsx(
                "absolute right-4 grid size-7 place-items-center rounded-[5px] border border-transparent",
                "text-actionable-quaternary-idle-tint",
                "opacity-0",
                "transition-colors duration-300",
                "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
                "custom-hocus:opacity-100",
                "peer-custom-hover:opacity-100",
              )}
            >
              <RemoveIcon24 />
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center px-3">
          <DueDatePopoverButton
            type="button"
            className={clsx(
              "group",
              "flex h-10 min-w-[68px] flex-1 select-none items-center gap-3.5 rounded-[5px] pl-1.5 pr-3",
              "text-display-secondary-idle-tint",
              "transition-colors duration-300",
              "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
              "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
            )}
          >
            <span>
              <DueDateIcon24 />
            </span>
            <span className="truncate text-sm/8">Due date</span>
          </DueDatePopoverButton>
        </div>
      )}
      <DueDatePopoverPanel />
    </DueDatePopover>
  );
}
