import {
  removeDueDate as removeDueDateAction,
  updateDueDate,
} from "@/actions/task";
import { AddSmIcon24, DueDateOutlineIcon16, RemoveIcon24 } from "@/assets";
import Text from "@/components/ui/text";
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
      <div className="flex flex-col">
        {hasDueDate && (
          <div className="flex pl-px">
            <Text
              overflow="truncate"
              font="reactist"
              size="12px"
              weight={600}
              height="28px"
              color={
                disabled
                  ? "text-actionable-quaternary-disabled-tint"
                  : "secondary"
              }
            >
              Due date
            </Text>
          </div>
        )}
        {hasDueDate ? (
          <div className="relative -mx-2 flex flex-col">
            <DueDatePopoverButton
              className={clsx(
                "group peer flex h-7 min-w-[68px] select-none items-center gap-2 rounded-[5px] border border-transparent px-2",
                "transition-colors duration-300",
                "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
                "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                "custom-hocus:bg-selectable-secondary-selected-fill custom-hocus:pr-7",
              )}
            >
              <span
                className={clsx(
                  getDueDateTextColor(dueDate),
                  "group-aria-disabled:opacity-60",
                )}
              >
                <DueDateOutlineIcon16 />
              </span>
              <Text
                overflow="truncate"
                font="reactist"
                size="12px"
                height="28px"
                className="group-aria-disabled:font-semibold"
              >
                {getDueDateString(dueDate)}
              </Text>
            </DueDatePopoverButton>
            {!disabled && (
              <button
                type="button"
                aria-disabled={disabled}
                aria-label="No Date"
                onClick={removeDueDate}
                className={clsx(
                  "absolute right-[3px] grid size-7 place-items-center rounded-[5px] border border-transparent",
                  "opacity-0",
                  "transition-colors duration-300",
                  "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                  "custom-hocus:bg-selectable-secondary-selected-fill",
                  "custom-hocus:opacity-100",
                  "peer-custom-hover:opacity-100",
                )}
              >
                <RemoveIcon24 />
              </button>
            )}
          </div>
        ) : (
          <div className="-mx-2 flex flex-col">
            <DueDatePopoverButton
              className={clsx(
                "group flex h-7 min-w-[68px] select-none items-center justify-between gap-0.5 rounded-[5px] border border-transparent pl-2 pr-0.5",
                "text-actionable-quaternary-idle-tint",
                "transition-colors duration-300",
                "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
                "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                "custom-hocus:bg-selectable-secondary-selected-fill custom-hocus:text-actionable-quaternary-hover-tint",
              )}
            >
              <Text
                overflow="truncate"
                font="reactist"
                size="12px"
                weight={600}
                height="28px"
              >
                Due date
              </Text>
              <span>
                <AddSmIcon24 />
              </span>
            </DueDatePopoverButton>
          </div>
        )}
      </div>
      <DueDatePopoverPanel />
    </DueDatePopover>
  );
}
