import { Priority4Icon24, PriorityIcon24, SelectCheckIcon12 } from "@/assets";
import type { PriorityItemType } from "@/types/task";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import { useId } from "react";
import { usePriorityDropdown } from "./priority-dropdown";

type PriorityDropdownOptionProps = {
  item: PriorityItemType;
};

export default function PriorityDropdownOption({
  item,
}: PriorityDropdownOptionProps) {
  const { ref, index } = useListItem({ label: `Priority ${item.priority}` });

  const id = useId();

  const {
    selectedItem,
    setSelectedItem,
    setIsOpen,
    activeIndex,
    getItemProps,
  } = usePriorityDropdown("PriorityDropdownOption");

  const isActive = activeIndex === index;
  const isSelected = selectedItem.priority === item.priority;

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
        "flex items-center gap-2.5 px-2 py-1",
        "focus-visible:outline-none",
        "data-[active='true']:bg-option-active",
      )}
      {...getItemProps({
        onClick() {
          setSelectedItem(item);
          setIsOpen(false);
        },
      })}
    >
      <span className={item.text_color}>
        {item.priority === 4 ? <Priority4Icon24 /> : <PriorityIcon24 />}
      </span>
      <span className="truncate text-[13px]/6">Priority {item.priority}</span>
      {isSelected && (
        <span className="text-display-accent-primary-tint">
          <SelectCheckIcon12 className="size-3.5" />
        </span>
      )}
    </button>
  );
}
