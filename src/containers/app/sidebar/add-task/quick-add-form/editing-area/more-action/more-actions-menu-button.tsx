import { MoreActionIcon16 } from "@/assets";
import clsx from "clsx";
import { useMoreActionsMenu } from "./more-actions-menu";

export default function MoreActionsMenuButton() {
  const { disabled, refs, getReferenceProps } = useMoreActionsMenu(
    "MoreActionsMenuButton",
  );

  return (
    <button
      ref={refs.setReference}
      type="button"
      aria-disabled={disabled}
      aria-label="More actions"
      className={clsx(
        "flex h-7 items-center gap-1 rounded-[5px] border border-input-idle",
        "px-1.5",
        "text-actionable-quaternary-idle-tint",
        "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
        "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
        "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
        "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
      )}
      {...getReferenceProps()}
    >
      <span>
        <MoreActionIcon16 />
      </span>
    </button>
  );
}
