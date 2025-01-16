import { updatePriority } from "@/actions/task";
import { DropdownIcon24, Priority4Icon16, PriorityIcon16 } from "@/assets";
import {
  PriorityDropdown,
  PriorityDropdownButton,
  PriorityDropdownPanel,
} from "@/features/priority-dropdown";
import getPriorityTextColor from "@/utils/getPriorityTextColor";
import clsx from "clsx";
import { startTransition, useCallback } from "react";
import {
  useOptimisticTask,
  useSetOptimisticTask,
} from "../contexts/optimistic-task-context";

type PriorityProps = {
  disabled?: boolean;
};

export default function Priority({ disabled = false }: PriorityProps) {
  const { id, priority } = useOptimisticTask();
  const setOptimisticTask = useSetOptimisticTask();

  const setPriority = useCallback(
    (priority: number) => {
      startTransition(() => {
        setOptimisticTask((optimisticTask) => ({
          ...optimisticTask,
          priority,
        }));
      });
      const formData = new FormData();
      formData.append("priority", String(priority));
      void updatePriority(id, formData);
    },
    [id, setOptimisticTask],
  );

  return (
    <PriorityDropdown
      priority={priority}
      setPriority={setPriority}
      disabled={disabled}
    >
      <div className="flex flex-col">
        <div
          className={clsx(
            "pl-px text-xs/7 font-semibold",
            disabled
              ? "text-actionable-quaternary-disabled-tint"
              : "text-display-secondary-idle-tint",
          )}
        >
          Priority
        </div>
        <div className="relative -mx-2 flex flex-col">
          <PriorityDropdownButton
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
                getPriorityTextColor(priority),
                "group-aria-disabled:opacity-60",
              )}
            >
              {priority === 4 ? <Priority4Icon16 /> : <PriorityIcon16 />}
            </span>
            <span className="truncate text-xs/7 group-aria-disabled:font-semibold">
              P{priority}
            </span>
          </PriorityDropdownButton>
          <span
            className={clsx(
              "pointer-events-none absolute right-[3px] top-1/2 hidden -translate-y-1/2",
              "peer-custom-hocus:block",
            )}
          >
            <DropdownIcon24 />
          </span>
        </div>
      </div>
      <PriorityDropdownPanel />
    </PriorityDropdown>
  );
}
