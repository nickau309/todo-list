import { ActivityIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import { useMoreActionMenu } from "./more-action-menu";

export default function ViewTaskActivity() {
  const label = "View task activity";
  const { ref, index } = useListItem({ label });

  const { activeIndex, disabledIndices, getItemProps } =
    useMoreActionMenu("ViewTaskActivity");

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
          "group-aria-disabled:opacity-50",
        )}
      >
        <ActivityIcon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <Text
          overflow="truncate"
          font="reactist"
          size="13px"
          height="16.8px"
          color={disabled ? "tertiary" : "primary"}
        >
          {label}
        </Text>
      </div>
    </button>
  );
}
