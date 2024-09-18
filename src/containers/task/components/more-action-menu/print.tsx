import { PrintIcon24 } from "@/assets";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import { useMoreActionMenu } from "./more-action-menu";

export default function Print() {
  const label = "Print";
  const { ref, index } = useListItem({ label });

  const { activeIndex, disabledIndices, getItemProps } =
    useMoreActionMenu("Print");

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
      {...getItemProps()}
    >
      <span
        className={clsx(
          "grid size-6 place-items-center text-display-secondary-idle-tint",
          "group-aria-disabled:text-display-tertiary-idle-tint",
        )}
      >
        <PrintIcon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <span
          className={clsx(
            "truncate text-[13px]/[16.8px] text-display-primary-idle-tint",
            "group-aria-disabled:text-display-tertiary-idle-tint",
          )}
        >
          {label}
        </span>
      </div>
    </button>
  );
}
