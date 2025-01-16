import { updatePriority } from "@/actions/task";
import { Priority4Icon24, PriorityIcon24 } from "@/assets";
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
      <div className="flex items-center px-3">
        <PriorityDropdownButton
          className={clsx(
            "group",
            "flex h-10 min-w-[68px] flex-1 select-none items-center gap-3.5 rounded-[5px] pl-1.5 pr-3",
            "transition-colors duration-300",
            "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
            "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
          )}
        >
          <span
            className={clsx(
              getPriorityTextColor(priority),
              "group-aria-disabled:opacity-60",
            )}
          >
            {priority === 4 ? <Priority4Icon24 /> : <PriorityIcon24 />}
          </span>
          <span className="truncate text-sm/8">Priority {priority}</span>
        </PriorityDropdownButton>
      </div>
      <PriorityDropdownPanel />
    </PriorityDropdown>
  );
}
