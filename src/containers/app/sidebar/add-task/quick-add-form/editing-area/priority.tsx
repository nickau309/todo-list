import { Priority4Icon16, PriorityIcon16, RemoveIcon16 } from "@/assets";
import {
  PRIORITY_ITEMS,
  PRIORITY_ITEMS_DEFAULT_INDEX,
} from "@/constants/task/priority";
import { useStore } from "@/contexts/store-context";
import {
  PriorityDropdown,
  PriorityDropdownButton,
  PriorityDropdownPanel,
} from "@/features/priority-dropdown";
import { PriorityItemType } from "@/types/task";
import clsx from "clsx";
import { useCallback } from "react";

type PriorityProps = {
  disabled?: boolean;
};

export default function Priority({ disabled = false }: PriorityProps) {
  const { priority, setPriority } = useStore((state) => ({
    priority: state.quickAddForm.inputValues.priority,
    setPriority: state.quickAddForm.setPriority,
  }));

  const removePriority = () => {
    setPriority(4);
  };

  const item =
    PRIORITY_ITEMS.find((item) => item.priority === priority) ??
    PRIORITY_ITEMS[PRIORITY_ITEMS_DEFAULT_INDEX];

  const setItem = useCallback(
    (item: PriorityItemType) => {
      setPriority(item.priority);
    },
    [setPriority],
  );

  return (
    <PriorityDropdown disabled={disabled} item={item} setItem={setItem}>
      {priority !== 4 ? (
        <div className="relative flex items-center">
          <PriorityDropdownButton
            type="button"
            className={clsx(
              "flex h-7 items-center gap-1 rounded-[5px] border border-input-idle",
              "pl-1.5 pr-[26px]",
              "text-actionable-quaternary-idle-tint",
              "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
              "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
              "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
              "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
            )}
          >
            <span className={item.text_color}>
              <PriorityIcon16 />
            </span>
            <span
              className={clsx(
                "truncate text-[13px]/[16.8px]",
                "text-display-secondary-idle-tint",
              )}
            >
              P{priority}
            </span>
          </PriorityDropdownButton>
          <button
            type="button"
            aria-disabled={disabled}
            aria-label="Remove priority"
            onClick={removePriority}
            className={clsx(
              "absolute right-[6.8px]",
              "grid size-4 place-items-center rounded-[5px] border border-transparent",
              "text-actionable-quaternary-idle-tint",
              "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
              "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
              "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
              "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
              "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
            )}
          >
            <RemoveIcon16 className="h-full w-full" />
          </button>
        </div>
      ) : (
        <div className="relative flex items-center">
          <PriorityDropdownButton
            type="button"
            className={clsx(
              "flex h-7 items-center gap-1 rounded-[5px] border border-input-idle",
              "px-1.5",
              "text-actionable-quaternary-idle-tint",
              "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
              "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
              "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
              "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
            )}
          >
            <span>
              <Priority4Icon16 />
            </span>
            <span
              className={clsx(
                "truncate text-[13px]/[16.8px]",
                "text-display-secondary-idle-tint",
              )}
            >
              Priority
            </span>
          </PriorityDropdownButton>
        </div>
      )}
      <PriorityDropdownPanel />
    </PriorityDropdown>
  );
}
