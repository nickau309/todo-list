"use client";

import { ArrowLeftIcon24 } from "@/assets";
import { useSetShowNavMenu } from "@/contexts/settings/show-nav-menu-context";
import { useWidth } from "@/contexts/width-context";
import clsx from "clsx";

export default function OpenNavMenuButton() {
  const setShowNavMenu = useSetShowNavMenu();

  const width = useWidth();

  if (width > 660) {
    return null;
  }

  const openNavMenu = () => {
    setShowNavMenu(true);
  };

  return (
    <button
      type="button"
      aria-disabled="false"
      aria-label="Open navigation menu"
      onClick={openNavMenu}
      className={clsx(
        "grid size-8 shrink-0 place-items-center rounded-[5px] border border-transparent",
        "text-actionable-quaternary-idle-tint",
        "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
        "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
        "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
        "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
      )}
    >
      <ArrowLeftIcon24 />
    </button>
  );
}
