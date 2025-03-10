import { Priority4Icon16, PriorityIcon16, RemoveIcon16 } from "@/assets";
import Text from "@/components/ui/text";
import { useStore } from "@/contexts/store-context";
import {
  PriorityDropdown,
  PriorityDropdownButton,
  PriorityDropdownPanel,
} from "@/features/priority-dropdown";
import getPriorityTextColor from "@/utils/getPriorityTextColor";
import clsx from "clsx";

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

  return (
    <PriorityDropdown
      priority={priority}
      setPriority={setPriority}
      disabled={disabled}
    >
      {priority !== 4 ? (
        <div className="relative flex items-center">
          <PriorityDropdownButton
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
            <span className={getPriorityTextColor(priority)}>
              <PriorityIcon16 />
            </span>
            <Text
              overflow="truncate"
              font="reactist"
              size="13px"
              height="16.8px"
              color="secondary"
            >
              P{priority}
            </Text>
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
            <Text
              overflow="truncate"
              font="reactist"
              size="13px"
              height="16.8px"
              color="secondary"
            >
              Priority
            </Text>
          </PriorityDropdownButton>
        </div>
      )}
      <PriorityDropdownPanel />
    </PriorityDropdown>
  );
}
