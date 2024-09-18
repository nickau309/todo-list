import { Delete1Icon24 } from "@/assets";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import { useTaskControl } from "../../contexts/task-context";
import { useMoreActionMenu } from "./more-action-menu";

export default function Delete() {
  const label = "Delete";
  const { ref, index } = useListItem({ label });

  const { setIsTaskDeletionDialogOpen } = useTaskControl();

  const {
    setIsOpen: setIsMoreActionMenuOpen,
    activeIndex,
    disabledIndices,
    getItemProps,
  } = useMoreActionMenu("Delete");

  const disabled = disabledIndices.includes(index);

  return (
    <button
      ref={ref}
      type="button"
      aria-disabled={disabled}
      role="menuitem"
      tabIndex={!disabled && activeIndex === index ? 0 : -1}
      className={clsx(
        "group mx-1.5 flex min-h-8 select-none items-center gap-2.5 rounded-[5px] px-1.5",
        "focus-visible:outline-none",
        "aria-disabled:cursor-not-allowed",
        "custom-hocus:bg-actionable-focus-fill",
      )}
      {...getItemProps({
        onClick() {
          if (!disabled) {
            setIsMoreActionMenuOpen(false);
            setIsTaskDeletionDialogOpen(true);
          }
        },
      })}
    >
      <span
        className={clsx(
          "grid size-6 place-items-center text-actionable-destructive-idle-tint",
          "group-aria-disabled:text-actionable-destructive-disabled-tint",
          "group-custom-hocus:text-actionable-destructive-hover-tint",
        )}
      >
        <Delete1Icon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <span
          className={clsx(
            "truncate text-[13px]/[16.8px] text-actionable-destructive-idle-tint",
            "group-aria-disabled:text-actionable-destructive-disabled-tint",
            "group-custom-hocus:text-actionable-destructive-hover-tint",
          )}
        >
          {label}
        </span>
        <div
          className={clsx(
            "flex items-center gap-0.5 px-px text-xs text-display-secondary-idle-tint",
            "group-aria-disabled:text-display-tertiary-idle-tint",
          )}
        >
          <kbd className="font-sans text-xs">⇧</kbd>
          <kbd className="font-sans text-xs">Delete</kbd>
        </div>
      </div>
    </button>
  );
}
