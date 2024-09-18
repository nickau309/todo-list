import {
  LabelIconOutline24,
  OptionCheckIcon24,
  OptionUncheckIcon24,
} from "@/assets";
import { textColor } from "@/constants/color";
import type { LabelOptimisticType } from "@/types/label";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import { useId } from "react";
import { useLabelsDropdown } from "./labels-dropdown";

type OptionProps = {
  label: LabelOptimisticType;
};

export default function LabelsDropdownOption({ label }: OptionProps) {
  const { ref, index } = useListItem();

  const id = useId();

  const {
    selectedLabels,
    toggleSelectedLabel,
    activeIndex,
    getListboxItemProps: getItemProps,
  } = useLabelsDropdown("LabelsDropdownOption");

  const isActive = activeIndex === index;
  const isDisabled = label.isCreating;
  const isSelected = selectedLabels.some((l) => l.id === label.id);

  return (
    <button
      ref={ref}
      type="button"
      aria-disabled={isDisabled}
      aria-selected={isSelected}
      data-active={isActive}
      id={id}
      role="option"
      tabIndex={isActive ? 0 : -1}
      className={clsx(
        "flex items-center gap-2.5 px-2 py-1",
        "focus-visible:outline-none",
        "aria-disabled:cursor-progress",
        "data-[active='true']:bg-option-active",
      )}
      {...getItemProps({
        onClick() {
          if (!isDisabled) {
            toggleSelectedLabel(label);
          }
        },
      })}
    >
      <span className={textColor[label.color]}>
        <LabelIconOutline24 />
      </span>
      <div className="flex min-w-0 flex-1 gap-1">
        <span className="truncate font-sans text-[13px]/[17.6px]">
          {label.name}
        </span>
      </div>
      <span className="text-option-checkbox">
        {isSelected ? <OptionCheckIcon24 /> : <OptionUncheckIcon24 />}
      </span>
    </button>
  );
}
