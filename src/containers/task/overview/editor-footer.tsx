import clsx from "clsx";
import type { MouseEvent } from "react";
import { useTaskControl } from "../contexts/task-context";
import { useTaskInfoFormContext } from "../contexts/task-info-form-context";

export default function EditorFooter() {
  const { setIsEditingInfo } = useTaskControl();

  const {
    formState: { isSubmitted, isSubmitting, isValid },
    reset,
  } = useTaskInfoFormContext();

  const isDisabled = isSubmitted || isSubmitting || !isValid;

  const handleCancel = () => {
    setIsEditingInfo(false);
    reset();
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        aria-disabled="false"
        onClick={handleCancel}
        className={clsx(
          "flex h-8 min-w-[68px] select-none items-center justify-center rounded-[5px] border border-transparent",
          "bg-actionable-secondary-idle-fill px-3 text-actionable-secondary-idle-tint",
          "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
          "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
          "aria-disabled:cursor-not-allowed aria-disabled:bg-actionable-secondary-disabled-fill aria-disabled:text-actionable-secondary-disabled-tint",
          "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
          "custom-hocus:bg-actionable-secondary-hover-fill custom-hocus:text-actionable-secondary-hover-tint",
        )}
      >
        <span className="truncate text-[13px]/8 font-semibold">Cancel</span>
      </button>
      <button
        type="submit"
        aria-disabled={isDisabled}
        onClick={handleClick}
        className={clsx(
          "flex h-8 min-w-[68px] select-none items-center justify-center rounded-[5px] border border-transparent",
          "bg-actionable-primary-idle-fill px-3 text-actionable-primary-idle-tint",
          "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
          "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
          "aria-disabled:cursor-not-allowed aria-disabled:bg-actionable-primary-disabled-fill aria-disabled:text-actionable-primary-disabled-tint",
          "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
          "custom-hocus:bg-actionable-primary-hover-fill custom-hocus:text-actionable-primary-hover-tint",
        )}
      >
        <span className="truncate text-[13px]/8 font-semibold">Save</span>
      </button>
    </div>
  );
}
