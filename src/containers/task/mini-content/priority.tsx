import { updatePriority } from "@/actions/task";
import { Priority4Icon24, PriorityIcon24 } from "@/assets";
import {
  PRIORITY_ITEMS,
  PRIORITY_ITEMS_DEFAULT_INDEX,
} from "@/constants/task/priority";
import {
  PriorityDropdown,
  PriorityDropdownButton,
  PriorityDropdownPanel,
} from "@/features/priority-dropdown";
import { PriorityItemType } from "@/types/task";
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

  const item =
    PRIORITY_ITEMS.find((item) => item.priority === priority) ??
    PRIORITY_ITEMS[PRIORITY_ITEMS_DEFAULT_INDEX];

  const setItem = useCallback(
    (item: PriorityItemType) => {
      startTransition(() => {
        setOptimisticTask((optimisticTask) => ({
          ...optimisticTask,
          priority: item.priority,
        }));
      });
      const formData = new FormData();
      formData.append("priority", String(item.priority));
      void updatePriority(id, formData);
    },
    [id, setOptimisticTask],
  );

  return (
    <PriorityDropdown disabled={disabled} item={item} setItem={setItem}>
      <div className="flex items-center px-3">
        <PriorityDropdownButton
          type="button"
          className={clsx(
            "group",
            "flex h-10 min-w-[68px] flex-1 select-none items-center gap-3.5 rounded-[5px] pl-1.5 pr-3",
            "transition-colors duration-300",
            "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
            "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
          )}
        >
          <span
            className={clsx(item.text_color, "group-aria-disabled:opacity-60")}
          >
            {item.priority === 4 ? <Priority4Icon24 /> : <PriorityIcon24 />}
          </span>
          <span className="truncate text-sm/8">Priority {item.priority}</span>
        </PriorityDropdownButton>
      </div>
      <PriorityDropdownPanel />
    </PriorityDropdown>
  );
}
