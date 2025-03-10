import { Priority4Icon24, PriorityIcon24, SelectCheckIcon12 } from "@/assets";
import Text from "@/components/ui/text";
import getPriorityTextColor from "@/utils/getPriorityTextColor";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import { useId } from "react";
import { usePriorityDropdown } from "../priority-dropdown";

type OptionProps = {
  priority: number;
};

export default function PriorityDropdownOption({ priority }: OptionProps) {
  const label = `Priority ${priority}`;

  const { ref, index } = useListItem({ label });

  const id = useId();

  const {
    selectedPriority,
    setSelectedPriority,
    setIsOpen,
    activeIndex,
    getItemProps,
  } = usePriorityDropdown("PriorityDropdownOption");

  const isActive = activeIndex === index;
  const isSelected = selectedPriority === priority;

  return (
    <button
      ref={ref}
      type="button"
      aria-selected={isSelected}
      data-active={isActive}
      id={id}
      role="option"
      tabIndex={isActive ? 0 : -1}
      className={clsx(
        "flex w-full items-center gap-2.5 px-2 py-1",
        "focus-visible:outline-none",
        "data-[active='true']:bg-option-active",
      )}
      {...getItemProps({
        onClick() {
          setSelectedPriority(priority);
          setIsOpen(false);
        },
      })}
    >
      <span className={getPriorityTextColor(priority)}>
        {priority === 4 ? <Priority4Icon24 /> : <PriorityIcon24 />}
      </span>
      <Text
        overflow="truncate"
        font="sans"
        size="13px"
        height="24px"
        color="text-priority-dropdown-option"
      >
        {label}
      </Text>
      {isSelected && (
        <span className="text-display-accent-primary-tint">
          <SelectCheckIcon12 className="size-3.5" />
        </span>
      )}
    </button>
  );
}
