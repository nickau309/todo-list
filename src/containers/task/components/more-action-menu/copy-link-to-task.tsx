import { Link1Icon24 } from "@/assets";
import Text from "@/components/ui/text";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import { useMoreActionMenu } from "./more-action-menu";

export default function CopyLinkToTask() {
  const label = "Copy link to task";
  const { ref, index } = useListItem({ label });

  const { activeIndex, disabledIndices, getItemProps } =
    useMoreActionMenu("CopyLinkToTask");

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
        <Link1Icon24 />
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
        <div className="flex items-center gap-0.5 px-px">
          <Text
            as="kbd"
            font="sans"
            size="12px"
            height="16px"
            color={disabled ? "tertiary" : "secondary"}
          >
            ⇧
          </Text>
          <Text
            as="kbd"
            font="sans"
            size="12px"
            height="16px"
            color={disabled ? "tertiary" : "secondary"}
          >
            Ctrl
          </Text>
          <Text
            as="kbd"
            font="sans"
            size="12px"
            height="16px"
            color={disabled ? "tertiary" : "secondary"}
          >
            C
          </Text>
        </div>
      </div>
    </button>
  );
}
