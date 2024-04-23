"use client";

import { useDiscardChanges } from "@/hooks/settings";
import clsx from "clsx";

export default function CancelButton() {
  const discardChanges = useDiscardChanges();

  return (
    <button
      type="button"
      aria-disabled="false"
      onClick={discardChanges}
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
  );
}
